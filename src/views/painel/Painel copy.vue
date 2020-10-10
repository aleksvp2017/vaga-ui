<template>
    <v-tabs v-model="abaSelecionada"
      background-color="white"
      color="indigo darken-2"
      >
      <v-tab>Consulta</v-tab>
      <v-tab>Resultado</v-tab>
      <v-tab-item key="consulta">
        <v-card>
            <v-card-actions >
                <v-btn color="success" dark class="ma-2" @click="gerarRelatorio">Gerar relatório</v-btn>
                <v-btn class="ma-2" @click="adicionarFiltro" disabled>Salvar consulta</v-btn>
                <v-btn class="ma-2" @click="adicionarFiltro" disabled>Excluir consulta</v-btn>
                <v-btn class="ma-2" @click="adicionarFiltro" disabled>Compartilhar consulta</v-btn>
            </v-card-actions>
            <v-alert :type="typeAlert" dense text dismissible v-model="showAlert">
                {{alertMessage}}
            </v-alert>   
            <v-row no-gutters >              
                <v-col sm="2" cols="14" >
                    <v-card class="mx-auto" max-width="344" outlined>
                        <v-data-table
                            v-model="colunasSelecionadas"
                            class="elevation-1"
                            id="dragTable"
                            :headers="header"
                            :items="colunas"
                            show-select
                            item-key="id"
                            >
                            <tbody id="dragTable">
                            </tbody>
                        </v-data-table>        
                    </v-card>
                </v-col>
                <v-col cols="14" sm="4">
                    <v-card class="mx-auto" width="600" outlined>
                        <v-data-table
                            v-model="filtrosSelecionados"
                            class="elevation-1"
                            :headers="headerFiltros"
                            :items="filtros"
                            show-select
                            item-key="nome"
                            >
                            <template #item.valor="{item}">
                                <v-edit-dialog
                                    :return-value.sync="item.valor"
                                    @save="salvarFiltro(item)"
                                    @cancel="cancelarEdicaoFiltro"
                                    @open="editarFiltro"
                                    @close="fecharEdicaoFiltro"
                                    > {{ item.valor }}
                                    <template v-slot:input>
                                        <v-text-field :disabled="editDisabled"
                                        v-model="item.valor"
                                        label="Edit"
                                        single-line
                                        counter
                                        ></v-text-field>
                                    </template>
                                </v-edit-dialog>
                            </template>  
                        </v-data-table>    
                        <v-card-actions>
                            <v-btn color="success" small outlined dark class="ma-2" @click="adicionarFiltro">Adicionar</v-btn>
                            <v-btn color="success" small outlined dark class="ma-2" @click="excluirFiltro">Excluir </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="14" sm="4">
                    <v-card class="mx-auto" width="600" outlined>
                        <v-data-table
                            v-model="saidasSelecionadas"
                            class="elevation-1"
                            :headers="headerSaidas"
                            :items="saidas"
                            show-select
                            item-key="id"
                            >
                        </v-data-table>    
                        <v-card-actions>
                            <v-btn color="success" small outlined dark class="ma-2" @click="adicionarSaida">Adicionar</v-btn>
                            <v-btn color="success" small outlined dark class="ma-2" @click="excluirSaida">Excluir </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>   
                <v-col cols="11" sm="4">
                    
                </v-col>         
            </v-row>
        </v-card> 
      </v-tab-item>
      <v-tab-item key="resultado">
        <v-data-table v-if="itens.length > 0"
            v-model="itensSelecionados"
            class="elevation-1"
            :headers="colunasItens"
            :items="itens"
            show-select
            item-key="id"
            >
        </v-data-table>           
      </v-tab-item>
    </v-tabs>
</template>

<script>
import * as Vagas from '../../services/Vagas.js'
import {ERROR_SESSION_EXPIRED} from '../../services/Constantes.js'
import Sortable from 'sortablejs'

