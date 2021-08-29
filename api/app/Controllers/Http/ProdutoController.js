'use strict'

class ProdutoController {

    async cadastrar({request}){
        const data = request.only(['nome', 'valor', 'cod_fornecedor'])
        await Database
            .raw('INSERT INTO produtos (nome, valor, cod_fornecedor) VALUES (?, ?, ?)', [data.pago, data.data, data.valor_total, data.cod_cliente])
        return 200
    }

    async editar({request}){
        const data = request.only(['id', 'nome', 'valor'])
        await Database
            .raw('UPDATE produtos SET nome = ?, valor = ? WHERE id = ?', [data.nome, data.valor, data.id])
        return 200
    }

    async getTodos({params}){
        const produtos = await Database
            .raw('SELECT * FROM produtos ORDER BY id DESC LIMIT 10 OFFSET ?', [params.id])
        return produtos
    }

    async search({params}){
        const produtos = await Database
        .raw('SELECT * FROM produtos WHERE id = ? OR nome LIKE %?%', [params.search, params.search])
        return produtos
    }

}

module.exports = ProdutoController
