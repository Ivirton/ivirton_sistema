<template>
    <input class="form-control" type="text" @input="enviarNome()" v-model="props.valor">
</template>
<script setup>

import { defineProps } from 'vue';


const props = defineProps({

    idTrasnmissao: {
        type: String,

    },
    equipeNome: {
        type: String,
    },
    valor: {
        type: String,
    },
    socket: {
        type: Object
    },
    tipo: {
        type: String
    }

})

function enviarNome() {
    sendData()
}

function sendData() {
    const data = {
        update: {
            [`placar/jogo/${props.equipeNome}/nome`]: props.valor
        },
        "nomeValor": props.equipeNome,
        valor: props.valor,
        "id": props.idTrasnmissao,
        "equipeNome": props.equipeNome,
        socketId: props.socket.id
    }
    props.socket.emit(`texto`, data);
    console.log("TX")
    console.log(data)
}
props.socket.on(`texto`, (menssagem) => {
    if (props['equipeNome'] == menssagem['equipeNome'] && props.socket.id != menssagem.socketId) {
        console.log("RX")
        console.log(menssagem)
        props.valor = menssagem.valor
    }
});
</script>

<style scoped></style>
