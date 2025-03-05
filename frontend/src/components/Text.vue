<template>
    <input class="form-control"  type="text" @input="enviarNome(text)" v-model="text.valor">
</template>
<script setup>
import { reactive } from 'vue';

const text = reactive({ valor: "" })

const props = defineProps({
    tipoCliente: {
        type: String, 
    },
    id: {
        type: Number,
        
    },
    titulo: {
        type: Number,
    },
    valor: {
        type: String,
    }

})

function enviarNome(data) {
    console.log(data.valor)
}


</script>

<style scoped></style>
