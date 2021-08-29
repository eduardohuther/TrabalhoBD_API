'use strict'

const Database = use('Database')

class UsuarioController {

    async login({params}){
        const user = await Database
            .raw('SELECT COUNT(1) FROM usuarios WHERE cpf = ? AND senha = ?', [params.cpf, params.senha])

        if(user){
            return 200
        } else {
            return 201
        }
    }
}

module.exports = UsuarioController
