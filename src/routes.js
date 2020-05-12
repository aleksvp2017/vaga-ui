import VueRouter from 'vue-router' //navegacao
import Vue from 'vue' //core do vue
import Bemvindo from './views/bemvindo/Bemvindo.vue'
import Login from './views/login/Login.vue'
import Registrar from './views/registrar/Registrar.vue'
import Usuario from './views/usuario/Usuario.vue'
import FaleConosco from './views/suporte/FaleConosco.vue'
import Senha from './views/usuario/Senha.vue'
import Vagas from './views/vagas/Vagas.vue'

const routes = [

   { path: '/', name: 'Início', component: Bemvindo, menuItem: false, alwaysShow: false},
   { path: '/entrar', name: 'Entrar', component: Login, menuItem: true },
   { path: '/registrar', name: 'Registrar', component: Registrar, requireAuth: false, menuItem: false},
   { path: '/usuario', name: 'Usuário', component: Usuario, requireAuth: true, menuItem: false},
   { path: '/faleconosco', name: 'Fale Conosco', component: FaleConosco, requireAuth: true, menuItem: true},
   { path: '/alterarsenha', name: 'Alterar Senha', component: Senha, requireAuth: true, menuItem: false},
   { path: '/vagas', name: 'Vagas', component: Vagas, requireAuth:true, menuItem: true }

];

Vue.use(VueRouter)
const router = new VueRouter({ routes});

function obterRota(nome){
    return routes.filter(router => router.name == nome)[0]
}


export {
    router, routes, obterRota
}
