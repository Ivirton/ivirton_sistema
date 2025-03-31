
const TransmissaoController = require("../controller/TransmissaoController");

const express = require('express');
const transmissaoRouter = express.Router();

transmissaoRouter.post("/", TransmissaoController.create);              // Criar documento
transmissaoRouter.get("/", TransmissaoController.findAll);              // Buscar todos os documentos
transmissaoRouter.get("/:nome", TransmissaoController.findAt);          // Buscar um documento por ID
transmissaoRouter.put("/:nome", TransmissaoController.update);          // Atualizar um documento
transmissaoRouter.delete("/:id", TransmissaoController.delete);         // Deletar um documento

module.exports = transmissaoRouter;
