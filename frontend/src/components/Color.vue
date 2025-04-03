<template>
    <input class="form-control" type="color" v-model="props.valor" @change="sendData()"  >
</template>
<script setup>



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
function sendData() {
    props.socket.emit(`color`, {
        "id": props.idTrasnmissao,
        socketId: props.socket.id,
        update: {[props.path]: props.valor},
        valor: props.valor,
        path: props.path
    });

}
props.socket.on(`color`, (menssagem) => {
    if (props.path == menssagem['path'] && props.socket.id != menssagem.socketId && menssagem.id == props.idTrasnmissao) {
        console.log("RX")
        console.log(menssagem)
        props.valor = menssagem.valor
    }
});

</script>
<style scoped>
.form-control{
    width: 60px;
    height: 37px;
    margin-right: 4px;
}
</style>