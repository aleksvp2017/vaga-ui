<template>
    <div>
        <v-alert :type="typeAlert" dense text dismissible v-model="showAlert">
            {{alertMessage}}
        </v-alert>          
      <linechart :metrics='metricas' :dimension='dimensoes' :key="chartKey"
        :mostrarValoresZerados='false' :height="140"/>
    </div>
</template>

<script>
import LineChart from '../../components/charts/LineChart.vue'
import * as Vagas from '../../services/Vagas.js'
import {ERROR_SESSION_EXPIRED} from '../../services/Constantes.js'
import  * as Helper from '../../components/charts/HelperChart'

const COLUNAS_METRICAS = ["APROVADAMAISCONTRAPARTIDA","MATRICULA"]
const COLUNAS_DIMENSOES = ["DATAAPROVACAO","DATAMATRICULA"]
const COLUNAS_A_ACUMULAR_DADOS = ["APROVADAMAISCONTRAPARTIDA"]
const INCLUIR_TOTAL = false

export default {
    components: {
      'linechart': LineChart,
    }, 
  data() {
    return {
        showAlert: false,
        alertMessage: '',
        typeAlert: 'success',            
        itens:[],  
        colunasMetricas: [],   
        colunasDimensoes: [], 
        metricas: [],
        dimensoes: [],   
        chartKey: 1, //usado para forçar a renderização do gráfico
    }
  },
    created () {
        //Obtém as colunas necessárias para gerar o gráfico
        //Já coloca indicação de qual coluna acumular
        Vagas.listarColunas().then((response) => {
            response.body.colunas.map(coluna => {
                if (COLUNAS_METRICAS.includes(coluna.nome.toUpperCase())){
                    this.colunasMetricas.push({...coluna, text:coluna.nome, value: coluna.nomeColunaBanco,
                        snAcumular: (COLUNAS_A_ACUMULAR_DADOS.includes(coluna.nome.toUpperCase()))})
                }
                if (COLUNAS_DIMENSOES.includes(coluna.nome.toUpperCase())){
                    this.colunasDimensoes.push({...coluna, text:coluna.nome, value: coluna.nomeColunaBanco})
                }
            })

            //Obtém os dados, de acordo com as colunas --não tem filtro mesmo
            //Já formata a data para mes e ano
            Vagas.listarVagas([...this.colunasMetricas, ...this.colunasDimensoes], []).then((response) => {
                this.itens = response.body.vagas
                this.itens = this.itens.map(vaga => 
                    ({...vaga,dataaprovacao:vaga.dataaprovacao?vaga.dataaprovacao.substring(3):''}))    
                this.itens = this.itens.map(vaga => 
                    ({...vaga,datamatricula:vaga.datamatricula?vaga.datamatricula.substring(3):''}))     

                this.itens = this.itens.map(item => ({...item, valoraprovado:parseFloat(item.valoraprovado),
                    aprovadamaiscontrapartida:parseInt(item.aprovadamaiscontrapartida),
                    aprovada:parseInt(item.aprovada),
                    matricula:parseInt(item.matricula)}))         
                    
                //Formata os dados para geração do gráfico em linha
                var {metricasCalculadas, dimensoesCalculadas} = Helper.gerarDadosParaGraficoEmLinha(this.itens,this.colunasDimensoes, 
                    COLUNAS_METRICAS.map(coluna => coluna.toLowerCase()), 
                    this.colunasMetricas, COLUNAS_A_ACUMULAR_DADOS.length > 0, INCLUIR_TOTAL)
                this.metricas = metricasCalculadas
                this.dimensoes = dimensoesCalculadas    
                this.chartKey = this.chartKey + 1                

            }).catch(error => {
                displayMessage(this, true, error.body.error, 'error')
                if (error.status === ERROR_SESSION_EXPIRED){
                    this.$store.dispatch('ActionLogout')
                }     
            })
        }).catch(error => {
            displayMessage(this, true, error.body.error, 'error')
            if (error.status === ERROR_SESSION_EXPIRED){
                this.$store.dispatch('ActionLogout')
            }     
        })
    }, 
  methods: {
  },    
}

function displayMessage(owner, showAlert, message, type){
    owner.showAlert = showAlert
    owner.alertMessage = message
    owner.typeAlert = type
}

function displayMessagePopup(owner, showAlert, message, type){
    owner.showAlertPopup = showAlert
    owner.alertMessagePopup = message
    owner.typeAlertPopup = type
}


</script>