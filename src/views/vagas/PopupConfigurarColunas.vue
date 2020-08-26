<template>    
    <v-dialog v-model="dialogConfigurarColunas" width="600px">
        <template v-slot:activator="{ on }">
            <v-btn color="success" dark class="ma-2" v-on="on" @click="initiateDialogColunas">Escolher colunas</v-btn>
        </template>                
        <v-card>
            <v-card-text>
                <v-alert :type="typeAlertPopup" dense text dismissible v-model="showAlertPopup">
                    {{alertMessagePopup}}
                </v-alert>
                        <v-chip-group column active-class="primary--text" multiple v-model="indicesColunasSelecionadas"> 
                            <v-chip v-for="column in tableConfigurableColumns" :key="column.id" filter>
                                {{ column.text }}
                            </v-chip>
                        </v-chip-group> 
                        <p class="font-weight-light mb-0"><v-icon>mdi-head-lightbulb</v-icon> A edição em tela ficará desabilita enquanto qualquer das colunas estiver desabilitada</p>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="desmarcarTodos()">Desmarcar todos</v-btn>
            <v-btn color="success" @click="updateColumns()">Ok</v-btn>
            <v-btn color="blue darken-1" text @click="closedialogConfigurarColunas">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import * as Vagas from '../../services/Vagas.js'

export default {
    props:['selectedColumns', 'tableConfigurableColumns'],
    data() {
        return {
            indicesColunasSelecionadas: [],
            planilhaAExcluir: '',
            planilhasJaCarregadas: [],
            showAlertPopup: false,
            alertMessagePopup: '',
            typeAlertPopup: 'error',  
            dialogConfigurarColunas: false,
        }
    },
    computed: {
    },
    created() {
    },
    methods: {  
        initiateDialogColunas(){
            this.indicesColunasSelecionadas = this.selectedColumns
            displayMessagePopup(this, false, '','error')
        },
        //Exclui todos os dados vinculados a determinada planilha
        excluirPlanilha(){
            if (!this.planilhaAExcluir){
                displayMessagePopup(this, true, 'Selecione uma planilha', 'info')
                return
            }
            Vagas.removePlanilha(this.planilhaAExcluir).then((response) => {
                displayMessagePopup(this, true, response.body.message, 'success')
                this.$emit('updateItens')
            }).catch((error) => {
                console.log(error)
                displayMessagePopup(this, true, error.body.error, 'error')
            })
        },   
        closedialogConfigurarColunas(){
            this.planilhaAExcluir = ''
            this.dialogConfigurarColunas = false
        },   
        desmarcarTodos(){
            this.indicesColunasSelecionadas = []
        }, 
        updateColumns(){
            this.indicesColunasSelecionadas = this.indicesColunasSelecionadas.sort((a, b) => {
                if (parseInt(a) > parseInt(b)){
                    return 1
                }
                else if (parseInt(a) === parseInt(b)){
                    return 0
                }
                return -1})
            //console.log('Indices das colunas selecionadas', this.indicesColunasSelecionadas)
            var colunasSelecionadas = []
            //console.log('this.selectedColumns:', this.selectedColumns)
            //console.log('this.tableConfigurableColumns:', this.tableConfigurableColumns)
            for (var indiceColunaSelecionada of this.indicesColunasSelecionadas){
                colunasSelecionadas.push(this.tableConfigurableColumns[indiceColunaSelecionada])
            }
            //console.log('Colunas selecionadas', colunasSelecionadas)
            this.$emit('atualizarColunas', this.indicesColunasSelecionadas, colunasSelecionadas)
            this.closedialogConfigurarColunas()
        },                      
    },    
}

function displayMessagePopup(owner, showAlert, message, type){
    owner.showAlertPopup = showAlert
    owner.alertMessagePopup = message
    owner.typeAlertPopup = type
}
</script>