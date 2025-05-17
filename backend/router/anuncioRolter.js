// backend/router/anuncioRolter.js
import express from 'express';
const anuncioRouter = express.Router();
import multer from 'multer';
import AnuncioController from '../controllers/anuncioController.js';

const upload = multer({ dest: 'uploads/' });

anuncioRouter.post('/', upload.single('imagem'),AnuncioController.create)
anuncioRouter.get("/", AnuncioController.findAll);              // Buscar todos os documentos
anuncioRouter.get("/ativos/", AnuncioController.findAllActive);              // Buscar todos os documentos ativos
anuncioRouter.get("/:id", AnuncioController.findAt);           // Buscar um documento por nome
anuncioRouter.put("/:id", AnuncioController.update);          // Atualizar um documento
anuncioRouter.delete("/:id", AnuncioController.delete);      // Deletar um documento

export default anuncioRouter;








