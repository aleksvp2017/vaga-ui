<template>
   <v-tabs v-model="abaSelecionada"
      background-color="white"
      color="indigo darken-2"
      >
      <v-tab>Consulta</v-tab>
      <v-tab>Resultado</v-tab>
      <v-tab>Gráficos</v-tab>
      <v-tab>Mapa</v-tab>
      <v-tab-item key="consulta">
          
        <v-card>
            <v-card-actions >
                <v-btn color="success" dark class="ma-2" @click="gerarRelatorio">Gerar relatório</v-btn>
                <v-btn color="success" dark class="ma-2" @click="limpar">Limpar</v-btn>
                
                <v-dialog v-model="dialogSalvarConsulta" max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="success" dark class="ma-2" v-on="on" @click="initiateDialogSalvarConsulta">Salvar consulta</v-btn>
                    </template>                 
                    <v-card>
                        <v-card-text>
                            <v-alert :type="typeAlertPopup" dense text dismissible v-model="showAlertPopup">
                                {{alertMessagePopup}}
                            </v-alert>                            
                            <v-text-field
                                v-model="consultaPainel.nome"
                                label="Nome da consulta"
                                class="mx-4"
                            ></v-text-field>                                          
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="salvarConsulta">Salvar</v-btn>
                        <v-btn color="blue darken-1" text @click="closedialogSalvarConsulta">Fechar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>                
                <v-btn class="ma-2" @click="adicionarFiltro" disabled>Excluir consulta</v-btn>
                <v-btn class="ma-2" @click="adicionarFiltro" disabled>Compartilhar consulta</v-btn>
            </v-card-actions>
            <v-alert :type="typeAlert" dense text dismissible v-model="showAlert">
                {{alertMessage}}
            </v-alert>   
            <v-row no-gutters >   
                <!-- COLUNAS -->   
                <v-col cols="4" >
                    <v-card class="mx-auto" max-width="600" outlined>
                        <v-card-title class="justify-center">
                            Colunas
                            <!--<v-icon small @click="explicacao()">mdi-help-circle-outline</v-icon>-->
                        </v-card-title>                        
                        <v-text-field
                            v-model="chave"
                            label="Procure as colunas pelo nome..."
                            class="mx-4"
                        ></v-text-field>                        
                        <v-data-table
                            :search="chave"
                            v-model="colunasSelecionadas"
                            class="elevation-1"
                            :headers="header"
                            :items="colunas"
                            show-select
                            item-key="id"
                            >
                        </v-data-table>        
                    </v-card>
                </v-col>
                <!-- FILTROS -->
                <v-col cols="4">
                    <v-card class="mx-auto" width="600" outlined>
                        <v-card-title class="justify-center">
                            Filtros
                        </v-card-title>                         
                        <v-data-table
                            v-model="filtrosSelecionados"
                            class="elevation-1"
                            :headers="headerFiltros"
                            :items="filtros"
                            show-select
                            item-key="nome"
                            >
                            <template #item.operador="{item}">
                                <v-edit-dialog
                                    :return-value="item.operador"
                                    @save="salvarFiltro(item)"
                                    @cancel="cancelarEdicaoFiltro"
                                    @open="editarFiltro"
                                    @close="fecharEdicaoFiltro"
                                    large 
                                    > {{ item.operador }}
                                    <template v-slot:input>
                                        <v-select
                                            :disabled="editDisabled"
                                            v-model="item.operador"
                                            :items="operadores"
                                            label=""
                                        ></v-select>                                    
                                    </template>
                                </v-edit-dialog>
                            </template>                             
                            <template #item.valor="{item}">
                                <v-edit-dialog
                                    :return-value.sync="item.valor"
                                    @save="salvarFiltro(item)"
                                    @cancel="cancelarEdicaoFiltro"
                                    @open="editarFiltro"
                                    @close="fecharEdicaoFiltro"
                                    large
                                    > {{ item.valor }}
                                    <template v-slot:input>
                                        <v-text-field :disabled="editDisabled"
                                        v-model="item.valor"
                                        label="Edit"
                                        single-line
                                        counter
                                        ></v-text-field>
                                    </template>
                                </v-edit-dialog>
                            </template>  
                        </v-data-table>    
                        <v-card-actions>
                            <v-btn color="success" small outlined dark class="ma-2" @click="adicionarFiltro">Adicionar</v-btn>
                            <v-btn color="success" small outlined dark class="ma-2" @click="excluirFiltro">Excluir </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <!-- COLUNAS PARA SAIDA RELATORIO -->
                <v-col cols="4">
                    <v-card class="mx-1" width="600" outlined>
                        <v-card-title class="justify-center">
                            Saídas
                        </v-card-title> 
                       <!-- TABELA COM LINHAS ARRASTAVEIS 
                       <v-simple-table dense class="mx-1">
                            <thead>
                            <tr class="elevation-1 px-1">
                                <th class="px-1">
                                     <v-checkbox v-model="todasSaidas"></v-checkbox>
                                </th>
                                <th class="px-1">Colunas para relatório</th>
                            </tr>
                            </thead>
                            <tbody id="dragTable" class="px-0 mx-0">
                                <tr 
                                    v-for="item in saidas" 
                                    :key="item.id" 
                                    class=" sortableRow sortHandle handle px-0 mx-0"
                                >
                                    <td class="px-0 mx-0"><v-checkbox v-model="item.selecionado"></v-checkbox></td>
                                    <td class="px-0 mx-0">{{ item.nome }}</td>
                                </tr>
                            </tbody>
                        </v-simple-table> 
                        -->
                        <v-data-table
                            v-model="saidasSelecionadas"
                            class="elevation-1"
                            :headers="headerSaidas"
                            :items="saidas"
                            show-select
                            item-key="id"
                            >
                        </v-data-table>   
                        <v-card-actions>
                            <v-btn color="success" small outlined dark class="ma-2" @click="adicionarSaida">Adicionar</v-btn>
                            <v-btn color="success" small outlined dark class="ma-2" @click="excluirSaida">Excluir </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>   
                <v-col cols="11" sm="4">
                    
                </v-col>         
            </v-row>
        </v-card> 
      </v-tab-item>
      <!-- RESULTADO -->
      <v-tab-item key="resultado">
        <v-data-table v-if="itens.length > 0"
            v-model="itensSelecionados"
            class="elevation-1"
            ref="tabelaResultadoPainel"
            :headers="colunasItens"
            :items="itens"
            show-select
            item-key="id"
            >
            <template #item.valoraprovado="{item}">
                {{ item.valoraprovado? parseFloat(item.valoraprovado).toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' }) : '' }}
            </template>      
            <template #item.valorhoraaula="{item}">
                {{ item.valorhoraaula? parseFloat(item.valorhoraaula).toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' }) : '' }}
            </template>    
            <!-- TOTAIS --> 
            <template slot="body.append">
                <td><b>Totais</b></td>
                <td v-for="colunaItem in colunasItens" :key="colunaItem.id">
                    {{ colunaItem.snSomavel? sum(colunaItem.value) : '' }}
                </td>
            </template>                              
        </v-data-table>   
      </v-tab-item>
      <!--GRAFICO -->
      <v-tab-item>
        <mychart :colunasMetricas='colunasItens.filter(coluna => coluna.snSomavel)'
                 :colunasDimensoes="colunasItens.filter(coluna => !coluna.snSomavel)"
                 :matrizDados='itens.map(item => ({...item, valoraprovado:parseFloat(item.valoraprovado),
                    aprovadamaiscontrapartida:parseInt(item.aprovadamaiscontrapartida),
                    aprovada:parseInt(item.aprovada),
                    matricula:parseInt(item.matricula)}))'
                 :metodoParaObterColuna="obterColuna"/>
      </v-tab-item>
      <!-- MAPA -->
      <v-tab-item key="mapa">
        <mymap :items='itens.map(item => ({...item, valoraprovado:parseFloat(item.valoraprovado), 
            aprovadamaiscontrapartida:parseInt(item.aprovadamaiscontrapartida),
            matricula:parseInt(item.matricula),
            homologada:parseInt(item.homologada),
            }))' :metrics='colunasItens.filter(coluna => coluna.snSomavel)'/>
      </v-tab-item>

    </v-tabs>
