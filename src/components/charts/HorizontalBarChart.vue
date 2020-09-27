<template>
  <div id="app">
    <canvas id="horizontal-bar-chart" height="110"></canvas>
  </div>
</template>

<script>
  import  * as Helper from './HelperChart'
  import Chart from 'chart.js'

  export default {
  props:['metric', 'dimension', 'metriclegend', 'mostrarRotulosNoGrafico', 'mostrarValorezZerados', 'mostrarValoresZerados',
    'ordenarCrescente', 'mostrarOrdenar'],
  mounted() {
    var metricas = this.metric
    var dimensoes = this.dimension
    if (!this.mostrarValoresZerados){
      var {dimensoesSemValoresZerados, metricasSemValoresZerados} = retirarValoresZerados(this.dimension, this.metric)
      metricas = metricasSemValoresZerados
      dimensoes = dimensoesSemValoresZerados
    }
    if (this.mostrarOrdenar){
      ordenarPorMetrica(dimensoes, metricas, this.ordenarCrescente)  
    }
    else{
      ordenarPorDimensao(dimensoes, metricas)
    }
    this.createChart('horizontal-bar-chart', metricas, dimensoes);
  },
  methods: {
    createChart(chartId, metricas, dimensoes) {
      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: dimensoes,
          datasets: [{
              //barPercentage: 0.1,
              //categoryPercentage: 0.1,
              //barThickness: 10,
              label: this.metriclegend,
              data: metricas,
              backgroundColor: Helper.backgroundColor(dimensoes),
              borderColor: Helper.borderColor(dimensoes),
              borderWidth: 1
          }]
        },
        options: getOptions(this.metriclegend, this.mostrarRotulosNoGrafico),
      })
    }
  }
}


function retirarValoresZerados(dimension, metric){
  var dimensoesSemValoresZerados = []
  var metricasSemValoresZerados = []
  metric.map((metrica, index) => {
    if (metrica && parseInt(metrica) !== 0){
      metricasSemValoresZerados.push(metrica)
      dimensoesSemValoresZerados.push(dimension[index])
    }
  })
  return {dimensoesSemValoresZerados, metricasSemValoresZerados}
}

//Caso a dimensão seja numérica, a exemplo do ano, ordena por ela
function ordenarPorMetrica(dimension, metric, ordemCrescente){
  var teveTroca = true
  while (teveTroca){
    teveTroca = false
    metric.map((item, index) => {
      //troca valor com o proximo, se for o caso, até o tamanho do vetor      
      if ((index+1) < metric.length){
        let numero1 = parseInt(item)
        let numero2 = parseInt(metric[index+1])
        var condicao = numero1 < numero2
        if (!ordemCrescente){
          condicao = numero1 > numero2
        }
        if (condicao){
          teveTroca = true
          //faz a troca na dimensao e na metrica correspondente
          metric[index] = numero2
          metric[index+1] = numero1
          let dimensaoTemporaria = dimension[index]
          dimension[index] = dimension[index+1]
          dimension[index+1] = dimensaoTemporaria           
        }
      }
    })
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

function getOptions(title, mostrarRotulosNoGrafico){
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
      animation: getAnimation(mostrarRotulosNoGrafico)     
  }
}

function getAnimation(mostrarRotulosNoGrafico){
  if (mostrarRotulosNoGrafico){
    return {onComplete: function() {
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
              // console.log('X (' + label + '):', linha._model.x)
              // console.log(linha._model.x)
              var x = linha._model.x > 200 ? linha._model.x - 60 : linha._model.x
              ctx.fillText(label, x, 
              linha._model.y+10);
            })
          })
        }
    }
  }
  return {}
}

</script>

<style scoped>
</style>
