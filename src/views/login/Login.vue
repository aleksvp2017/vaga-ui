<template>
  <div style="background-color: #00254A; height: 100%;" >
    <v-img src='/src/img/blue2.jpg' aspect-radio="1.75">
      <v-row class="pt-12">  
          <v-col class="text-center mt-12">
              <span style="color:#b4e4e3;font-size:60px;font-family: 'Montserrat';" >
                  SISTEMA DE VAGAS
              </span>
              <br/>
              <span style="color:#b4e4e3;font-family: 'Montserrat';">
                <h3>Acompanhe e analise as vagas ofertadas pela Secretaria</h3>
              </span>
          </v-col>
      </v-row>  
      <v-container>
        <v-row justify="space-around">
          <v-card width="400px" align="center" >
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
              <v-btn color="primary" @click="registrar">Registrar</v-btn>
              <v-spacer></v-spacer>
              <v-btn :loading="loading" :disabled="loading" @click="recuperarSenha" color="warning">Recuperar senha</v-btn>
              <v-btn color="info" @click="login">Entrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-container>
    </v-img>
  </div>
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
          this.$router.push(obterRota('HomePainel'))
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
