<template>
    <v-card>
    <v-alert :type="typeAlert" dense text dismissible v-model="showAlert">
            {{alertMessage}}
    </v-alert> 
    <v-card-actions class="mb-0">
      <v-container grid-list-lg class="mb-0">
        <v-layout row wrap>
            <v-col cols="10" sm="5">
            <v-select
              v-model="metricasSelecionadas"
              :items="colunasMetricas"
              label="Métrica"
              multiple
              chips
              deletable-chips
              dense
              full-width
              hint="Métricas para gerar gráfico"
              persistent-hint
            ></v-select>
            </v-col>
          <v-flex xs2>
            <v-select
                dense
                height="44"
                v-model="tipoGraficoSelecionado"
                :items="tiposGrafico"
                label="Tipo de gráfico"
            ></v-select>
          </v-flex>         
          <v-flex xs2 >
            <v-btn color="primary" @click="gerarGrafico()" dark>Gerar gráfico</v-btn>
          </v-flex>
        </v-layout>
        <!-- OPCOES DE CONFIGURACAO DOS GRAFICOS -->
        <v-row>
         <v-switch
          style="margin:10px"
          v-if="(tipoGraficoSelecionado === 'mostrarGraficoLinha')"
          v-model="snTotal"
          label="Incluir Total"
          ></v-switch> 
         <v-switch
          style="margin:10px"
          v-if="(tipoGraficoSelecionado === 'mostrarGraficoPizza')"
          v-model="tipoDonut"
          label="Donut?"
          ></v-switch>                     
         <v-switch
          style="margin:10px"
          v-model="mostrarRotulosNoGrafico"
          v-if="(tipoGraficoSelecionado === 'mostrarGraficoPizza' || tipoGraficoSelecionado === 'mostrarGraficoBarraHorizontal')"
          label="Mostrar rótulos no gráfico?"
          ></v-switch>   
         <v-switch
          style="margin:10px"
          v-if="(tipoGraficoSelecionado === 'mostrarGraficoBarraHorizontal' || tipoGraficoSelecionado === 'mostrarGraficoLinha')"
          v-model="mostrarValoresZerados"
          label="Mostrar valores zerados?"
          ></v-switch>   
          <v-switch
            style="margin:10px"
            v-if="(tipoGraficoSelecionado === 'mostrarGraficoBarraHorizontal')"
            v-model="mostrarOrdenar"
            label="Ordenar por métrica?"
          ></v-switch> 
         <v-switch
          style="margin:10px"
          v-if="(tipoGraficoSelecionado === 'mostrarGraficoLinha')"
          v-model="snAcumulados"
          label="Mostrar dados acumulados"
          ></v-switch>        
               
          <v-card class="d-flex flex-row mb-6" flat tile v-for="metricaAAcumular in colunasMetricasSelecionadas" :key="metricaAAcumular.value">
            <v-checkbox :label="metricaAAcumular.text" v-model="metricaAAcumular.snAcumular" v-if="snAcumulados" >
            </v-checkbox>
          </v-card>       
      <v-btn-toggle v-if="mostrarOrdenar"
        
        color="primary"
        dense
        group
        multiple
      >          
          <v-btn v-if="ordenarCrescente" icon  @click="ordenarCrescente = !ordenarCrescente" color="primary"><v-icon >mdi-arrow-down-bold</v-icon></v-btn>  
          <v-btn v-if="!ordenarCrescente" icon @click="ordenarCrescente = !ordenarCrescente" color="primary"><v-icon >mdi-arrow-up-bold</v-icon></v-btn>    
      </v-btn-toggle>          
        
        </v-row>
        <p class="font-weight-light mb-0"><v-icon>mdi-head-lightbulb</v-icon> As dimensões do gráfico são as colunas não numéricas da tabela</p>
    </v-container>
    </v-card-actions>
    <v-card-text v-if='mostrarGrafico'>
      <v-card>
      <piechart :metric='metricas' :dimension='dimensoes' :metriclegend='legendas' 
        :mostrarRotulosNoGrafico='mostrarRotulosNoGrafico' :key="chartKey" 
        v-if='mostrarTipoGrafico.mostrarGraficoPizza'
        :type="tipoDonut? 'doughnut' : 'pie'"
        :height="140"/>
      <barchart :metric='metricas' :dimension='dimensoes' :metriclegend='legendas' :key="chartKey" 
        v-if='mostrarTipoGrafico.mostrarGraficoBarra'
        :height="140"/>
      <horizontalbarchart :metric='metricas' :dimension='dimensoes' :metriclegend='legendas' :key="chartKey" 
        v-if='mostrarTipoGrafico.mostrarGraficoBarraHorizontal' :mostrarRotulosNoGrafico='mostrarRotulosNoGrafico'
        :mostrarValoresZerados='mostrarValoresZerados'
        :mostrarOrdenar='mostrarOrdenar' :ordenarCrescente='ordenarCrescente'
        :height="140"/>
      <linechart :metrics='metricas' :dimension='dimensoes' :key="chartKey" v-if='mostrarTipoGrafico.mostrarGraficoLinha'
        :mostrarValoresZerados='mostrarValoresZerados' :height="140"/>
      <polarchart :metric='metricas' :dimension='dimensoes' :metriclegend='legendas' :key="chartKey" 
        v-if='mostrarTipoGrafico.mostrarGraficoPolar'
       :height="140"/>       
      <multiplebarchart :metrics='metricas' :dimensions='dimensoes' :metriclegends='legendas' :key="chartKey" 
        v-if='mostrarTipoGrafico.mostrarGraficoBarraMultiplo'
       :height="140"/>   
      </v-card>    
    </v-card-text>
  </v-card>
