const express = require('express');
const anuncioRouter = express.Router();

anuncioRouter.post('/create', MerchaController.upload.single('imagem'),MerchaController.create);
anuncioRouter.get('/:id',);