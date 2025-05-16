
import { Server } from 'socket.io';

// Importa as classes responsáveis por gerenciar os sockets 
import { FactorTrasmissaoSocket, FactorAnuncioSocket } from './factorySocket.js';

// Função que inicializa e configura o servidor WebSocket
const initializeSocket = (server) => {
    // Flag para ativar ou desativar o gerenciamento dos sockets personalizados


    // Cria uma instância do servidor Socket.io utilizando o servidor HTTP fornecido
    const io = new Server(server);
    // Cria um gerenciador de sockets para transmissão
        let transmissaoSocket = new FactorTrasmissaoSocket(io);
    const anunciosSocket = new FactorAnuncioSocket(io);
    // Evento disparado sempre que um novo cliente se conecta ao WebSocket
    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id);
        transmissaoSocket.setSocket(socket);
        transmissaoSocket.listen();
        
    
        anunciosSocket.setSocket(socket);
        socket.on('disconnect', () => {

        });
    });
};
// Exporta a função para ser utilizada em outro lugar do projeto  server.js
export default initializeSocket;
