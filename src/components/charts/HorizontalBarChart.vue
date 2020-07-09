<script>
import { HorizontalBar } from 'vue-chartjs'
import  * as Helper from './HelperChart'

export default {
  props:['metric', 'dimension', 'metriclegend'],
  extends: HorizontalBar,
  computed: {
    backgroundColor(){
      var color = []
      var red = 0
      var green = 0
      var blue = 0
      var cores = []
      this.dimension.map(item => {
          red = Helper.generateRandomInt(0,256)
          green = Helper.generateRandomInt(0,256)
          blue = Helper.generateRandomInt(0,256)
          var cor = {red, green, blue}
          for (;(cores.indexOf(cor) != -1);){
            red = Helper.generateRandomInt(0,256)
            green = Helper.generateRandomInt(0,256)
            blue = Helper.generateRandomInt(0,256)
            cor = {red, green, blue}
          }
          cores.push(cor)
          color.push(`rgba(${cor.red}, ${cor.green}, ${cor.blue}, 0.2)`)
      })
      return color
    },
    borderColor(){
      return this.backgroundColor
    }    
  },
  mounted () {
    var metricaFormatada = []
    this.metric.map(item => metricaFormatada.push(parseInt(item).toLocaleString()))
    console.log(metricaFormatada)

    this.renderChart({
        labels: this.dimension,      
        datasets: [{
            label: this.metriclegend,
            data: this.metric,
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            borderWidth: 1
        }]
    }, getOptions(this.metriclegend))
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
              callback: Helper.incluiSeparadorDeMilhar
          },
        }]
      }
  }
}


</script>
