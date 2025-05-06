import { Server } from 'socket.io';  // Alteração aqui

import transmissaoModel from './model/transmissaoModel.js';

// Função que escuta mensagens em um canal específico (porta)
function listen(porta, io, socket) {
    socket.on(porta, (menssagem) => {
        if (!menssagem || !menssagem.id) {
            console.error("Mensagem inválida recebida em", porta);
            return;
        }

        console.log(menssagem);

        transmissaoModel.update(menssagem.id, menssagem.update)
            .then((result) => console.log(result))
            .catch((err) => console.error(err));

        io.emit(porta, menssagem);
    });
}

// Função principal que inicializa o Socket.IO no servidor fornecido
const initializeSocket = (server) => {
    const io = new Server(server);  // Alteração: Usar `new` para instanciar o servidor do Socket.IO

    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id);

        listen("score", io, socket);
        listen("nome", io, socket);
        listen("visibilidade", io, socket);
        listen("posicao", io, socket);
        listen("cronometro", io, socket);
        listen("color", io, socket);

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });
};

// Exporta a função para ser usada em outro módulo
export default initializeSocket;
