"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/usuario-login/:cpf/:senha", "UsuarioController.login");

Route.post("/fornecedor-cadastro", "FornecedorController.cadastrar");
Route.get("/todos-fornecedor/:id", "FornecedorController.getTodos");
Route.get("/fornecedor/:search", "FornecedorController.search");
Route.post("/fornecedor-editar", "FornecedorController.editar");

Route.post("/cliente-cadastro", "ClienteController.cadastrar");
Route.get("/todos-cliente/:id", "ClienteController.getTodos");
Route.get("/cliente/:search", "ClienteController.search");
Route.post("/cliente-editar", "ClienteController.editar");

Route.post("/venda-cadastro", "VendaController.cadastrar");
Route.get("/todas-venda/:id", "VendaController.getTodos");
Route.get("/venda/:search", "VendaController.getVenda");

Route.post("/produto-cadastro", "ProdutoController.cadastrar");
Route.get("/todos-produto/:id", "ProdutoController.getTodos");
Route.get("/produto/:search", "ProdutoController.search");
Route.post("/produto-editar", "ProdutoController.editar");