'use strict'

const Database = use('Database')

class ProdutoController {

    async cadastrar({request, auth}){
        const user = await Database
            .raw('SELECT * FROM usuarios WHERE token = ?', [auth.getAuthHeader()])
            const toObject = JSON.parse(JSON.stringify(user))
            if(toObject[0].length == 1){
                const data = request.only(['nome', 'valor', 'cod_fornecedor'])
            await Database
            .raw('INSERT INTO produtos (nome, valor, cod_fornecedor) VALUES (?, ?, ?)', [data.nome, data.valor, data.cod_fornecedor])
                return 200
            
            }
        
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
            .raw('SELECT p.*, f.nome as nome_fornecedor FROM produtos AS p JOIN fornecedores AS f ON p.cod_fornecedor = f.id ORDER BY f.id DESC')
            return {
                status: 200,
                produtos: JSON.parse(JSON.stringify(produtos))[0],
            } 
    }

    async search({params}){
        const produtos = await Database
        .raw('SELECT * FROM produtos WHERE id = ? OR nome LIKE %?%', [params.search, params.search])
        return produtos
    }

    async delete({params}){
        await Database
            .raw('DELETE FROM produtos WHERE id = ?', [params.id])
        return {
            status: 200
        }
    }

    async maisVendidos({params}){
        const produtos = await Database
            .raw('SELECT SUM(v.valor_total), SUM(v.quantidade), p.nome FROM venda_produto AS v JOIN produtos AS p ON v.cod_produto = p.id JOIN vendas AS vd ON v.cod_venda = vd.id WHERE vd.data >= ? AND vd.data <= ?  GROUP BY p.id ORDER BY SUM(v.quantidade) DESC', 
            [params.i, params.f])
        
            return {
            status: 200,
            produtos: JSON.parse(JSON.stringify(produtos))[0]
        }
    }

    async maisLucrativos({params}){
        const produtos = await Database
            .raw('SELECT SUM(v.valor_total), SUM(v.quantidade), p.nome FROM venda_produto AS v JOIN produtos AS p ON v.cod_produto = p.id JOIN vendas AS vd ON v.cod_venda = vd.id WHERE vd.data >= ? AND vd.data <= ?  GROUP BY p.id ORDER BY SUM(v.valor_total) DESC', 
            [params.i, params.f])
        
            return {
            status: 200,
            produtos: JSON.parse(JSON.stringify(produtos))[0]
        }
    }

}

module.exports = ProdutoController
