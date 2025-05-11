<template>
    <section class="scorebord" v-if="placar.visibilidade"
        :style="{ left: props.placar.posicao.x + 'vw', top: props.placar.posicao.y + 'vh', zoom: props.placar.posicao.z + '%' }">
        <div class="linha">
            <div class="equipes">
                <div class="linha casa" :style="{ backgroundColor: props.placar.jogo.casa.color }">
                    <strong class="nome">{{ props.placar.jogo.casa.nome }}</strong>
                    <strong class="pontos">{{ props.placar.jogo.casa.pontos }}</strong>
                </div>
                <div class="linha visitante" :style="{ backgroundColor: props.placar.jogo.visitante.color }">
                    <strong class="pontos">{{ props.placar.jogo.visitante.pontos }}</strong>
                    <strong class="nome">{{ props.placar.jogo.visitante.nome }}</strong>

                </div>
            </div>
            <div>
                <div class="linha" v-if="props.placar.cronometro.visibilidade" style="background-color: #242425;">
                    <strong class="cronometro" style="display: flex;">
                        <p v-if="props.placar.cronometro.minuto < 10">0{{ props.placar.cronometro.minuto }}</p>
                        <p v-else>{{ props.placar.cronometro.minuto }}</p>
                        :
                        <p v-if="props.placar.cronometro.segundo < 10">0{{ props.placar.cronometro.segundo }}</p>
                        <p v-else>{{ props.placar.cronometro.segundo }}</p>
                    </strong>
                    <p style="padding: 0px 17px 0px 0px;">{{ props.placar.jogo.partida.pontos }}t°</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>

const props = defineProps({
    idTrasnmissao: {
        type: String,
    },
    valor: {
        type: Number,
    },
    socket: {
        type: Object
    },

    path: {
        type: String
    },
    placar: {
        type: Object
    }

})

function listen(porta, path, setValor) {
    props.socket.on(porta, (menssagem) => {
        if (path == menssagem['path'] && props.socket.id != menssagem.socketId && menssagem.id == props.idTrasnmissao) {
            console.log("RX")
            console.log(menssagem)
            setValor(menssagem.valor);
        }
    });
}
listen("score", "placar/jogo/partida/pontos", (valor) => {
    props.placar.jogo.partida.pontos = valor
})

listen("nome", "placar/jogo/casa/nome", (valor) => props.placar.jogo.casa.nome = valor)
listen("score", "placar/jogo/casa/pontos", (valor) => props.placar.jogo.casa.pontos = valor)

listen("nome", "placar/jogo/visitante/nome", (valor) => props.placar.jogo.visitante.nome = valor)
listen("score", "placar/jogo/visitante/pontos", (valor) => props.placar.jogo.visitante.pontos = valor)

listen("visibilidade", "placar/visibilidade", (valor) => props.placar.visibilidade = valor)

listen("cronometro", "placar/cronometro/minuto", (valor) => props.placar.cronometro.minuto = valor)
listen("cronometro", "placar/cronometro/segundo", (valor) => props.placar.cronometro.segundo = valor)
listen("visibilidade", "placar/cronometro/visibilidade", (valor) => props.placar.cronometro.visibilidade = valor)

listen("posicao", "placar/posicao/x", (valor) => props.placar.posicao.x = valor)
listen("posicao", "placar/posicao/y", (valor) => props.placar.posicao.y = valor)
listen("posicao", "placar/posicao/z", (valor) => props.placar.posicao.z = valor)




// listen("color", "placar/jogo/casa/color", (valor) => props.placar.casa.color = valor)
// listen("color", "placar/jogo/visitante/color", (valor) => props.placar.visitante.color = valor)

//depois corrigir isso 
props.socket.on("color", (menssagem) => {
    if ("placar/jogo/casa/color" == menssagem['path'] && props.socket.id != menssagem.socketId && menssagem.id == props.idTrasnmissao) {
        console.log("RX")
        console.log(menssagem)
        const casa = document.querySelector(".casa")
        props.placar.jogo.casa.color = menssagem.valor
        casa.style.backgroundColor = menssagem.valor
    }
});
props.socket.on("color", (menssagem) => {
    if ("placar/jogo/visitante/color" == menssagem['path'] && props.socket.id != menssagem.socketId && menssagem.id == props.idTrasnmissao) {
        console.log("RX")
        console.log(menssagem)
        const visitante = document.querySelector(".visitante")
        visitante.style.backgroundColor = menssagem.valor
        props.placar.jogo.visitante.color = menssagem.valor



    }
});







</script>
<style scoped>
* {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
}

.glass {
    position: relative;
    /* transform: translateX(-50%); */
    padding: 10px;
    background: linear-gradient(to bottom, #010101c7, #000000a3);
    border-radius: 6px;
    /* box-shadow: -4px 5px 10px rgb(0 0 0 / 10%); */
    text-align: center;
    z-index: 999;
    border: 1px solid #aaff00ad;
    overflow: hidden;
    backdrop-filter: blur(25px);

}

.scorebord {
    /* top: 40px; */
    /* left: 50px; */
    position: absolute;
    z-index: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: black;
    animation: slide-up 0.5s ease;
    border-radius: 8px;



}

@keyframes slide-up {
    from {
        opacity: 0;
        transform: translateY(-100%);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}


.changed {
    transform: translateY(20px);
    opacity: 0;
}

.cronometro {
    padding: 7px 10px 7px 10px;
    /* min-width: 68px; */
    text-align: center;
}



.equipes {
    display: flex;
    flex-direction: row;
}

.nome {
    padding: 7px 10px 7px 10px;

    min-width: 100px;
    text-align: center;
}

.pontos {
    padding: 7px 17px 7px 17px;
    background-color: rgba(41, 38, 38, 0.301);
    text-align: center;
}

.linha {
    display: flex;
    flex-direction: row;

}

coluna {
    display: flex;
    flex-direction: column;
}
</style>