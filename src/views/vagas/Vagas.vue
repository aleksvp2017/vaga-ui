<template>
<v-card>
    <v-alert :type="typeAlert" dense text dismissible v-model="showAlert">
        {{alertMessage}}
    </v-alert> 
    <v-card-title>
      <v-spacer></v-spacer>
     <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs2>
            <v-select
                v-model="columnToSearch"
                :items="tableColumns"
                label="Filtrar por"
            ></v-select>
        </v-flex>
        <v-flex xs2>
        <v-text-field
        @keydown.enter="addSearchPair"
        @keyup="customSearch"
        v-model="searchKey"
        append-icon="mdi-magnify"
        label="Valor"
        single-line
        hide-details
        ></v-text-field>
        </v-flex>
        <v-card-text>            
            {{ isSearchPairsFilled()? 'Filtrando por' : ''}}
            <v-chip v-for="searchPair in searchPairs" :key="searchPair.field" close
                v-show="searchPair.show" @click:close="removePair(searchPair)">
                {{ searchPair.field + ":" + searchPair.key}}
            </v-chip>
        </v-card-text>
      </v-layout>
     </v-container>
    </v-card-title>

    <v-data-table
        show-select
        ref="vagasTable"
        v-model="rowsSelected"
        class="elevation-1"
        :loading="loading"
        :headers="tableColumns"
        :items="items"
        item-key="vagaid"
        :footer-props="{
            itemsPerPageOptions: [10,20, 50, 100],
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
            <v-btn color="primary" dark class="ma-2" @click="exportSheet">Exportar</v-btn>
            <v-btn color="primary" dark class="ma-2" @click="deleteSelectedItens">Excluir</v-btn>
            <!-- IMPORTAR -->
            <v-dialog v-model="dialogImportar" max-width="800px" height="1000px" scrollable>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="ma-2" v-on="on" @click="initiateDialogImportar">Importar</v-btn>
                </template>                
                <v-card>
                    <v-card-text>
                        <v-alert :type="typeAlertPopup" dense text dismissible v-model="showAlertPopup">
                            {{alertMessagePopup}}
                        </v-alert>
                        <v-file-input v-model="fileuploaded" label="Escolha a planilha a ser importada"></v-file-input>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="uploadFile()">Enviar</v-btn>
                    <v-btn color="blue darken-1" text @click="closeDialogImportar">Fechar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- FIM IMPORTAR -->
            <!-- CONFIGURAR COLUNAS -->
            <v-dialog v-model="dialogColunas" max-width="800px" height="1000px" scrollable>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="ma-2" v-on="on" @click="initiateDialogColunas">Escolher colunas</v-btn>
                </template>                
                <v-card>
                    <v-card-text>
                        <v-alert :type="typeAlertPopup" dense text dismissible v-model="showAlertPopup">
                            {{alertMessagePopup}}
                        </v-alert>
                                <v-chip-group column active-class="primary--text" multiple v-model="selectedColumns"> 
                                    <v-chip v-for="column in tableConfigurableColumns" :key="column.id" filter>
                                        {{ column.text }}
                                    </v-chip>
                                 </v-chip-group> 
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="updateColumns()">Ok</v-btn>
                    <v-btn color="blue darken-1" text @click="closeDialogColunas">Fechar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- FIM DO CONFIGURAR COLUNAS -->            
        </v-toolbar>
        </template>      
        <!-- ANO -->
        <template #item.ano="{item}" class="d-flex">
            <v-edit-dialog
                :return-value.sync="item.ano"
                @save="saveItem(item)"
                @cancel="cancelEditField"
                @open="editField"
                @close="closeEditField"
                > {{ item.ano }}
                <template v-slot:input>
                    <v-text-field
                    v-model="item.ano"
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
                    <v-text-field
                    v-model="item.uf"
                    label="Edit"
                    single-line
                    counter
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template>  
        <!-- SALDO -->        
        <template #item.saldo="{item}">
            <v-edit-dialog
                :return-value.sync="item.saldo"
                @save="saveItem(item)"
                @cancel="cancelEditField"
                @open="editField"
                @close="closeEditField"
                > {{ item.saldo.toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' }) }}
                <template v-slot:input>
                    <!-- <v-text-field
                    v-model="item.saldo"
                    label="Edit"
                    single-line
                    counter
                    ></v-text-field> -->
                    <v-currency-field 
                        v-model="item.saldo"/>                    
                </template>
            </v-edit-dialog>
        </template>    
       <!-- VALOR APROVADO -->        
        <template #item.valoraprovado="{item}">
            <v-edit-dialog
                :return-value.sync="item.valoraprovado"
                @save="saveItem(item)"
                @cancel="cancelEditField"
                @open="editField"
                @close="closeEditField"
                > {{ item.valoraprovado.toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' }) }}
                <template v-slot:input>
                    <v-currency-field 
                        v-model="item.valoraprovado"/>  
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
                    <v-text-field
                    v-model="item.aprovada"
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
                    <v-text-field
                    v-model="item.homologada"
                    label="Edit"
                    single-line
                    counter
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template>  
       <!-- MATRICULA REALIZADA -->        
        <template #item.matricularealizada="{item}">
            <v-edit-dialog
                :return-value.sync="item.matricularealizada"
                @save="saveItem(item)"
                @cancel="cancelEditField"
                @open="editField"
                @close="closeEditField"
                > {{ item.matricularealizada }}
                <template v-slot:input>
                    <v-text-field
                    v-model="item.matricularealizada"
                    label="Edit"
                    single-line
                    counter
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template>      
      <!-- MODALIDADE -->        
        <template #item.modalidade="{item}">
            <v-edit-dialog
                :return-value.sync="item.modalidade"
                @save="saveItem(item)"
                @cancel="cancelEditField"
                @open="editField"
                @close="closeEditField"
                > {{ item.modalidade }}
                <template v-slot:input>
                    <v-text-field
                    v-model="item.modalidade"
                    label="Edit"
                    single-line
                    counter
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template>                         
        <!-- TIPO -->         
        <template #item.tipo="{item}">
            <v-edit-dialog
                :return-value.sync="item.tipo"
                @save="saveItem(item)"
                @cancel="cancelEditField"
                @open="editField"
                @close="closeEditField"
                > {{ item.tipo }}
                <template v-slot:input>
                    <v-text-field
                    v-model="item.tipo"
                    label="Edit"
                    single-line
                    counter
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template>         
        <template #item.datapublicacao="{item}">
            {{item.datapublicacaoformatada}}
        </template>            
        <template #item.actions="{item}">
            <!--<v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>-->
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>     
        <template slot="body.append">
            <td><b>Totais</b></td>
            <td v-for="column in tableColumns" :key="column.id">
                {{ column.summable? column.format(sum(column.value)) : '' }}
            </td>
            <!-- <td></td>
            <td></td>            
            <td>
                {{ this.sum('saldo').toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' }) }}
            </td>
            <td>
                {{ this.sum('valoraprovado').toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' }) }}
            </td>
            <td>
                {{ this.sum('aprovada') }}
            </td>            
            <td>
                {{ this.sum('homologada') }}
            </td>            
            <td>
                {{ this.sum('matricularealizada') }}
            </td> 
            <td></td>
            <td></td>            
            <td></td>
            <td></td>             -->
        </template>   
    </v-data-table>    
</v-card>

</template>

<script>
import {upload, list, columns, remove, save, fieldsToSum, fieldsToDetermineEquality} from '../../services/Vagas.js'
import moment  from 'moment'
import {ERROR_SESSION_EXPIRED} from '../../services/Constantes.js'
import XLSX from 'xlsx'

export default {
    data() {
        return {
            data: ["SheetJS".split(""), "1234567".split("")],
            actionColumn: {},
            vagasTable: {},
            rate: 0,
            errors: {},            
            columnToSearch: null,
            rowsSelected: [],
            loading: true,
            searchKey:'',
            dialogImportar: false,
            dialogColunas: false,
            items:[],
            originalItems:[],
            fileuploaded: null,
            showAlert: false,
            alertMessage: '',
            typeAlert: 'success',
            showAlertPopup: false,
            alertMessagePopup: '',
            typeAlertPopup: 'error',  
            selectedColumns:[],
            tableColumns:[],
            searchPairs:[],
        }
    },
    created () {
        this.updateItens();
        this.selectedColumns = this.tableConfigurableColumns.map((column, index) => {
            if (column.selected){
                return index
            }
        })
        this.tableColumns = columns()
        this.actionColumn = this.tableColumns.filter(item => item.value === 'actions')[0]
    },
    computed: {
        tableConfigurableColumns(){
            return columns().filter(column => column.value !== 'actions')
        },
    },
    methods: {
        exportSheet(){
            let header = this.tableColumns.filter(element => element.value !== 'actions')
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
        updateColumns(){
            this.selectedColumns = this.selectedColumns.sort()
            var updatedColumns = []
            for (var selectedColumn in this.selectedColumns){
                updatedColumns.push(this.tableConfigurableColumns[this.selectedColumns[selectedColumn]])
            }
            updatedColumns.push(this.actionColumn)
            this.tableColumns = updatedColumns
            this.closeDialogColunas()
            this.groupIdenticalItens()
        },
        groupIdenticalItens(){
            var {itemsWithIdenticalPairs, itemsWithoutIdenticalPairs} = 
                separateIdenticalAndNoIdenticalItems(this.originalItems, this.tableColumns, fieldsToDetermineEquality)
            var identicalItemsGrouped = sumItems(fieldsToSum(), itemsWithIdenticalPairs)
            this.items = []
            this.items.push(...itemsWithoutIdenticalPairs,...identicalItemsGrouped)
        },
        removePair(searchPair){
            searchPair.show = false
            this.customSearch()
        },
        addSearchPair(){
            if (this.columnToSearch !== null && this.searchKey != ''){
                var item = this.searchPairs.filter(searchPair => searchPair.field === this.columnToSearch)
                if (item.length > 0){
                    item = item[0]
                    item.key = this.searchKey
                    item.show = true
                }
                else {
                    item = {field: this.columnToSearch, key: this.searchKey, show: true}
                    this.searchPairs.push(item)
                }
            }
            this.searchKey = ''
        },        
        customSearch () {
            if (this.isSearchPairsFilled(this.searchPairs)){
                console.log('Procurar por pares')
                var itemsToSearch = this.originalItems
                var filteredItems = []
                itemsToSearch.map((item, index) => {
                    console.log('Linha ', index)
                    var includeItem = true
                    this.searchPairs.map(searchPair => {
                        if (searchPair.show && item[searchPair.field].toString().indexOf(searchPair.key) === -1){
                            includeItem = false
                        }
                    })
                    console.log(item)
                    if (includeItem){
                        filteredItems.push(item)
                    }
                })
                //console.log('Filtered:', filteredItems)
                this.items = filteredItems.slice(0)                
                //console.log(items)
            } else{
                console.log('procurar por chave')
                this.searchCellsForKey()
            }
        },        
        searchCellsForKey(){
            console.log('Key:', this.searchKey)
            var filteredItems = []
            this.originalItems.map((item, index) => {
                console.log('Original items')
                var includeItem = false
                //Search for specific column
                if (this.columnToSearch !== null){
                    console.log('aqui', this.searchKey === '')
                    includeItem = item[this.columnToSearch].toString().indexOf(this.searchKey) !== -1
                        || this.searchKey === ''
                }
                //Search all columns
                else{
                    console.log('Item:',item)
                    Object.entries(item).map(cell => {                            
                        if ((cell[1] != null &&
                        this.searchKey != null &&
                        cell[1].toString().indexOf(this.searchKey) !== -1) || this.searchKey === ''){
                            console.log('Match no campo', cell[0], ':', cell[1])
                            includeItem = true
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
            let total = 0;
            if (this.$refs.vagasTable){
                var items = this.$refs.vagasTable.selectableItems
                items.map( item => {
                    if (item[column] !== null){
                        total += parseInt(item[column]) 
                    }
                })
            }
            return total
        },
        updateItens() {
            list().then((response) => {
                    this.items = response.data.vagas
                    this.items = this.items.map((item) => 
                            ({...item, datapublicacaoformatada: moment(item.datapublicacao).format("HH:mm:SS DD/MM/YYYY")}))
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
        uploadFile(){
            if (!this.fileuploaded){
                displayMessagePopup(this, true, 'Selecione um arquivo', 'info')
                return
            }
            upload(this.fileuploaded).then((response) => {
                displayMessagePopup(this, true, response.body.message, 'success')
                this.updateItens()
            }).catch((error) => {
                console.log(error)
                displayMessagePopup(this, true, error.body.error, 'error')
            })
        },
        closeDialogImportar () {
            this.dialogImportar = false
            this.fileuploaded = null
        },
        closeDialogColunas () {
            this.dialogColunas = false
        },
        initiateDialogImportar(){
            displayMessage(this, false, '', 'error')
            displayMessagePopup(this, false, '','error')
        },
        initiateDialogColunas(){
            displayMessage(this, false, '', 'error')
            displayMessagePopup(this, false, '','error')
        },
        deleteSelectedItens(){
            if (this.rowsSelected.length == 0){
                displayMessage(this, true, 'Selecione alguma linha', 'info')
                return
            }
            confirm('Tem certeza que deseja excluir essa(s) ' + this.rowsSelected.length + ' linha(s)?') && 
            remove(this.rowsSelected).then((response) => {
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
            remove([item]).then((response) => {
                displayMessage(this, true, response.body.message, 'success')
                let index = this.items.indexOf(item)
                this.items.splice(index, 1)
                this.originalItems = this.items.slice(0)
            }).catch(error => {
                displayMessage(this, true, error.body.error, 'error')
            })               
        }, 
        saveItem (item) {
            save(item).then((response) => {
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
        isSearchPairsFilled(){
            if (this.searchPairs.length > 0){
                var searchPairFilled = false
                this.searchPairs.map( searchPair => {
                    if (searchPair.show){
                        searchPairFilled = true
                    }
                })
                return searchPairFilled
            }

            return false
        },            
    },
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
                    groupedItem[fieldToSum] = parseInt(groupedItem[fieldToSum]) + parseInt(item[fieldToSum])
                }
            })
        })
        identicalItemsGrouped.push(groupedItem)
    }))
    return identicalItemsGrouped
}

function displayMessage(owner, showAlert, message, tipo){
    owner.showAlert = showAlert
    owner.alertMessage = message
    owner.typeAlert = tipo
}
function displayMessagePopup(owner, showAlert, message, tipo){
    owner.showAlertPopup = showAlert
    owner.alertMessagePopup = message
    owner.typeAlertPopup = tipo
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