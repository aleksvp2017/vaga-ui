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
            <v-btn color="success" @click="gerarGrafico()">Gerar gráfico</v-btn>
          </v-flex>
        </v-layout>
        <p class="font-weight-light mb-0"><v-icon>mdi-head-lightbulb</v-icon> As dimensões do gráfico são as colunas não numéricas da tabela</p>
    </v-container>
    </v-card-actions>
    <v-card-text v-if='mostrarGrafico'>
      <v-card>
      <piechart :metric='metricas' :dimension='dimensoes' :metriclegend='legendas' :key="chartKey" v-if='mostrarTipoGrafico.mostrarGraficoPizza'
        :height="140"/>
      <barchart :metric='metricas' :dimension='dimensoes' :metriclegend='legendas' :key="chartKey" v-if='mostrarTipoGrafico.mostrarGraficoBarra'
        :height="140"/>
      <linechart :metrics='metricas' :dimension='dimensoes' :key="chartKey" v-if='mostrarTipoGrafico.mostrarGraficoLinha'
       :height="140"/>
      <polarchart :metric='metricas' :dimension='dimensoes' :metriclegend='legendas' :key="chartKey" v-if='mostrarTipoGrafico.mostrarGraficoPolar'
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
import LineChart from './LineChart.vue'
import PolarAreaChart from './PolarAreaChart.vue'
import MultipleMetricBarChart from './MultipleMetricBarChart.vue'


export default {
  data() {
    return {
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
        mostrarGraficoLinha: false,
        mostrarGraficoPizza: false,
        mostrarGraficoPolar: false,
        mostrarGraficoBarraMultiplo: false,
      },
      legendas:[],
    }
  },
  components: {
    'piechart': PieChart,
    'barchart': BarChart,
    'linechart': LineChart,
    'polarchart': PolarAreaChart,
    'multiplebarchart': MultipleMetricBarChart,
  }, 
  props:['matrizDados', 'colunasMetricas', 'colunasDimensoes'],
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
    dimensoesTemporais(){
      var item = []
      this.colunasDimensoes.map(dimensao)
      return intervalos
    }
  },
  methods: {
    gerarGrafico(){
      try{
        validaSelecao(this.metricasSelecionadas, this.tipoGraficoSelecionado, this.colunasDimensoes)
        exibirGrafico(this.mostrarTipoGrafico, this.tipoGraficoSelecionado)
        
        displayMessage(this, false)
        this.metricas = []
        this.dimensoes = []
        this.legendas = []

        if (this.metricasSelecionadas.length > 1){
          generateChartWithMultipleMetrics(this.mostrarTipoGrafico, this.colunasDimensoes, this.metricas, this.legendas, 
            this.matrizDados, this.dimensoes, this.metricasSelecionadas, this.colunasMetricas)
        }
        else if (this.tipoGraficoSelecionado === 'mostrarGraficoLinha'){
          this.gerarDadosParaGraficoEmLinha()
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
    gerarDadosParaGraficoEmLinha(){
      var anosMeses = gerarAnosMesesOrdenados(this.matrizDados)

      var dadosOrganizados = []
      this.matrizDados.map(item => {
        var legenda = ''
        this.colunasDimensoes.map(dimensoes => {
            if (item[dimensoes.value] && !dimensoes.colunatempo){
              legenda += ' ' + item[dimensoes.value]
            }
        })

        var legandaJaPreenchida = false
        if (dadosOrganizados.length > 0){
          dadosOrganizados.map(itemMetric => {
            if (itemMetric.legenda === legenda){
              legandaJaPreenchida = true
              itemMetric.dados.push({
                valor: item[this.metricasSelecionadas[0]],
                ano: item.ano,
                mes: item.mes,
              })
            } 
          })
        }
        if (!legandaJaPreenchida){
          dadosOrganizados.push({legenda, 
            dados: [
              {
                valor: item[this.metricasSelecionadas[0]],
                ano: item.ano,
                mes: item.mes,
              }
            ]})
        }

      })

      anosMeses.map(anoMes => {
        this.dimensoes.push(anoMes.mes + '/' + anoMes.ano)  
        dadosOrganizados.map(dadoOrganizado => {
          
          var dado = dadoOrganizado.dados.find(dadoValor => {
            return dadoValor.ano == anoMes.ano && dadoValor.mes == anoMes.mes
          })

          var itemEncontrado = this.metricas.find(metrica => {
            return dadoOrganizado.legenda === metrica.legenda
          })
          if (!itemEncontrado){
            this.metricas.push({
              legenda: dadoOrganizado.legenda,
              dados: [dado? dado.valor : null]
            })
          }
          else{
            itemEncontrado.dados.push(dado? dado.valor : null)
          }
        })
      })

      var total = {
        legenda: 'Total',
        dados: []
      }
      this.metricas.map(metrica => {
        metrica.dados.map((dado, index) =>{
          if (total.dados.length < (index+1)){
            total.dados.push(dado)
          }
          else{
            total.dados[index] += dado
          }
          
        })
      })

      this.metricas.push(total)
    }
  },
}

function gerarAnosMesesOrdenados(matrizDados){
  var anosMeses = []
  matrizDados.map(item => {
    var achou = false
    anosMeses.map(anoMes => {
      if (anoMes.mes === item.mes && anoMes.ano == item.ano){
        achou = true
      }
    })
    if (!achou){
      anosMeses.push({mes:item.mes, ano: item.ano})
    }
  })

  anosMeses.sort((anoMesA, anoMesB) => {
    if (anoMesA.ano > anoMesB.ano) return 1
    if (anoMesA.ano < anoMesB.ano) return -1
    if (anoMesA.mes > anoMesB.ano) return 1
    if (anoMesA.mes < anoMesB.mes) return -1
    return 0
  })
  
  return anosMeses
}

function generateChartWithMultipleMetrics(mostrarTipoGrafico, colunasDimensoes, metricas, legendas, matrizDados, dimensoes, 
  metricasSelecionadas, colunasMetricas){
  
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

function validaSelecao(metricasSelecionadas, tipoGraficoSelecionado, colunasDimensoes){
      if (metricasSelecionadas.length == 0){
        throw 'Selecione uma métrica'
      }
      if (!tipoGraficoSelecionado){
        throw 'Selecione um tipo de gráfico'
      }   
      if (metricasSelecionadas.length > 1 && tipoGraficoSelecionado !== 'mostrarGraficoBarra'){
        throw 'Seleção de mais de uma métrica só é possível no gráfico de barras'
      } 
      var dimensoesSelecionadas = []
      colunasDimensoes.map(dimensao => dimensoesSelecionadas.push(dimensao.value))
      if (tipoGraficoSelecionado === 'mostrarGraficoLinha' &&
        (dimensoesSelecionadas.indexOf('ano') == -1 || dimensoesSelecionadas.indexOf('mes') == -1)){
        throw 'Selecione apenas ano e mês como colunas da tabela para gerar gráfico de linha'
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