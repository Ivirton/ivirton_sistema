<template>
    <small>{{ props.titulo }}</small>
    <div class="PB-range-slider-div">
        <input type="range" min="0" max="100" class="PB-range-slider" v-model="props.valor" @input="sendData()">
        <!-- <small class="PB-range-slidervalue">{{ props.valor }}%</small> -->
        <input type="number" name="" class="form-control" v-model="props.valor" @input="sendData()"> 
    </div>
</template>

<script setup>
const props = defineProps({
    titulo: {
        type: String
    },
    idTrasnmissao: {
        type: String,

    },
    valor: {
        type: Number,
    },
    socket: {
        type: Object
    },
    tipo:{
        type:String
    },
    path:{
        type:String
    }
})

function sendData() {
    const data = {
        update:{
            [`${props.path}`]: parseInt(props.valor)
        },
        valor: parseInt(props.valor),
        "id": props.idTrasnmissao,
        "tipo": props.tipo, 
        socketId: props.socket.id,
        idTrasnmissao:props.idTrasnmissao,
        path:props.path
    }
    props.socket.emit(`posicao`, data);
    console.log("TX")
    console.log(data)
}

if (props.socket) {
    props.socket.on(`posicao`, (menssagem) => {
        if ( props.path == menssagem.path && props.socket.id != menssagem.socketId) {
            console.log("RX");
            console.log(menssagem);
            props.valor = menssagem.valor;
        }
    });
} else {
    console.error("Socket não está disponível.");
}

</script>

<style scoped>
.form-control {
    display: block;
    max-width: 37%;
    width: 72px;
    
}
/* range  */

.PB-range-slider {
    /* -webkit-appearance: none; */
    width: 100%;
    height: 4px;
    border-radius: 5px;
    background: #D5DBE1;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.PB-range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #007bff;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}

.PB-range-slider::-webkit-slider-thumb:hover {
    box-shadow: 0px 0px 0px 8px rgba(0, 0, 0, 0.16);
    transition: 0.3s ease-in-out;
}

.PB-range-slider::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #000000;
    cursor: pointer;
}

.PB-range-slider-div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 8px 17px 8px 11px;
    border-radius: 6px;
    /* border: 1px solid #C6CACE; */
    /* box-shadow: 0px 1px 2px 0px #1F1E241F; */
    margin-bottom: 6px;
}

.PB-range-slidervalue {
    font-weight: 600;
}
</style>
