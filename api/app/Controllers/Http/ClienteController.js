'use strict'

const Database = use('Database')

class ClienteController {

    async cadastrar({request, auth}){
        const user = await Database
            .raw('SELECT * FROM usuarios WHERE token = ?', [auth.getAuthHeader()])
            const toObject = JSON.parse(JSON.stringify(user))
            if(toObject[0].length == 1){
                const data = request.only(['cpf', 'nome', 'telefone'])
                const cliente = await Database
            .raw('SELECT * FROM clientes WHERE cpf = ?', [data.cpf])
            const toObjectClient = JSON.parse(JSON.stringify(cliente))
            if(toObjectClient[0].length == 0){
                await Database
                .raw('INSERT INTO clientes (cpf, nome, telefone) VALUES (?, ?, ?)', [data.cpf, data.nome, data.telefone])
                return 200
            } else {
                return 201
            }
            
            }
        
    }

    async getTodos({params}){
        const clientes = await Database
        .raw('SELECT c.*, COUNT(v.id) as compras FROM clientes AS c JOIN vendas AS v ON v.cod_cliente = c.id GROUP BY c.id ORDER BY c.id DESC')
        return {
            status: 200,
            clientes: JSON.parse(JSON.stringify(clientes))[0],
        }
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
