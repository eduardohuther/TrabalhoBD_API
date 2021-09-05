'use strict'

const Database = use('Database')
const crypto = require('crypto');

class UsuarioController {

    async login({params, auth}){
        const user = await Database
            .raw('SELECT * FROM usuarios WHERE cpf = ? AND senha = ?', [params.cpf, params.senha])
            const toObject = JSON.parse(JSON.stringify(user))

        if(toObject[0].length == 1){
            
            const header = JSON.stringify({
                'alg': 'HS256',
                'typ': 'JWT'
            });
            
            const payload = JSON.stringify({
                'cpf': params.cpf,
                'senha': params.senha
            });
            
            const base64Header = Buffer.from(header).toString('base64').replace(/=/g, '');
            const base64Payload = Buffer.from(payload).toString('base64').replace(/=/g, '');
            const secret = 'segredo-brabo';
            
            const data = base64Header + '.' + base64Payload;
            
            const signature = crypto
                .createHmac('sha256', secret)
                .update(data)
                .digest('base64');
            
            const signatureUrl = signature
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=/g, '')

                await Database
                .raw('UPDATE usuarios SET token = ? WHERE cpf = ?', [signatureUrl, params.cpf])

            return {status: 200, token: signatureUrl }
        } else {
            return {status: 201}
        }
    }

    async getCadastros({params}){
        const user = await Database
            .raw('SELECT * FROM usuarios WHERE token = ?', [params.token])
            const toObject = JSON.parse(JSON.stringify(user))
            if(toObject[0].length == 1){
                const fornecedores = await Database
                .raw('SELECT id, cpf, nome FROM fornecedores ORDER BY id')
                const clientes = await Database
                .raw('SELECT id, cpf, nome FROM clientes ORDER BY id')
                const produtos = await Database
                .raw('SELECT id, nome, valor FROM produtos ORDER BY id')
                return {
                    status: 200,
                    fornecedores: JSON.parse(JSON.stringify(fornecedores))[0],
                    clientes: JSON.parse(JSON.stringify(clientes))[0],
                    produtos: JSON.parse(JSON.stringify(produtos))[0]
                } 
            }
    }
}

module.exports = UsuarioController
