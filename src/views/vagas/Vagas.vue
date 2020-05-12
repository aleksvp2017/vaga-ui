<template>
<v-card>

    <v-alert :type="typeAlert" dense text dismissible v-model="showAlert">
        {{alertMessage}}
    </v-alert> 
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchKey"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    
    <v-data-table
        show-select
        v-model="selected"
        class="mt-10"
        :loading="loading"
      :headers="tableColumns"
      :items="items"
      item-key="vagaid"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-arrow-left',
        nextIcon: 'mdi-arrow-right'}"
      :search="searchKey">
        <!-- IMPORTAR -->
        <template v-slot:top>
        <v-toolbar flat color="white">
            <v-divider
            class="mx-4"
            inset
            vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="ma-2" @click="deleteSelectedItens">Excluir</v-btn>
            <v-dialog v-model="dialog" max-width="800px" height="1000px" scrollable>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="ma-2" v-on="on" @click="initiateDialog">Importar</v-btn>
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
                    <v-btn color="blue darken-1" text @click="closeDialog">Fechar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        </template>      
        <!-- FIM IMPORTAR -->
        <!-- ANO -->
        <template #item.ano="{item}">
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
                    <v-text-field
                    v-model="item.saldo"
                    label="Edit"
                    single-line
                    counter
                    ></v-text-field>
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
                    <v-text-field
                    v-model="item.valoraprovado"
                    label="Edit"
                    single-line
                    counter
                    ></v-text-field>
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
    </v-data-table>    
</v-card>

</template>

<script>
import {upload, list, columns, remove, save} from '../../services/Vagas.js'
import moment  from 'moment'
import {ERROR_SESSION_EXPIRED} from '../../services/Constantes.js'

export default {
    data() {
        return {
            selected: [],
            loading: true,
            searchKey:'',
            dialog: false,
            items:[],
            fileuploaded: null,
            showAlert: false,
            alertMessage: '',
            typeAlert: 'success',
            showAlertPopup: false,
            alertMessagePopup: '',
            typeAlertPopup: 'error',            
        }
    },
    created () {
        this.updateItens();
    },
    computed: {
        tableColumns(){
            return columns()
        }
    },
    methods: {
        updateItens() {
            list().then((response) => {
                    this.items = response.data.vagas
                    this.items = this.items.map((item) => 
                            ({...item, datapublicacaoformatada: moment(item.datapublicacao).format("HH:mm:SS DD/MM/YYYY")}))
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
        closeDialog () {
            this.dialog = false
            this.fileuploaded = null
        },
        initiateDialog(){
            displayMessage(this, false, '', 'error')
            displayMessagePopup(this, false, '','error')
        },
        deleteSelectedItens(){
            if (this.selected.length == 0){
                displayMessage(this, true, 'Selecione alguma linha', 'info')
                return
            }
            confirm('Tem certeza que deseja excluir essa(s) ' + this.selected.length + ' linha(s)?') && 
            remove(this.selected).then((response) => {
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
            }).catch(error => {
                displayMessage(this, true, error.body.error, 'error')
            })               
        }, 
        saveItem (item) {
            var itemToSave = item
            delete itemToSave.datapublicacaoformatada
            save(itemToSave).then((response) => {
                displayMessage(this, true, response.body.message, 'success')
            }).catch(error => {
                displayMessage(this, true, error.body.error, 'error')
            })               
        },        
        editField(){
        },
        closeEditField(){
        },
        cancelEditField(){
        },      
    },
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