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
        .raw('SELECT c.*, COUNT(v.id) as compras FROM clientes AS c LEFT JOIN vendas AS v ON v.cod_cliente = c.id GROUP BY c.id ORDER BY c.id DESC')
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

    async delete({params}){
        await Database
            .raw('DELETE FROM clientes WHERE id = ?', [params.id])
        return {
            status: 200
        }
    }

    async devem({}){
        const clientes = await Database
            .raw('SELECT SUM(p.valor), c.nome, c.telefone, c.cpf FROM parcela AS p JOIN vendas AS v ON p.cod_venda = v.id JOIN clientes as c ON v.cod_cliente = c.id WHERE data_pagamento IS NULL && data_vencimento < NOW() GROUP BY v.id')
        
            return {
            status: 200,
            clientes: JSON.parse(JSON.stringify(clientes))[0]
        }
    }
}

module.exports = ClienteController
