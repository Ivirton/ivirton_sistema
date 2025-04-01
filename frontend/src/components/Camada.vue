<template>
    <div class="linha">
        <div class="linha">
            <h4>{{ titulo }}</h4>
        </div>
        <label class="switch">
            <input type="checkbox" @change="enviarData()" v-model="props.value">
            <span class="slider"></span>
        </label>
    </div>
</template>
<script setup>

const props = defineProps({
    titulo: {
        type: String,
        
    },
    idTrasnmissao: {
        type: String,
        
    },
    socket: {
        type: Object
    },
    body: {
        type: String,
       
    },
    value:{
        type:Boolean
    },
    camada:{
        type:String
    }

})
function enviarData(){
    console.log(props.value)
    sendData()
}

props.socket.on(`visibilidade`, (menssagem) => {
    if (props['camada'] == menssagem['camada'] && props.socket.id != menssagem.socketId ) {
        console.log("RX")
        console.log(menssagem)
        props.value = menssagem.valor
    }
});
function sendData() {
    const data = {
        update:{
            [`${props.camada}/visibilidade`]:props.value
        },
        camada:props.camada,
        valor: props.value,
        "id": props.idTrasnmissao,
        socketId: props.socket.id
    }
    props.socket.emit(`visibilidade`, data);
    console.log("TX")
    console.log(data)
}


</script>



<style scoped>
/* The switch - the box around the slider */
.switch {
    font-size: 13px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
}

/* Hide default HTML checkbox */


.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    border: 1px solid #adb5bd;
    transition: .4s;
    border-radius: 30px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    border-radius: 20px;
    left: 0.27em;
    bottom: 0.20em;
    background-color: #adb5bd;
    transition: .4s;
}

input:checked+.slider {
    background-color: #007bff;
    border: 1px solid #007bff;
}

input:focus+.slider {
    box-shadow: 0 0 1px #007bff;
}

input:checked+.slider:before {
    transform: translateX(1.4em);
    background-color: #fff;
}

/* Hide default HTML checkbox */
</style>
