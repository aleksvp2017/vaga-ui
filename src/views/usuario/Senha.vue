<template>
    <v-container>
        <v-row>
            <v-col>
                <v-form ref="form">
                    <v-text-field 
                        :type="showPassword ? 'text' : 'password'" 
                        label="Senha atual"
                        @keypress.enter="mudarSenha"
                        v-model="usuario.senha"
                        prepend-icon="mdi-lock"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"/>
                    <v-text-field 
                        :type="showPassword ? 'text' : 'password'" 
                        label="Nova Senha"
                        @keypress.enter="mudarSenha"
                        v-model="senhaNova"
                        prepend-icon="mdi-lock"
                        :rules="regraNovaSenha"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"/> 
                    <v-text-field 
                        :type="showPassword ? 'text' : 'password'" 
                        label="Confirmar Senha"
                        @keypress.enter="mudarSenha"
                        v-model="confirmacaoSenha"
                        prepend-icon="mdi-lock"
                        :rules="regraConfirmacaoSenha"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"/>                                               
                    <v-btn color="primary" @click="mudarSenha">Alterar</v-btn>
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
    import {obterUsuario, alterarSenha} from '../../services/Usuario'

    export default {
        data(){
            return {
                showPassword: false,
                usuario: {},
                senhaNova: '',
                confirmacaoSenha: '',
                mostrarAlerta: false,
                alerta: '',
                tipoAlerta: 'error',
                regraNovaSenha: [
                    valor => !!valor || 'Nova senha deve ser preenchida',
                ],
                regraConfirmacaoSenha: [
                    valor => !!valor || 'Confirmação da senha deve ser preenchida'
                ]
                    
            }
        },
        methods: {
            mudarSenha(){
                let formValid = this.$refs.form.validate()
                if (!formValid){ 
                    return
                }                
                if (this.senhaNova != this.confirmacaoSenha){
                    this.alerta = 'Nova senha e confirmação devem ser iguais'
                    this.mostrarAlerta = true
                    this.tipoAlerta = 'error'
                    return 
                }
                alterarSenha(this.usuario, this.senhaNova).then((response) => {
                    this.alerta = response.body.message
                    this.mostrarAlerta = true
                    this.tipoAlerta = 'info'                    
                }).catch(error => {
                    this.alerta = error.body.error
                    this.mostrarAlerta = true
                    this.tipoAlerta = 'error'
                    console.log('Error:', error)
                })
            },
        },
        created() {
            this.usuario = obterUsuario()    
        },
    }

</script>

<style>

</style>