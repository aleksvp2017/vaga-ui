<template>
    <v-card width="400px" class="mt-5 mx-auto">
      <v-card-title class="pb-0">
        <h2>Acesso ao sistema</h2>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field 
            label="E-mail"
            v-model="credencial.email"
            type="email"
            prepend-icon="mdi-account-circle"/>
          <v-text-field 
            :type="showPassword ? 'text' : 'password'" 
            label="Senha"
            @keypress.enter="login"
            v-model="credencial.senha"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"/>
        </v-form>
      </v-card-text>
      <v-alert :type="tipoAlerta" dense outlined dismissible v-model="mostrarAlerta">
        {{alerta}}
      </v-alert>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" @click="registrar">Registrar</v-btn>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" :disabled="loading" @click="recuperarSenha" color="warning">Recuperar senha</v-btn>
        <v-btn color="info" @click="login">Entrar</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
  import {mapActions} from 'vuex'
  import { routes, obterRota } from '../../routes.js'
  import {recuperarSenha} from '../../services/Autenticador'

  export default {
    data() {
      return {
        loading: false,
        mostrarAlerta: false,
        alerta: '',
        tipoAlerta: 'error',
        credencial :{
          email: '',
          senha: '',
        },
        showPassword: false
      }
    },
    methods : {
      ...mapActions(['ActionLogin']),
      login(){
        this.alerta = ''
        this.ActionLogin(this.credencial).then((response) => {
          this.$router.push(obterRota('Vagas'))
        }).catch (error => {
          console.log('Error: ', error)
          this.alerta = error.body.error
          this.tipoAlerta = "error"
          this.mostrarAlerta = true
        })
      },
      recuperarSenha(){
        if (!this.credencial.email){
          this.alerta = 'Preencha o email',
          this.tipoAlerta = 'error'
          this.mostrarAlerta = true
          return
        }
        this.loading = true
        recuperarSenha(this.credencial.email).then(response => {
          this.alerta = response.body.message
          this.tipoAlerta = 'info'
          this.mostrarAlerta = true        
          this.loading = false
        }).catch( error => {
          this.alerta = error.body.error
          this.tipoAlerta = 'error'
          this.mostrarAlerta = true                  
          this.loading = false
        })
      },      
      registrar(){
        this.$router.push(obterRota('Registrar'))
        /*this.alerta = "Funcionalidade em desenvolvimento"
        this.tipoAlerta = "info"
        this.mostrarAlerta = true*/
      }
    }
  }

</script>



<style>
</style>
