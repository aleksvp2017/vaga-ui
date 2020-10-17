<template>    
    <v-card-title>
        <v-spacer></v-spacer>
        <v-container grid-list-lg>
        <v-layout row wrap>
            
                 <v-col cols="10" sm="5">
               
                <v-autocomplete
                    multiple
                    chips
                    deletable-chips
                    dense
                    full-width                
                    v-model="colunasParaProcurar"
                    :items="colunasFiltraveis"
                    label="Filtrar por"
                ></v-autocomplete>                     
                 </v-col>
           
            <v-flex xs2 mx-1>
                <v-select
                    v-model="operador"
                    :items="operadores"
                    label=""
                ></v-select>
            </v-flex>
            <v-flex xs2  mx-1  >   
                <v-text-field
                    @keydown.enter="customSearch"
                    v-model="searchKey"
                    hint="Digite enter para pesquisar"
                    append-icon="mdi-magnify"
                    label="Chave de busca"
                    single-line
                    
                ></v-text-field>
            </v-flex>            
            <v-flex ms-0 ps-0 mt-4>  
                <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon
                    color="#4CAF50"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="addSearchPair"
                    ><v-icon >mdi-plus-box</v-icon></v-btn>
                </template>
                <span>Preencha o campo chave e clique aqui para adicionar múltiplos filtros</span>
                </v-tooltip>                            
            </v-flex>
            <v-card-text>            
                {{ isSearchPairsFilled()? 'Filtrando por' : ''}}
                <v-chip v-for="searchPair in searchPairs" :key="searchPair.field" close
                    v-show="searchPair.show" @click:close="removePair(searchPair)">
                    {{ searchPair.field + " " + searchPair.operador + " " + searchPair.key}}
                </v-chip>
            </v-card-text>
        </v-layout>
        </v-container>
    </v-card-title>  
</template>

<script>
import {Operacoes} from './OperadoresLogicos.js'

export default {
    
    props:['colunasFiltraveis'],
    data() {
        return {
            searchKey: '',
            searchPairs: [],
            colunasParaProcurar: [],
            operador: Operacoes.operadores.CONTEM.nome,
            operadores: Operacoes.listarOperadores()
        }
    },
    computed: {
    },
    created() {
    },
    methods: {  
        reset(){
            this.searchKey = ''
            this.searchPairs = []
            this.colunasParaProcurar = []
        },
        removePair(searchPair){
            searchPair.show = false
            this.customSearch()
        },        
        addSearchPair(){
            if (this.searchKey === '' || this.colunasParaProcurar.length === 0){
                this.$emit('mostrarAlerta', 'Preencha o campo chave e escolha a coluna pela qual filtrar', 'info')
                return
            }

            if (this.colunasParaProcurar !== null && this.colunasParaProcurar.length > 0 && this.searchKey != ''){
                var item = 
                    this.searchPairs.filter(searchPair => {
                        var vetoresSaoIguais = (searchPair.length == this.colunasParaProcurar.length) && searchPair.every(function(campo, index) {
                            return campo === colunasParaProcurar[index]; 
                        })
                        return vetoresSaoIguais
                    })
                //o teste é assim porque filter retorna uma array
                if (item.length > 0){
                    item = item[0]
                    item.key = this.searchKey
                    item.show = true
                    item.operador = this.operador
                }
                else {
                    //tem que fazer o join, porque o field, que será usado nos chips, só pode receber tipos primitivos
                    item = {field: this.colunasParaProcurar.join(','), key: this.searchKey.toString(), show: true, operador: this.operador}
                    this.searchPairs.push(item)
                }
                this.customSearch()
            }
            this.searchKey = ''
        },   
        customSearch(){
            this.$emit('customSearch', this.searchPairs, this.searchKey, this.colunasParaProcurar, this.operador)
        },
        isSearchPairsFilled(){
            if (this.searchPairs.length > 0){
                var searchPairFilled = false
                this.searchPairs.map( searchPair => {
                    if (searchPair.show){
                        searchPairFilled = true
                    }
                })
                return searchPairFilled
            }

            return false
        },                              
    },    
}


</script>


        <!-- FILTROS 
       
        <filtros :columnToSearch="columnToSearch" :colunasFiltraveis="colunasFiltraveis" :operador="operador"
            :paresChaveBusca="paresChaveBusca" :chaveBusca="chaveBusca"
            :operadores="operadores"
            v-on:customSearch="customSearch"/> -->