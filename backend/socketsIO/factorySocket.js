// Fábrica padrão para salvar e atualizar os dados de qualquer model via WebSocket

// Importa os modelos de dados usados para manipular no socket
import transmissaoModel from '../model/transmissaoModel.js';
import anuncioModel from '../model/anuncioModel.js';

// Classe genérica para criação de sockets dinâmicos que interagem com o banco de dados
class FactorSocketIO {
    constructor(io, socket, model) {
        this.io = io;              // Instância do servidor Socket.IO
        this.socket = socket;      // Conexão individual do cliente
        this.model = model;        // Model (banco de dados) que será manipulado
        this.portas = [];          // Lista de "portas" (eventos) que o socket irá escutar
    }

    // Método que escuta todos os eventos definidos nas portas
    listen() {
        this.portas.forEach(porta => {
            this.socket.on(porta, (menssagem) => {
                // Verifica se a mensagem recebida é válida
                if (!menssagem || !menssagem.id) {
                    console.error("Mensagem inválida recebida na porta", porta);
                    return;
                }
                if (menssagem.update) {
                    this.update(menssagem.id, menssagem.update)
                }

                // Emite a mesma mensagem para todos os clientes conectados
                this.io.emit(porta, menssagem);
                console.log(menssagem);
            });
        });

    }

    update(id, update) {
        // Atualiza os dados no banco de dados usando o ID e os novos dados
        this.model.update(id, update)
            .then((result) => console.log(result))
            .catch((err) => console.error(err));
    }


    addPorta(porta) {
        this.portas.push(porta);
    }
    listenOn(porta, callBack) {
        this.socket.on(porta, (menssagem) => {
            if (!menssagem) {
                console.error("Mensagem inválida recebida na porta", porta);
                return;
            }
            callBack(menssagem);
        });
    }
}


class FactorTrasmissaoSocket extends FactorSocketIO {
    constructor(io, socket) {
        super(io, socket, transmissaoModel);

        this.addPorta("score");
        this.addPorta("nome");
        this.addPorta("visibilidade");
        this.addPorta("posicao");
        this.addPorta("cronometro");
        this.addPorta("color");
        this.listenOn("transmissorSetAnuncioPlay", (valor) => {
            console.log("Play anuncios")
        });

         this.socket.on("setImagemAnuncio", (menssagem) => {
            this.io.emit("setImagemAnuncio", menssagem);
            console.log(menssagem);
        });


    }

}


class FactorAnuncioSocket extends FactorSocketIO {
    constructor(io, socket) {
        super(io, socket, anuncioModel);
        this.anuncios = [];
        this.chaves = 0;
        this.indiceAtual = 0;

        this.gerAnuncios();



    
        this.listenOn("backward", (valor) => {
            const anuncio = this.voltarAnuncio()
            console.log(anuncio)
           
            this.io.emit("setImagemAnuncio",  anuncio);
        });


        this.listenOn("forward", (valor) => {
            const anuncio = this.avancarAnuncio()
            console.log(anuncio)
            this.io.emit("setImagemAnuncio",  anuncio );

        });

       

    }


    async gerAnuncios() {
        this.anuncios = await anuncioModel.findAll()
        this.chaves = Object.keys(this.anuncios);
    }

    avancarAnuncio() {
        if (this.indiceAtual < this.chaves.length - 1) {
            this.indiceAtual++;
        } else {
            this.indiceAtual = 0; // loop para o início
            this.gerAnuncios()
            console.log("Lista atualizada")
        }
        return this.anuncios[this.chaves[this.indiceAtual]];
    }

    voltarAnuncio() {
        if (this.indiceAtual > 0) {
            this.indiceAtual--;
        } else {
            this.indiceAtual = this.chaves.length - 1; // loop para o final
            console.log("Lista atualizada")

            this.gerAnuncios()
        }
        return this.anuncios[this.chaves[this.indiceAtual]];
    }

}



// Exporta as classes especializadas para serem usadas em outras partes do projeto
export { FactorAnuncioSocket, FactorTrasmissaoSocket };
