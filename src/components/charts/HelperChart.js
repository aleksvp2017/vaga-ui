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

function gerarDadosParaGraficoEmLinha(matrizDados, colunasDimensoes, metricasSelecionadas, colunasMetricas, snAcumulados, snTotal){
  /*console.log('matrizDados', matrizDados)
  console.log('colunasMetricas', colunasMetricas)
  console.log('metricasSelecionadas', metricasSelecionadas)
  console.log('colunasDimensoes', colunasDimensoes)*/
  var metricas = []
  var dimensoes = []  
  
  //monta vetor de objetos únicos de ano e mês
  var anosMeses = gerarAnosMesesOrdenados(matrizDados)

  var dadosFormatadosPorLegendaValoresPorMesAno = montarDadosFormatadosPorLegendaValoresPorMesAno(matrizDados, 
    colunasDimensoes, metricasSelecionadas, colunasMetricas)
  //console.log('dadosFormatadosPorLegendaValoresPorMesAno', dadosFormatadosPorLegendaValoresPorMesAno)

  //percore o vetor com o par <ano, mês> procurando por dados correspondentes para montar
  //o conjunto de dados
  anosMeses.map(anoMes => {
    //console.log('Procurando por ' + anoMes.mes + '/' + anoMes.ano)
    dimensoes.push(anoMes.mes + '/' + anoMes.ano)  
    dadosFormatadosPorLegendaValoresPorMesAno.map(dadoOrganizado => {
      var dado = dadoOrganizado.dados.find(dadoValor => {
        //console.log(dadoValor)
        return dadoValor.ano == anoMes.ano && dadoValor.mes == anoMes.mes
      })
      //console.log('Dado valor:', dado)

      var itemEncontrado = metricas.find(metrica => {
        return dadoOrganizado.legenda === metrica.legenda
      })
      if (!itemEncontrado){
        metricas.push({
          legenda: dadoOrganizado.legenda,
          dados: [dado? dado.valor : null]
        })
      }
      else{
        itemEncontrado.dados.push(dado? dado.valor : null)
      }
    })
  })

  //Soma o total por par <ano, mes>
  if (snAcumulados){        
    acumularDados(metricas, colunasMetricas)
  }
  if (snTotal){
    metricas.push(calcularTotal(metricas))
  } 
  
  //console.log(metricas)
  //console.log(dimensoes)

  return {metricasCalculadas: metricas, dimensoesCalculadas: dimensoes}
}

function gerarAnosMesesOrdenados(matrizDados){

  var anosMeses = []

   matrizDados.map(item => {
    var achou = false

    if (item.dataaprovacao){
      var ano = obterAno(item.dataaprovacao)
      var mes = obterMes(item.dataaprovacao)

      //checa data de aprovacao
      anosMeses.map(anoMes => {
        if (anoMes.mes === mes && anoMes.ano == ano){
          achou = true
        }
      })
      if (!achou){
        anosMeses.push({mes:mes, ano: ano})
      }
    }

    //checa data de matrícula
    if (item.datamatricula){
      var ano = obterAno(item.datamatricula)
      var mes = obterMes(item.datamatricula)

      anosMeses.map(anoMes => {
        if (anoMes.mes === mes && anoMes.ano == ano){
          achou = true
        }
      })
      if (!achou){
        anosMeses.push({mes:mes, ano: ano})
      }
    }

  })
  
  anosMeses.sort((anoMesA, anoMesB) => {
    if (anoMesA.ano > anoMesB.ano) return 1
    if (anoMesA.ano < anoMesB.ano) return -1
    if (anoMesA.mes > anoMesB.ano) return 1
    if (anoMesA.mes < anoMesB.mes) return -1
    return 0
  })

  return anosMeses
}

