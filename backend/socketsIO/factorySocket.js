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
            this.io.emit(porta, menssagem);
            callBack(menssagem);

        });
    }
}


// class FactorTrasmissaoSocket extends FactorSocketIO {
//     constructor(io, socket) {
//         super(io, socket, transmissaoModel);

//         this.addPorta("score");
//         this.addPorta("nome");
//         this.addPorta("visibilidade");
//         this.addPorta("posicao");
//         this.addPorta("cronometro");
//         this.addPorta("color");
//         this.addPorta("transmissorSetAnuncioPlay");
//         this.addPorta("setContadorAnuncio");
//         this.listenOn("setContadorAnuncio", (data) => {
//             console.log(data);
//         })
//     }

// }
let instanciaUnicaTransmissao = null;
class FactorTrasmissaoSocket extends FactorSocketIO {
    constructor(io) {
        if (instanciaUnicaTransmissao) {
            return instanciaUnicaTransmissao;
        }
        super(io, null, transmissaoModel);
        instanciaUnicaTransmissao = this;


    }
    setSocket(socket) {
        this.socket = socket;
        this.addPorta("score");
        this.addPorta("nome");
        this.addPorta("visibilidade");
        this.addPorta("posicao");
        this.addPorta("cronometro");
        this.addPorta("color");
        this.addPorta("transmissorSetAnuncioPlay");
        this.addPorta("setContadorAnuncio");
        this.listenOn("setContadorAnuncio", (data) => {
            console.log(data);
        })
    }

}


let instanciaUnica = null;
class FactorAnuncioSocket extends FactorSocketIO {
    constructor(io) {
        if (instanciaUnica) {
            return instanciaUnica;
        }

        super(io, null, anuncioModel);
        this.io = io;
        this.anuncios = [];
        this.chaves = [];
        this.indiceAtual = 0;
        this.reproduzindo = false;
        this.interval = null;
        this.contador = 0;
        this.anuncioAtual = { duracao: 10 };
        this.gerAnuncios();
        instanciaUnica = this;
    }

    // Define o socket manualmente (por cliente conectado)
    setSocket(socket) {
        this.socket = socket;

        this.socket.on("setImagemAnuncio", (menssagem) => {
            this.io.emit("setImagemAnuncio", menssagem);
        });
        this.listenOn("duracao", (data) => {
            console.log(data);
            this.update(data.id, data.update);
        });

        this.listenOn("transmissorSetAnuncioPlay", (data) => {
            this.veificarAnuncio(data);

            console.log(data);
        });

        this.listenOn("backward", () => this.voltarAnuncio());
        this.listenOn("forward", () => this.avancarAnuncio());
    }

    veificarAnuncio(data) {
        if (data.valor === true) {
            this.startRotativo();
        } else {
            this.pararRotativo();
        }
    }

    startRotativo() {
        if (this.reproduzindo || this.anuncios.length === 0) return;
        this.reproduzindo = true;
        this.executarAnuncioRotativo();
    }

    executarAnuncioRotativo() {
        this.interval = setInterval(() => {
            if (this.anuncioAtual.duracao <= this.contador) {
                this.avancarAnuncio();
                console.log("anuncio atual");
                console.log(this.anuncioAtual)
                this.contador = 0;
            }
            console.log(this.contador);
            this.contador++;
        }, 1000);
    }

    pararRotativo() {
        this.reproduzindo = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    async gerAnuncios() {
        this.anuncios = await anuncioModel.findAll();
        this.chaves = Object.keys(this.anuncios);
        this.anuncioAtual = this.anuncios[this.chaves[0]];

        this.avancarAnuncio()

    }

    avancarAnuncio() {
        if (this.indiceAtual < this.chaves.length - 1) {
            this.indiceAtual++;
        } else {
            this.indiceAtual = 0;
            this.gerAnuncios();
        }
        this.anuncioAtual = this.anuncios[this.chaves[this.indiceAtual]];
        console.log(this.anuncioAtual);
        this.io.emit("setImagemAnuncio", this.anuncioAtual);
    }

    voltarAnuncio() {
        if (this.indiceAtual > 0) {
            this.indiceAtual--;
        } else {
            this.indiceAtual = this.chaves.length - 1;
            this.gerAnuncios();
        }
        this.anuncioAtual = this.anuncios[this.chaves[this.indiceAtual]];
        this.io.emit("setImagemAnuncio", this.anuncioAtual);
    }
}

export { FactorAnuncioSocket, FactorTrasmissaoSocket };
