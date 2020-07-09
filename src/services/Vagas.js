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

const fieldsToDetermineEquality = ['ano', 'mes', 'uf', 'tipocurso', 'modalidadeeducacional', 'acao', 'tiporede', 'ted', 'tipodeconta',
    'municipio', 'parceiro']

function columns(){
    var itemId = 0
    return [  
        {
            id: itemId++,
            text: 'ANO',
            value: 'ano',
            selected: true,
            summable: false,
            colunatempo: true,
            colunadimensao: true,
        }, 
        {
            id: itemId++,
            text: 'MÊS',
            value: 'mes',
            selected: true,
            summable: false,
            colunatempo: true,
            colunadimensao: true,
        },                    
        {
            id: itemId++,
            text: 'UF',
            value: 'uf',
            selected: true,
            summable: false,
            colunatempo: false,
            colunadimensao: true,
        },
        {
            id: itemId++,
            text: 'MUNICÍPIO',
            value: 'municipio',
            selected: true,
            summable: false,
            colunatempo: false,
            colunadimensao: true,
        },        
        {
            id: itemId++,
            text: 'TIPO DE CURSO',
            value: 'tipocurso',
            selected: true,            
            summable: false,
            colunatempo: false,
            colunadimensao: true,
        },        
        {
            id: itemId++,
            text: 'MODALIDADE EDUCACIONAL',
            value: 'modalidadeeducacional',
            selected: true,            
            summable: false,
            colunatempo: false,
            colunadimensao: true,
        },
        {
            id: itemId++,
            text: 'AÇÃO',
            value: 'acao',
            selected: true,
            summable: false,
            colunatempo: false,
            colunadimensao: true,
        }, 
        {
            id: itemId++,
            text: 'TIPO DE REDE',
            value: 'tiporede',
            selected: true,
            summable: false,
            colunatempo: false,
            colunadimensao: true,
        },   
        {
            id: itemId++,
            text: 'PARCEIRO',
            value: 'parceiro',
            selected: true,
            summable: false,
            colunatempo: false,
            colunadimensao: true,
        },         
        {
            id: itemId++,
            text: 'TED',
            value: 'ted',
            selected: true,
            summable: false,
            colunatempo: false,
            colunadimensao: true,
        }, 
        {
            id: itemId++,
            text: 'TIPO DE CONTA',
            value: 'tipodeconta',
            selected: true,
            summable: false,
            colunatempo: false,
            colunadimensao: true,
        },     
        {
            id: itemId++,
            text: 'TURMA',
            value: 'turma',
            selected: true,
            summable: false,
            colunatempo: false,
            colunadimensao: true,
        },                                   
        {
            id: itemId++,
            text: 'SALDO',
            value: 'saldo',
            selected: true,
            summable: true,
            colunatempo: false,
            colunadimensao: false,
            format: (item) => {
                return item.toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' })
            },
        },
        {
            id: itemId++,
            text: 'VALOR APROVADO',
            value: 'valoraprovado',
            selected: true,
            summable: true,
            colunatempo: false,
            colunadimensao: false,
            format: (item) => {
                return item.toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' })
            },
        },
        {
            id: itemId++,
            text: 'APROVADA',
            value: 'aprovada',
            selected: true,
            summable: true,
            colunatempo: false,
            colunadimensao: false,
            format: (item) => {
                return item
            },
        },
        {
            id: itemId++,
            text: 'HOMOLOGADA',
            value: 'homologada',
            selected: true,           
            summable: true,
            colunatempo: false,
            colunadimensao: false,
            format: (item) => {
                return item
            },
        },
        {
            id: itemId++,
            text: 'MATRICULA',
            value: 'matricula',
            selected: true,   
            summable: true, 
            colunatempo: false,
            colunadimensao: false,
            format: (item) => {
                return item
            },
        },
        {
            id: itemId++,
            text: 'DATA',
            value: 'datapublicacao',
            selected: true,
            summable: false,
            colunatempo: false,
            colunadimensao: false,
        },
        {
            id: itemId++,
            text: '',
            value: 'actions', 
            sortable: false,
            summable: false,
            colunatempo: false,
            colunadimensao: false,
        }        
      ]
}

const obterIdColuna = (valor) => {
    var id = ''
    columns().map(coluna => {
        if (coluna.value === valor){
            id = coluna.id
        }
    })
    return id
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
    upload, list, columns, remove, save, fieldsToSum, fieldsToDetermineEquality, obterIdColuna
}