
const TransmissaoController = require("../controller/TransmissaoController");

const express = require('express');
const router = express.Router();

router.post("/", TransmissaoController.create);              // Criar documento
router.post("/subcolecao", TransmissaoController.createSubCollection); // Criar subcoleção
router.get("/", TransmissaoController.findAll);              // Buscar todos os documentos
router.get("/:id", TransmissaoController.findAt);            // Buscar um documento por ID
router.put("/:id", TransmissaoController.update);            // Atualizar um documento
router.delete("/:id", TransmissaoController.delete);         // Deletar um documento

module.exports = router;
