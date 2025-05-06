//server.js
require('dotenv').config();
const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const transmissaoRouter = require('./backend/router/transmissaoRoutes');

const { initializeSocket  } = require('./backend/socketio');
// const transmissorRouter = require('./backend/router/transmissorRoutes');

const appExpress = express();

const server = http.createServer(appExpress);

initializeSocket(server)

// Middleware para JSON e URL-encoded
appExpress.use(bodyParser.urlencoded({ extended: false }));

appExpress.use(bodyParser.json());

appExpress.use(express.json());

const cors = require('cors');
const anuncioRouter = require('./backend/router/anuncioRolter');

appExpress.use(cors());

// Define o prefixo para as rotas da API
appExpress.use('/api/transmissao', transmissaoRouter);

appExpress.use('/', anuncioRouter);

// Servindo os arquivos estáticos do Vue.js
const frontendPath = path.join(__dirname, 'frontend/dist');

appExpress.use(express.static(frontendPath));

// Rota para servir o Vue.js em todas as rotas não API
appExpress.get('*', (req, res) => {
    // res.sendFile(path.join(frontendPath, 'index.html'));
    res.sendFile('index.html', { root: frontendPath });
});

const port = process.env.PORT || 4000;

// Inicializar servidor
server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
    
});
