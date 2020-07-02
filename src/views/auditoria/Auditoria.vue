<<template>
    <v-card>
        <v-alert :type="tipoAlerta" dense text dismissible v-model="mostraAlerta">
            {{mensagemAlerta}}
        </v-alert> 
        <v-card-title>
        Registros de auditoria
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        </v-card-title>
        <v-data-table
            v-model="linhasSelecionadas"
            :search="search"
            class="elevation-1"
            :carregando="carregando"
            :headers="colunasDaTabela"
            :items="items"
            item-key="auditoriaid"
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
                </v-toolbar>
            </template>  
            <template #item.datahora="{item}">
                {{item.datahoraformatada}}
            </template>             
        </v-data-table>  
    </v-card>
</template>

<script>
    import {colunas, listarRegistrosAuditoria} from '../../services/Auditoria.js'
    import {ERROR_SESSION_EXPIRED} from '../../services/Constantes.js'
    import moment from 'moment'

    export default {
        data() {
            return {
                search: '',
                mostraAlerta: false,
                mensagemAlerta: '',
                tipoAlerta: 'success',
                mostraPopupAlerta: false,
                mensagemAlertaPopup: '',
                tipoAlertaPopup: 'success',
                linhasSelecionadas:[],
                carregando: true,
                colunasDaTabela: [],
                items:[],
            }
        },  
        created () {
            this.colunasDaTabela = colunas()
            this.atualizarItens()
        },
        methods: {
            atualizarItens() {
                listarRegistrosAuditoria().then((response) => {
                        this.items = response.data.registrosAuditoria
                        this.items = this.items.map((item) => 
                            ({...item, datahoraformatada: moment(item.datahora).format("HH:mm:SS DD/MM/YYYY")}))
                        this.carregando = false
                    }).catch((error) => {
                        this.carregando = false
                        atualizarMensagem(this, true, error.body.error, 'error')
                        if (error.status === ERROR_SESSION_EXPIRED){
                            this.$store.dispatch('ActionLogout')
                        }                
                })            
            },             
        },  
    }

function atualizarMensagem(owner, mostraAlerta, message, type){
    owner.mostraAlerta = mostraAlerta
    owner.mensagemAlerta = message
    owner.tipoAlerta = type
}

function atualizarMensagemPopup(owner, mostraAlerta, message, type){
    owner.mostraPopupAlerta = mostraAlerta
    owner.mensagemAlertaPopup = message
    owner.tipoAlertaPopup = type
}

</script>

<style >

</style>