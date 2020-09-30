<template>
<v-card>
    <!-- Tem linhas agrupadas? {{snLinhasAgrupadas ? 'sim' : 'não'}} -->
    <v-tabs
      background-color="white"
      color="indigo darken-2"
      >
      <v-tab>Tabela</v-tab>
      <v-tab>Gráfico</v-tab>
      <v-tab>Mapa</v-tab>
      <v-tab>Detalhes</v-tab>

      <v-tab-item key="tabela">
        <v-alert :type="typeAlert" dense text dismissible v-model="showAlert">
            {{alertMessage}}
        </v-alert> 
        <!--FILTROS -->
        <filtros ref="filtros" :colunasFiltraveis="colunasFiltraveisOrdenadas" v-on:mostrarAlerta="mostrarAlerta"
            v-on:customSearch="customSearch"/>        
        <v-data-table
            show-select
            ref="vagasTable"
            v-model="rowsSelected"
            class="elevation-1"
            :loading="loading"
            :headers="tableColumns"
            :items="items"
            :custom-sort="customSort"
            item-key="vagaid"
            :footer-props="{
                itemsPerPageOptions: [10,20, 50, 100, 1000],
                showFirstLastPage: true,
                firstIcon: 'mdi-arrow-collapse-left',
                lastIcon: 'mdi-arrow-collapse-right',
                prevIcon: 'mdi-arrow-left',
                nextIcon: 'mdi-arrow-right'}">
            <template v-slot:top>
            <v-toolbar flat color="white">
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-btn color="success" dark class="ma-2" @click="exportSheet">Exportar</v-btn>
                <v-btn color="success" dark class="ma-2" @click="deleteSelectedItens">Excluir</v-btn>

                <!-- EXCLUIR PLANILHA -->
                <popupExcluirPlanilha v-on:updateItens="updateItens"/>
                <!-- FIM EXCLUIR PLANILHA -->                

                <!-- IMPORTAR -->
                <popupImportarPlanilha v-on:updateItens="updateItens"/>                
                <!-- FIM IMPORTAR -->

                <!-- CONFIGURAR COLUNAS -->
                <popupConfigurarColunas :tableConfigurableColumns="tableConfigurableColumns"
                    v-on:atualizarColunas="atualizarColunas"
                    :selectedColumns="selectedColumns"/>                
                <!-- FIM DO CONFIGURAR COLUNAS -->    
                <v-btn color="success" dark class="ma-2" @click="reset">Limpar</v-btn>                   
            </v-toolbar>
            </template>      

            <!--INSTITUICAO DE ENSINO-->
            <template #item.instituicao="{item}">
                <v-edit-dialog
                    :return-value.sync="item.instituicao"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.instituicao }}
                    <template v-slot:input>
                        <v-text-field :disabled="editDisabled"
                        v-model="item.instituicao"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>                                
            <!--UF-->
            <template #item.uf="{item}">
                <v-edit-dialog
                    :return-value.sync="item.uf"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.uf }}
                    <template v-slot:input>
                        <v-text-field :disabled="editDisabled"
                        v-model="item.uf"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>  
            <!--MUNICIPIO-->
            <template #item.municipio="{item}">
                <v-edit-dialog
                    :return-value.sync="item.municipio"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.municipio }}
                    <template v-slot:input>
                        <v-text-field :disabled="editDisabled"
                        v-model="item.municipio"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>             
            <!-- TIPO DE CURSO -->        
            <template #item.tipodecurso="{item}">
                <v-edit-dialog
                    :return-value.sync="item.tipodecurso"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.tipodecurso }} 
                    <template v-slot:input>
                        <v-text-field :disabled="editDisabled"
                        v-model="item.tipodecurso"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template> 
            <!-- MODALIDADE EDUCACIONAL -->        
            <template #item.modalidadedeensino="{item}">
                <v-edit-dialog
                    :return-value.sync="item.modalidadedeensino"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.modalidadedeensino }}
                    <template v-slot:input>
                        <v-text-field :disabled="editDisabled"
                        v-model="item.modalidadedeensino"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>   
            <!-- CURSO -->         
            <template #item.curso="{item}">
                <v-edit-dialog
                    :return-value.sync="item.curso"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.curso }}
                    <template v-slot:input>
                        <v-text-field :disabled="editDisabled"
                        v-model="item.curso"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>   
            <!-- PERIODO PACTUACAO -->         
            <template #item.periodopactuacao="{item}">
                <v-edit-dialog
                    :return-value.sync="item.periodopactuacao"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.periodopactuacao }}
                    <template v-slot:input>
                        <v-text-field :disabled="editDisabled"
                        v-model="item.periodopactuacao"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>                                                         
            <!-- ACAO -->         
             <template #item.acao="{item}">
                <v-edit-dialog
                    :return-value.sync="item.acao"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.acao }}
                    <template v-slot:input>
                        <v-text-field :disabled="editDisabled"
                        v-model="item.acao"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>        
            <!-- REDE -->         
             <template #item.rede="{item}">
                <v-edit-dialog
                    :return-value.sync="item.rede"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.rede }}
                    <template v-slot:input>
                        <v-text-field :disabled="editDisabled"
                        v-model="item.rede"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>    
        <!-- VALOR HORA-AULA -->        
            <template #item.valorhoraaula="{item}">
                <v-edit-dialog
                    :return-value.sync="item.valorhoraaula"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.valorhoraaula? item.valorhoraaula.toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' }) : '' }}
                    <template v-slot:input>
                        <v-currency-field 
                            :disabled="editDisabled"
                            v-model="item.valorhoraaula"/>  
                    </template>
                </v-edit-dialog>
            </template> 
            <!-- APROVADA -->        
            <template #item.aprovada="{item}">
                <v-edit-dialog
                    :return-value.sync="item.aprovada"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.aprovada }}
                    <template v-slot:input>
                        <v-text-field :disabled="editDisabled"
                        v-model="item.aprovada"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>
            <!-- APROVADA + CONTRAPARTIDA -->        
            <template #item.aprovadamaiscontrapartida="{item}">
                {{ item.aprovadamaiscontrapartida }}
            </template>             
            <!-- DATA DA APROVACAO -->        
            <template #item.dataaprovacao="{item}">
                <v-edit-dialog
                    :return-value.sync="item.dataaprovacao"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.dataaprovacao }}
                    <template v-slot:input>
                        <v-text-field :disabled="editDisabled"
                        v-model="item.dataaprovacao"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>                           
        <!-- VALOR APROVADO -->        
            <template #item.valoraprovado="{item}">
                {{ item.valoraprovado? item.valoraprovado.toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' }) : '' }}
            </template> 
        <!-- CARGA HORÁRIA -->        
            <template #item.cargahoraria="{item}">
                <v-edit-dialog
                    :return-value.sync="item.cargahoraria"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.cargahoraria }}
                    <template v-slot:input>
                        <v-text-field :disabled="editDisabled"
                        v-model="item.cargahoraria"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>                  
        <!-- HOMOLOGADA -->        
            <template #item.homologada="{item}">
                <v-edit-dialog
                    :return-value.sync="item.homologada"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.homologada }}
                    <template v-slot:input>
                        <v-text-field :disabled="editDisabled"
                        v-model="item.homologada"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>  
            <!-- MATRICULA -->        
            <template #item.matricula="{item}">
                <v-edit-dialog
                    :return-value.sync="item.matricula"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.matricula }}
                    <template v-slot:input>
                        <v-text-field :disabled="editDisabled"
                        v-model="item.matricula"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>  
            <!-- DATA DA MATRICULA -->        
            <template #item.datamatricula="{item}">
                <v-edit-dialog
                    :return-value.sync="item.datamatricula"
                    @save="saveItem(item)"
                    @cancel="cancelEditField"
                    @open="editField"
                    @close="closeEditField"
                    > {{ item.datamatricula }}
                    <template v-slot:input>
                        <v-text-field :disabled="editDisabled"
                        v-model="item.datamatricula"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>                        
            <template #item.sncontrapartida="{item}">
                {{item.sncontrapartida? 'sim' : 'não' }}
            </template>     

            <!-- <template #item.datapublicacao="{item}">
                {{item.datapublicacaoformatada}}
            </template>     -->
            <template #item.nomeplanilha="{item}">
                {{item.nomeplanilha}}
            </template>        
            <template #item.sei="{item}">
                {{item.sei}}
            </template> 
            <template #item.ted="{item}">
                {{item.ted}}
            </template>                                      
            <template #item.actions="{item}">
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>     
            <template slot="body.append">
                <td><b>Totais</b></td>
                <td v-for="column in tableColumns" :key="column.id">
                    {{ column.summable? column.format(sum(column.value)) : '' }}
                    {{ column.calcularMedia? column.format(calcularMedia(column.value)) : '' }}
                </td>
            </template>   
        </v-data-table>            
      </v-tab-item>
      <!-- GRAFICO -->
      <v-tab-item key="grafico">
        <mychart :colunasMetricas='tableColumns.filter(tableColumn => tableColumn.summable)'
                 :colunasDimensoes="tableColumns.filter(tableColumn => tableColumn.colunadimensao)"
                 :matrizDados='items'/>
      </v-tab-item>
      <!-- FIM DO GRAFICO -->
      <!-- MAPA -->
      <v-tab-item key="mapa">
        <mymap :items='items' :metrics='tableColumns.filter(tableColumn => tableColumn.summable)'/>
      </v-tab-item>
      <!-- FIM DO MAPA -->
      <!-- PROJECOES -->
      <v-tab-item key="detalhes">
        <detalhes />
      </v-tab-item>
      <!-- FIM DO GRAFICO -->      
    </v-tabs>

  
