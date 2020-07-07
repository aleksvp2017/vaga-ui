<script>
import { Bar } from 'vue-chartjs'

export default {
  props:['metrics', 'dimensions', 'metriclegends'],
  options:{
    width: 100,
    height: 100,
  },
  extends: Bar,
  mounted () {
    console.log(' Metrics:', this.metrics,
    ' Dimensions:', this.dimensions, ' Metriclegends:', this.metriclegends)
    var datasets = []
    var colors = []
    //para cada item da legenda, gerar um vetor com o mesmo tamanho da metric tendo como todos elementos a mesma cor
    //de modo que cada metrica, nas diferentes dimensoes, tenha a mesma cor
    this.metriclegends.map( (item, index) => {
      var colorGroup = []
      var color = generateColor()
      this.metrics[index].map(() => colorGroup.push(color))
      colors.push(colorGroup)
    })

    this.metrics.map((metric, index) => {
      datasets.push({
        label: this.metriclegends[index],
        data: metric.slice(0),
        backgroundColor: colors[index],
        borderColor: colors[index],
        borderWidth: 1,
      })
    })

    this.renderChart({
        labels: this.dimensions,
        datasets: datasets,
    }, this.options)
  }
}

function generateColor(){
  var red = getRandomInt(0,256)
  var green = getRandomInt(0,256)
  var blue = getRandomInt(0,256)
  var cor = {red, green, blue}
  return `rgba(${cor.red}, ${cor.green}, ${cor.blue}, 0.2)`
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
</script>
