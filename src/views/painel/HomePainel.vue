<template>
    <div style="background-color: #00254A; height: 100%;" >
     <v-img src='/src/img/blue2.jpg' height="100%">
        <v-container>
            <v-row class="pt-12">  
                <v-col class="text-center mt-12">
                    <span style="color:#b4e4e3;font-size:60px;font-family: 'Montserrat';" >
                        SISTEMA DE VAGAS
                    </span>
                    <br/>
                    <span style="color:#b4e4e3;font-family: 'Montserrat';">
                    <h3>Acompanhe e analise as vagas ofertadas pela Secretaria</h3>
                    </span>
                </v-col>
            </v-row>        
            <v-container>
                <v-row justify="space-around">
                    <v-card :width="larguraPainel" color="#0D2F52" :height="alturaPainel">
                        <br/><br/><br/>
                        <table width="100%">
                            <tr>
                                <td :width="largura" v-for="(link, index) in links" :key="index" :title="link.hint? link.hint : link.nome">
                                    <v-hover v-slot="{ hover }">
                                        <v-card align="center"
                                            elevation="0"
                                            :color="hover ? '#264d73' : '#0D2F52'"
                                            :class="{ 'on-hover': hover }">
                                            <v-btn color="white"  x-large icon @click="irParaVagas(link.nome)" >
                                                <v-icon>{{link.icone}}</v-icon>
                                            </v-btn>
                                        </v-card>
                                    </v-hover>                                
                                </td>
                            </tr>                          
                            <tr class="hidden-sm-and-down">
                                <td :width="largura" v-for="(link, index) in links" :key="index" :title="link.hint? link.hint : link.nome">
                                    <v-hover v-slot="{ hover }">
                                        <v-card align="center"
                                            elevation="0"
                                            :color="hover ? '#264d73' : '#0D2F52'"
                                            :class="{ 'on-hover': hover }">
                                            <span style="color:white;">{{link.nome}}</span>
                                        </v-card>
                                    </v-hover>                                
                                </td>
                            </tr>                        
                        </table>
                    </v-card>
                </v-row>       
                <v-row>  
                    <v-col>
                        <p style="color:white; margin:15px" class="text-center">09/11/2020 - última atualização de dados</p>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
     </v-img>
    </div>
</template>

<script>
import { routes, obterRota } from '../../routes.js'
import {mapActions, mapGetters} from 'vuex'

export default {
    computed: {
        larguraPainel(){
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return '500px'
                case 'sm': return '600px'
                case 'md': return '900px'
                case 'lg': return '900px'
                case 'xl': return '1200px'
            }
            return '1200px'
        },
        alturaPainel(){
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return '150px'
                case 'sm': return '150px'
                case 'md': return '250px'
                case 'lg': return '250px'
                case 'xl': return '250px'
            }
            return '250px'
        },        
        links (){
            var itens = []
            //Precisa do arquivo de rotas por causa do mapeamento com o componente, que não pode ser
            //simplesmente uma string, tem que ser o componente mesmo
            //Junção entre as rotas e o que vem via permissao se da pelo path
            routes.map(rota => {
                var temPermissao = false
                this.menu.map(itemMenu => {
                    if (itemMenu.path === rota.path){
                        itens.push({
                            nome: itemMenu.nome,
                            path: itemMenu.path,
                            icone: rota.icone,
                            ordem: itemMenu.ordem,
                            hint: rota.hint
                        })
                    }
                })
            })
            return itens.sort((itemA, itemB) => {
                if (itemA.ordem > itemB.ordem) return 1
                if (itemA.ordem < itemB.ordem) return -1
                return 0
            })   
        },
        largura(){
            return (100 / this.links.length) + "%"
        },
        ...
            mapGetters(['menu']),
    },
    beforeMount() {
        this.EsconderMenu(true)
    },    
    methods:{
        ...mapActions(['EsconderMenu']),
        irParaVagas(rota){
            console.log(rota)
            this.EsconderMenu(false)
            this.$router.push(obterRota(rota))
        }
    }
}
</script>

<style>

</style>