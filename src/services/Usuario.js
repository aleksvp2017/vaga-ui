import Vue from 'vue'
import VueResource from 'vue-resource'
import store from '../store'
import {BASE_BACKEND_URL} from './Constantes.js'
import { encripta } from './Autenticador'

Vue.use(VueResource)
const http = Vue.http


async function alterarSenha(usuario, senhaNova){
    console.log('alterar senha', usuario, senhaNova)
    return  http.post(BASE_BACKEND_URL + 'alterarSenha', 
                {
                    usuario: {...usuario, senha: encripta(usuario.senha)}, 
                    senhaNova: encripta(senhaNova)}
            )
}

async function alterarUsuario(usuario){
    return  http.post(BASE_BACKEND_URL + 'usuarios/:' + usuario.id, {usuario: usuario})
}

async function excluirUsuario(usuario){
    return  http.delete(BASE_BACKEND_URL + 'usuarios/' + usuario.usuarioid)
}

async function registrar(usuario){
    return  http.post(BASE_BACKEND_URL + 'usuarios', {usuario: {...usuario, senha: encripta(usuario.senha)}})
}



function obterUsuario(){
    return store.state.user
}

export {
    obterUsuario, alterarUsuario, excluirUsuario, alterarSenha, registrar
}