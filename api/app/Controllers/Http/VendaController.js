'use strict'

const Database = use('Database')
const moment = require("moment");

class VendaController {

    async cadastrar({request, auth}){
        const data = request.only(['pago', 'valor_total', 'cod_cliente', 'produtos', 'parcelas', 'metodo', 'valor_parcelas'])
        const user = await Database
            .raw('SELECT * FROM usuarios WHERE token = ?', [auth.getAuthHeader()])
            const toObject = JSON.parse(JSON.stringify(user))
            if(toObject[0].length == 1){
                await Database
            .raw('INSERT INTO vendas (pago, data, valor_total, cod_cliente) VALUES (?, ?, ?, ?)', [data.pago == 1 && data.parcelas == 1 ? 1 : 0, moment().format('YYYY-MM-DD'), data.valor_total, data.cod_cliente])
            const vendaAux = await Database
            .raw('SELECT id FROM vendas ORDER BY id DESC LIMIT 1')
            const toObjectVenda = JSON.parse(JSON.stringify(vendaAux))
            const venda = toObjectVenda[0][0].id
            const produtos = data.produtos
            for(let i = 0; i<produtos.length;i++){
                await Database
                .raw('INSERT INTO venda_produto (cod_produto, cod_venda, quantidade, valor_unitario, valor_total) VALUES (?, ?, ?, ?, ?)', 
                [produtos[i].cod_produto, venda, produtos[i].quantidade, produtos[i].valor_unitario, produtos[i].valor_total])
            }
            const metodo = data.metodo == 0 ? 'Dinheiro' : data.metodo == 1 ? 'Cartão de Débito' : data.metodo == 2 ? 'Cartão de Crédito' : data.metodo == 3 ?
            'PIX' : data.metodo == 4 ? 'Boleto' : 'Bitcoin'
            let vencimento = moment()
            for(let i = 0; i<data.parcelas;i++){
                if(i>0 || data.pago == 0){
                    vencimento = moment(vencimento).add(1, 'M')
                }
                await Database
            .raw('INSERT INTO parcela (cod_venda, valor, pago, forma_pagamento, data_pagamento, data_vencimento) VALUES (?, ?, ?, ?, ?, ?)', 
            [venda, data.valor_parcelas, i == 0 ? data.pago : 0, i == 0 && data.pago == 1 ? metodo : '', i == 0 && data.pago == 1 ? moment().format('YYYY-MM-DD') : null, moment(vencimento).format('YYYY-MM-DD')])
            }
                return 200
            }
        
    }

    async getTodos({params}){
        const user = await Database
            .raw('SELECT * FROM usuarios WHERE token = ?', [params.token])
            const toObject = JSON.parse(JSON.stringify(user))
            if(toObject[0].length == 1){
                const vendas = await Database
            .raw('SELECT v.*, c.nome as nome_cliente, COUNT(p.id) AS parcelas FROM vendas AS v JOIN clientes AS c ON v.cod_cliente = c.id JOIN parcela AS p ON p.cod_venda = v.id GROUP BY v.id ORDER BY v.id DESC')
            
            return {
                status: 200,
                vendas: JSON.parse(JSON.stringify(vendas))[0],
            } 
            }
        
    }

    async getVenda({params}){
        const parcelas = await Database
            .raw('SELECT * FROM parcela WHERE cod_venda = ?', [params.id])
            console.log('a')
        const produtos = await Database
        .raw('SELECT v.*, p.nome, p.id FROM venda_produto AS v JOIN produtos AS p ON p.id = v.cod_produto WHERE v.cod_venda = ?', [params.id])
        return {
            status: 200,
            parcelas: JSON.parse(JSON.stringify(parcelas))[0],
            produtos: JSON.parse(JSON.stringify(produtos))[0]
        }
    }

    async pagaParcela({params}){
        await Database
            .raw('UPDATE parcela SET pago = 1, data_pagamento = ? WHERE id = ?', [moment().format('YYYY-MM-DD'),params.id])
        return {
            status: 200
        }
    }

    async delete({params}){
        await Database
            .raw('DELETE FROM vendas WHERE id = ?', [params.id])
        return {
            status: 200
        }
    }

}

module.exports = VendaController