</template>

<script>
import MyMap from '../../components/maps/MyMap.vue'
import MyChart from '../../components/charts/MyChart.vue'
import * as Vagas from '../../services/Vagas.js'
import * as Painel from '../../services/Painel.js'
import {Operacoes} from '../vagas/OperadoresLogicos.js'
import {ERROR_SESSION_EXPIRED} from '../../services/Constantes.js'
//TABELA COM LINHAS ARRASTAVEISimport Sortable from 'sortablejs'



export default {
    components: {
      'mychart': MyChart,
      'mymap': MyMap,
    }, 
   /*
   TABELA COM LINHAS ARRASTAVEIS
   mounted () {
    new Sortable(
      document.querySelector('#dragTable'),
      {
        draggable: '.sortableRow',
        handle: '.sortHandle',
        onEnd: this.dragReorder
      }
    )
  },
  */
  data() {
    return {
        showAlertPopup: false,
        alertMessagePopup: '',
        typeAlertPopup: 'error',          
        dialogSalvarConsulta: false,
        consultaPainel: {},
        chave:'',
        todasSaidas: false,
        abaSelecionada: 0,
        showAlert: false,
        alertMessage: '',
        typeAlert: 'success',            
        colunas: [],
        colunasSelecionadas:[],
        header:[{
            text: 'Colunas',
            sortable: true,
            value: 'nome',
        }],
        filtros:[],
        filtrosSelecionados:[],
        headerFiltros:[{
            text: 'Filtros',
            sortable: true,
            value: 'nome',
        },
        {
            text: 'Operador',
            sortable: false,
            value: 'operador',
        },        
        {
            text: 'Valor',
            sortable: false,
            value: 'valor',
        }],
        saidas:[],
        saidasSelecionadas:[],
        headerSaidas:[{
            text: 'Colunas para relatório',
            sortable: true,
            value: 'nome',
        }],   
        editDisabled: false,   
        itens:[],  
        itensSelecionados: [], 
        colunasItens: [],    
        operadores: Operacoes.listarOperadores(),
    }
  },
    created () {
        Vagas.listarColunas().then((response) => {
            this.colunas = response.body.colunas.map(coluna => 
            ({...coluna, text:coluna.nome}))
            this.colunas =this.colunas.map((coluna,index) => 
            ({...coluna, id:index}))   
        }).catch(error => {
            displayMessage(this, true, error.body.error, 'error')
            if (error.status === ERROR_SESSION_EXPIRED){
                this.$store.dispatch('ActionLogout')
            }     
        })
    },  
  
  methods: {
    salvarConsulta(){
        this.consultaPainel.filtros = this.filtros
        this.consultaPainel.saidas = this.saidas
        console.log(this.consultaPainel)
    },
    initiateDialogSalvarConsulta(){
        this.consultaPainel.nome = ''
        /*console.log('Consulta painel:', this.consultaPainel)
        Vagas.listarPlanilhas().then(response => {
                this.planilhasJaCarregadas = response.data.planilhas
            }).catch(error => {
                console.log(error)
                displayMessagePopup(this, true, error.body.error, 'error')
                if (error.status === ERROR_SESSION_EXPIRED){
                    this.$store.dispatch('ActionLogout')
                }                
            })            
        displayMessagePopup(this, false, '','error')        */
    },   
    closedialogSalvarConsulta(){
        this.consultaPainel = {}
        this.dialogSalvarConsulta = false
    },          
    /* TABELA COM LINHAS ARRASTAVEIS
    itemKey (item) {
      if (!this.itemKeys.has(item)) this.itemKeys.set(item, ++this.currentItemKey)
      return this.itemKeys.get(item)
    },
    dragReorder ({oldIndex, newIndex}) {
      const movedItem = this.saidas.splice(oldIndex, 1)[0]
      this.saidas.splice(newIndex, 0, movedItem)
    },
    orderNumber (item) {
      return this.saidas.indexOf(item) + 1
    }*/
    obterColuna(nomeColuna){
        var coluna = null
        this.colunasItens.map(colunaItem => {
            if (colunaItem.nomeColunaBanco === nomeColuna){
                coluna = colunaItem
            }
        })
        return coluna
    },
    adicionarFiltro(){
        if (this.colunasSelecionadas.length === 0){
            displayMessage(this, true, 'Selecione alguma coluna', 'info')
            return
        }
        this.colunasSelecionadas.map(colunaSelecionada => {
            var jaExiste = this.filtros.filter(filtro => {
                return filtro.nome === colunaSelecionada.nome
            })
            if (jaExiste.length === 0){
                this.filtros.push(colunaSelecionada)
            }
        })
        this.colunasSelecionadas = []
    },
    excluirFiltro(){
        if (this.filtrosSelecionados.length === 0){
            displayMessage(this, true, 'Selecione algum filtro', 'info')
            return
        }
        this.filtrosSelecionados.map(filtroSelecionado => {
            let index = this.filtros.indexOf(filtroSelecionado)
            this.filtros.splice(index, 1)
        })
    },
    adicionarSaida(){
        if (this.colunasSelecionadas.length === 0){
            displayMessage(this, true, 'Selecione alguma coluna', 'info')
            return
        }
        this.colunasSelecionadas.map(colunaSelecionada => {
            var jaExiste = this.saidas.filter(saida => {
                return saida.nome === colunaSelecionada.nome
            })
            if (jaExiste.length === 0){
                this.saidas.push({...colunaSelecionada, selecionado: false})
            }
        })
        this.colunasSelecionadas = []
    },
    excluirSaida(){
        if (this.saidas.length === 0){
            displayMessage(this, true, 'Selecione alguma saída', 'info')
            return
        }
        this.saidasSelecionadas.map(saidaSelecionada => {
            let index = this.saidas.indexOf(saidaSelecionada)
            this.saidas.splice(index, 1)
        })
    },
    limpar(){
        this.colunasSelecionadas = []
        this.filtros = []
        this.saidas = []
        this.itens = []
        this.chave = ''
    },
    gerarRelatorio(){
        displayMessage(this, false, '', 'info')
        /*if (this.filtros.length === 0){
            displayMessage(this, true, 'Selecione algum filtro', 'info')
            return
        }*/
        var algumFiltroSemValor = false
        var algumFiltroSemOperador = false
        this.filtros.map(filtro => {
            if (!filtro.valor){
                algumFiltroSemValor = true
            }
        })
        if (algumFiltroSemValor){
            displayMessage(this, true, 'Todos os filtros devem ter algum valor preenchido. Clique na coluna valor em cada filtro para preencher.', 'info')
            return
        }
                
        if (this.saidas.length === 0){
            displayMessage(this, true, 'Selecione alguma saída', 'info')
            return
        }  

        Vagas.listarVagas(this.saidas, this.filtros).then((response) => {
            this.itens = response.body.vagas
            this.colunasItens = response.body.colunas  
            this.abaSelecionada = 1  

            this.itens = this.itens.map(vaga => 
                ({...vaga,dataaprovacao:vaga.dataaprovacao?vaga.dataaprovacao.substring(3):''}))    
            this.itens = this.itens.map(vaga => 
                ({...vaga,datamatricula:vaga.datamatricula?vaga.datamatricula.substring(3):''}))                    

        }).catch(error => {
            displayMessage(this, true, error.body.error, 'error')
            if (error.status === ERROR_SESSION_EXPIRED){
                this.$store.dispatch('ActionLogout')
            }     
        })
    },
    editarFiltro(){
    },
    fecharEdicaoFiltro(){
    },
    cancelarEdicaoFiltro(){
    },       
    salvarFiltro(filtro){
    },
    sum(column){
        let total = 0
        var itens = this.itens
        itens.map( item => {
            if (item[column] !== null){
                total += parseFloat(item[column]) 
            }
        })
        if (column === 'valoraprovado'){
            total = total.toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' })
        }

        return total
    },    
  }
}

function displayMessage(owner, showAlert, message, type){
    owner.showAlert = showAlert
    owner.alertMessage = message
    owner.typeAlert = type
}

function displayMessagePopup(owner, showAlert, message, type){
    owner.showAlertPopup = showAlert
    owner.alertMessagePopup = message
    owner.typeAlertPopup = type
}

</script>

<style>
/*TABELA COM LINHAS ARRASTAVEIS
.handle {
  cursor: move;
}*/
</style>