export default {
    data() {
        return {
            abaSelecionada: 0,
            showAlert: false,
            alertMessage: '',
            typeAlert: 'success',            
            colunas: [],
            colunasSelecionadas:[],
            header:[{
                text: 'Colunas',
                sortable: true,
                value: 'nome',
            }],
            filtros:[],
            filtrosSelecionados:[],
            headerFiltros:[{
                text: 'Filtros',
                sortable: true,
                value: 'nome',
            },
            {
                text: 'Valor',
                sortable: false,
                value: 'valor',
            }],
            saidas:[],
            saidasSelecionadas:[],
            headerSaidas:[{
                text: 'Colunas para relatório',
                sortable: true,
                value: 'nome',
            }],   
            editDisabled: false,   
            itens:[],  
            itensSelecionados: [], 
            colunasItens: [],   
        }
    },
    created () {
        Vagas.listarColunas().then((response) => {
            this.colunas = response.body.colunas.map(coluna => 
            ({...coluna, text:coluna.nome}))
            this.colunas =this.colunas.map((coluna,index) => 
            ({...coluna, id:index}))            
            
        }).catch(error => {
            displayMessage(this, true, error.body.error, 'error')
            if (error.status === ERROR_SESSION_EXPIRED){
                this.$store.dispatch('ActionLogout')
            }     
        })
    },
    methods: {
        adicionarFiltro(){
            if (this.colunasSelecionadas.length === 0){
                displayMessage(this, true, 'Selecione alguma coluna', 'info')
                return
            }
            this.colunasSelecionadas.map(colunaSelecionada => {
                var jaExiste = this.filtros.filter(filtro => {
                    return filtro.nome === colunaSelecionada.nome
                })
                if (jaExiste.length === 0){
                    this.filtros.push(colunaSelecionada)
                }
            })
        },
        excluirFiltro(){
            if (this.filtrosSelecionados.length === 0){
                displayMessage(this, true, 'Selecione algum filtro', 'info')
                return
            }
            this.filtrosSelecionados.map(filtroSelecionado => {
                let index = this.filtros.indexOf(filtroSelecionado)
                this.filtros.splice(index, 1)
            })
        },
        adicionarSaida(){
            if (this.colunasSelecionadas.length === 0){
                displayMessage(this, true, 'Selecione alguma coluna', 'info')
                return
            }
            this.colunasSelecionadas.map(colunaSelecionada => {
                var jaExiste = this.saidas.filter(saida => {
                    return saida.nome === colunaSelecionada.nome
                })
                if (jaExiste.length === 0){
                    this.saidas.push({...colunaSelecionada})
                }
            })
        },
        excluirSaida(){
            if (this.saidas.length === 0){
                displayMessage(this, true, 'Selecione alguma saída', 'info')
                return
            }
            this.saidasSelecionadas.map(saidaSelecionada => {
                let index = this.saidas.indexOf(saidaSelecionada)
                this.saidas.splice(index, 1)
            })
        },
        gerarRelatorio(){
            displayMessage(this, false, '', 'info')
            if (this.filtros.length === 0){
                displayMessage(this, true, 'Selecione algum filtro', 'info')
                return
            }
            var algumFiltroSemValor = false
            this.filtros.map(filtro => {
                if (!filtro.valor){
                    algumFiltroSemValor = true
                }
            })
            if (algumFiltroSemValor){
                displayMessage(this, true, 'Todos os filtros devem ter algum valor preenchido. Clique na coluna valor em cada filtro para preencher.', 'info')
                return
            }
                   
            if (this.saidas.length === 0){
                displayMessage(this, true, 'Selecione alguma saída', 'info')
                return
            }  

            Vagas.listarVagas(this.saidas, this.filtros).then((response) => {
                console.log(response)
                this.itens = response.body.vagas.map(vaga => ({...vaga, value:vaga.nome}))  
                this.colunasItens = response.body.colunas  
                this.abaSelecionada = 1  
            }).catch(error => {
                displayMessage(this, true, error.body.error, 'error')
                if (error.status === ERROR_SESSION_EXPIRED){
                    this.$store.dispatch('ActionLogout')
                }     
            })
        },
        editarFiltro(){
        },
        fecharEdicaoFiltro(){
        },
        cancelarEdicaoFiltro(){
        },       
        salvarFiltro(filtro){
            console.log(filtro)
        }
    }
}

function displayMessage(owner, showAlert, message, type){
    owner.showAlert = showAlert
    owner.alertMessage = message
    owner.typeAlert = type
}
</script>

<style>

</style>