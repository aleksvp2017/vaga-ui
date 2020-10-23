<<template>
    <v-card>
        <v-alert :type="tipoAlerta" dense text dismissible v-model="mostraAlerta">
            {{mensagemAlerta}}
        </v-alert>         
        <v-data-table
            show-select
            v-model="linhasSelecionadas"
            class="elevation-1"
            :carregando="carregando"
            :headers="colunasDaTabela"
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
                    <v-btn color="primary" dark class="ma-2" @click="gerarNovaSenha">Gerar nova senha</v-btn> 
                    <v-btn color="primary" dark class="ma-2" @click="apagarItensSelecionados">Excluir</v-btn> 
                    <!-- POPUP EDICAO -->
                    <v-dialog v-model="mostrarPopupEdicao" max-width="800px" height="1000px" scrollable>
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="ma-2" v-on="on" @click="inicializarPopupCadastro">Adicionar</v-btn>
                        </template>                
                        <v-card>
                            <v-card-text>
                                <v-alert :type="tipoAlertaPopup" dense text dismissible v-model="mostraPopupAlerta">
                                    {{mensagemAlertaPopup}}
                                </v-alert>
                                <v-row>
                                    <v-col>
                                        <v-form ref="formulario">
                                            <v-text-field 
                                            label="Nome"
                                            v-model="usuario.nome"
                                            @keypress.enter="salvarItem"
                                            :rules="regrasNome"
                                            type="text"/>
                                            <v-text-field 
                                            label="E-mail"
                                            v-model="usuario.email"
                                            type="email"
                                            @keypress.enter="salvarItem"
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
                            <v-btn color="primary" @click="salvarItem">Salvar</v-btn>
                            <v-btn color="blue darken-1" text @click="fecharPopupCadastro">Fechar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- FIM POPUP EDICAO -->                                  
                </v-toolbar>
            </template>  
            <template #item.actions="{item}">
                <v-icon small class="mr-2" @click="editarItem(item)">mdi-pencil</v-icon>
            </template>                   
        </v-data-table>  
    </v-card>
</template>

<script>
    import {colunas, listarUsuarios, excluirUsuarios, incluirUsuarios, alterarUsuario} from '../../services/Usuario.js'
    import {ERROR_SESSION_EXPIRED} from '../../services/Constantes.js'
    import {recuperarSenha} from '../../services/Autenticador.js'

    export default {
        data() {
            return {
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
                usuario:{},
                mostrarPopupEdicao: false,
                regrasNome: [
                    valor => !!valor || 'Nome deve ser preenchido'
                ],
                regrasEmail: [
                    valor => !! valor || 'E-mail deve ser preenchido'
                ],                
            }
        },  
        created () {
            this.colunasDaTabela = colunas()
            this.atualizarItens()
        },
        methods: {
            inicializarPopupCadastro(){
                this.usuario = {}
                atualizarMensagemPopup(this, false)
                if (this.$refs.formulario){
                    this.$refs.formulario.reset()
                }
            },
            editarItem(item){
                this.usuario = item
                atualizarMensagemPopup(this, false)
                this.mostrarPopupEdicao = true
            },
            salvarItem(){
                let formularioValido = this.$refs.formulario.validate()
                if (!formularioValido){ 
                    return
                }
                if (this.usuario.usuarioid == null){
                    incluirUsuarios(this.usuario).then((response) => {
                        atualizarMensagemPopup(this, true, response.body.mensagem, 'success')
                        this.usuario = response.body.usuario
                        this.atualizarItens()
                    }).catch(error => {
                        atualizarMensagemPopup(this, true, error.body.error, 'error')
                    })  
                }
                else{
                   alterarUsuario(this.usuario).then((response) => {
                        atualizarMensagemPopup(this, true, response.body.mensagem, 'success')
                        this.atualizarItens()
                    }).catch(error => {
                        atualizarMensagemPopup(this, true, error.body.error, 'error')
                    })   
                }
            },
            fecharPopupCadastro(){
                this.mostrarPopupEdicao = false
            },   
            gerarNovaSenha(){
                if (this.linhasSelecionadas.length !== 1){
                    atualizarMensagem(this, true, 'Selecione um item', 'info')
                    return
                }
                recuperarSenha(this.linhasSelecionadas[0].email).then((response) => {
                    this.linhasSelecionadas = []
                    atualizarMensagem(this, true, response.body.mensagem, 'success')
                    this.atualizarItens()
                }).catch(error => {
                    atualizarMensagem(this, true, error.body.error, 'error')
                })  
            },              
            apagarItensSelecionados(){
                if (this.linhasSelecionadas.length == 0){
                    atualizarMensagem(this, true, 'Selecione algum item', 'info')
                    return
                }
                confirm('Tem certeza que deseja excluir esse(s) ' + this.linhasSelecionadas.length + ' item(s)?') && 
                excluirUsuarios(this.linhasSelecionadas).then((response) => {
                    this.linhasSelecionadas = []
                    atualizarMensagem(this, true, response.body.mensagem, 'success')
                    this.atualizarItens()
                }).catch(error => {
                    atualizarMensagem(this, true, error.body.error, 'error')
                })  
            },
            atualizarItens() {
                listarUsuarios().then((response) => {
                        this.items = response.data.usuarios
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