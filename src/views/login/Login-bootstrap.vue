<template>
  <div>
      <div align="center" class="center">
      <b-card border-variant="info" 
         header="Entre com seu e-mail e senha" class="text-center">
      <b-form @submit.prevent="login">  
        <b-form-input
            id="email"
            v-model="credencial.email"
            type="email"
            required
            placeholder="Digite seu e-mail"
        ></b-form-input>
        <b-form-input
            id="senha"
            v-model="credencial.senha"
            type="password"
            required
            placeholder="Digite sua senha"
        ></b-form-input>  
        <br/>
        <div align="right">
          <b-button pill variant="info" type="submit">Entrar</b-button>     
        </div>
        <p style="color: red; height: absolut;" >
            {{ mensageDeErro }}
        </p>
        <div align="left" class="info" style="font-size: 12px">
          <b-link to="/recuperarsenha" active-class="info">Esqueceu sua senha?</b-link>
        </div>
        <div>
          
        </div>        
      </b-form>
    </b-card>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
          mensageDeErro: '',
          credencial :{
            email: '',
            senha: '',
          }
      }
    },
    methods : {
      ...mapActions(['ActionLogin']),
      login(){
        this.mensageDeErro = ''
        this.ActionLogin(this.credencial).then((response) => {
          this.$router.push('home')
        }).catch (error => {
          console.log(error)
          this.mensageDeErro = error.body.error
        })
      },
    }
  }</script>

<style>

.center {
  width: 20rem;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
