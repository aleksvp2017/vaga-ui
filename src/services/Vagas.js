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

const fieldsToSum = ['saldo', 'valoraprovado', 'aprovada', 'homologada',  'matricularealizada']

const fieldsToDetermineEquality = ['ano', 'uf', 'tipo', 'modalidade']

function columns(){
    return [  
        {
            id: 1,
            text: 'ANO',
            value: 'ano',
            width: '80px',
            selected: true,
        },           
        {
            id: 2,
            text: 'UF',
            value: 'uf',
            selected: true,
        },
        {
            id: 3,
            text: 'SALDO',
            value: 'saldo',
            selected: true,
        },
        {
            id: 4,
            text: 'VALOR APROVADO',
            value: 'valoraprovado',
            width: '200px',
            selected: true,
        },
        {
            id: 5,
            text: 'APROVADA',
            value: 'aprovada',
            width: '120px',
            selected: true,
        },
        {
            id: 6,
            text: 'HOMOLOGADA',
            value: 'homologada',
            width: '140px' ,
            selected: true,           
        },
        {
            id: 7,
            text: 'REALIZADA',
            value: 'matricularealizada',
            width: '120px',
            selected: true,           
        },
        {
            id: 8,
            text: 'MODALIDADE',
            value: 'modalidade',
            width: '130px',
            selected: true,            
        },
        {
            id: 9,
            text: 'TIPO',
            value: 'tipo',
            selected: true,
        },
        {
            id: 10,
            text: 'DATA',
            value: 'datapublicacao',
            selected: true,
        },
        {
            id: 11,
            text: '',
            value: 'actions', 
            sortable: false
        }        
      ]
}

export {
    upload, list, columns, remove, save, fieldsToSum, fieldsToDetermineEquality
}