</v-card>

</template>

<script>
import * as Vagas from '../../services/Vagas.js'
import moment  from 'moment'
import {ERROR_SESSION_EXPIRED} from '../../services/Constantes.js'
import XLSX from 'xlsx'
import MyChart from '../../components/charts/MyChart.vue'
import MyMap from '../../components/maps/MyMap.vue'
import Detalhes from '../../components/detalhes/Detalhes.vue'
import PopupExcluirPlanilha from './PopupExcluirPlanilha.vue'
import PopupImportarPlanilha from './PopupImportarPlanilha.vue'
import PopupConfigurarColunas from './PopupConfigurarColunas.vue'
import Filtros from './Filtros.vue'


export default {
    components: {
      'mychart': MyChart,
      'mymap': MyMap,
      'detalhes': Detalhes,
      'popupExcluirPlanilha': PopupExcluirPlanilha,
      'popupImportarPlanilha': PopupImportarPlanilha,
      'popupConfigurarColunas': PopupConfigurarColunas,
      'filtros': Filtros,
    }, 
    data() {
        return {
            mostrarPopupExcluir: false,
            mostrarPopupImportar: false,
            actionColumn: {},
            snLinhasAgrupadas: false,
            vagasTable: {},
            rate: 0,
            errors: {},            
            rowsSelected: [],
            loading: true,
            dialogImportar: false,
            dialogColunas: false,
            items:[],
            originalItems:[],
            showAlert: false,
            alertMessage: '',
            typeAlert: 'success',
            showAlertPopup: false,
            alertMessagePopup: '',
            typeAlertPopup: 'error',  
            selectedColumns:[],
            tableColumns:[],
            dialogChart: false,
        }
    },
    created () {
        initialize(this)
    },
    computed: {
        colunasFiltraveisOrdenadas(){
            var colunasOrdenadas = this.colunasFiltraveis.sort((a,b) =>{
                if (a.text == b.text) {
                    return 0
                }
                else if (a.text < b.text){
                    return -1
                }  
                return 1
            })
            return colunasOrdenadas
        },
        //todas as colunas exceto a de actions
        tableConfigurableColumns(){
            return Vagas.columns().filter(column => column.value !== 'actions')
        },
        colunasFiltraveis(){
            let colunas = []
            this.tableConfigurableColumns.map((tableConfigurableColumn, index) => {
                if (this.selectedColumns.indexOf(index) != -1) {
                    colunas.push(tableConfigurableColumn)
                }
            })
            return colunas
        },
        editDisabled(){
            return this.tableColumns.length !== Vagas.columns().length
        }
    },
    methods: {
        customSort(items, index, isDesc) {
            items.sort((a, b) => {
                if (index[0] === "dataaprovacao" || index[0] === "datamatricula") {
                    if (!a[index] || !b[index]){
                        if (!isDesc[0]) {
                            return a[index] < b[index] ? -1 : 1;
                        } else {
                            return b[index] < a[index] ? -1 : 1;
                        }
                    } else {
                        var anoA = parseInt(a[index].substring(3,7))
                        var mesA = parseInt(a[index].substring(0,2))
                        var anoB = parseInt(b[index].substring(3,7))
                        var mesB = parseInt(b[index].substring(0,2))
                        if (!isDesc[0]){
                            if (anoA === anoB){
                                return mesA < mesB ? -1 : 1
                            } 
                            else {
                                return anoA < anoB ? -1 : 1
                            }
                        }
                        else {
                            if (anoA === anoB){
                                return mesA > mesB ? -1 : 1
                            } 
                            else {
                                return anoA > anoB ? -1 : 1
                            }
                        }                        
                    }
                } else {
                    if (!isDesc) {
                        return a[index] < b[index] ? -1 : 1;
                    } else {
                        return b[index] < a[index] ? -1 : 1;
                    }
                }
            })
            return items
        },
        mostrarAlerta(message, type){
            displayMessage(this, true, message, type)
        },
        exportSheet(){
            let header = this.tableColumns.filter(element => element.value !== 'actions' && element.value != 'vagaid')
            header = header.map(element => element.value)
            
            var dataRows = []
            this.rowsSelected.map( row => {
                var dataRow = []
                
                header.map(column => {
                    dataRow.push(row[column])
                })
                dataRows.push(dataRow)
            })
            const ws = XLSX.utils.aoa_to_sheet([header,... dataRows])
			const wb = XLSX.utils.book_new()
			XLSX.utils.book_append_sheet(wb, ws, "Vagas")
			XLSX.writeFile(wb, "vagas.xlsx")
        },
        desmarcarTodos(){
            this.selectedColumns = []
        },
        agrupaLinhasIdenticas(){
            var itemsAAgrupar = this.originalItems
            if (!this.snLinhasAgrupadas){
                itemsAAgrupar = this.items
            }
            var {itemsWithIdenticalPairs, itemsWithoutIdenticalPairs} = 
                separateIdenticalAndNoIdenticalItems(itemsAAgrupar, this.tableColumns, Vagas.fieldsToDetermineEquality)
            this.snLinhasAgrupadas = (itemsWithIdenticalPairs.length > 0)? true : false
            var identicalItemsGrouped = sumItems(Vagas.fieldsToSum(), itemsWithIdenticalPairs)
            this.items = []
            this.items.push(...itemsWithoutIdenticalPairs,...identicalItemsGrouped)
        },
        addSearchPair(columnToSearch){
            if (columnToSearch !== null &&searchKey != ''){
                var item = searchPairs.filter(searchPair => searchPair.field === columnToSearch)
                if (item.length > 0){
                    item = item[0]
                    item.key =searchKey
                    item.show = true
                }
                else {
                    item = {field: columnToSearch, key:searchKey, show: true}
                    searchPairs.push(item)
                }
            }
           searchKey = ''
        },        
        customSearch (searchPairs, searchKey, columnToSearch, operador) {
            if (this.isSearchPairsFilled(searchPairs)){
                var itemsToSearch = this.originalItems
                //itemsToSearch.push(this.originalItems[0])
                var filteredItems = []
                itemsToSearch.map((item, index) => {
                    var includeItem = true
                    searchPairs.map(searchPair => {
                        if (searchPair.show){
                            //aqui é um loop pq pode ter escolhido mais de um campo
                            var condicaoDeInclusaoItemPorCampo = false
                            if (includeItem){ //precisa dessa if, pq se uma condicao de uma chave anterior deu falso, ja nao inclui o item
                                searchPair.field.split(',').map(campoABuscar => {
                                    if (!condicaoDeInclusaoItemPorCampo){
                                        if (item[campoABuscar] != null){
                                            if (searchPair.operador === 'contém'){
                                                condicaoDeInclusaoItemPorCampo = isContem(item[campoABuscar].toString(), searchPair.key)
                                            }
                                            else if (searchPair.operador === 'menor que'){
                                                try{
                                                    var chave =searchPair.key ? parseFloat(searchPair.key) : 0
                                                    var valorColuna = item[campoABuscar]? parseFloat(item[campoABuscar]) : 0
                                                    condicaoDeInclusaoItemPorCampo = valorColuna < chave
                                                }
                                                catch (error){
                                                    displayMessage(this, true, error, 'error')
                                                    return
                                                }                            
                                            }    
                                            else if (searchPair.operador === 'maior que'){
                                                try{
                                                    var chave =searchPair.key ? parseFloat(searchPair.key) : 0
                                                    var valorColuna = item[campoABuscar]? parseFloat(item[campoABuscar]) : 0
                                                    condicaoDeInclusaoItemPorCampo = valorColuna > chave
                                                }
                                                catch (error){
                                                    displayMessage(this, true, error, 'error')
                                                    return
                                                }                            
                                            } 
                                            else if (searchPair.operador === 'não contém'){
                                                condicaoDeInclusaoItemPorCampo = !isContem(item[campoABuscar].toString(),searchPair.key) ||searchPair.key === ''                           
                                            }     
                                                                                       
                                        }
                                    }
                                })
                            }
                            includeItem = condicaoDeInclusaoItemPorCampo
                        }  
                    })
                    if (includeItem){
                        filteredItems.push(item)
                    }
                })
                this.items = filteredItems.slice(0)                
            } else{
                this.searchCellsForKey(searchKey, columnToSearch, operador)
            }
        },        
        searchCellsForKey(searchKey, columnsToSearch, operador){
            var filteredItems = []
            this.originalItems.map((item, index) => {
                var includeItem = false
                //Search for specific column
                if (columnsToSearch.length > 0){
                    columnsToSearch.map(columnToSearch => {
                        if (!includeItem){
                            if (item[columnToSearch] != null){
                                if (operador === 'contém'){
                                    includeItem = isContem(item[columnToSearch].toString(),searchKey) ||searchKey === ''
                                }
                                else if (operador === 'maior que'){
                                    try{
                                        var chave =searchKey ? parseFloat(searchKey) : 0
                                        var valorColuna = item[columnToSearch]? parseFloat(item[columnToSearch]) : 0
                                        includeItem = valorColuna > chave
                                    }
                                    catch (error){
                                        displayMessage(this, true, error, 'error')
                                        return
                                    }                            
                                }
                                else if (operador === 'menor que'){
                                    try{
                                        var chave = parseFloat(searchKey)
                                        var valorColuna = parseFloat(item[columnToSearch])
                                        includeItem = valorColuna < chave
                                    }
                                    catch (error){
                                        displayMessage(this, true, error, 'error')
                                        return
                                    }                            
                                }   
                                else if (operador === 'não contém'){
                                    includeItem = !isContem(item[columnToSearch].toString(),searchKey) ||searchKey === ''                           
                                }                                             
                            }
                        }
                    })
                }
                //Search all columns
                else{
                    Object.entries(item).map((cell, index) => {   
                        var id = Vagas.obterIdColuna(cell[0])
                        //Verifica se está nas colunas selecionadas                         
                        if (id && this.selectedColumns.indexOf(id) != -1){
                            if ((cell[1] != null &&
                           searchKey != null &&
                            isContem(cell[1].toString(),searchKey)) ||searchKey === ''){
                                includeItem = true
                            }
                        }
                    })
                }
                if (includeItem){
                    filteredItems.push(item)
                }
            })
            this.items = filteredItems   
        },
        sum(column){
            let total = 0
            if (this.$refs.vagasTable){
                //var items = this.$refs.vagasTable.selectableItems
                var items = this.items
                items.map( item => {
                    if (item[column] !== null){
                        total += parseFloat(item[column]) 
                    }
                })
            }
            return total
        },
        calcularMedia(column){
            let total = 0
            let numeroItens = 0
            if (this.$refs.vagasTable){
                //var items = this.$refs.vagasTable.selectableItems
                var items = this.items
                items.map( item => {
                    if (item[column] !== null){
                        total += parseFloat(item[column]) 
                        numeroItens++
                    }
                })
            }
            return total / numeroItens
        },        
        updateItens() {
            Vagas.list().then((response) => {
                    //this.items = response.data.vagas.map(vaga => 
                    //    ({...vaga,valoraprovado:(vaga.valorhoraaula*vaga.aprovada*vaga.cargahoraria)}))
                    this.items = response.data.vagas.map(vaga => 
                        ({...vaga,datamatricula:vaga.datamatricula?vaga.datamatricula.substring(3):''}))    
                    this.items = this.items.map(vaga => 
                        ({...vaga,aprovadamaiscontrapartida:(vaga.aprovada + vaga.aprovadacontrapartida)}))                        
                    this.items = this.items.map(vaga => 
                        ({...vaga,dataaprovacao:vaga.dataaprovacao?vaga.dataaprovacao.substring(3):''}))    
                    // this.items = this.items.map((item) => 
                    //         ({...item, datapublicacaoformatada: moment(item.datapublicacao).format("HH:mm:SS DD/MM/YYYY")}))
                    this.originalItems = this.items.slice(0)
                    this.loading = false
                }).catch((error) => {
                    this.loading = false
                    console.log(error)
                    displayMessage(this, true, error.body.error, 'error')
                    if (error.status === ERROR_SESSION_EXPIRED){
                        this.$store.dispatch('ActionLogout')
                    }                
            })            
        },        
        initiateDialogChart(){
        },        
        closeDialogChart () {
            this.dialogChart = false
        },
        closeDialogImportar () {
            this.dialogImportar = false
            this.fileuploaded = null
        },
        closeDialogColunas () {
            this.dialogColunas = false
        },
        deleteSelectedItens(){
            if (this.rowsSelected.length == 0){
                displayMessage(this, true, 'Selecione alguma linha', 'info')
                return
            }
            confirm('Tem certeza que deseja excluir essa(s) ' + this.rowsSelected.length + ' linha(s)?') && 
            Vagas.remove(this.rowsSelected).then((response) => {
                this.rowsSelected = []
                displayMessage(this, true, response.body.message, 'success')
                this.updateItens()
            }).catch(error => {
                displayMessage(this, true, error.body.error, 'error')
            })   
        },
        deleteItem (item) {
            const index = this.items.indexOf(item)
            confirm('Tem certeza que deseja excluir essa linha?') && 
            Vagas.remove([item]).then((response) => {
                displayMessage(this, true, response.body.message, 'success')
                let index = this.items.indexOf(item)
                this.items.splice(index, 1)
                this.originalItems = this.items.slice(0)
            }).catch(error => {
                displayMessage(this, true, error.body.error, 'error')
            })               
        }, 
        saveItem (item) {
            Vagas.save(item).then((response) => {
                let itemSaved = response.body.vaga
                item.datapublicacaoformatada = moment(itemSaved.datapublicacao).format("HH:mm:SS DD/MM/YYYY")
                displayMessage(this, true, response.body.message, 'success')
                this.originalItems = this.items.slice(0)
            }).catch(error => {
                console.log('Error ao atualizar item:', error)
                displayMessage(this, true, error.body.error, 'error')
            })                                
        },        
        editField(){
        },
        closeEditField(){
        },
        cancelEditField(){
        }, 
        isSearchPairsFilled(searchPairs){
            if (searchPairs.length > 0){
                var searchPairFilled = false
                searchPairs.map( searchPair => {
                    if (searchPair.show){
                        searchPairFilled = true
                    }
                })
                return searchPairFilled
            }

            return false
        },     
        reset(){
            this.snLinhasAgrupadas = false
            initialize(this)
            this.$refs.filtros.reset()
        },
        atualizarColunas(colunasSelecionadas, updatedColumns){
            this.selectedColumns = colunasSelecionadas
            updatedColumns.push(this.actionColumn)
            this.tableColumns = updatedColumns
            this.$refs.filtros.reset()
            this.agrupaLinhasIdenticas()
        }     
    },
}

