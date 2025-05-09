
//Fabrica padra para  salvar atuazar os dados de qualquer model
import transmissaoModel from '../model/transmissaoModel.js';
import anuncioModel from '../model/anuncioModel.js';
class FactorSocketIO {
    constructor(io, socket, model) {
        this.io = io
        this.socket = socket
        this.model = model
        this.portas = []
    }

    listen() {
        this.portas.forEach(porta => {
            this.socket.on(porta, (menssagem) => {
                if (!menssagem || !menssagem.id) {
                    console.error("Mensagem inválida recebida na porta", porta)
                    return
                }
                this.model.update(menssagem.id, menssagem.update)
                    .then((result) => console.log(result))
                    .catch((err) => console.error(err));
                //envia de volta os dados para todos
                io.emit(porta, menssagem);
                console.log(menssagem)
            })
        })
    }

    addPorta(porta) {
        this.portas.push(porta)
    }

}




class FactorTrasmissaoSocket extends FactorSocketIO {
    constructor(io,socket) {
        super(io,socket,transmissaoModel)
    }
}




class FactorAnuncioSocket extends FactorSocketIO {
    constructor(io,socket) {
        super(io,socket,anuncioModel)
    }
}

export  { FactorAnuncioSocket,FactorTrasmissaoSocket };