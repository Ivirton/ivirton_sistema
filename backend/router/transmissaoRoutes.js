// backend/router/transmissaoRoutes.js
import express from 'express';
import TransmissaoController from '../controller/TransmissaoController.js';

const transmissaoRouter = express.Router();

transmissaoRouter.post("/", TransmissaoController.create);              // Criar documento
transmissaoRouter.get("/", TransmissaoController.findAll);              // Buscar todos os documentos
transmissaoRouter.get("/:nome", TransmissaoController.findAt);          // Buscar um documento por nome
transmissaoRouter.put("/:nome", TransmissaoController.update);          // Atualizar um documento
transmissaoRouter.delete("/:id", TransmissaoController.delete);         // Deletar um documento

export default transmissaoRouter;
