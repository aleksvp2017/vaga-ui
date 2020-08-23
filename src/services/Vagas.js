import Vue from 'vue'
import VueResource from 'vue-resource'
 

Vue.use(VueResource)
const http = Vue.http
import {BASE_BACKEND_URL} from './Constantes.js'

function upload(file, planilha){
    let formData = new FormData()
    //esse parametro tem que coincidir com o lido pelo muter no backend
    formData.append('fileuploaded', file)
    formData.append('nomeAba', planilha.nomeAba)
    if (planilha.periodoPactuacao){
        formData.append('periodoPactuacao', planilha.periodoPactuacao)
    }
    if (planilha.dataAprovacao){
        formData.append('dataAprovacao', planilha.dataAprovacao)
    }
    if (planilha.dataMatricula){
        formData.append('dataMatricula', planilha.dataMatricula)
    }
    formData.append('sncontrapartida', planilha.snContrapartida)
    return http.post(BASE_BACKEND_URL + 'vagas/importar', formData)
}

async function list(){
    return http.get(BASE_BACKEND_URL + 'vagas')
}

async function remove(vagas){
    return  http.delete(BASE_BACKEND_URL + 'vagas/', {body:{vagas}})
}

async function removePlanilha(planilha){
    return  http.delete(BASE_BACKEND_URL + 'vagasplanilha/', {body:{nomePlanilha: planilha}})
}

async function listarPlanilhas(){
    return http.get(BASE_BACKEND_URL + 'vagasplanilha')
}

async function save(vaga){
    return http.post(BASE_BACKEND_URL + 'vagas/' + (vaga.vagaid ? (':' + vaga.vagaid) : ''), {vaga})
}

async function obterPeriodoPactuacaoAberto(){
    return http.get(BASE_BACKEND_URL + 'periodopactuacaoaberto')
}

const fieldsToDetermineEquality = ['instituicao','uf', 'tipodecurso', 'modalidadedeensino', 'municipio', 'curso',
    'periodopactuacao', 'sncontrapartida', 'dataaprovacao', 'datamatricula']

function columns(){
    var itemId = 0
    return [  
        // {
        //     id: itemId++,
        //     text: 'ANO',
        //     value: 'ano',
        //     selected: true,
        //     summable: false,
        //     colunatempo: true,
        //     colunadimensao: true,
        // }, 
        // {
        //     id: itemId++,
        //     text: 'MÊS',
        //     value: 'mes',
        //     selected: true,
        //     summable: false,
        //     colunatempo: true,
        //     colunadimensao: true,
        // },  
        {
            id: itemId++,
            text: 'VAGAID',
            value: 'vagaid',
            selected: false,
            summable: false,
            colunatempo: false,
            colunadimensao: false,
        },         
        {
            id: itemId++,
            text: 'INSTITUIÇÃO DE ENSINO',
            value: 'instituicao',
            selected: true,
            summable: false,
            colunatempo: false,
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
            text: 'TIPO',
            value: 'tipodecurso',
            selected: true,            
            summable: false,
            colunatempo: false,
            colunadimensao: true,
        },        
        {
            id: itemId++,
            text: 'MODALIDADE EDUCACIONAL',
            value: 'modalidadedeensino',
            selected: true,            
            summable: false,
            colunatempo: false,
            colunadimensao: true,
        },
        {
            id: itemId++,
            text: 'CURSO',
            value: 'curso',
            selected: true,
            summable: false,
            colunatempo: false,
            colunadimensao: true,
        }, 
        {
            id: itemId++,
            text: 'PERÍODO PACTUAÇÃO',
            value: 'periodopactuacao',
            selected: true,
            summable: false,
            colunatempo: false,
            colunadimensao: true,
        },                 
        // {
        //     id: itemId++,
        //     text: 'AÇÃO',
        //     value: 'acao',
        //     selected: true,
        //     summable: false,
        //     colunatempo: false,
        //     colunadimensao: true,
        // },                                   
        {
            id: itemId++,
            text: 'HORA-AULA',
            value: 'valorhoraaula',
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
            datavinculada: 'dataaprovacao',
            format: (item) => {
                return item
            },
        },  
        {
            id: itemId++,
            text: 'DATA APROVAÇÃO',
            value: 'dataaprovacao',
            selected: true,
            summable: false,
            colunatempo: true,
            colunadimensao: true,
            format: (item) => {
                return item
            },
        },   

        {
            id: itemId++,
            text: 'CARGA HORÁRIA',
            value: 'cargahoraria',
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
            text: 'VALOR APROVADO',
            value: 'valoraprovado',
            selected: true,
            summable: true,
            colunatempo: false,
            colunadimensao: false,
            datavinculada: 'dataaprovacao',
            format: (item) => {
                return item.toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' })
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
            datavinculada: 'datamatricula',
            format: (item) => {
                return item
            },
        },
        {
            id: itemId++,
            text: 'DATA MATRÍCULA',
            value: 'datamatricula',
            selected: true,
            summable: false,
            colunatempo: true,
            colunadimensao: true,
            format: (item) => {
                return item
            },
        },        
        {
            id: itemId++,
            text: 'CONTRAPARTIDA',
            value: 'sncontrapartida',
            selected: true,   
            summable: false, 
            colunatempo: false,
            colunadimensao: false,
            format: (item) => {
                if (item){
                    return 'sim'
                }
                return 'não'
            },
        },        
        // {
        //     id: itemId++,
        //     text: 'DATA',
        //     value: 'datapublicacao',
        //     selected: true,
        //     summable: false,
        //     colunatempo: false,
        //     colunadimensao: false,
        // },
        {
            id: itemId++,
            text: 'PLANILHA',
            value: 'nomeplanilha',
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

const obterColuna = (valor) => {
    var coluna = null
    columns().map(item => {
        if (item.value === valor){
            coluna = item
        }
    })
    return coluna
}

const obterIdColuna = (valor) => {
    var coluna = obterColuna(valor)
    if (coluna){
        return coluna.id
    }
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
    upload, list, columns, remove, save, fieldsToSum, fieldsToDetermineEquality, obterIdColuna, obterPeriodoPactuacaoAberto, 
        removePlanilha, listarPlanilhas, obterColuna
}