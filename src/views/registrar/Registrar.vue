<template>
    <v-container>
        <v-row>
            <v-col>
                <v-form ref="form">
                    <v-text-field 
                    label="Nome"
                    v-model="usuario.nome"
                    :rules="regrasNome"
                    type="text"/>
                    <!--
                    <v-file-input label="Foto"/>
                    <v-autocomplete
                        :items="ufs"
                        v-model="usuario.uf"
                        label="UF"/>-->
                    <!--<v-text-field label="Data de nascimento" v-model="usuario.datanascimento" readonly="true"/>
                    <v-date-picker v-model="usuario.datanascimento" locale="pt-br"/>-->
                    <v-text-field 
                    label="E-mail"
                    v-model="usuario.email"
                    type="email"
                    :rules="regrasEmail"
                    />
                    <v-text-field 
                    :type="showPassword ? 'text' : 'password'" 
                    label="Senha"
                    v-model="usuario.senha"
                    :rules="regrasSenha"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"/>
                    <v-checkbox label="Concordo com os termos e condições" v-model="termos" :rules="regrasTermos"/>
                    <v-btn color="primary" @click="registrar">Enviar</v-btn>
                    <v-btn color="warning" @click="limpar">Limpar</v-btn>
                    <v-spacer></v-spacer>
                    <v-alert :type="tipoAlerta" class="mt-10" dense outlined dismissible v-model="mostrarAlerta">
                        {{mensagemAlerta}}
                    </v-alert>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {registrarUsuario} from '../../services/Usuario'
    import Validator from 'validator'

    export default {
        data(){
            return {
                showPassword: false,
                usuario: {},
                regrasNome: [
                    valor => !!valor || 'Nome deve ser preenchido'
                ],
                regrasEmail: [
                    valor => !! valor || 'E-mail deve ser preenchido',
                    valor => !! Validator.isEmail(valor) || 'Não é um email válido'
                ],
                termos: false,
                regrasTermos: [
                    valor => !!valor || 'Você deve concordar com os termos e condições para se registrar'
                ],
                regrasSenha:[
                    valor => !!valor || 'Senha deve ser preenchida'
                ],
                mostrarAlerta: false,
                mensagemAlerta: '',
                tipoAlerta: 'error'
            }
        },
        methods: {
            registrar(){
                let formularioValido = this.$refs.form.validate()
                if (!formularioValido){ 
                    return
                }
                registrarUsuario(this.usuario).then((response) => {
                    this.mensagemAlerta = response.body.mensagem + '. Você receberá uma mensagem no e-mail registrado quando seu cadastro for aprovado.'
                    this.mostrarAlerta = true
                    this.tipoAlerta = 'info'   
                }).catch(error => {
                    this.mensagemAlerta = error.body.error
                    this.mostrarAlerta = true
                    this.tipoAlerta = 'error'
                    console.log('Error:', error)
                })
            },
            limpar(){
                this.$refs.form.reset()
            }
        }
    }  
</script>

<style>

</style>