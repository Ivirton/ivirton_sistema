require('dotenv').config();
const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const router = require('./src/router/router');
const { initializeSocket } = require('./src/controller/socketController');
require('./src/model/sincronizar');






const appExpress = express();
const server = http.createServer(appExpress);
initializeSocket(server)

// Configuração do diretório público para servir arquivos estáticos
router.use(express.static('public'))

// Habilita o middleware para interpretar dados codificados na URL (por exemplo, dados de formulário)
appExpress.use(bodyParser.urlencoded({ extended: false }))

// parse appExpresslication/json
appExpress.use(bodyParser.json())

// Habilita o middleware para interpretar o corpo das requisições como JSON
router.use(express.json());

// Configuração do view engine (EJS)
appExpress.set('view engine', 'ejs');
appExpress.set('views', path.join(__dirname, 'src/views'));

// Define o prefixo para as rotas 
appExpress.use('/', router);






//inicializar servidor 
let port = process.env.PORT || 4000;
server.listen(port, () => {
	console.log(`Servidor rodando na porta :${port}`);
});