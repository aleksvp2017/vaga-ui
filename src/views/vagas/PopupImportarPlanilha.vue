<template>    
    <v-dialog v-model="dialogImportar" scrollable width="600">
        <template v-slot:activator="{ on }">
            <v-btn color="success" dark class="ma-2" v-on="on" @click="initiateDialogImportarPlanilha">Importar</v-btn>
        </template>         
        <v-card height="600px">
            <v-card-text>
                <v-alert :type="typeAlertPopup" dense text dismissible v-model="showAlertPopup">
                    {{alertMessagePopup}}                                                             
                </v-alert>                            
                <v-form ref="formularioImportacao">                            
                    <v-text-field label="Nome da aba / página da planilha" v-model="planilha.nomeAba" 
                        :persistent-hint=true 
                        hint="Caso não seja preenchido, sistema utilizará a primeira aba da planilha"
                        @keypress.enter="uploadFile()" type="text"/>
                    <v-text-field label="Período pactuação" v-model="planilha.periodoPactuacao" 
                        :persistent-hint=true
                        :hint="periodoPactuacaoHint"
                        @keypress.enter="uploadFile()" type="text"/>  
                    <v-text-field label="Data aprovação" v-model="planilha.dataAprovacao" 
                        :rules="regrasData"
                        :persistent-hint=true hint="Caso não seja preenchido, sistema procurará a coluna na planilha"
                                @keypress.enter="uploadFile()" type="text" v-mask="'##/##/####'"/>  
                    <v-text-field label="Data matrícula" v-model="planilha.dataMatricula" 
                        :rules="regrasData"
                        :persistent-hint=true hint="Caso não seja preenchido, sistema procurará a coluna na planilha"
                                @keypress.enter="uploadFile()" type="text" v-mask="'##/##/####'"/>  
                    <v-text-field label="SEI" v-model="planilha.sei" 
                                @keypress.enter="uploadFile()" type="text"/>   
                    <v-text-field label="TED" v-model="planilha.ted" 
                                @keypress.enter="uploadFile()" type="text"/>                                                                 
                    <v-switch
                        v-model="planilha.snContrapartida"
                        label="Matrículas de contrapartida"
                    ></v-switch> 
                    <!--<v-switch
                        v-model="planilha.snAlterarRegistrosExistentes"
                        label="Alterar registros existentes?"
                    ></v-switch> -->                    
                    <v-file-input v-model="fileuploaded" label="Escolha a planilha a ser importada*"></v-file-input>
                </v-form>
                <v-dialog v-model="dialogDetalhesImportacao" max-width="900px">
                    <v-card>
                        <v-card-title>Detalhes da importação</v-card-title>
                        <v-card-text>
                            <v-simple-table dense>
                                <template v-slot:default>
                                <thead>
                                    <tr>
                                    <th class="text-left">Item</th>
                                    <th class="text-left">Detalhe</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in resumoImportacao" :key="item.nome">
                                        <td>{{ item.nome }}</td>
                                        <td>{{ item.detalhe }}</td>
                                    </tr>
                                </tbody>
                                </template>
                            </v-simple-table>                                                                                
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" text @click="dialogDetalhesImportacao = false">Fechar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="uploadFile()"
                    :loading="importandoPlanilha" :disabled="importandoPlanilha">Enviar</v-btn>
                <v-btn color="info" @click="dialogDetalhesImportacao = true" v-show="resumoImportacao != ''">Detalhes</v-btn>                                
                <v-btn color="blue darken-1" text @click="closeDialogImportar">Fechar</v-btn>
                
            </v-card-actions>
        </v-card>
    </v-dialog>    
</template>

<script>
import * as Vagas from '../../services/Vagas.js'
import {mask} from 'vue-the-mask'
import moment  from 'moment'

export default {
    directives: {mask},
    data() {
        return {
            fileuploaded: null,
            planilha:{
                snContrapartida: false,
                snAlterarRegistrosExistentes: false,
            },
            dialogDetalhesImportacao: false,
            resumoImportacao: '',
            importandoPlanilha: false,
            showAlertPopup: false,
            alertMessagePopup: '',
            typeAlertPopup: 'error',  
            regrasData: [
                (valor) => {
                    if (valor){
                        return moment(valor, "DD/MM/YYYY", true).isValid()
                    }
                    return true    
                }
            ],
            periodoPactuacaoHint: '',
            dialogImportar: false,
        }
    },
    computed: {
    },
    methods: {   
        initiateDialogImportarPlanilha() {
            //displayMessage(this, false, '', 'error')
            displayMessagePopup(this, false, '','error')
            this.resumoImportacao = ''
            this.dialogDetalhesImportacao = false    
            this.planilha = {
                snContrapartida: false,
                snAlterarRegistrosExistentes: false,
            }   
            Vagas.obterPeriodoPactuacaoAberto().then(response => {
                this.periodoPactuacaoHint = 'Caso não seja preenchido, sistema procurará a coluna na planilha ou utilizará o período atualmente aberto: ' 
                        + response.data.periodopactuacao.nome
            }).catch(error => {
                console.log(error)
                displayMessage(this, true, error.body.error, 'error')
                if (error.status === ERROR_SESSION_EXPIRED){
                    this.$store.dispatch('ActionLogout')
                }                
            })

        },        
        closeDialogImportar(){
            this.planilhaAExcluir = ''
            this.dialogImportar = false
        },
        uploadFile(){
            this.importandoPlanilha = true
            let formularioValido = this.$refs.formularioImportacao.validate()
            if (!formularioValido){ 
                return
            }
            if (!this.fileuploaded){
                displayMessagePopup(this, true, 'Selecione um arquivo', 'info')
                return
            }
            // if (!this.planilha.nomeAba){
            //     displayMessagePopup(this, true, 'Entre com o nome da aba dos dados na planilha', 'info')
            //     return
            // }
            console.log('Planilha:', this.planilha)
            Vagas.upload(this.fileuploaded, this.planilha).then((response) => {
                displayMessagePopup(this, true, response.body.message, 'success')
                this.resumoImportacao = response.body.detalheMensagem
                this.importandoPlanilha = false
                this.$emit('updateItens')                
            }).catch((error) => {
                console.log(error)
                displayMessagePopup(this, true, error.body.error, 'error')
                this.importandoPlanilha = false
            })
        },                        
    },    
}

function displayMessagePopup(owner, showAlert, message, type){
    owner.showAlertPopup = showAlert
    owner.alertMessagePopup = message
    owner.typeAlertPopup = type
}
</script>