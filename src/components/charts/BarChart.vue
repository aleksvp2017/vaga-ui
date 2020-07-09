<script>
import { Bar } from 'vue-chartjs'
import  * as Helper from './HelperChart'

export default {
  props:['metric', 'dimension', 'metriclegend'],
  options:{
    width: 100,
    height: 100,
  },
  extends: Bar,
  computed: {
    backgroundColor(){
      return Helper.generateColor()
    },
    borderColor(){
      return this.backgroundColor
    }    
  },
  mounted () {
    this.renderChart({
        labels: this.dimension,
        datasets: [{
            label: this.metriclegend,
            data: this.metric,
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            borderWidth: 1
        }]
    }, this.options)
  }
}

</script>
