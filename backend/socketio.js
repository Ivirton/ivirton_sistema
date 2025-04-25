// Importa o módulo socket.io para comunicação em tempo real via WebSockets
const socketIo = require('socket.io');

// Importa o modelo de dados relacionado à transmissão (pode ser banco de dados ou estrutura de dados)
const transmissaoModel = require('./model/transmissaoModel');


// Classe Sujeito (Subject no padrão Observer), que mantém uma lista de observadores
class Sujeito {
    constructor() {
        this.observadores = [];  // Lista de observadores inscritos
    }

    // Adiciona um observador à lista
    inscrever(observador) {
        this.observadores.push(observador);
    }

    // Remove um observador da lista
    desinscrever(observador) {
        this.observadores = this.observadores.filter(obs => obs !== observador);
        observador = null // (opcional aqui, já que o GC cuidaria disso)
    }
}

// Classe Observador — escuta e reage a eventos vindos via socket
class Observador {
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;

        // O observador escuta eventos cujo nome é o ID do socket
        this.socket.on(socket.id, (menssagem) => {
            console.log("id transmissor recebido");
            console.log(menssagem);

            // Armazena o ID do transmissor recebido na mensagem
            this.idTransmissor = menssagem.idTransmissor;

            if (menssagem.idTransmissor) {
                // (Ponto onde algo poderia ser feito, mas o bloco está vazio)
            }
        });
    }
}

// Função que escuta mensagens em um canal específico (porta)
function listen(porta, io, socket) {
    socket.on(porta, (menssagem) => {
        // Verifica se a mensagem é válida
        if (!menssagem || !menssagem.id) {
            console.error("Mensagem inválida recebida em", porta);
            return;
        }

        console.log(menssagem);

        // Atualiza os dados da transmissão usando o model (pode ser uma operação em BD)
        transmissaoModel.update(menssagem.id, menssagem.update)
            .then((result) => console.log(result))
            .catch((err) => console.error(err));

        // Reenvia a mensagem para todos os clientes conectados
        io.emit(porta, menssagem);
    });
}

// Função principal que inicializa o Socket.IO no servidor fornecido
const initializeSocket = (server) => {
    const io = socketIo(server); // Cria o servidor socket.io

    // Evento de nova conexão de cliente
    io.on('connection', function (socket) {
        console.log('Cliente conectado:', socket.id);

        // Escuta os canais relevantes
        listen("score", io, socket);
        listen("nome", io, socket);
        listen("visibilidade", io, socket);
        listen("posicao", io, socket);
        listen("cronometro", io, socket);
        listen("color", io, socket);

        // Evento de desconexão do cliente
        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });
};

// Exporta a função para ser usada em outro módulo
module.exports = { initializeSocket };
