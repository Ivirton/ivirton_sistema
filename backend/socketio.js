const socketIo = require('socket.io');
const transmissaoModel = require('./model/transmissaoModel');


class Sujeito {
    constructor() {
        this.observadores = [];  // Lista de observadores
    }

    // Adiciona um observador
    inscrever(observador) {
        this.observadores.push(observador);
    }

    // Remove um observador
    desinscrever(observador) {
        this.observadores = this.observadores.filter(obs => obs !== observador);
    }

    // Notifica todos os observadores sobre um evento
    notificar(dados) {
        this.observadores.forEach(observador => observador.atualizar(dados));
    }
}
// Classe Observador que será notificado
class Observador {
    constructor(socket, io) {

        this.socket = socket;
        this.io = io
        // this.idTrasnmissao = idTrasnmissao

    }

    listen() {
       this.socket.on(`${this.idTrasnmissao}`, (menssagem) => {
            console.log(menssagem)
            this.io.emit(`${this.idTrasnmissao}`, menssagem);
        });
    }

    atualizar(dados) {
        this.socket.emit('notificacao', dados);
    }
}

const sujeito = new Sujeito();
const initializeSocket = (server) => {
    const io = socketIo(server);

    io.on('connection', async function (socket) {
        
        // const observador = new Observador(socket,io);
        // sujeito.inscrever(observador);
        
        socket.on('disconnect', () => {
            // console.log('Cliente desconectado:', socket.id);
            // sujeito.desinscrever(observador);
        });
       
        socket.on(`score`, (menssagem) => {
            console.log(menssagem)
            transmissaoModel.update(menssagem.id,menssagem.update ).then((result) => {
                console.log(result)
               
            }).catch((err) => {
               console.error(err)
            });
            io.emit(`score`, menssagem);
        });

        socket.on(`texto`, (menssagem) => {
            console.log(menssagem)
            transmissaoModel.update(menssagem.id,menssagem.update ).then((result) => {
                console.log(result)
               
            }).catch((err) => {
               console.error(err)
            });
            io.emit(`texto`, menssagem);
        });
        socket.on(`visibilidade`, (menssagem) => {
            console.log(menssagem)
            transmissaoModel.update(menssagem.id,menssagem.update ).then((result) => {
                console.log(result)
               
            }).catch((err) => {
               console.error(err)
            });
            io.emit(`visibilidade`, menssagem);
        });
        socket.on(`posicao`, (menssagem) => {
            console.log(menssagem)
            transmissaoModel.update(menssagem.id,menssagem.update ).then((result) => {
                console.log(result)
               
            }).catch((err) => {
               console.error(err)
            });
            io.emit(`posicao`, menssagem);
        });

    });
};
module.exports = { initializeSocket };