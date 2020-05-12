import * as types from './mutation-types' //importanto tudo no arquivo dentro de types

export default{
    //ao chamar uma mutation, so passa o playload, o state é passado automaticamente
    [types.SET_USER](state, playload){ //playload é o nome fancy para parâmetro
        state.user = playload
    }
}