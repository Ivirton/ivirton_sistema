const transmissao = {
    nome:"",
    id:"",
    placar: {
        visibilidade: true,
        posicao: { x: 0, y: 0, z: 0 },
        jogo: { casa: { nome: "casa", pontos: 0 }, visitante: { nome: "visitante", pontos: 0 } ,partida:1},
        cronometro:{
            segundo:0,
            minuto:0,
            duracao:60,
            icone:"play",
            tipo:1
        }
    },
    anuncios: {
        rotativo: {
            visibilidade: true,
            posicao: { x: 0, y: 0, z: 0 },
        }
    },
    Logo:{
        visibilidade: true,
        posicao: { x: 0, y: 0, z: 0 },
        url: ""
    }
}

module.exports = transmissao

