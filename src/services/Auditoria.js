import Vue from 'vue'
import VueResource from 'vue-resource'
import {BASE_BACKEND_URL} from './Constantes.js'

Vue.use(VueResource)
const http = Vue.http


function listarRegistrosAuditoria(){
    return http.get(BASE_BACKEND_URL + 'auditoria')
}

function colunas(){
    var itemId = 0
    return [  
        {
            id: itemId++,
            text: 'AUDITORIAID',
            value: 'auditoriaid',
        },           
        {
            id: itemId++,
            text: 'USUÁRIO',
            value: 'usuario',
        },
        {
            id: itemId++,
            text: 'MÉTODO',
            value: 'metodo',
        },        
        {
            id: itemId++,
            text: 'DATA HORA',
            value: 'datahora',
        },    
        {
            id: itemId++,
            text: 'MENSAGEM',
            value: 'mensagem',
        },            
        {
            id: itemId++,
            text: 'ERRO',
            value: 'erro',
        },                     
      ]
}

export {
    colunas, listarRegistrosAuditoria
}