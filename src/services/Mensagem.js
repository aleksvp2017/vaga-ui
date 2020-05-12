import Vue from 'vue'
import VueResource from 'vue-resource'
import store from '../store'
import {BASE_BACKEND_URL, FALE_CONOSCO_EMAIL} from './Constantes.js'

Vue.use(VueResource)
const http = Vue.http


async function enviarFaleConosco(mensagem){
    console.log(mensagem)
    return enviarMensagem('Fale consoco', mensagemFormatada({...mensagem, usuario: store.state.user.email}), FALE_CONOSCO_EMAIL)
}

async function enviarMensagem(assunto, mensagem, destinatario){
    console.log(assunto, mensagem, destinatario)
    return  http.post(BASE_BACKEND_URL + 'mensagem', {assunto, mensagem, destinatario})
}


function mensagemFormatada(mensagem){
    return "Mensagem enviada por " + mensagem.usuario + "<br/>" +
           "Assunto: " + mensagem.assunto + "<br/>" +
           "Conteúdo: " + mensagem.conteudo
}


export {
    enviarMensagem, enviarFaleConosco
}