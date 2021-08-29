'use strict'

class ClienteController {

    async cadastrar({request}){
        const data = request.only(['cpf', 'nome', 'telefone', 'usuario', 'senha'])
            await Database
            .raw('INSERT INTO clientes (cpf, nome, telefone) VALUES (?, ?, ?)', [data.cpf, data.nome, data.telefone])
        return 200
    }

    async getTodos({params}){
        const clientes = await Database
            .raw('SELECT * FROM clientes ORDER BY id DESC LIMIT 10 OFFSET ?', [params.id])
        return clientes
    }

    async search({params}){
        const clientes = await Database
            .raw('SELECT * FROM clientes WHERE cpf LIKE %?% OR nome LIKE %?%', [params.search, params.search])
        return clientes
    }

    async editar({request}){
        const data = request.only(['id', 'cpf', 'nome', 'telefone'])
        await Database
            .raw('UPDATE clientes SET cpf = ?, nome = ?, telefone = ? WHERE id = ?', [data.cpf, data.nome, data.telefone, data.id])
        return 200
    }
}

module.exports = ClienteController
