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
import Painel from './views/painel/Painel.vue'
import HomePainel from './views/painel/HomePainel.vue'


var routes = [

   //{ path: '/', nome: 'Bem vindo', component: Bemvindo, alwaysShow: false},
   { path: '/home', nome: 'Home', component: HomePainel, alwaysShow: true, requireAuth: true, icone: 'mdi-home', ordem: 0},
   { path: '/', nome: 'Login', component: Login },
   { path: '/registrar', nome: 'Registrar', component: Registrar, requireAuth: false},
   { path: '/dadospessoais', nome: 'DadosPessoais', component: DadosPessoais, requireAuth: true},
   { path: '/alterarsenha', nome: 'AlterarSenha', component: Senha, requireAuth: true},
   
   //path tem que bater com o path do registro do recurso no BD
   //foi preciso manter as rotas aqui, e não vir tudo via permissão, por causa do mapeamento do 
   //componente, que não é uma string é o objeto
   //mantive o nome pela facilidade de usar o obterRota por nome
   { path: '/faleconosco', nome: 'Fale conosco', component: FaleConosco, requireAuth: true, icone: 'mdi-contact-mail'},
   { path: '/vagas', nome: 'Edição de dados', component: Vagas, requireAuth:true, icone:'mdi-database-import', hint: 'Importe ou exporte planilhas, edite dados diretamente em tela' },
   { path: '/usuarios', nome: 'Usuários', component: Usuario, requireAuth:true, icone: 'mdi-account-multiple' },
   { path: '/auditoria', nome: 'Auditoria', component: Auditoria, requireAuth:true, icone: 'mdi-file-document-box-search' },
   { path: '/permissao', nome: 'Permissão', component: Permissao, requireAuth:true, icone: 'mdi-lock' },
   { path: '/painel', nome: 'Painel', component: Painel, requireAuth:true, icone: 'mdi-chart-multiple', hint: 'Consulte, agregue ou desagregue os dados, gere gráficos e mapas de calor' },
   { path: '/painel/home', nome: 'HomePainel', component: HomePainel, requireAuth:true },
];

Vue.use(VueRouter)
const router = new VueRouter({ routes});

function obterRota(nome){
    return routes.filter(router => router.nome == nome)[0]
}

export {
    router, routes, obterRota
}
