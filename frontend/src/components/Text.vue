<template>
    <input class="form-control" type="text" @input="enviarNome()" v-model="props.valor">
</template>
<script setup>

import { defineProps } from 'vue';


const props = defineProps({

    idTrasnmissao: {
        type: String,

    },
    valor: {
        type: String,
    },
    socket: {
        type: Object
    },
   
    path:{
        type:String
    }

})


function enviarNome() {
    sendData()
}

function sendData() {
    const data = {
        update: {
            [props.path]: props.valor
        },
        valor: props.valor,
        "id": props.idTrasnmissao,
        socketId: props.socket.id
    }
    props.socket.emit(`texto`, data);
    console.log("TX")
    console.log(data)
}
props.socket.on(`texto`, (menssagem) => {
    if (props.path == menssagem.path && props.socket.id != menssagem.socketId) {
        console.log("RX")
        console.log(menssagem)
        props.valor = menssagem.valor
    }
});
</script>

<style scoped></style>
