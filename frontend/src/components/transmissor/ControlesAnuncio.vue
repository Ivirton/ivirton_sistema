<template>
    <div class="linha">
        <section class="coluna">
            <img class="anunciosImagem" :src="props.imagem" alt="" srcset="">



        </section>
        <div class="coluna">
            <p>Duracao:{{ props.duracao }}/{{ props.contador }}</p>
            <div style="display: flex;align-content: center; align-items: center;">
                <i class="fas fa-step-backward" aria-hidden="true" @click="backward"></i>
                <i v-if="props.anuncio.play" class="fas fa-pause" @click="play()"></i>
                <i v-else class="fas fa-play" @click="play()"></i>
                <i class="fas fa-step-forward" aria-hidden="true" @click="forward"></i>

            </div>
        </div>

    </div>

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
    anuncio: {
        type: Object
    },
    imagem: {
        type: String
    },
    duracao: {
        type: Number
    },
    nome: {
        type: String
    },
    contador: {
        type: Number
    }

})
function backward() {
    console.log("Voltar")
    props.socket.emit(`backward`, {
        "id": props.idTrasnmissao,
        socketId: props.socket.id,
        "acao": "backward"
    });
}
function forward() {
    console.log("Avançar")
    props.socket.emit(`forward`, {
        "id": props.idTrasnmissao,
        socketId: props.socket.id,
        "acao": "forward"
    });

}
function play() {
    props.anuncio.play = !props.anuncio.play
    sendData("play", props.anuncio.play)
}
function stop() {
    props.anuncio.play = false
    sendData("play", props.anuncio.play)


}
function sendData(key, valor) {

    props.socket.emit(`transmissorSetAnuncioPlay`, {
        "id": props.idTrasnmissao,
        socketId: props.socket.id,
        update: { [`${props.path}/${key}`]: valor },
        valor: valor,
        key: key,
        path: `${props.path}/${key}`
    });
}



props.socket.on(`transmissorSetAnuncioPlay`, (menssagem) => {
    console.log(menssagem)
    if ("anuncios/rotativo/play" == menssagem['path'] && props.socket.id != menssagem.socketId && menssagem.id == props.idTrasnmissao) {
        console.log("RX")
        console.log(menssagem)
        props.anuncio.play = menssagem.valor
    }
});
props.socket.on("setImagemAnuncio", (menssagem) => {
    console.log(menssagem)
    props.imagem = `https://uogqtlofsmvofetnsvug.supabase.co/storage/v1/object/public/imagens//${menssagem.nome}`
    props.duracao = menssagem.duracao
    props.nome = menssagem.nome

});
props.socket.on("setContadorAnuncio", (menssagem) => {

    props.contador = menssagem.contador
});


</script>

<style scoped>
.coluna {
    display: flex;
    flex-direction: column;
}


.anunciosImagem {
    max-width: 200px;
    border: 1px solid #3d3c3c;
    border-radius: 5px;
}




.anuncios {
    transition: 500ms ease-in-out;
    position: absolute;
    animation: slide-up 0.5s ease;
}


.fas {
    font-size: 12px;
    font-weight: 900;
    background-color: rgb(0 123 255);
    width: 33px;
    height: 33px;
    padding: 11px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 3px;
    color: #ffffff;
    cursor: pointer;
    border-radius: 100%;
    box-shadow: 0px 0px 5px 2px #e7e5e5;
    margin: 0px 2px 0px 6px;
    transition: all .1s ease-in-out;

}
</style>