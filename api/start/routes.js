"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/usuario-login/:cpf/:senha", "UsuarioController.login");
Route.get("/get-cadastros/:token", "UsuarioController.getCadastros");

Route.post("/fornecedor-cadastro", "FornecedorController.cadastrar");
Route.get("/todos-fornecedor/:id", "FornecedorController.getTodos");
Route.get("/fornecedor/:search", "FornecedorController.search");
Route.post("/fornecedor-editar", "FornecedorController.editar");
Route.get("/delete-fornecedor/:id", "FornecedorController.delete");

Route.post("/cliente-cadastro", "ClienteController.cadastrar");
Route.get("/todos-cliente/:id", "ClienteController.getTodos");
Route.get("/cliente/:search", "ClienteController.search");
Route.post("/cliente-editar", "ClienteController.editar");
Route.get("/delete-cliente/:id", "ClienteController.delete");
Route.get("/cliente-devem", "ClienteController.devem");

Route.post("/venda-cadastro", "VendaController.cadastrar");
Route.get("/todas-venda/:token", "VendaController.getTodos");
Route.get("/venda/:id", "VendaController.getVenda");
Route.get("/paga-parcela/:id", "VendaController.pagaParcela");
Route.get("/delete-venda/:id", "VendaController.delete");

Route.post("/produto-cadastro", "ProdutoController.cadastrar");
Route.get("/todos-produto/:id", "ProdutoController.getTodos");
Route.get("/produto/:search", "ProdutoController.search");
Route.post("/produto-editar", "ProdutoController.editar");
Route.get("/delete-produto/:id", "ProdutoController.delete");
Route.get("/mais-vendidos/:i/:f", "ProdutoController.maisVendidos");
Route.get("/mais-lucrativos/:i/:f", "ProdutoController.maisLucrativos");