'use strict'

class VendaController {

    async cadastrar({request}){
        const data = request.only(['pago', 'data', 'valor_total', 'cod_cliente', 'venda_produto', 'parcelas'])
        await Database
            .raw('INSERT INTO vendas (pago, data, valor_total, cod_cliente) VALUES (?, ?, ?, ?)', [data.pago, data.data, data.valor_total, data.cod_cliente])
        const venda = await Database
            .raw('SELECT id FROM vendas ORDER BY id DESC LIMIT 1')
        const produtos = data.venda_produto
        for(let i = 0; produtos.length;i++){
            await Database
            .raw('INSERT INTO venda_produto (cod_produto, cod_venda, quantidade, valor_unitario, valor_total) VALUES (?, ?, ?, ?, ?)', 
            [produtos[i].cod_produto, venda.id, produtos[i].quantidade, produtos[i].valor_unitario, produtos[i].valor_total])
        }
        const parcelas = data.parcelas
        for(let i = 0; parcelas.length;i++){
            await Database
            .raw('INSERT INTO parcelas (cod_venda, valor, pago, forma_pagamento, data_pagamento, data_vencimento) VALUES (?, ?, ?, ?, ?, ?)', 
            [venda.id, parcelas[i].valor, parcelas[i].pago, parcelas[i].forma_pagamento, parcelas[i].data_pagamento, parcelas[i].data_vencimento])
        }
        return 200
    }

    async getTodos({params}){
        const vendas = await Database
            .raw('SELECT * FROM vendas ORDER BY id DESC LIMIT 10 OFFSET ?', [params.id])
        return vendas
    }

    async getVenda({params}){
        const venda = await Database
        .raw('SELECT v.*, c.nome, c.id FROM vendas v JOIN clientes c WHERE id = ', [params.id])
        const parcelas = await Database
            .raw('SELECT * FROM parcelas WHERE cod_venda = ' [params.id])
        const produtos = await Database
        .raw('SELECT p.nome, p.id, v.* FROM venda_produto v JOIN produtos p WHERE cod_venda = ?' [params.id])
        return {
            venda: venda,
            parcelas: parcelas,
            produtos: produtos
        }
    }

}

module.exports = VendaController
