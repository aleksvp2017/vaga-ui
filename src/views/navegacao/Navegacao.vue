<template>
        <!--<v-app-bar app color="#80CBC4" dark>-->
        <v-app-bar app color="#0D2F52" dark v-if="!esconderMenu">
            oi
            <v-toolbar-title>
                <h2>
                    <v-btn color="#0D2F52" dark elevation="0" :to="rotaHome">
                        <v-icon dark right color="#389F9E">mdi-home</v-icon>
                    </v-btn> 
                    <span style="color:#389F9E;font-family: 'Montserrat';" >
                    Sistema de Vagas
                    </span>
                </h2>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <!--PERMISSAO DO MENU É CHECADA AQUI -->
            <div v-if="loggedIn">
                <v-btn color="#0D2F52" x-large v-for="(link, index) in links" :key="index" 
                    :to="link.path"> 
                    {{link.nome}}
                    <!--<v-icon color="white">{{link.icone}}</v-icon>--> 
                </v-btn>
            </div>
            
            <!-- USER MENU -->
            <v-menu offset-y
                v-if="loggedIn"
                :close-on-click="true"
                :nudge-width="200"
                offset-x
                >
                <template v-slot:activator="{ on }">
                    <v-btn color="#0D2F52" dark elevation="0" v-on="on">
                        <v-icon dark right>mdi-account-circle</v-icon>
                    </v-btn> 
                </template>

                <v-card>
                    <v-list>
                    <v-list-item>
                        <v-list-item-content>
                        <v-list-item-title>{{user.nome}}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                        <v-btn icon>
                            <v-icon>mdi-account-circle</v-icon>
                        </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                    </v-list>

                    <v-divider></v-divider>
                    
                    
                        
                        <v-list>
                            <v-list-item>
                                <v-btn text rounded  v-show="loggedIn"  :to="rotaDadosPessoais">Dados pessoais</v-btn>
                            </v-list-item>
                            <v-list-item>
                                <v-btn text rounded  v-show="loggedIn"  :to="rotaSenha">Alterar Senha</v-btn>
                            </v-list-item>                            
                            <v-list-item>
                                <v-btn text rounded @click="logout" v-show="loggedIn">Sair</v-btn>
                            </v-list-item>                            
                        </v-list>
                </v-card>
            </v-menu>

        </v-app-bar>
</template>

<script>
    import { mapGetters, mapState, mapActions } from 'vuex'
    import { routes, obterRota } from '../../routes.js'
    import { obterMenu } from '../../services/Permissao.js'

    export default {
        data() {
            return {
                menuDisponivel: false,
            }
        },
        computed: {
            temAcesso(){
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
                            })
                        }
                    })
                })
                // var extraRoutes = []
                // this.menu.map(itemMenu => {
                //     itens.push({
                //         nome: itemMenu.nome,
                //         path: itemMenu.url
                //     })
                //     this.$router.addRoutes([{ path: itemMenu.url, component: itemMenu.componenteUI, requiredAtuh: true}])
                //     extraRoutes.push({ path: itemMenu.url, component: itemMenu.componenteUI, requiredAtuh: true})
                //     console.log('Adicionou ', itemMenu.url)
                // })
                // this.$router.options.routes = [...this.$router.options.routes, ...extraRoutes]
                // console.log(this.$router.options.routes)
                return itens       
            },
            rotaHome(){
                return obterRota('Home')
            },            
            rotaDadosPessoais(){
                return obterRota('DadosPessoais')
            },
            rotaSenha(){
                return obterRota('AlterarSenha')
            },            
            ...
            mapGetters(['loggedIn','menu', 'esconderMenu']),
            ...
            mapState(['user'])
        },
        methods: {
            ...mapActions(['ActionLogout']),
            logout(){
                this.ActionLogout()
            }
        }
    }
</script>

<style scoped>

</style>