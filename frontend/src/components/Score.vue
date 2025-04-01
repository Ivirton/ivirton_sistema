<template>
    <div style="display: flex; align-items: center;">
        <i class="fas fa-solid fa-minus" @click="removePontos()"></i>
        <strong v-if="props.pontos < 10 ">0{{ props.pontos }}</strong>
        <strong v-else>{{ props.pontos }}</strong>
        <i class="fas fa-solid fa-plus" @click="addPontos()"></i>
    </div>
</template>

<script setup>
import {  defineProps } from 'vue';

const props = defineProps({
    idTrasnmissao: {
        type: String,
    },
    equipeNome: {
        type: String,
    },
    pontos: {
        type: Number,
    },
    socket: {
        type: Object
    },
    tipo:{
        type: String
    },
    path:{
        type:String
    }
});

function addPontos() {
    props.pontos++;
    sendData()
}

function removePontos() {
    if (props.pontos > 0) {
        props.pontos--;
        sendData()
    }
}
function sendData() {
    const data = {
        update:{
            [`placar/jogo/${props.equipeNome}/pontos`]:props.pontos
        },
        "nomeValor": props.equipeNome,
        valor: props.pontos,
        "id": props.idTrasnmissao,
        "equipeNome": props.equipeNome, 
        socketId: props.socket.id,
        path:props.path
    }
    props.socket.emit(`score`, data);
    console.log("TX")
    console.log(data)
}
props.socket.on(`score`, (menssagem) => {
    if (props['equipeNome'] == menssagem['equipeNome'] && props.socket.id != menssagem.socketId ) {
        console.log("RX")
        console.log(menssagem)
        props.pontos = menssagem.valor
    }
});

</script>

<style scoped>
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
    transition: all 0.1s ease-in-out;
}
.fas:active {
    transform: scale(0.9);
    box-shadow: 0px 0px 3px 1px #b0afaf;
}
</style>
