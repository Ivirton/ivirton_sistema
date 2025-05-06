import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import initializeSocket from './backend/socketio.js';  // Esta importação está correta
import transmissaoRouter from './backend/router/transmissaoRoutes.js';
import anuncioRouter from './backend/router/anuncioRolter.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appExpress = express();
const server = http.createServer(appExpress);

initializeSocket(server);  // Inicializa o Socket.IO

appExpress.use(bodyParser.urlencoded({ extended: false }));
appExpress.use(bodyParser.json());
appExpress.use(express.json());
appExpress.use(cors());

appExpress.use('/api/transmissao', transmissaoRouter);
appExpress.use('/', anuncioRouter);

const frontendPath = path.join(__dirname, 'frontend/dist');
appExpress.use(express.static(frontendPath));

appExpress.get('*', (req, res) => {
    res.sendFile('index.html', { root: frontendPath });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
