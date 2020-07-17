<script>
import { Line} from 'vue-chartjs'
import  * as Helper from './HelperChart'

export default {
  props:['dimension', 'metrics'],  
  extends: Line,
  mounted () {
      var datasets = []
      this.metrics.map(metric => {
        datasets.push({
            label: metric.legenda,
            data: metric.dados,
            fill: false,
            borderColor: Helper.generateColor(),
            borderWidth: 4
        })
      })

      this.renderChart({
        labels: this.dimension,
        datasets: datasets,
        // [
        // {
        //     label: 'Total',
        //     // 78841
        //     data: [39000, 115701, 184621, 248533],
        //     fill: false,
        //     borderColor: '#84E900',
        //     borderWidth: 2
        // },  
        // {
        //     label: 'Rede Federal',
        //     data: [40064, 53264, 122184, 182186],
        //     fill: false,
        //     borderColor: '#0000FF',
        //     borderWidth: 2
        // },
        // {
        //     label: 'Estados, DF, Municípios',
        //     data: [38777, 62437, 62437, 66347],
        //     fill: false,
        //     borderColor: '#FFAE42',
        //     borderWidth: 2
        // }]
    }, getOptions())
  }
}

//Opcoes de configuracao do gráfico
function getOptions(){
  return {
  //para desabilitar resposta a eventos (flick no gráfico)
  events: [],
  animation: {
    onComplete: function() {
      const chartInstance = this.chart, ctx = chartInstance.ctx;

      //Configurações de fonte dos labels / tooltip
      ctx.font = Chart.helpers.fontString(18,
            Chart.defaults.global.defaultFontStyle,
            Chart.defaults.global.defaultFontFamily
      )
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"
      ctx.fillStyle = "#606060"

      //datasets são os conjuntos de dados passados para geração do grático
      var datasets = this.data.datasets
      //monta vetor com a posicao de todos os pontos das linhas e o percorre
      //comparando e deslocando quando for o caso
      var vetorCoordenadas = montaVetorComCoordenadasDosPontos(chartInstance.controller, datasets) 
      percorreVetorDeslocandoPontosProximos(vetorCoordenadas)
    
      //percorre o conjunto de dados, mostrando os tooltips
      datasets.forEach(function(dataset, indexDataSet) {
        const meta = chartInstance.controller.getDatasetMeta(indexDataSet)
        meta.data.forEach(function(linha, index) {
          var label = dataset.data[index];
          label = Helper.incluiSeparadorDeMilhar(label)
          //cor do tooltip/label
          let deslocamentoHorizontal = calculaDeslocamentoHorizontalDoLabel(index, meta.data.length)
          let deslocamentoVertical = obterDeslocamento(vetorCoordenadas, indexDataSet, index)
          ctx.fillText(label, linha._model.x - deslocamentoHorizontal, 
          linha._model.y - deslocamentoVertical);
        })
      })
    }
  },
  tooltips: {
     enabled: false,
  },
  // responsive: true,
  scales: {
    xAxes: [
      {            
    }],
    yAxes: [
      {
        display: true,
        gridLines: {
          drawOnChartArea: true
        },
        ticks: {
          precision: 0,
          callback: Helper.incluiSeparadorDeMilhar
        }
      }
    ]}  
  }  
}

//Retorna o deslocamento de um elemento, encontrando pela linha e coluna
function obterDeslocamento(vetoCoordenadas, linha, coluna){
  var deslocamentoObtido = ESPACAMENTOS_GRAFICO.afastamentoVerticalLabelLinha
  vetoCoordenadas.map(deslocamento => {
    if (deslocamento.linha === linha && deslocamento.coluna === coluna){
      deslocamentoObtido = deslocamento.deslocamento
    }
  })
  return deslocamentoObtido
}

const ESPACAMENTOS_GRAFICO = {
  afastamentoVerticalMinimoEntreLabels: 8,
  afastamentoVerticalLabelLinha: 8,
  distanciaVerticalDesprezivelEntreLabels: 20,
  deslocamentoHorizontalPrimeiroElemento: -40,
  deslocamentoHorizontalUltimoElemento: 20
}

//Ajusta deslocamento horizontal para que labels não fiquem fora do gráfico, no começo e no fim
function calculaDeslocamentoHorizontalDoLabel(index, total){
  var deslocamentoHorizontal = ESPACAMENTOS_GRAFICO.afastamentoVerticalLabelLinha
  if (index === 0){
    deslocamentoHorizontal = ESPACAMENTOS_GRAFICO.deslocamentoHorizontalPrimeiroElemento
  }
  else if ((index + 1) === total){
    deslocamentoHorizontal = ESPACAMENTOS_GRAFICO.deslocamentoHorizontalUltimoElemento
  }
  return deslocamentoHorizontal
}

//A partir dos conjuntos de dados, monta vetor com posicao e deslocamento dos pontos
function montaVetorComCoordenadasDosPontos(controlador, matriz){
  var vetorCoordenadas = []
  //percorre a matriz com os dados, cada elemento são pontos da linha
  matriz.forEach((linha, indicelinha) => {
    const metaDadoDaLinha = controlador.getDatasetMeta(indicelinha)
    metaDadoDaLinha.data.forEach((pontoDaLinha, indiceDoPonto) => {
      const label = linha.data[indiceDoPonto]   
      vetorCoordenadas.push({
        label,
        deslocamento: ESPACAMENTOS_GRAFICO.afastamentoVerticalLabelLinha,
        y: pontoDaLinha._model.y,
        linha: indicelinha,
        coluna: indiceDoPonto,
        x: pontoDaLinha._model.x
      })
    })
  })
  return vetorCoordenadas
}

function percorreVetorDeslocandoPontosProximos(vetorCoordenadas){
  var achouPontosProximos = false
  vetorCoordenadas.forEach(item => {
    ajustaPosicaoItem(item, vetorCoordenadas)
  })
}

function ajustaPosicaoItem(item, vetorCoordenadas){
  vetorCoordenadas.forEach(itemVetor => {
    if (item !== itemVetor &&
          item.x === itemVetor.x &&
          isPontosProximos(item.y, itemVetor.y)){
            if ((item.y + item.deslocamento) < (itemVetor.y + item.deslocamento)){
              item.deslocamento += (ESPACAMENTOS_GRAFICO.afastamentoVerticalMinimoEntreLabels - ESPACAMENTOS_GRAFICO.afastamentoVerticalLabelLinha)
              itemVetor.deslocamento -= (ESPACAMENTOS_GRAFICO.afastamentoVerticalMinimoEntreLabels + ESPACAMENTOS_GRAFICO.afastamentoVerticalLabelLinha)
            }
            else{
              item.deslocamento -= (ESPACAMENTOS_GRAFICO.afastamentoVerticalMinimoEntreLabels + ESPACAMENTOS_GRAFICO.afastamentoVerticalLabelLinha)
              itemVetor.deslocamento += (ESPACAMENTOS_GRAFICO.afastamentoVerticalMinimoEntreLabels - ESPACAMENTOS_GRAFICO.afastamentoVerticalLabelLinha)
            }
          }
  })
}

function isPontosProximos(pontoA, pontoB){
  if (Math.abs(pontoA - pontoB) <= ESPACAMENTOS_GRAFICO.distanciaVerticalDesprezivelEntreLabels){
    return true
  }
  return false
}




</script>
