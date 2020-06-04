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
              v-model="selectedMetrics"
              :items="metrics"
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
                v-model="selectedChartTypes"
                :items="chartTypes"
                label="Tipo de gráfico"
            ></v-select>
          </v-flex>         
          <v-flex xs2 >
            <v-btn color="success" @click="generateChart()">Gerar gráfico</v-btn>
          </v-flex>
        </v-layout>
        <p class="font-weight-light mb-0"><v-icon>mdi-head-lightbulb</v-icon> As dimensões do gráfico são as colunas não numéricas da tabela</p>
    </v-container>
    </v-card-actions>
    <v-card-text v-if='showChart' >
      <piechart :metric='metric' :dimension='dimension' :metriclegend='metriclegends' :key="chartKey" v-if='showTypeChart.showPie'
        :height="140"/>
      <barchart :metric='metric' :dimension='dimension' :metriclegend='metriclegends' :key="chartKey" v-if='showTypeChart.showBar'
        :height="140"/>
      <linechart :metric='metric' :dimension='dimension' :metriclegend='metriclegends' :key="chartKey" v-if='showTypeChart.showLine'
       :height="140"/>
      <polarchart :metric='metric' :dimension='dimension' :metriclegend='metriclegends' :key="chartKey" v-if='showTypeChart.showPolar'
       :height="140"/>       
      <multiplebarchart :metrics='metric' :dimensions='dimension' :metriclegends='metriclegends' :key="chartKey" 
        v-if='showTypeChart.showMultiple'
       :height="140"/>       
    </v-card-text>
  </v-card>
</template>

<script>
import PieChart from './PieChart.vue'
import BarChart from './BarChart.vue'
import LineChart from './LineChart.vue'
import PolarAreaChart from './PolarAreaChart.vue'
import MultipleMetricBarChar from './MultipleMetricBarChart.vue'


export default {
  data() {
    return {
      typeAlert: 'error',
      showAlert: false,
      alertMessage: '',
      metric:[],
      dimension:[],  
      selectedMetrics:[],
      selectedDimension:'',
      showChart: false,
      chartKey: 1,
      selectedChartTypes: '',
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
      showTypeChart: {
        showBar: false,
        showLine: false,
        showPie: false,
        showPolar: false,
        showMultiple: false,
      },
      metriclegends:[],
    }
  },
  components: {
    'piechart': PieChart,
    'barchart': BarChart,
    'linechart': LineChart,
    'polarchart': PolarAreaChart,
    'multiplebarchart': MultipleMetricBarChar,
  }, 
  props:['items', 'metrics', 'dimensions'],
  computed: {
    metriclegend(){
      var legenda = ''
      this.metrics.map(item => {
        if (item.value === this.selectedMetrics){
          legenda = item.text
        }
      })
      return legenda
    }
  },
  methods: {
    generateChart(){
      try{
        validaSelecao(this.selectedMetrics, this.selectedChartTypes)
        exibirGrafico(this.showTypeChart, this.selectedChartTypes)
        
        displayMessage(this, false)
        this.metric = []
        this.dimension = []
        this.metriclegends = []

        if (this.selectedMetrics.length > 1){
          generateChartWithMultipleMetrics(this.showTypeChart, this.dimensions, this.metric, this.metriclegends, this.items,
            this.dimension, this.selectedMetrics, this.metrics)
            console.log('M:',this.metric)
            console.log('L:', this.metriclegends)
        }
        else{
          generateChartWithSingleMetric(this.items, this.metric, this.dimensions, this.dimension, this.selectedMetrics,
            this.metriclegends, this.metrics)
        }
        //Para forçar renderização do gráfico depois de alguma alteração
        this.chartKey = this.chartKey + 1
        this.showChart = true
      }
      catch (error){
        displayMessage(this, true, error, 'warning')
      }

      
    }
  },
}

function generateChartWithMultipleMetrics(showTypeChart, dimensions, metric, metriclegends, items, dimension, 
  selectedMetrics, metrics){
  showTypeChart.showBar = false
  showTypeChart.showMultiple = true
  var metricsGroup = []
  selectedMetrics.map( () => metricsGroup.push([]))
  items.map((item, index) =>{
    selectedMetrics.map( (selectedMetric, index) => {
      metricsGroup[index].push(item[selectedMetric])
    })
    //this.metric.push(item[this.selectedMetrics])
    var itemDimension = ''
    dimensions.map(dimension => {
      if (item[dimension.value] != null){
        itemDimension += ' ' + item[dimension.value]
      }
    })
    dimension.push(itemDimension)
  })
  metricsGroup.map(metricGroup => {
    metric.push(metricGroup)
  })
  console.log('MetricsGroup:', metric)

  metrics.map(item => {
    selectedMetrics.map(selectedMetric =>{
      if (item.value === selectedMetric){
        metriclegends.push(item.text)
      }
    })
  })
  console.log('MetricsLegends:', metriclegends)
}

function generateChartWithSingleMetric(items, metric, dimensions, dimension, selectedMetrics, metriclegends, metrics){
  metrics.map(item => {
    if (item.value === selectedMetrics[0]){
      metriclegends.push(item.text)
    }
  })

  items.map((item, index) =>{
    metric.push(item[selectedMetrics[0]])
    var itemDimension = ''
    dimensions.map(dimension => {
      if (item[dimension.value] != null){
        itemDimension += ' ' + item[dimension.value]
      }
    })
    dimension.push(itemDimension)
  })  
}

function validaSelecao(selectedMetrics, selectedChartTypes){
      if (selectedMetrics.length == 0){
        throw 'Selecione uma métrica'
      }
      if (!selectedChartTypes){
        throw 'Selecione um tipo de gráfico'
      }   
      if (selectedMetrics.length > 1 && selectedChartTypes !== 'showBar'){
        throw 'Seleção de mais de uma métrica só é possível no gráfico de barras'
      }  
}

function exibirGrafico(showTypeChart, selectedChartTypes){
  //Mostra o tipo de gráfico correto
  Object.keys(showTypeChart).map(item => {
    if (item === selectedChartTypes){
      showTypeChart[item] = true
    }
    else{
      showTypeChart[item] = false
    }
  })
}

function displayMessage(owner, showAlert, message, tipo){
    owner.showAlert = showAlert
    owner.alertMessage = message
    owner.typeAlert = tipo
}
</script>