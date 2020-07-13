<template>
  <div id="app">
    <canvas id="pie-chart" height="110"></canvas>
     </v-card>
  </div>
</template>

<script>
  import  * as Helper from './HelperChart'
  import Chart from 'chart.js'

  // Chart.pluginService.register({
  //   beforeRender: function (chart) {
  //     console.log('Antes de renderizar')
  //     if (chart.config.options.showAllTooltips) {
  //       console.log('Aqui')
  //         // create an array of tooltips
	// 				// we can't use the chart tooltip because there is only one tooltip per chart
	// 				chart.pluginTooltips = [];
	// 				chart.config.data.datasets.forEach(function (dataset, i) {
	// 					chart.getDatasetMeta(i).data.forEach(function (sector, j) {
	// 						chart.pluginTooltips.push(new Chart.Tooltip({
	// 							_chart: chart.chart,
	// 							_chartInstance: chart,
	// 							_data: chart.data,
	// 							_options: chart.options.tooltips,
	// 							_active: [sector]
	// 						}, chart));
	// 					});
	// 				});
	// 				// turn off normal tooltips
  //         chart.options.tooltips.enabled = false;        
  //         console.log('passou')
  //     }
  //   },
  //   afterDraw: function (chart, easing) {
  //       console.log('afterdraw')
	// 			if (chart.config.options.showAllTooltips) {
	// 				// we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
	// 				if (!chart.allTooltipsOnce) {
	// 					if (easing !== 1)
	// 						return;
	// 					chart.allTooltipsOnce = true;
	// 				}

	// 				// turn on tooltips
	// 				chart.options.tooltips.enabled = true;
	// 				Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
	// 					tooltip.initialize();
	// 					tooltip.update();
	// 					// we don't actually need this since we are not animating tooltips
	// 					tooltip.pivot();
	// 					tooltip.transition(easing).draw();
	// 				});
	// 				chart.options.tooltips.enabled = false;
	// 			}
	// 		}
  // })


  export default {
  props:['metric', 'dimension', 'metriclegend', 'type'],
  mounted() {
    this.createChart('pie-chart');
  },
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
  methods: {
    createChart(chartId) {
      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: this.type,
        data: {
          labels: this.dimension,
          datasets: [{
              label: this.metriclegend,
              data: this.metric,
              backgroundColor: this.backgroundColor,
              borderColor: this.borderColor,
              borderWidth: 1
          }]
        },
        options: getOptions(),
      });
    }
  }
}

function getOptions(){
  return {
    events: false,
    animation:{
      duration: 0,
      onComplete : function(){
          console.log('oi!')
var self = this;

                var elementsArray = [];
                Chart.helpers.each(self.data.datasets, function (dataset, datasetIndex) {
                    Chart.helpers.each(dataset.metaData, function (element, index) {
                        var tooltip = new Chart.Tooltip({
                            _chart: self.chart,
                            _data: self.data,
                            _options: self.options,
                            _active: [element]
                        }, self);

                        tooltip.update();
                        tooltip.transition(Chart.helpers.easingEffects.linear).draw();
                    }, self);
                }, self);          
      }
    }
  }
}

</script>

