require('dotenv').config();
const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const transmissaoRouter = require('./backend/router/transmissaoRoutes');
const { database } = require('firebase-admin');
const { initializeSocket } = require('./backend/socketio');

const appExpress = express();
const server = http.createServer(appExpress);
initializeSocket(server)

// Middleware para JSON e URL-encoded
appExpress.use(bodyParser.urlencoded({ extended: false }));
appExpress.use(bodyParser.json());
appExpress.use(express.json());
const cors = require('cors');



// const transmissorRouter = require('./backend/router/transmissorRoutes');
appExpress.use(cors());
// Servindo os arquivos estáticos do Vue.js
const frontendPath = path.join(__dirname, 'frontend/dist');
appExpress.use(express.static(frontendPath));


// Define o prefixo para as rotas da API
appExpress.use('/api/transmissao', transmissaoRouter);
// appExpress.use('/api/transmissor', transmissorRouter);


// Rota para servir o Vue.js em todas as rotas não API
// appExpress.get('*', (req, res) => {
//     res.sendFile(path.join(frontendPath, 'index.html'));
// });



// Inicializar servidor
const port = process.env.PORT || 4000;
server.listen(port, () => {
    
    console.log(`Servidor rodando na porta: ${port}`);
});
