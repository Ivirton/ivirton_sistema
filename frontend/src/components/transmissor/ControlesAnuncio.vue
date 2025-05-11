<template>
    <div style="display: flex;align-content: center; align-items: center;">
        <i class="fas fa-step-backward" aria-hidden="true" @click="backward"></i>
        <i v-if="props.anuncio.play" class="fas fa-pause" @click="play()"></i>
        <i v-else class="fas fa-play" @click="play()"></i>
        <i class="fas fa-step-forward" aria-hidden="true" @click="forward"></i>
       
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
    }

})
function backward(){
   console.log("Voltar")
}
function forward(){
    console.log("Avançar")
    
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

    props.socket.emit(`transmissorSetAnuncioPlay${props.idTrasnmissao}`, {
        "idTrasnmissao": props.idTrasnmissao,
        socketId: props.socket.id,
        update: { [`${props.path}/${key}`]: valor },
        valor: valor,
        key: key,
        path: `${props.path}/${key}`
    });
}

</script>

<style scoped>
.coluna {
    display: flex;
    flex-direction: column;
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