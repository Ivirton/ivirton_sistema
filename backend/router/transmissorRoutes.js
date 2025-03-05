
const TransmissorController = require("../controller/TransmissorController");

const express = require('express');
const transmissorRouter = express.Router();

transmissorRouter.post("/", TransmissorController.create);              // Criar documento
transmissorRouter.post("/subcolecao", TransmissorController.createSubCollection); // Criar subcoleção
transmissorRouter.get("/", TransmissorController.findAll);              // Buscar todos os documentos
transmissorRouter.get("/:id", TransmissorController.findAt);            // Buscar um documento por ID
transmissorRouter.put("/:id", TransmissorController.update);            // Atualizar um documento
transmissorRouter.delete("/:id", TransmissorController.delete);         // Deletar um documento

module.exports = transmissorRouter;
