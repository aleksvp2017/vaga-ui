const Operacoes = {
    operadores:{
        CONTEM: {
            nome: 'contém'
        },
        MAIORQUE: {
            nome: 'maior que'
        },
        MENORQUE: {
            nome: 'menor que'
        },
        NAOCONTEM: {
            nome: 'não contém'
        },
    },

    listarOperadores(){
        var operadores = []
        Object.entries(this.operadores).map(operador => {
            operadores.push(operador[1].nome)
        })  
        return operadores
    }

}


    

export {
    Operacoes
}


