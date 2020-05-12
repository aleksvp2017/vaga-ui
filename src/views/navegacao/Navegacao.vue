<template>
        <!--<v-app-bar app color="#80CBC4" dark>-->
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>
                <h2>
                    <v-btn color="primary" dark elevation="0" :to="rotaHome">
                        <v-icon dark right>mdi-home</v-icon>
                    </v-btn> 
                    Vagas
                </h2>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text rounded v-for="(link, index) in links" :key="index"
                :to="link.path"
                v-show="(!link.requireAuth && !loggedIn) || (loggedIn && link.requireAuth) || link.alwaysShow"> {{link.name}} </v-btn>
            
            <!-- USER MENU -->
            <v-menu offset-y
                v-if="loggedIn"
                :close-on-click="true"
                :nudge-width="200"
                offset-x
                >
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark elevation="0" v-on="on">
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
                                <v-btn text rounded  v-show="loggedIn"  :to="rotaUsuario">Dados pessoais</v-btn>
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
    import { mapGetters, mapState } from 'vuex'
    import { routes } from '../../routes.js'

    export default {
        data() {
            return {
                itensMenu:[
                    {
                        titulo: 'Aleksander Velozo Pascoal'
                    },
                    {
                        titulo: 'Sair',
                        acao: this.logout,
                    },
                ]       
            }
        },
        computed: {
            links (){
                return routes.filter(route => route.menuItem)
            },
            rotaHome(){
                return routes.filter(route => route.name == 'Início')[0]
            },            
            rotaUsuario(){
                return routes.filter(route => route.name == 'Usuário')[0]
            },
            rotaSenha(){
                return routes.filter(route => route.name == 'Alterar Senha')[0]
            },            
            ...
            mapGetters(['loggedIn']),
            ...
            mapState(['user'])
        },
        methods: {
            logout(){
                this.$store.dispatch('ActionLogout')
            }
        }
    }
</script>

<style scoped>

</style>