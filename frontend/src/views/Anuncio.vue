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
        if (response.data.erro) {
            console.log('API não encontrada!');
            return [];
        } else {
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log('Erro ao buscar API:', error);
        return [];
    }
}

onMounted(async () => {
    anuncios.value = await getAnuncio();
});
</script>

<template>
    <Navegacao />

    <main class="main">
        <div class="header">
            <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">Ações</button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            data-bs-whatever="@mdo">Adicionar</a></li>
                    <li><a class="dropdown-item" href="#">Ativar</a></li>
                    <li><a class="dropdown-item" href="#">Desativar</a></li>
                    <li><a class="dropdown-item text-danger" href="#">Remover todos</a></li>
                </ul>
            </div>
            <div class="linha"></div>
        </div>

        <div class="anuncios">
            <AnuncioRotativo v-for="(anuncio, index) in anuncios" :key="index" :imagemName="anuncio.nome || 'default.jpg'" />
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
}

.main {
    /* width: 100%; */
}
</style>