function isContem(texto, chave){
    const parsedTexto = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const parsedChave = chave.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return parsedTexto.toUpperCase().indexOf(parsedChave.toUpperCase()) > -1
}

function initialize(owner){
    owner.updateItens();
    owner.selectedColumns = owner.tableConfigurableColumns.map(column => {
        if (column.selected){
            return column.id
        }
    })
    owner.tableColumns = Vagas.columns()
    owner.actionColumn = owner.tableColumns.filter(item => item.value === 'actions')[0]
}

function separateIdenticalAndNoIdenticalItems(items, tableColumns, fieldsToDetermineEquality){
    var itemsWithIdenticalPairs = []
    var itemsWithoutIdenticalPairs = []
    items.map((itemA, indexItemA) => {
        if (!isContainItem(itemsWithoutIdenticalPairs, itemsWithIdenticalPairs, itemA)){
            let subItens = items.slice(indexItemA)
            let identicosAoItemA = []
            subItens.map(itemB => {
                if (itemB !== itemA){
                    if (isIdentical(itemA, itemB, tableColumns, fieldsToDetermineEquality)){
                        identicosAoItemA.push(itemB)
                    }
                }
            })
            if (identicosAoItemA.length > 0){
                identicosAoItemA.push(itemA)
                itemsWithIdenticalPairs.push(identicosAoItemA)
            }
            else{
                itemsWithoutIdenticalPairs.push(itemA)
            }
        }
    })
    return {itemsWithoutIdenticalPairs, itemsWithIdenticalPairs}
}



