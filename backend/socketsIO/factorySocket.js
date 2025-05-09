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

                // Atualiza os dados no banco de dados usando o ID e os novos dados
                this.model.update(menssagem.id, menssagem.update)
                    .then((result) => console.log(result))
                    .catch((err) => console.error(err));

                // Emite a mesma mensagem para todos os clientes conectados
                this.io.emit(porta, menssagem);
                console.log(menssagem);
            });
        });
    }

    // Adiciona uma nova porta (evento) à lista que será escutada
    addPorta(porta) {
        this.portas.push(porta);
    }
}

// Classe especializada para tratar transmissões usando o transmissaoModel
class FactorTrasmissaoSocket extends FactorSocketIO {
    constructor(io, socket) {
        super(io, socket, transmissaoModel);
    }
}

// Classe especializada para tratar anúncios usando o anuncioModel
class FactorAnuncioSocket extends FactorSocketIO {
    constructor(io, socket) {
        super(io, socket, anuncioModel);
    }
}

// Exporta as classes especializadas para serem usadas em outras partes do projeto
export { FactorAnuncioSocket, FactorTrasmissaoSocket };
