<template>
    <div style="display: flex; align-items: center;">
        <i class="fas fa-solid fa-minus" @click="removePontos(pontos)"></i>
        <strong>{{ pontos.pontos }}</strong>
        <i class="fas fa-solid fa-plus" @click="addPontos(pontos)"></i>
    </div>
</template>

<script setup>
import { reactive, defineEmits, defineProps } from 'vue';

const props = defineProps({
    id: {
        type: String,
    },
    name: {
        type: String,
    }
});

const pontos = reactive({ pontos: 0 });

const emit = defineEmits(['somarpontos']); // Definindo o evento

function addPontos(data) {
    data.pontos++;
    emit('somarpontos', { nome: "pontos", valor: data.pontos, id: props.id, name: props.name });
}

function removePontos(data) {
    if (data.pontos > 0) {
        data.pontos--;
        // Emitir os dados depois de remover o ponto
        emit('somarpontos', { nome: "pontos", valor: data.pontos, id: props.id, name: props.name });
    }
}
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
}
</style>
