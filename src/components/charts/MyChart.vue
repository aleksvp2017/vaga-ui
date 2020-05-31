<template>
    <v-card>
    <v-alert :type="typeAlert" dense text dismissible v-model="showAlert">
            {{alertMessage}}
    </v-alert> 
    <v-card-actions>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex xs2>
            <v-select
                v-model="selectedMetric"
                :items="metrics"
                label="Métrica"
            ></v-select>
          </v-flex>
          <v-flex xs2>
            <v-select
                v-model="chartType"
                :items="chartTypes"
                label="Tipo de gráfico"
            ></v-select>
          </v-flex>         
          <v-flex xs2>
            <v-btn color="success" @click="generateChart()">Gerar gráfico</v-btn>
          </v-flex>
        </v-layout>
        
        <p class="font-weight-light"><v-icon>mdi-head-lightbulb</v-icon> As dimensões do gráfico são as colunas não numéricas da tabela</p>
    </v-container>
    </v-card-actions>
    <v-card-text v-if='showChart'>
      <piechart :metric='metric' :dimension='dimension' :metriclegend='metriclegend' :key="chartKey" v-if='showTypeBar.showPie'
        height="200"/>
      <barchart :metric='metric' :dimension='dimension' :metriclegend='metriclegend' :key="chartKey" v-if='showTypeBar.showBar'
        height="200"/>
      <linechart :metric='metric' :dimension='dimension' :metriclegend='metriclegend' :key="chartKey" v-if='showTypeBar.showLine'
       height="200"/>
      <polarchart :metric='metric' :dimension='dimension' :metriclegend='metriclegend' :key="chartKey" v-if='showTypeBar.showPolar'
       height="200"/>       
    </v-card-text>
  </v-card>
</template>

<script>
import PieChart from './PieChart.vue'
import BarChart from './BarChart.vue'
import LineChart from './LineChart.vue'
import PolarAreaChart from './PolarAreaChart.vue'


export default {
  data() {
    return {
      typeAlert: 'error',
      showAlert: false,
      alertMessage: '',
      metric:[],
      dimension:[],  
      metriclegend:'',
      selectedMetric:'',
      selectedDimension:'',
      showChart: false,
      chartKey: 1,
      chartType: '',
      chartTypes: [
        {
          text: 'Barra',
          value: 'showBar',
        },
        {
          text: 'Linha',
          value: 'showLine',
        },
        {
          text: 'Pizza',
          value: 'showPie',
        }, 
        {
          text: 'Polar',
          value: 'showPolar',
        },                        
      ],
      showTypeBar: {
        showBar: false,
        showLine: false,
        showPie: false,
        showPolar: false,
      },
    }
  },
  components: {
    'piechart': PieChart,
    'barchart': BarChart,
    'linechart': LineChart,
    'polarchart': PolarAreaChart,
  }, 
  props:['items', 'metrics', 'dimensions'],
  methods: {
    generateChart(){
      if (!this.selectedMetric){
        displayMessage(this, true, 'Selecione uma métrica', 'warning')
        return
      }
      if (!this.chartType){
        displayMessage(this, true, 'Selecione um tipo de gráfico', 'warning')
        return
      }    
      Object.keys(this.showTypeBar).map(item => {
        if (item === this.chartType){
          this.showTypeBar[item] = true
        }
        else{
          this.showTypeBar[item] = false
        }
      })
      /*if (!this.selectedDimension){
        displayMessage(this, true, 'Selecione uma dimensão', 'warning')
        return
      }*/
      displayMessage(this, false)
      this.metric = []
      this.dimension = []
      this.items.map((item, index) =>{
        this.metric.push(item[this.selectedMetric])
        var itemDimension = ''
        this.dimensions.map(dimension => {
          itemDimension += ' ' + item[dimension.value]
        })
        this.dimension.push(itemDimension)
      })
      this.chartKey = this.chartKey + 1
      this.showChart = true
    }
  },
}

function displayMessage(owner, showAlert, message, tipo){
    owner.showAlert = showAlert
    owner.alertMessage = message
    owner.typeAlert = tipo
}
</script>