function montarDadosFormatadosPorLegendaValoresPorMesAno(matrizDados, colunasDimensoes, 
  metricasSelecionadas, colunasMetricas){
  /*console.log('====>>>>> matrizDados',matrizDados)
  console.log('colunasDimensoes',colunasDimensoes)
  console.log('metricasSelecionadas',metricasSelecionadas)
  console.log('colunasMetricas',colunasMetricas)*/
  var dadosFormatadosPorLegendaValoresPorMesAno = []

  var dimensoesNaoTemporais = []
  colunasDimensoes.map(coluna => !coluna.colunatempo? dimensoesNaoTemporais.push(coluna): '')
  console.log('dimensoesNaoTemporais', dimensoesNaoTemporais)
  if (!dimensoesNaoTemporais || dimensoesNaoTemporais.length === 0){

    matrizDados.map((item, index) => {
      metricasSelecionadas.map(metricaSelecionada => {
        //Pega o texto da métrica selecionada
        var legenda = ''
        //console.log('Metrica selecionada:', metricaSelecionada)
        colunasMetricas.map(colunaMetrica => {
          if (metricaSelecionada.toUpperCase() === colunaMetrica.value.toUpperCase()){
            legenda = colunaMetrica.text
          }
        })            
      
        var legandaJaPreenchida = false
        if (dadosFormatadosPorLegendaValoresPorMesAno.length > 0){
          dadosFormatadosPorLegendaValoresPorMesAno.map(itemMetric => {
            if (itemMetric.legenda.toUpperCase() === legenda.toUpperCase()){
              legandaJaPreenchida = true
              if (item.dataaprovacao && (metricaSelecionada.toUpperCase() == 'APROVADA' || 
            metricaSelecionada.toUpperCase() == 'APROVADAMAISCONTRAPARTIDA')){
                itemMetric.dados.push({
                  valor: item[metricaSelecionada],
                  ano: obterAno(item.dataaprovacao),
                  mes: obterMes(item.dataaprovacao),
                })
              }
              if (item.datamatricula && metricaSelecionada.toUpperCase() == 'MATRICULA'){
                itemMetric.dados.push({
                  valor: item[metricaSelecionada],
                  ano: obterAno(item.datamatricula),
                  mes: obterMes(item.datamatricula),
                })  
              }
            } 
          })
        }

        //se nao tiver, inclui no vetor
        if (!legandaJaPreenchida){
          if (item.dataaprovacao && (metricaSelecionada.toUpperCase() == 'APROVADA' || 
            metricaSelecionada.toUpperCase() == 'APROVADAMAISCONTRAPARTIDA')){
            dadosFormatadosPorLegendaValoresPorMesAno.push({legenda, 
              dados: [
                {
                  valor: item[metricaSelecionada],
                  ano: obterAno(item.dataaprovacao),
                  mes: obterMes(item.dataaprovacao),
                }
              ]})            
          }
          if (item.datamatricula && metricaSelecionada.toUpperCase() == 'MATRICULA'){
            dadosFormatadosPorLegendaValoresPorMesAno.push({legenda, 
              dados: [
                {
                  valor: item[metricaSelecionada],
                  ano: obterAno(item.datamatricula),
                  mes: obterMes(item.datamatricula),
                }
              ]})             
          }

        }
      })
    })

    // dadosFormatadosPorLegendaValoresPorMesAno = [
    //   {
    //     legenda: 'Aprovadas',
    //     dados:[
    //       {
    //         valor: 78841,
    //         ano: 2019,
    //         mes: '12'
    //       },
    //       {
    //         valor: 115701,
    //         ano: 2020,
    //         mes: '04'
    //       },
    //       {
    //         valor: 184621,
    //         ano: 2020,
    //         mes: '05'
    //       }            
    //     ]
    //   },
    //   {
    //     legenda: 'Matrículas',
    //     dados:[
    //       {
    //         valor: 8133,
    //         ano: 2019,
    //         mes: '12'
    //       },
    //       {
    //         valor: 14071,
    //         ano: 2020,
    //         mes: '04'
    //       },
    //       {
    //         valor: 42811,
    //         ano: 2020,
    //         mes: '05'

    //       } ,
    //       {
    //         valor: 84755,
    //         ano: 2020,
    //         mes: '06'                     
    //       }
    //     ]
    //   }      
    // ]
  }
  else{
    //percorre a matriz de dados, que veio da tabela, para organizar os dados
    matrizDados.map(item => {
      //monta a legenda de acordo com as colunas de dimensão da tabela, ou seja,
      //os campos que não são nem somáveis nem de tempo
      var legenda = ''
      dimensoesNaoTemporais.map(dimensoes => {
          if (item[dimensoes.value] && !dimensoes.colunatempo){
            legenda += ' ' + item[dimensoes.value]
          }
      })
      

      //verificia se já tem objeto com essa legenda no vetor
      var legandaJaPreenchida = false
      if (dadosFormatadosPorLegendaValoresPorMesAno.length > 0){
        dadosFormatadosPorLegendaValoresPorMesAno.map(itemMetric => {
          if (itemMetric.legenda === legenda){
            legandaJaPreenchida = true

            if (item.dataaprovacao){
              itemMetric.dados.push({
                valor: item[metricasSelecionadas[0]],
                ano: obterAno(item.dataaprovacao),
                mes: obterMes(item.dataaprovacao),
              })
            }
            if (item.datamatricula){
              itemMetric.dados.push({
                valor: item[metricasSelecionadas[0]],
                ano: obterAno(item.datamatricula),
                mes: obterMes(item.datamatricula),
              })
            }
 
          } 
        })
      }

      //se nao tiver, inclui no vetor
      if (!legandaJaPreenchida){
        //Essa checagem é feita porque o usuário pode não ter filtrado os dados corretamente
        //É preciso eliminar dados que não se refiram à métrica em questão
        if (item.dataaprovacao && colunasMetricas.filter(colunaMetrica => colunaMetrica.text.indexOf('APROVA') > -1).length > 0){
            dadosFormatadosPorLegendaValoresPorMesAno.push({legenda, 
              dados: [
                {
                  valor: item[metricasSelecionadas[0]],
                  ano: obterAno(item.dataaprovacao),
                  mes: obterMes(item.dataaprovacao),
                }
              ]})
        }
        if (item.datamatricula && colunasMetricas.filter(colunaMetrica => colunaMetrica.text.indexOf('MATRI') > -1).length > 0){
            dadosFormatadosPorLegendaValoresPorMesAno.push({legenda, 
              dados: [
                {
                  valor: item[metricasSelecionadas[0]],
                  ano: obterAno(item.datamatricula),
                  mes: obterMes(item.datamatricula),
                }
              ]})              
        }
      }
    })
  }
  return dadosFormatadosPorLegendaValoresPorMesAno
}

