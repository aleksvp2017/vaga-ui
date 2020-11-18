<template>
<v-card>
  <v-tabs
    v-model="selectedTab"
    background-color="white"
    color="indigo darken-2">
    <v-tab v-for="tab in tabs" :key="tab.nome" >
      {{tab.nome}}
    </v-tab>

    <v-tab-item v-for="tab in tabs" :key="tab.nome" >
      <div class="text-center d-flex pb-4">
        <v-btn @click="expandirTodos" icon><v-icon>mdi-arrow-down-bold</v-icon></v-btn>
        <v-btn @click="recolherTodos" icon><v-icon>mdi-arrow-up-bold</v-icon></v-btn>
    </div>
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel v-for="topico in tab.topicos" :key="topico.nome">
          <v-expansion-panel-header>
            <span style="color:#00264d;font-weight:bold">{{topico.nome}}</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ul v-if="!topico.tabelar">
              <li v-for="item in topico.itens" :key="item.nome">
                <span v-if="!item.link">{{item.nome}}</span>
                <a v-if="item.link" :href="item.nome">{{item.nome}}</a>
                <ul v-if="item.subitens">
                  <li v-for="subitem in item.subitens" :key="subitem">{{subitem}}</li>
                </ul>
              </li>
            </ul>
            <table v-if="topico.tabelar">
              <tr v-if="topico.header">
                <th v-for="header in topico.header" :key="header">
                  {{header}}
                </th>
              </tr>
              <tr v-for="(item,index) in topico.itens" :key="index">
                <td v-for="subitem in item.subitens" :key="subitem">
                  {{subitem}}
                </td>
              </tr>
            </table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-tab-item>
  </v-tabs>
  
</v-card>

</template>

<script>
import { listarProjetos } from './Projetos.js'

export default {
  data() {
      return {
        selectedTab: '',
        panel:[],
        tabs: [],
      }
  },
  created () {
    this.tabs = listarProjetos()
  },
  methods: {
    // Create an array the length of our items
    // with all values as true
    expandirTodos () {
      this.panel = []
      this.tabs[this.selectedTab].topicos.map((topico, index) => {
        this.panel.push(index)
      })
    },
    // Reset the panel
    recolherTodos () {
      this.panel = []
    },
  },
}
</script>

<style scoped>
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f2;}

tr:hover {background-color: #ddd;}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #3399ff;
  color: white;
}
</style>