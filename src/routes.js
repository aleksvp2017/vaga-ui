import VueRouter from 'vue-router' //navegacao
import Vue from 'vue' //core do vue
//import Bemvindo from './views/bemvindo/Bemvindo.vue'
import Home from './views/bemvindo/Home.vue'
import Login from './views/login/Login.vue'
import Registrar from './views/registrar/Registrar.vue'
import DadosPessoais from './views/usuario/DadosPessoais.vue'
import FaleConosco from './views/suporte/FaleConosco.vue'
import Senha from './views/usuario/Senha.vue'
import Vagas from './views/vagas/Vagas.vue'
import Usuario from './views/usuario/Usuario.vue'
import Auditoria from './views/auditoria/Auditoria.vue'
import Permissao from './views/permissao/Permissao.vue'


var routes = [

   //{ path: '/', nome: 'Bem vindo', component: Bemvindo, alwaysShow: false},
   { path: '/home', nome: 'Home', component: Home, alwaysShow: false, requireAuth: true},
   { path: '/', nome: 'Login', component: Login },
   { path: '/registrar', nome: 'Registrar', component: Registrar, requireAuth: false},
   { path: '/dadospessoais', nome: 'DadosPessoais', component: DadosPessoais, requireAuth: true},
   { path: '/alterarsenha', nome: 'AlterarSenha', component: Senha, requireAuth: true},
   
   //path tem que bater com o path do registro do recurso no BD
   //foi preciso manter as rotas aqui, e não vir tudo via permissão, por causa do mapeamento do 
   //componente, que não é uma string é o objeto
   //mantive o nome pela facilidade de usar o obterRota por nome
   { path: '/faleconosco', nome: 'FaleConosco', component: FaleConosco, requireAuth: true},
   { path: '/vagas', nome: 'Vagas', component: Vagas, requireAuth:true },
   { path: '/usuarios', nome: 'Usuario', component: Usuario, requireAuth:true },
   { path: '/auditoria', nome: 'Auditoria', component: Auditoria, requireAuth:true },
   { path: '/permissao', nome: 'Permissao', component: Permissao, requireAuth:true },
];

Vue.use(VueRouter)
const router = new VueRouter({ routes});

function obterRota(nome){
    return routes.filter(router => router.nome == nome)[0]
}

export {
    router, routes, obterRota
}
