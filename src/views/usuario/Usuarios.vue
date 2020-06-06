<<template>
    <v-card>
        <v-alert :type="typeAlert" dense text dismissible v-model="showAlert">
            {{alertMessage}}
        </v-alert>         
        <v-data-table
            show-select
            v-model="rowsSelected"
            class="elevation-1"
            :loading="loading"
            :headers="tableColumns"
            :items="items"
            item-key="usuarioid"
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
                    <v-btn color="success" dark class="ma-2" @click="deleteSelectedItens">Excluir</v-btn> 
                    <!-- IMPORTAR -->
                    <v-dialog v-model="dialogEdit" max-width="800px" height="1000px" scrollable>
                        <template v-slot:activator="{ on }">
                            <v-btn color="success" dark class="ma-2" v-on="on" @click="initiateDialog">Adicionar</v-btn>
                        </template>                
                        <v-card>
                            <v-card-text>
                                <v-alert :type="typeAlertPopup" dense text dismissible v-model="showAlertPopup">
                                    {{alertMessagePopup}}
                                </v-alert>
                                <v-row>
                                    <v-col>
                                        <v-form ref="form">
                                            <v-text-field 
                                            label="Nome"
                                            v-model="usuario.nome"
                                            :rules="regrasNome"
                                            type="text"/>
                                            <v-text-field 
                                            label="E-mail"
                                            v-model="usuario.email"
                                            type="email"
                                            :rules="regrasEmail"
                                            />
                                            <v-switch
                                                v-model="usuario.snativo"
                                                label="Ativo"
                                            ></v-switch>                                            
                                            <v-spacer></v-spacer>
                                        </v-form>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="saveItem">Salvar</v-btn>
                            <v-btn color="blue darken-1" text @click="closeDialog">Fechar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- FIM IMPORTAR -->                                  
                </v-toolbar>
            </template>  
            <template #item.actions="{item}">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            </template>                   
        </v-data-table>  
    </v-card>
</template>

<script>
    import {columns, list, excluirUsuarios, incluir, alterarUsuario} from '../../services/Usuario.js'
    import {ERROR_SESSION_EXPIRED} from '../../services/Constantes.js'

    export default {
        data() {
            return {
                showAlert: false,
                alertMessage: '',
                typeAlert: 'success',
                showAlertPopup: false,
                alertMessagePopup: '',
                typeAlertPopup: 'success',
                rowsSelected:[],
                loading: true,
                tableColumns: [],
                items:[],
                usuario:{},
                dialogEdit: false,
                regrasNome: [
                    valor => !!valor || 'Nome deve ser preenchido'
                ],
                regrasEmail: [
                    valor => !! valor || 'E-mail deve ser preenchido'
                ],                
            }
        },  
        created () {
            this.updateItens()
            this.tableColumns = columns()
            console.log(this.tableColumns)
        },
        methods: {
            initiateDialog(){
                this.usuario = {}
                displayMessagePopup(this, false)
                if (this.$refs.form){
                    this.$refs.form.reset()
                }
            },
            editItem(item){
                this.usuario = item
                displayMessagePopup(this, false)
                this.dialogEdit = true
            },
            saveItem(){
                let formValid = this.$refs.form.validate()
                if (!formValid){ 
                    return
                }
                console.log(this.usuario)
                if (this.usuario.usuarioid == null){
                    incluir(this.usuario).then((response) => {
                        displayMessagePopup(this, true, response.body.message, 'success')
                        this.usuario = response.body.usuario
                        this.updateItens()
                    }).catch(error => {
                        displayMessagePopup(this, true, error.body.error, 'error')
                    })  
                }
                else{
                    console.log('Alterando usuario')
                   alterarUsuario(this.usuario).then((response) => {
                        displayMessagePopup(this, true, response.body.message, 'success')
                        console.log(response.body.usuario)
                        this.updateItens()
                    }).catch(error => {
                        displayMessagePopup(this, true, error.body.error, 'error')
                    })   
                }
            },
            closeDialog(){
                this.dialogEdit = false
            },     
            deleteSelectedItens(){
                if (this.rowsSelected.length == 0){
                    displayMessage(this, true, 'Selecione algum item', 'info')
                    return
                }
                confirm('Tem certeza que deseja excluir esse(s) ' + this.rowsSelected.length + ' item(s)?') && 
                excluirUsuarios(this.rowsSelected).then((response) => {
                    this.rowsSelected = []
                    displayMessage(this, true, response.body.message, 'success')
                    this.updateItens()
                }).catch(error => {
                    displayMessage(this, true, error.body.error, 'error')
                })  
            },
            updateItens() {
                list().then((response) => {
                        this.items = response.data.usuarios
                        this.loading = false
                    }).catch((error) => {
                        this.loading = false
                        console.log('Deu pala', error)
                        displayMessage(this, true, error.body.error, 'error')
                        if (error.status === ERROR_SESSION_EXPIRED){
                            this.$store.dispatch('ActionLogout')
                        }                
                })            
            },             
        },  
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

<style >

</style>