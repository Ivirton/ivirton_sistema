
import { Server } from 'socket.io';

// Importa as classes responsáveis por gerenciar os sockets 
import { FactorTrasmissaoSocket, FactorAnuncioSocket } from './factorySocket.js';

// Função que inicializa e configura o servidor WebSocket
const initializeSocket = (server) => {
    // Flag para ativar ou desativar o gerenciamento dos sockets personalizados
    const ativado = false;

    // Cria uma instância do servidor Socket.io utilizando o servidor HTTP fornecido
    const io = new Server(server);
   
    // Evento disparado sempre que um novo cliente se conecta ao WebSocket
    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id);

        // Só executa a lógica abaixo se a flag "ativado" for true
        if (ativado) {
            // Cria um gerenciador de sockets para transmissão
            const transmissaoSocket = new FactorTrasmissaoSocket(io, socket);

            // Adiciona diferentes "portas" (eventos) que o socket pode escutar ou emitir
            transmissaoSocket.addPorta("score");
            transmissaoSocket.addPorta("nome");
            transmissaoSocket.addPorta("visibilidade");
            transmissaoSocket.addPorta("posicao");
            transmissaoSocket.addPorta("cronometro");
            transmissaoSocket.addPorta("color");

            // Ativa os listeners das portas adicionadas
            transmissaoSocket.listen();

            // Cria e configura o socket de anúncios
            const anunciosSocket = new FactorAnuncioSocket(io, socket);
            anunciosSocket.addPorta("anuncio_visibilidade");
            anunciosSocket.listen();
        }

        // Evento chamado quando um cliente se desconecta
        socket.on('disconnect', () => console.log('Cliente desconectado:', socket.id));
    });
};

// Exporta a função para ser utilizada em outro lugar do projeto (ex: app.js)
export default initializeSocket;
