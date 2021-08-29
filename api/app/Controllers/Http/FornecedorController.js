'use strict'

const Database = use('Database')

class FornecedorController {

    async cadastrar({request}){
        const data = request.only(['cpf', 'nome', 'telefone', 'usuario', 'senha'])
            await Database
            .raw('INSERT INTO fornecedores (cpf, nome, telefone) VALUES (?, ?, ?)', [data.cpf, data.nome, data.telefone])
        return 200
    }

    async getTodos({params}){
        const fornecedores = await Database
            .raw('SELECT * FROM fornecedores ORDER BY DESC ASC LIMIT 10 OFFSET ?', [params.id])
        return fornecedores
    }

    async search({params}){
        const fornecedores = await Database
            .raw('SELECT * FROM fornecedores WHERE cpf LIKE %?% OR nome LIKE %?%', [params.search, params.search])
        return fornecedores
    }

    async editar({request}){
        const data = request.only(['id', 'cpf', 'nome', 'telefone'])
        await Database
            .raw('UPDATE fornecedores SET cpf = ?, nome = ?, telefone = ? WHERE id = ?', [data.cpf, data.nome, data.telefone, data.id])
        return 200
    }

}

module.exports = FornecedorController
