<template>
  <div id="app">
    <canvas id="pie-chart" height="110"></canvas>
     </v-card>
  </div>
</template>

<script>
  import  * as Helper from './HelperChart'
  import Chart from 'chart.js'

  export default {
  data() {
    return {
      percentuais: []
    }
  },
  props:['metric', 'dimension', 'metriclegend', 'type', 'mostrarRotulosNoGrafico'],
  mounted() {
    this.createChart('pie-chart');
  },
  methods: {
    createChart(chartId) {
      var total = 0
      this.metric.map(item => {
        total += item
      })
      this.metric.map((item, index) =>{
        this.percentuais[index] = item / total * 100
      })
      
      if (!this.mostrarRotulosNoGrafico){
        Chart.pluginService.unregister(Helper.pluginParaMostrarRotulos)
      }
      else{ 
        Chart.pluginService.register(Helper.pluginParaMostrarRotulos)
      }

      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: this.type,
        data: {
          labels: this.dimension,
          datasets: [{
              label: this.metriclegend,
              data: this.metric,
              backgroundColor: Helper.backgroundColor(this.dimension),
              borderColor: Helper.borderColor(this.dimension),
              borderWidth: 1
          }]
        },
        options: getOptions(this.percentuais),
      })
      myChart.chart.$plugins = []
    }
  }
}

function getOptions(percentuais){
  return {
    showAllTooltips: true,
    tooltips: {
      callbacks: {
          label: function(tooltipItem, data) {
            var label = data.labels[tooltipItem.index] + ': ' +
              Helper.incluiSeparadorDeMilhar(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]) +
              ' ( ' + percentuais[tooltipItem.index].toFixed(2) + '% )'
            return label;
          }, 
      },
    },   
  }
}

</script>

