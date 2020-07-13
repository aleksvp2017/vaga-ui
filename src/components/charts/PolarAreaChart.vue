<script>
import { PolarArea } from 'vue-chartjs'
import  * as Helper from './HelperChart'

export default {
  props:['metric', 'dimension', 'metriclegend'],
  extends: PolarArea,
  mounted () {
    this.renderChart({
        labels: this.dimension,
        datasets: [{
            label: this.metriclegend,
            data: this.metric,
            backgroundColor: Helper.backgroundColor(this.dimension),
            borderColor: Helper.borderColor(this.dimension),
            borderWidth: 1
        }]
    }, getOptions())
  }
}

function getOptions(){
  return {
      scales: {
          ticks: {
              //callback: Helper.incluiSeparadorDeMilhar,
              max: 500,
              min: 0,
              stepSize: 50              
          },
      }
  }
}

</script>
