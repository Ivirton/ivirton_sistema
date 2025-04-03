<template>
    <input class="form-control" type="text" @input="sendData()" v-model="props.valor">
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


props.socket.on(`nome`, (menssagem) => {
    if ( props.path == menssagem.path &&props.socket.id != menssagem.socketId && menssagem.id == props.idTrasnmissao ) {
        console.log("RX")
        console.log(menssagem)
        props.valor = menssagem.valor
    }
});

function sendData() {
    props.socket.emit(`nome`, {
        id: props.idTrasnmissao,
        socketId: props.socket.id,
        update: {[props.path]: props.valor},
        valor: props.valor,
        path:props.path
    });
}
</script>

<style scoped></style>
