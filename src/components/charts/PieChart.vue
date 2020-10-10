<template>
  <div id="app">
    <canvas id="pie-chart" height="110"></canvas>
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
      //console.log('Metricas:', this.metric)
      //Calcula percentuais
      var total = 0
      this.metric.map(item => {
        total += item
      })
      this.metric.map((item, index) =>{
        this.percentuais[index] = item / total * 100
      })
      
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
        options: getOptions(this.mostrarRotulosNoGrafico, this.percentuais),
      })
    }
  }
}

//Opcoes de configuracao do gráfico
function getOptions(mostrarRotulosNoGrafico, percentuais){
  if (!mostrarRotulosNoGrafico){
    return {
      tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                  //se quiser colocar a legenda data.labels[tooltipItem.index]
                  var label =  
                    Helper.incluiSeparadorDeMilhar(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]) +
                    ' ( ' + percentuais[tooltipItem.index].toFixed(2) + '% )'
                  return label;
                }, 
            },
      },      
    }
  }
  return {
    events: [],
    tooltips: {
      enabled: false,
      custom: function(tooltipModel) {
        // Tooltip Element
        var tooltipEl = document.getElementById('chartjs-tooltip');

        // Create element on first render
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-tooltip';
            tooltipEl.innerHTML = '<table></table>';
            document.body.appendChild(tooltipEl);
        }                 
        tooltipEl.style.pointerEvents = 'none'
      }
    },    
    animation: {
      onComplete: function() {
        const chartInstance = this.chart, ctx = chartInstance.ctx;

        //Configurações de fonte dos labels / tooltip
        ctx.font = Chart.helpers.fontString(15,
              Chart.defaults.global.defaultFontStyle,
              Chart.defaults.global.defaultFontFamily
        )
        ctx.textAlign = "center"
        ctx.textBaseline = "bottom"
        ctx.fillStyle = "#606060"

        //datasets são os conjuntos de dados passados para geração do grático
        var datasets = this.data.datasets
      
        //percorre o conjunto de dados, mostrando os tooltips
        var x = 0
        var y = 0
        datasets.forEach(function(dataset, indexDataSet) {
          const meta = chartInstance.controller.getDatasetMeta(indexDataSet)
          meta.data.forEach(function(linha, index) {
            var label = dataset.data[index]
            label = Helper.incluiSeparadorDeMilhar(label) +  ' (' + percentuais[index].toFixed(2) + '%)'
            
            
            //Calcula posicao dos tooltips 
            var centerAngle = linha._model.startAngle + ((linha._model.endAngle - linha._model.startAngle) / 2),
            rangeFromCenter = (linha._model.outerRadius - linha._model.innerRadius) / 2 + linha._model.innerRadius;
            x = linha._model.x + (Math.cos(centerAngle) * rangeFromCenter);
            y = linha._model.y + (Math.sin(centerAngle) * rangeFromCenter);
            
            ctx.fillText(label, x, y)
            x += 10
            y += 10
          })
        })
      }
    },
  }  
}

</script>