</template>

<script>
import PieChart from './PieChart.vue'
import BarChart from './BarChart.vue'
import HorizontalBarChart from './HorizontalBarChart.vue'
import LineChart from './LineChart.vue'
import PolarAreaChart from './PolarAreaChart.vue'
import MultipleMetricBarChart from './MultipleMetricBarChart.vue'
import  * as Helper from './HelperChart'


export default {
  data() {
    return {
      ordenarCrescente: true,
      mostrarOrdenar: false,
      mostrarValoresZerados: false,
      mostrarRotulosNoGrafico: false,
      tipoDonut: false,
      snTotal: false,
      snAcumulados: false,
      typeAlert: 'error',
      showAlert: false,
      alertMessage: '',
      metricas:[],
      dimensoes:[],  
      metricasSelecionadas:[],
      mostrarGrafico: false,
      chartKey: 1, //usado para forçar a renderização do gráfico
      tipoGraficoSelecionado: '',
      tiposGrafico: [
        {
          text: 'Barra',
          value: 'mostrarGraficoBarra',
        },
        {
          text: 'Barra Horizontal',
          value: 'mostrarGraficoBarraHorizontal',
        },
        {
          text: 'Linha',
          value: 'mostrarGraficoLinha',
        },
        {
          text: 'Pizza',
          value: 'mostrarGraficoPizza',
        }, 
        {
          text: 'Polar',
          value: 'mostrarGraficoPolar',
        },                              
      ],
      //tem um para cada tipo, para mostrar só um e esconder os outros de acordo com a seleção do tipo
      mostrarTipoGrafico: {
        mostrarGraficoBarra: false,
        mostrarGraficoBarraHorizontal: false,
        mostrarGraficoLinha: false,
        mostrarGraficoPizza: false,
        mostrarGraficoPolar: false,
        mostrarGraficoBarraMultiplo: false,
      },
      legendas:[],
    }
  },
  created () {
  },
  components: {
    'piechart': PieChart,
    'barchart': BarChart,
    'horizontalbarchart': HorizontalBarChart,
    'linechart': LineChart,
    'polarchart': PolarAreaChart,
    'multiplebarchart': MultipleMetricBarChart,  
  }, 
  props:['matrizDados', 'colunasMetricas', 'colunasDimensoes', 'metodoParaObterColuna'],
  watch: { 
      	snAcumulados: function(newVal, oldVal) { // watch it
          //console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        },
        tipoGraficoSelecionado: function(newVal, oldVal){
          this.snAcumulados = false
        }
  }  ,
  computed: {
    metriclegend(){
      var legenda = ''
      this.colunasMetricas.map(item => {
        if (item.value === this.metricasSelecionadas){
          legenda = item.text
        }
      })
      return legenda
    },
    colunasMetricasSelecionadas(){
      var itens = []
      this.colunasMetricas.map(colunaMetrica => {
        if (this.metricasSelecionadas.includes(colunaMetrica.value)){
          itens.push(colunaMetrica)
        }
      })
      return itens
    }
  },
  methods: {
    reset(){
        this.metricas = []
        this.dimensoes = []
        this.legendas = []
        this.metricasSelecionadas = []
        this.tipoGraficoSelecionado = []
        this.snAcumulados = false
        this.mostrarOrdenar = false
        this.mostrarTipoGrafico = {
          mostrarGraficoBarra: false,
          mostrarGraficoBarraHorizontal: false,
          mostrarGraficoLinha: false,
          mostrarGraficoPizza: false,
          mostrarGraficoPolar: false,
          mostrarGraficoBarraMultiplo: false,
        }
    },
    gerarGrafico(){
      try{
        //Esse passo tem que ser feito para o caso do usuário volta na tabela de 
        //dados e tirar alguma coluna ja selecionada como metrica. 
        if (this.metricasSelecionadas.length > 0){
          var metricasSelecionadasCorrigidas = []
          this.metricasSelecionadas.map(metricaSelecionada => {
            for (var colunaMetrica of this.colunasMetricas){
              if (colunaMetrica.value == metricaSelecionada){
                metricasSelecionadasCorrigidas.push(metricaSelecionada)
                break
              }
            }
          })
          this.metricasSelecionadas = metricasSelecionadasCorrigidas
        }

        validarSelecao(this.colunasMetricas, this.metricasSelecionadas, this.tipoGraficoSelecionado, this.colunasDimensoes, this)
        exibirGrafico(this.mostrarTipoGrafico, this.tipoGraficoSelecionado)
        
        displayMessage(this, false)
        this.metricas = []
        this.dimensoes = []
        this.legendas = []

        if (this.tipoGraficoSelecionado === 'mostrarGraficoLinha'){
          var {metricasCalculadas, dimensoesCalculadas} = Helper.gerarDadosParaGraficoEmLinha(this.matrizDados,this.colunasDimensoes, this.metricasSelecionadas, 
            this.colunasMetricas, this.snAcumulados, this.snTotal)
          this.metricas = metricasCalculadas
          this.dimensoes = dimensoesCalculadas
        }
        else if (this.metricasSelecionadas.length > 1){
          generateChartWithMultipleMetrics(this.mostrarTipoGrafico, this.colunasDimensoes, this.metricas, this.legendas, 
            this.matrizDados, this.dimensoes, this.metricasSelecionadas, this.colunasMetricas)
        }
        else{
          generateChartWithSingleMetric(this.matrizDados, this.metricas, this.colunasDimensoes, this.dimensoes, this.metricasSelecionadas,
            this.legendas, this.colunasMetricas)
        }

        //Para forçar renderização do gráfico depois de alguma alteração
        this.chartKey = this.chartKey + 1
        this.mostrarGrafico = true
      }
      catch (error){
        displayMessage(this, true, error, 'warning')
      }
    },
  },
}

function isItemPossuiMetricaAplicavel(colunasMetricas, item){
  colunasMetricas.map(colunaMetrica => {

  })
}

function generateChartWithMultipleMetrics(mostrarTipoGrafico, colunasDimensoes, metricas, legendas, matrizDados, dimensoes, 
  metricasSelecionadas, colunasMetricas){
    //console.log('generateChartWithMultipleMetrics')
  
  if (mostrarTipoGrafico.mostrarGraficoBarra){
    mostrarTipoGrafico.mostrarGraficoBarra = false
    mostrarTipoGrafico.mostrarGraficoBarraMultiplo = true
  }

  var metricsGroup = []
  metricasSelecionadas.map( () => metricsGroup.push([]))
  matrizDados.map((item, index) =>{
    metricasSelecionadas.map( (selectedMetric, index) => {
      metricsGroup[index].push(item[selectedMetric])
    })
    var itemDimension = ''
    colunasDimensoes.map(dimensoes => {
      if (item[dimensoes.value] != null){
        itemDimension += ' ' + item[dimensoes.value]
      }
    })
    dimensoes.push(itemDimension)
  })
  metricsGroup.map(metricGroup => {
    metricas.push(metricGroup)
  })

  colunasMetricas.map(item => {
    metricasSelecionadas.map(selectedMetric =>{
      if (item.value === selectedMetric){
        legendas.push(item.text)
      }
    })
  })
}

function generateChartWithSingleMetric(matrizDados, metricas, colunasDimensoes, dimensoes, metricasSelecionadas, legendas, colunasMetricas){
  colunasMetricas.map(item => {
    if (item.value === metricasSelecionadas[0]){
      legendas.push(item.text)
    }
  })

  matrizDados.map((item, index) =>{
    metricas.push(item[metricasSelecionadas[0]])
    var itemDimension = ''
    colunasDimensoes.map(dimensoes => {
      if (item[dimensoes.value] != null){
        itemDimension += ' ' + item[dimensoes.value]
      }
    })
    dimensoes.push(itemDimension)
  })  
}

function validarSelecao(colunasMetricas, metricasSelecionadas, tipoGraficoSelecionado, colunasDimensoes, owner){
  if (metricasSelecionadas.length == 0){
    throw 'Selecione uma métrica'
  }
  if (!tipoGraficoSelecionado){
    throw 'Selecione um tipo de gráfico'
  }   

  //Gráfico do tipo linha aceita multiplas métricas ou sem dimensão
  //As métricas só podem ser as que têm datas associadas
  //Aprovada, Matricula e Valor aprovado e a respectiva data tem que estar na tabela de dados
  if (tipoGraficoSelecionado === 'mostrarGraficoLinha'){
    validarSelecaoGraficoLinha(colunasMetricas, metricasSelecionadas, tipoGraficoSelecionado, colunasDimensoes, owner)
  }
  else if (metricasSelecionadas.length > 1 && tipoGraficoSelecionado !== 'mostrarGraficoBarra'){
    throw 'Seleção de mais de uma métrica só é possível no gráfico de barras'
  } 

}

function validarSelecaoGraficoLinha(colunasMetricas, metricasSelecionadas, tipoGraficoSelecionado, colunasDimensoes, owner){
  var dimensoesSelecionadas = []
  colunasDimensoes.map(dimensao => dimensoesSelecionadas.push(dimensao.value))

  //checa se as métricas selecionadas são as que têm data vinculada
    //e se os campos de data vinculado estao na tabela
    var todasAsMetricasTemDataVinculada = true
    for (var metricaSelecionada of metricasSelecionadas) {          
      var coluna = owner.metodoParaObterColuna(metricaSelecionada)
      if (!coluna.datavinculada){
        todasAsMetricasTemDataVinculada = false
        break
      }else{
        if (dimensoesSelecionadas.indexOf(coluna.datavinculada) == - 1){
          throw 'Coluna ' + owner.metodoParaObterColuna(coluna.datavinculada).text + ' deve estar selecionada em conjunto com a coluna ' + 
            coluna.text + 
            ' para geração do gráfico de linha'
        }
      }
    }
    if (!todasAsMetricasTemDataVinculada){
      throw 'Apenas colunas com datas associadas podem ser selecionadas para o gráfico de linha: aprovada, matricula ou valor aprovado'
    }

    
    //Caso mais de uma métrica esteja selecionada, nenhum campo de dimensão deve estar selecionados
    //na tabela de dados, pois as métricas serão as dimensões
    var temOutraDimensaoAlemDasDeTempo = false
    dimensoesSelecionadas.map(dimensao => {
      var coluna = owner.metodoParaObterColuna(dimensao)
      if (!coluna.colunatempo){
        temOutraDimensaoAlemDasDeTempo = true
      }
    })
    if (metricasSelecionadas.length > 1 && temOutraDimensaoAlemDasDeTempo){
        throw 'Além das métricas, selecione apenas as datas como colunas da tabela para gerar gráfico de linha com múltiplas métricas'    
    }
}

function exibirGrafico(mostrarTipoGrafico, tipoGraficoSelecionado){
  //Mostra o tipo de gráfico correto
  Object.keys(mostrarTipoGrafico).map(item => {
    if (item === tipoGraficoSelecionado){
      mostrarTipoGrafico[item] = true
    }
    else{
      mostrarTipoGrafico[item] = false
    }
  })
}

function displayMessage(owner, showAlert, message, tipo){
    owner.showAlert = showAlert
    owner.alertMessage = message
    owner.typeAlert = tipo
}
</script>