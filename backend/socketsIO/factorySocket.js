// Importa os modelos de dados usados para manipular no socket
import transmissaoModel from '../model/transmissaoModel.js';
import anuncioModel from '../model/anuncioModel.js';
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
            this.io.emit(porta, menssagem);

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
        this.id = undefined;
        this.interval = null;
        this.rorando = false
        this.cronometro = {
            duracao: 60,
            hora: 0,
            icone: true,
            minuto: 0,
            segundo: 1,
            tipo: '0',
            visibilidade: true
        }
        instanciaUnicaTransmissao = this;


    }
    setSocket(socket) {
        this.socket = socket;
        this.addPorta("score");
        this.addPorta("nome");


        this.addPorta("visibilidade");
        this.addPorta("posicao");
        // this.addPorta("cronometro");
        this.addPorta("color");
        this.addPorta("transmissorSetAnuncioPlay");
        this.addPorta("setContadorAnuncio");
        this.listenOn("setContadorAnuncio", (data) => {
            console.log(data);
        })
        this.listenOn("playEspelhar", (data) => {
            console.log(data);
        })


        this.listenOn("stopcronometro",async(data)=>{
            this.stop()
            console.log("stoop")
        })

        this.listenOn("cronometro", async (data) => {
            console.log(data);
            this.id = data.id;
            this.update(data.id, data.update);
            switch (data.key) {
                case "icone":
                    if (data.valor === true) {
                        if (!this.rorando) {
                            this.getCronometro(data)
                        }
                        this.play()
                    } else if (data.valor === false) {
                        this.pause()
                    }
                    break
                case "segundo":
                    if (!this.cronometroStatus()) {
                        this.cronometro.segundo = data.valor
                        
                    }

                    break
                case "minuto":
                    if (!this.cronometroStatus()) {
                        this.cronometro.minuto = data.valor
                    }

                    break
                case "duracao":
                    if (!this.cronometroStatus()) {
                        this.cronometro.duracao = data.valor
                    }
                    break
                case "tipo":
                    this.cronometro.tipo = data.valor
                    break
            }


        })


    }
    sendData(key, valor) {

        this.io.emit(`cronometro`, {
            "id": this.id,
            socketId: this.socket.id,
            update: { [`placar/cronometro/${key}`]: valor },
            valor: valor,
            key: key,
            path: `placar/cronometro/${key}`
        });
    }
    //cronometro
    async getCronometro(data) {
        try {
            const transmiss = await this.model.findAt(data.id);
            this.cronometro = transmiss.placar.cronometro;
            // console.log(this.cronometro);
        } catch (err) {
            console.error("Erro ao buscar cronômetro:", err);
        }

    }
    play() {
        if (this.interval) return;
        this.interval = setInterval(() => {
            if (!this.rorando && !this.cronometro.icone) {
                this.getCronometro(this.id);
            }
            if (this.cronometro.tipo === '0') {
                this.contagemProgressiva();
                this.cronometro.icone = true;
                this.rorando = true
            } else {
                if (this.rorando === false) {
                    this.getCronometro(this.id)
                    this.cronometro.minuto = this.cronometro.duracao
                    this.cronometro.segundo = this.cronometro.segundo
                    this.update(this.id, { [`placar/cronometro/minuto`]: this.cronometro.minuto });
                    this.update(this.id, { [`placar/cronometro/segundo`]: this.cronometro.segundo });

                }
                this.contagemRegressiva();
                this.cronometro.icone = true;
                this.rorando = true
            }
        }, 1000);
    }
    stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.cronometro.minuto = 0
        this.cronometro.segundo = 0
        this.cronometro.icone = false;
        this.rorando = false
        this.sendData("icone", this.cronometro.icone);


        this.rorando = false
    }
    pause() {
        clearInterval(this.interval);
        this.interval = null;
        this.cronometro.icone = false;
        // this.rorando = false;
    }
    cronometroStatus() {
        return !!(this.rodando && this.cronometro.icone);
    }
    contagemProgressiva() {
        if (this.cronometro.minuto === this.cronometro.duracao) {
            this.cronometro.minuto = 0
            this.cronometro.segundo = 0
        }
        else {
            if (this.cronometro.segundo === 59) {
                this.cronometro.minuto++;
                this.sendData("minuto", this.cronometro.minuto);
                this.update(this.id, { [`placar/cronometro/segundo`]: this.cronometro.segundo });

                this.cronometro.segundo = 0;
            } else {
                this.cronometro.segundo++
                this.sendData("segundo", this.cronometro.segundo);
                this.update(this.id, { [`placar/cronometro/segundo`]: this.cronometro.segundo });

            }
        }
    }
    contagemRegressiva() {


        if (this.cronometro.minuto === 0 && this.cronometro.segundo === 0 && this.rorando == true) {
            this.stop();
        } else {
            if (this.cronometro.icone) {
                if (this.cronometro.segundo === 0) {
                    if (this.cronometro.minuto !== 0) {
                        this.cronometro.minuto--;
                        this.cronometro.segundo = 59;
                        this.sendData("minuto", this.cronometro.minuto);
                        this.update(this.id, { [`placar/cronometro/minuto`]: this.cronometro.minuto });
                    }
                } else {
                    this.cronometro.segundo--;
                    console.log(this.cronometro)
                    this.sendData("segundo", this.cronometro.segundo);
                    if (this.cronometro.segundo == 30) {
                        console.log("Segundo Salvo");
                        this.update(this.id, { [`placar/cronometro/segundo`]: this.cronometro.segundo });
                    }
                }
            }
        }
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

        this.listenOn("anuncio_visibilidade", (data) => {
            this.update(data.id, data.update);
            console.log(data);
        });

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
            // console.log(this.contador);
            this.contador++;
            this.io.emit("setContadorAnuncio", { contador: this.contador, duracao: this.anuncioAtual.duracao });

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
        try {
            this.anuncios = await anuncioModel.findAll();
            this.anuncios = Object.fromEntries(
                Object.entries(this.anuncios).filter(([key, value]) => value.visibilidade === true)
            );
            this.chaves = Object.keys(this.anuncios);
            this.anuncioAtual = this.anuncios[this.chaves[0]];
        } catch (err) {
            console.error("Erro ao buscar anúncios:", err);
        }
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