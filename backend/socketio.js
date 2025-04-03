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
        observador = null
    }

}
// Classe Observador que será notificado
class Observador {
    constructor(socket, io) {

        this.socket = socket;
        this.io = io

        this.socket.on(socket.id, (menssagem) => {
            console.log("id transmisso recebido")
            console.log(menssagem)
            this.idTransmissor = menssagem.idTransmissor
            if(menssagem.idTransmissor){
              
            }
        });

    }

   
}

function listen(porta,io,socket) { 
    socket.on(porta, (menssagem) => {
        if (!menssagem || !menssagem.id) {
            console.error("Mensagem inválida recebida em", porta);
            return;
        }
        console.log(menssagem)
        transmissaoModel.update(menssagem.id, menssagem.update).then((result) => {console.log(result)}).catch((err) => console.error(err));
        io.emit(porta, menssagem);
    });
}

const initializeSocket = (server) => {
    const io = socketIo(server);

    io.on('connection',  function (socket) {
        console.log('Cliente conectado:', socket.id); 
        listen("score",io,socket)
        listen("nome",io,socket)
        listen("visibilidade",io,socket)
        listen("posicao",io,socket)
        listen("cronometro",io,socket)
        listen("color",io,socket)
       


        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id); 
            
        });
    });
};
module.exports = { initializeSocket };