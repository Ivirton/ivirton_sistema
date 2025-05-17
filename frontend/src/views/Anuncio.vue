<script setup>
import Navegacao from '../components/Navegacao.vue'
import AnuncioRotativo from '@/components/AnuncioRotativo.vue';
import modalUploadAnuncio from '@/components/modalUploadAnuncio.vue';
import axios from 'axios';
import socket from '@/socket';
import { onMounted, ref } from 'vue';

const anuncios = ref([]);

async function getAnuncio() {
    try {
        const response = await axios.get('/api/anuncios/');
        return response.data || [];
    } catch (error) {
        console.error('Erro ao buscar API:', error);
        return [];
    }
}

// Atualiza lista removendo item por ID
function removerDaLista(id) {
    anuncios.value = anuncios.value.filter(anuncio => anuncio.id !== id);
}

onMounted(async () => {
    anuncios.value = await getAnuncio();
});
</script>

<template>
    <Navegacao />

    <main class="main">
        <div class="header">
            <div class="linha">
                <a href="#" data-bs-toggle="modal" class="btn btn-primary" data-bs-target="#exampleModal">Adicionar</a>
                
            </div>
        </div>

        <div class="anuncios">
            <AnuncioRotativo :id="anuncio.id" :anuncio="anuncio" v-for="anuncio in anuncios" :socket="socket"
                @removido="removerDaLista" />
        </div>
    </main>

    <modalUploadAnuncio />
</template>

<style>
.header {
    margin-top: 20px;
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.h-100 {
    height: auto !important;
}

.anuncios {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    align-content: baseline;
}
</style>
