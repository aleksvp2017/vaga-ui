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
                </v-toolbar>
            </template>       
        </v-data-table>  
    </v-card>
</template>

<script>
    import {columns, list, excluirUsuarios} from '../../services/Usuario.js'
    import {ERROR_SESSION_EXPIRED} from '../../services/Constantes.js'

    export default {
        data() {
            return {
                showAlert: false,
                alertMessage: '',
                typeAlert: 'success',
                rowsSelected:[],
                loading: true,
                tableColumns: [],
                items:[]
            }
        },  
        created () {
            this.updateItens()
            this.tableColumns = columns()
            console.log(this.tableColumns)
        },
        methods: {
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

</script>

<style >

</style>