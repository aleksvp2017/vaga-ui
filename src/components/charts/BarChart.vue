<script>
import { Bar } from 'vue-chartjs'

export default {
  props:['metric', 'dimension', 'metriclegend'],
  options:{},
  extends: Bar,
  computed: {
    backgroundColor(){
      var color = []
      var red = 0
      var green = 0
      var blue = 0
      var cores = []
      this.dimension.map(item => {
          red = getRandomInt(0,256)
          green = getRandomInt(0,256)
          blue = getRandomInt(0,256)
          var cor = {red, green, blue}
          for (;(cores.indexOf(cor) != -1);){
            red = getRandomInt(0,256)
            green = getRandomInt(0,256)
            blue = getRandomInt(0,256)
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


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
</script>
