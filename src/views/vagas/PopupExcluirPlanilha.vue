<template>    
    <v-dialog v-model="dialogExcluirPlanilha" max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn color="success" dark class="ma-2" v-on="on" @click="initiateDialogExcluirPlanilha">Excluir planilha</v-btn>
        </template>                 
        <v-card>
            <v-card-text>
                <v-alert :type="typeAlertPopup" dense text dismissible v-model="showAlertPopup">
                    {{alertMessagePopup}}
                </v-alert>                            
                <v-select
                    v-model="planilhaAExcluir"
                    :items="planilhasJaCarregadas"
                    label="Selecione a planilha"
                ></v-select>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="excluirPlanilha()">Excluir</v-btn>
            <v-btn color="blue darken-1" text @click="closedialogExcluirPlanilha">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import * as Vagas from '../../services/Vagas.js'

export default {
    data() {
        return {
            planilhaAExcluir: '',
            planilhasJaCarregadas: [],
            showAlertPopup: false,
            alertMessagePopup: '',
            typeAlertPopup: 'error',  
            dialogExcluirPlanilha: false,
        }
    },
    computed: {
    },
    created() {
    },
    methods: {  
        initiateDialogExcluirPlanilha(){
            Vagas.listarPlanilhas().then(response => {
                    this.planilhasJaCarregadas = response.data.planilhas
                }).catch(error => {
                    console.log(error)
                    displayMessagePopup(this, true, error.body.error, 'error')
                    if (error.status === ERROR_SESSION_EXPIRED){
                        this.$store.dispatch('ActionLogout')
                    }                
                })            
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
        closedialogExcluirPlanilha(){
            this.planilhaAExcluir = ''
            this.dialogExcluirPlanilha = false
        },                  
    },    
}

function displayMessagePopup(owner, showAlert, message, type){
    owner.showAlertPopup = showAlert
    owner.alertMessagePopup = message
    owner.typeAlertPopup = type
}
</script>