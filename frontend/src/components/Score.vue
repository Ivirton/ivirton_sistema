<template>
    <div style="display: flex; align-items: center;">
        <i class="fas fa-solid fa-minus" @click="removePontos()"></i>
        <strong v-if="props.valor < 10">0{{ props.valor }}</strong>
        <strong v-else>{{ props.valor }}</strong>
        <i class="fas fa-solid fa-plus" @click="addPontos()"></i>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

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
    }
});

function addPontos() {
    props.valor++;
    sendData()
}

function removePontos() {
    if (props.valor > 0) {
        props.valor--;
        sendData()
    }
}
function sendData() {
    props.socket.emit(`${props.idTrasnmissao}_score`, {
        "id": props.idTrasnmissao,
        socketId: props.socket.id,
        update: {[props.path]: props.valor},
        valor: props.valor,
        path: props.path
    });

}
props.socket.on(`${props.idTrasnmissao}_score`, (menssagem) => {
    if (props.path == menssagem['path'] && props.socket.id != menssagem.socketId) {
        console.log("RX")
        console.log(menssagem)
        props.valor = menssagem.valor
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
