function incluiSeparadorDeMilhar(value) {
    if (isNaN(value)){
      return value
    }
    else{
      return parseInt( value ).toLocaleString()
    }
}

function generateColor(){
    var red = generateRandomInt(0,256)
    var green = generateRandomInt(0,256)
    var blue = generateRandomInt(0,256)
    var cor = {red, green, blue}
    return `rgba(${cor.red}, ${cor.green}, ${cor.blue}, 0.2)`
  }

function generateRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function backgroundColor(dimension){
  var color = []
  var red = 0
  var green = 0
  var blue = 0
  var cores = []
  dimension.map(item => {
      red = generateRandomInt(0,256)
      green = generateRandomInt(0,256)
      blue = generateRandomInt(0,256)
      var cor = {red, green, blue}
      for (;(cores.indexOf(cor) != -1);){
        red = generateRandomInt(0,256)
        green = generateRandomInt(0,256)
        blue = generateRandomInt(0,256)
        cor = {red, green, blue}
      }
      cores.push(cor)
      color.push(`rgba(${cor.red}, ${cor.green}, ${cor.blue}, 0.2)`)
  })
  return color
}

function borderColor(dimension){
  return backgroundColor(dimension)
} 

const pluginParaMostrarRotulos = {
  beforeRender: function (chart) {
    if (chart.config.options.showAllTooltips) {
        // create an array of tooltips
        // we can't use the chart tooltip because there is only one tooltip per chart
        chart.pluginTooltips = [];
        chart.config.data.datasets.forEach(function (dataset, i) {
          chart.getDatasetMeta(i).data.forEach(function (sector, j) {
            chart.pluginTooltips.push(new Chart.Tooltip({
              _chart: chart.chart,
              _chartInstance: chart,
              _data: chart.data,
              _options: chart.options.tooltips,
              _active: [sector]
            }, chart));
          });
        });
        // turn off normal tooltips
        chart.options.tooltips.enabled = false;        
    }
  },
  afterDraw: function (chart, easing) {
      if (chart.config.options.showAllTooltips) {
        // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
        if (!chart.allTooltipsOnce) {
          if (easing !== 1)
            return;
          chart.allTooltipsOnce = true;
        }

        // turn on tooltips
        chart.options.tooltips.enabled = true;
        Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
          tooltip.initialize();
          tooltip.update();
          // we don't actually need this since we are not animating tooltips
          tooltip.pivot();
          tooltip.transition(easing).draw();
        });
        chart.options.tooltips.enabled = false;
      }
    },
}

export {
    incluiSeparadorDeMilhar, generateRandomInt, generateColor, backgroundColor, borderColor,
    pluginParaMostrarRotulos
}