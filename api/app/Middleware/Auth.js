'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    console.log(request)
    const data = request.only(['cpf', 'senha'])
    const user = await Database
            .raw('SELECT COUNT(1) FROM usuarios WHERE cpf = ? AND senha = ?', [data.cpf, data.senha])
      if(user){
        await next()
      }
  }
}

module.exports = Auth
