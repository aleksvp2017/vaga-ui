<template>
  <div id="app">
    <canvas id="horizontal-bar-chart" height="110"></canvas>
  </div>
</template>

<script>
  import  * as Helper from './HelperChart'
  import Chart from 'chart.js'

  export default {
  props:['metric', 'dimension', 'metriclegend'],
  mounted() {
    // console.log('Metric:', this.dimension)
    // if (!isNaN(this.dimension[0])){
    //   console.log(' É numero')
    //   var dimensaoOrdenada = this.dimension.slice(0)
    //   var metricaOrdenada = this.metricaOrdenada.slice(0)
    //   var teveTroca = true
    //   while (teveTroca){

    //   }
      
      
    // }

    this.createChart('horizontal-bar-chart');
  },
  methods: {
    createChart(chartId) {
      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: this.dimension,
          datasets: [{
              //barPercentage: 0.1,
              //categoryPercentage: 0.1,
              //barThickness: 10,
              label: this.metriclegend,
              data: this.metric,
              backgroundColor: Helper.backgroundColor(this.dimension),
              borderColor: Helper.borderColor(this.dimension),
              borderWidth: 1
          }]
        },
        options: getOptions(this.metriclegend),
      })
    }
  }
}

function getOptions(title){
  return {
      legend: {
        display: false
      },  
      title: {
        display: true,
        position: 'top',
        fontSize: 18,
        text: title
      },
      scales: {
        xAxes: [{
          ticks: {
              callback: Helper.incluiSeparadorDeMilhar,
              beginAtZero: true
          },
        }],
        yAxes: [{
            ticks: {
            }          
        }]
      },
      events: [],
      animation: {
        onComplete: function() {
          const chartInstance = this.chart, ctx = chartInstance.ctx;

          //Configurações de fonte dos labels / tooltip
          ctx.font = Chart.helpers.fontString(18,
                Chart.defaults.global.defaultFontStyle,
                Chart.defaults.global.defaultFontFamily
          )
          ctx.textAlign = "center"
          ctx.textBaseline = "bottom"
          ctx.fillStyle = "#606060"

          //datasets são os conjuntos de dados passados para geração do grático
          var datasets = this.data.datasets
          
          //percorre o conjunto de dados, mostrando os tooltips
          datasets.forEach(function(dataset, indexDataSet) {
            const meta = chartInstance.controller.getDatasetMeta(indexDataSet)
            meta.data.forEach(function(linha, index) {
              var label = dataset.data[index];
              label = Helper.incluiSeparadorDeMilhar(label)
              ctx.fillText(label, linha._model.x-60, 
              linha._model.y);
            })
          })
        }
      },      
  }
}

</script>

<style scoped>
</style>
