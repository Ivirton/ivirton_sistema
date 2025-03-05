<script setup>

const props = defineProps({
    posicao: {
        type: null,
        required: true,
        largura: {
            type: Number,
            required: true,
        },
        altura: {
            type: Number,
            required: true,
        },
        tamanho: {
            type: Number,
            required: true,
        },
    },
    largura: {
        type: Number,
        required: true,
    },
    altura: {
        type: Number,
        required: true,
    },
    tamanho: {
        type: Number,
        required: true,
    },
})
import { ref, reactive, defineProps } from 'vue';

const posicao = reactive({ "largura": 0, "altura": 0, "tamanho": 0 })


posicao.largura = props.largura
posicao.altura = props.altura
posicao.tamanho = props.tamanho

function sendData(data) {
    console.log(data)
}
function setValue(data) {
    console.log(data)
}

</script>
<template>
    <div class="coluna">
        
        <small>Largura</small>
        <h1>{{ posicao }}</h1>
        <div class="PB-range-slider-div">
            <input type="range" min="0" max="100" class="PB-range-slider" v-model="posicao.largura" @input="sendData(posicao)">
            <small class="PB-range-slidervalue">{{ posicao.largura }}%</small>
        </div>
        <small>Altura</small>
        <div class="PB-range-slider-div">
            <input type="range" min="0" max="100" class="PB-range-slider" v-model="posicao.altura" @input="sendData()">
            <small class="PB-range-slidervalue">{{ posicao.altura }}%</small>
        </div>
        <small>Tamanho</small>
        <div class="PB-range-slider-div">
            <input type="range" min="0" max="200" class="PB-range-slider" v-model="posicao.tamanho" @input="sendData()">
            <small class="PB-range-slidervalue">{{ posicao.tamanho }}%</small>
        </div>
    </div>
</template>
<style scoped>
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
