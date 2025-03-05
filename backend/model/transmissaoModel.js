
const transmissao = {
    nome: "",
    placar: {
        visibilidade: true,
        posicao: { x: 0, y: 0, z: 0 },
        jogo: { casa: { nome: "casa", pontos: 0 }, visitante: { nome: "visitante", pontos: 0 }, partida: 1 },
        cronometro: {
            segundo: 0,
            minuto: 0,
            duracao: 60,
            icone: "play",
            tipo: 1
        }
    },
    anuncios: {
        rotativo: {
            visibilidade: true,
            posicao: { x: 0, y: 0, z: 0 },
        }
    },
    Logo: {
        visibilidade: true,
        posicao: { x: 0, y: 0, z: 0 },
        url: ""
    }
}
const TransmissaoModel = {
    async create(key) {
        try {
            const t1 = transmissao
            t1.nome = key
            await set(ref(db, `transmissao/${key}`), transmissao);
            console.log('documeton criado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar documetno:', error);
        }
    },
    async findAll() {
        try {


        } catch (error) {

            return [];
        }
    },

    async findAt(id) {
        try {




        } catch (error) {

            return null;
        }
    },

    async update(id, novoNome) {
        try {

        } catch (error) {
            console.error("Erro ao atualizar campo:", error);
        }
    },

    async delete(id) {
        try {

        } catch (error) {

        }
    }
};

module.exports = TransmissaoModel

// Correta chamada da função assíncrona
// (async () => {
//     console.log(await TransmissaoModel.findAll());
// })();
