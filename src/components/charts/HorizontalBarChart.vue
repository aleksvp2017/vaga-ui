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
    ordenarPorDimensao(this.dimension, this.metric)
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

//Caso a dimensão seja numérica, a exemplo do ano, ordena por ela
function ordenarPorDimensao(dimension, metric){
    if (isTodosValoresNumericos(dimension)){
      var teveTroca = true
      while (teveTroca){
        teveTroca = false
        dimension.map((item, index) => {
          //troca valor com o proximo, se for o caso, até o tamanho do vetor
          if ((index+1) < dimension.length){
            let numero1 = parseInt(item)
            let numero2 = parseInt(dimension[index+1])
            if (numero1 < numero2){
              teveTroca = true
              //faz a troca na dimensao e na metrica correspondente
              dimension[index] = numero2
              dimension[index+1] = numero1
              let metricaTemporaria = metric[index]
              metric[index] = metric[index+1]
              metric[index+1] = metricaTemporaria           
            }
          }
        })
      }
    }  
}


function isTodosValoresNumericos(vetor){
  let snTodosNumericos = true
  vetor.map(valor => {
    if (isNaN(valor)){
      snTodosNumericos = false
    }
  })
  return snTodosNumericos
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
