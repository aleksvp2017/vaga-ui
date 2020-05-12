import Vue from 'vue'
import VueResource from 'vue-resource'
 

Vue.use(VueResource)
const http = Vue.http
import {BASE_BACKEND_URL} from './Constantes.js'

function upload(file){
    let formData = new FormData()
    //esse parametro tem que coincidir com o lido pelo muter no backend
    formData.append('fileuploaded', file)
    return http.post(BASE_BACKEND_URL + 'vagas/importar', formData)
}

async function list(){
    return http.get(BASE_BACKEND_URL + 'vagas')
}

async function remove(vagas){
    return  http.delete(BASE_BACKEND_URL + 'vagas/', {body:{vagas}})
}

async function save(vaga){
    return http.post(BASE_BACKEND_URL + 'vagas/' + (vaga.vagaid ? (':' + vaga.vagaid) : ''), {vaga})
}

function columns(){
    return [  
        {
            text: 'ANO',
            value: 'ano',
          
        },           
        {
            text: 'UF',
            value: 'uf',
          
        },
        {
          text: 'SALDO',
          value: 'saldo',
        },
        {
            text: 'VALOR APROVADO',
            value: 'valoraprovado',
        },
        {
            text: 'APROVADA',
            value: 'aprovada',
        },
        {
            text: 'HOMOLOGADA',
            value: 'homologada',
        },
        {
            text: 'MATRÍCULA REALIZADA',
            value: 'matricularealizada',
        },
        {
            text: 'MODALIDADE',
            value: 'modalidade',
        },
        {
            text: 'TIPO',
            value: 'tipo',
        },
        {
            text: 'DATA',
            value: 'datapublicacao'
        },
        {
            text: 'Actions',
            value: 'actions', 
            sortable: false
        }        
      ]
}

export {
    upload, list, columns, remove, save
}