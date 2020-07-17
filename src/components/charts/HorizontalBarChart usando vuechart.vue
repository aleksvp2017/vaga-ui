<script>
import { HorizontalBar } from 'vue-chartjs'
import  * as Helper from './HelperChart'

export default {
  props:['metric', 'dimension', 'metriclegend'],
  extends: HorizontalBar,  
  mounted () {
    var metricaFormatada = []
    this.metric.map(item => metricaFormatada.push(parseInt(item).toLocaleString()))
    console.log(metricaFormatada)

    this.renderChart({
        labels: this.dimension,      
        datasets: [{
            label: this.metriclegend,
            data: this.metric,
            backgroundColor: Helper.backgroundColor(this.dimension),
            borderColor: Helper.borderColor(this.dimension),
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
