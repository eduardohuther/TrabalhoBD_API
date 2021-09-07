'use strict'

const Database = use('Database')

class FornecedorController {

    async cadastrar({request, auth}){
        const user = await Database
            .raw('SELECT * FROM usuarios WHERE token = ?', [auth.getAuthHeader()])
            const toObject = JSON.parse(JSON.stringify(user))
            if(toObject[0].length == 1){
                const data = request.only(['cpf', 'nome', 'telefone'])
                const cliente = await Database
            .raw('SELECT * FROM fornecedores WHERE cpf = ?', [data.cpf])
            const toObjectFornc = JSON.parse(JSON.stringify(cliente))
            if(toObjectFornc[0].length == 0){
                await Database
            .raw('INSERT INTO fornecedores (cpf, nome, telefone) VALUES (?, ?, ?)', [data.cpf, data.nome, data.telefone])
                return 200
            } else {
                return 201
            }
            
            }
    }

    async getTodos({params}){
        const fornecedores = await Database
            .raw('SELECT * FROM ORDER BY f.id DESC')
            return {
                status: 200,
                fornecedores: JSON.parse(JSON.stringify(fornecedores))[0],
            }
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

    async delete({params}){
        await Database
            .raw('DELETE FROM fornecedores WHERE id = ?', [params.id])
        return {
            status: 200
        }
    }

}

module.exports = FornecedorController