function isIdentical(itemA, itemB, tableColumns, fieldsToDetermineEquality){
    var identical = true
    var columns = tableColumns.map( tableColumn => tableColumn.value)
    fieldsToDetermineEquality.map(field => {
        if (columns.indexOf(field) > -1){
            if (itemA[field] !== itemB[field]){
                identical = false
            }
        }
    })
    return identical
}

function isContainItem(vetor, matriz, item){
    if (vetor.indexOf(item) > -1){
        return true
    }
    var contem = false
    matriz.map(itens => {
        if (itens.indexOf(item) > -1){
            contem = true
        }
    })
    return contem
}

function sumItems(fieldsToSum, itemsWithIdenticalPairs){
    var identicalItemsGrouped = []
    itemsWithIdenticalPairs.map( (items => {
        var groupedItem = {}
        Object.assign(groupedItem, items[0])
        //to ensure it is a new object, with a new and invalid id
        groupedItem.vagaid = groupedItem.vagaid * -1 
        
        items.map((item, index) => {
            fieldsToSum.map(fieldToSum => {
                if (index !== 0){
                    let itemA = parseFloat(groupedItem[fieldToSum])
                    let itemB = parseFloat(item[fieldToSum])
                    if (Number.isNaN(itemA)){
                        itemA = 0
                    }
                    if (Number.isNaN(itemB)){
                        itemB = 0
                    }                    
                    groupedItem[fieldToSum] = itemA + itemB
                }
            })
        })
        identicalItemsGrouped.push(groupedItem)
    }))
    return identicalItemsGrouped
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
  tbody tr:nth-of-type(even) {
    background-color: rgba(236, 237, 237);
  }

  tbody tr:nth-of-type(odd) {
    background-color: rgb(250 ,250, 250);
  }

  .v-data-table-header {
    background-color: rgba(182, 183, 187);
    color: white;
  }

  .v-data-footer {
    background-color: rgb(250 ,250, 250);
  }

  .theme--light.v-data-table thead tr th {
    color: white;
  }
</style>