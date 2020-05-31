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

const fieldsToDetermineEquality = ['ano', 'uf', 'acao', 'modalidade', 'tiporede']

function columns(){
    return [  
        {
            id: 1,
            text: 'ANO',
            value: 'ano',
            width: '80px',
            selected: true,
            summable: false,
        },           
        {
            id: 2,
            text: 'UF',
            value: 'uf',
            selected: true,
            summable: false,
        },
        {
            id: 8,
            text: 'MODALIDADE',
            value: 'modalidade',
            width: '130px',
            selected: true,            
            summable: false,
        },
        {
            id: 9,
            text: 'AÇÃO',
            value: 'acao',
            selected: true,
            summable: false,
        },  
        {
            id: 12,
            text: 'TIPO DE REDE',
            value: 'tiporede',
            selected: true,
            summable: false,
        },                
        {
            id: 3,
            text: 'SALDO',
            value: 'saldo',
            selected: true,
            summable: true,
            format: (item) => {
                return item.toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' })
            },
        },
        {
            id: 4,
            text: 'VALOR APROVADO',
            value: 'valoraprovado',
            width: '200px',
            selected: true,
            summable: true,
            format: (item) => {
                return item.toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' })
            },
        },
        {
            id: 5,
            text: 'APROVADA',
            value: 'aprovada',
            width: '120px',
            selected: true,
            summable: true,
            format: (item) => {
                return item
            },
        },
        {
            id: 6,
            text: 'HOMOLOGADA',
            value: 'homologada',
            width: '140px' ,
            selected: true,           
            summable: true,
            format: (item) => {
                return item
            },
        },
        {
            id: 7,
            text: 'REALIZADA',
            value: 'matricularealizada',
            width: '120px',
            selected: true,   
            summable: true, 
            format: (item) => {
                return item
            },
        },
        {
            id: 10,
            text: 'DATA',
            value: 'datapublicacao',
            selected: true,
            summable: false,
        },
        {
            id: 11,
            text: '',
            value: 'actions', 
            sortable: false,
            summable: false,
        }        
      ]
}

const fieldsToSum = () => {
    var fields = []
    columns().map(column => {
        if (column.summable){
            fields.push(column.value)
        }
    })
    return fields
}

export {
    upload, list, columns, remove, save, fieldsToSum, fieldsToDetermineEquality
}