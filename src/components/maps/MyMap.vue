<template>
    <v-card>
        <v-alert :type="typeAlert" dense text dismissible v-model="showAlert">
                {{alertMessage}}
        </v-alert> 
        <v-card-actions>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs2>
                    <v-select
                        v-model="selectedMetric"
                        :items="metrics"
                        label="Métrica"
                    ></v-select>
                </v-flex>
                <v-flex xs2 class="mr-12">
                    <v-btn color="success" @click="generateMap()">Gerar mapa</v-btn>
                </v-flex>
                <v-flex v-if='showMap' class="ml-12">
                    <MyMap
                    :key="mapkey"
                    :countryData="stateData"
                    highColor="#ff0000"
                    lowColor="#aaaaaa"
                    countryStrokeColor="#909090"
                    defaultCountryFillColor="#dadada"
                    />            
                </v-flex>
            </v-layout>
        </v-container>
        </v-card-actions>
        <v-card-text  class="mx-12">
            
        </v-card-text>
    </v-card>        


</template>

<script>

import MyMap from '../../views/map/MyMap'

export default {
    components: {
        'MyMap': MyMap,
    },
    props:['metrics', 'items'],
    data() {
        return {
            stateData: {},
            typeAlert: 'error',
            showAlert: false,
            alertMessage: '',
            metric:[],
            dimension:[],  
            metriclegend:'',
            selectedMetric:'',
            selectedDimension:'',
            showMap: false,
            mapKey: 1,
        }
    },
    methods: {
    generateMap(){
      if (!this.selectedMetric){
        displayMessage(this, true, 'Selecione uma métrica', 'warning')
        return
      }
      var metricsPorUF = []
      this.items.map(item => {
          var metricUF = metricsPorUF.filter(metricPorUF => metricPorUF.uf === item.uf)
          if (metricUF.length === 0){
              metricUF = {
                  uf: item.uf,
                  metric: item[this.selectedMetric]
              }
              metricsPorUF.push(metricUF)
          }
          else{
              metricUF = metricUF[0]
              metricUF.metric =  metricUF.metric + item[this.selectedMetric]
          }
      })
      this.stateData = {}
      metricsPorUF.map(item => this.stateData['BR-' + item.uf] = item.metric)
      this.showMap = true
      this.mapKey = this.mapKey + 1
    }
  },
}

function displayMessage(owner, showAlert, message, tipo){
    owner.showAlert = showAlert
    owner.alertMessage = message
    owner.typeAlert = tipo
}
</script>