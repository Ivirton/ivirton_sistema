import { Server } from 'socket.io';

import { FactorTrasmissaoSocket, FactorAnuncioSocket } from './socketsIO/factorySocket.js';

const initializeSocket = (server) => {
    // Função principal que inicializa o Socket.IO no servidor fornecido
    const ativado = false;
    const io = new Server(server);
   

    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id);
        if (ativado) {

            const transmissaoSocket = new FactorTrasmissaoSocket(io, socket)

            transmissaoSocket.addPorta("score")
            transmissaoSocket.addPorta("nome")
            transmissaoSocket.addPorta("visibilidade")
            transmissaoSocket.addPorta("posicao")
            transmissaoSocket.addPorta("cronometro")
            transmissaoSocket.addPorta("color")
            transmissaoSocket.listen()

            const anunciosSocket = new FactorAnuncioSocket(io, socket)
            anunciosSocket.addPorta("anuncio_visibilidade")
            anunciosSocket.listen()



        }

        socket.on('disconnect', () => console.log('Cliente desconectado:', socket.id))

    });
   
};

export default initializeSocket;