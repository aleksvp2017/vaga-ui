<script>
import { Bar } from 'vue-chartjs'

export default {
  props:['metric', 'dimension', 'metriclegend'],
  options:{
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    }    
  },
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
      color = []
      color.push('cornflowerblue', 'darkolivegreen', 'goldenrod','cornflowerblue', 'darkolivegreen', 'goldenrod','cornflowerblue', 'darkolivegreen', 'goldenrod','cornflowerblue', 'darkolivegreen', 'goldenrod','cornflowerblue', 'darkolivegreen', 'goldenrod','cornflowerblue', 'darkolivegreen', 'goldenrod')
      return color
    },
    borderColor(){
      return this.backgroundColor
    }    
  },
  mounted () {
    this.renderChart({
        labels: ['DF', 'MG','PA'],
        datasets: [{
            label: 'Aprovada',
            data: [100,200,300],
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            borderWidth: 1,
            stack: 'aleks'
        },
        {
            label: 'Homologada',
            data: [100,80,200],
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            borderWidth: 1,
            stack: 'aleksander'
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
