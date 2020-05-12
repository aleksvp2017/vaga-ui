<template>
    <v-container>
        <v-row>
            <v-col>
                <v-form ref="form">
                    <v-text-field 
                    label="Assunto"
                    v-model="mensagem.assunto"
                    :rules="regrasAssunto"
                    type="text"/>
                    <v-textarea 
                    label="Texto"
                    v-model="mensagem.conteudo"
                    type="text"
                    :rules="regrasConteudo"
                    />
                    <v-btn :loading="loading" :disabled="loading" color="primary" @click="mandarMensagem">Enviar</v-btn>
                    <v-spacer></v-spacer>
                    <v-alert :type="tipoAlerta" class="mt-10" dense outlined dismissible v-model="mostrarAlerta">
                        {{alerta}}
                    </v-alert>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {enviarFaleConosco} from '../../services/Mensagem'

    export default {
        data(){
            return {
                loading: false,
                mensagem: {},
                regrasAssunto: [
                    valor => !!valor || 'Assunto deve ser preenchido'
                ],
                regrasConteudo: [
                    valor => !! valor || 'Conteúdo da mensagem deve ser preenchido'
                ],
                mostrarAlerta: false,
                alerta: '',
                tipoAlerta: 'error'
            }
        },
        methods: {
            mandarMensagem(){
                let formValid = this.$refs.form.validate()
                if (!formValid){ 
                    return
                }
                this.loading = true
                enviarFaleConosco(this.mensagem).then((response) => {
                    this.alerta = response.body.message
                    this.mostrarAlerta = true
                    this.tipoAlerta = 'info'    
                    this.loading = false                
                }).catch(error => {
                    this.alerta = error.body.error
                    this.mostrarAlerta = true
                    this.tipoAlerta = 'error'
                    console.log('Error:', error)
                    this.loading = false 
                })
            }
        },
    }

</script>

<style>

</style>