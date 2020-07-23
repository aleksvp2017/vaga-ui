import Vue from 'vue'
import VueResource from 'vue-resource'
import {BASE_BACKEND_URL} from './Constantes.js'

Vue.use(VueResource)
const http = Vue.http


function obterMenu(usuario){
    return http.get(BASE_BACKEND_URL + 'menu',{params: {usuario: usuario}})
}



export {
    obterMenu
}