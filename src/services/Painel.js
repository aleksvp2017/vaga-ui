import Vue from 'vue'
import VueResource from 'vue-resource'
import {BASE_BACKEND_URL} from './Constantes.js'

Vue.use(VueResource)
const http = Vue.http


async function incluirConsultaPainel(consultaPainel){
    return  http.post(BASE_BACKEND_URL + 'painel/incluir', {consultaPainel})
}


export {
    incluirConsultaPainel
}