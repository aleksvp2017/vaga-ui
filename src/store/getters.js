export default{
    //para saber se o usuário está logado
    loggedIn(state){
        return !!state.user
    },
    //nome do cookie para guardar os dados do usuario
    cookieName(state){
        return state.userCookieName
    },
    menu(state){
        if (state.user){
            return state.user.menu
        }
        return []
    }
}