function obterAno(data){
  if (data.length === 10){
    return data.substring(6)
  }
  return data.substring(3)
}

function obterMes(data){
  if (data.length === 10){
    return data.substring(3,5)
  }
  return data.substring(0,2)

}

function acumularDados(metricas, colunasMetricas){
  //console.log('Colunas metricas:', colunasMetricas)
  //console.log('Metricas', metricas)
  metricas.map(metrica => {
    var snAcumular = false
    colunasMetricas.map(colunaMetrica => {
      if ((colunaMetrica.text === metrica.legenda || colunasMetricas.length == 1) && colunaMetrica.snAcumular){
        snAcumular = true
      }
    })
    if (snAcumular){
      metrica.dados.map((dado, index) =>{
        if (index > 0){
          if (dado === null){
            dado = 0
          }
          metrica.dados[index] = parseFloat(dado) + parseFloat(metrica.dados[index-1])
        }
      })
    }
  })
}

function calcularTotal(metricas){
  var total = {
    legenda: 'Total',
    dados: []
  }
  metricas.map(metrica => {
    metrica.dados.map((dado, index) =>{
      if (total.dados.length < (index+1)){
        total.dados.push(dado)
      }
      else{
        total.dados[index] = parseInt(total.dados[index]) + parseInt(dado)
      }
      
    })
  })
  return total
}

export {
    incluiSeparadorDeMilhar, generateRandomInt, generateColor, backgroundColor, borderColor,
    pluginParaMostrarRotulos, gerarDadosParaGraficoEmLinha,
}