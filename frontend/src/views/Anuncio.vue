<script setup>
import Navegacao from '../components/Navegacao.vue'
import AnuncioRotativo from '@/components/AnuncioRotativo.vue';
import modalUploadAnuncio from '@/components/modalUploadAnuncio.vue';




</script>
<template>

    <Navegacao />

    <main class="main">

        <div class="header">
            
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Novo</button>
                <button type="button" class="btn btn-dark">Ativar</button>
                <button type="button" class="btn btn-dark">Desativar</button>
                <button type="button" class="btn btn-dark">Limpar</button>

            </div>
            <div class="linha">
                
            </div>
        </div>
        <div class="anuncios">
            <AnuncioRotativo imagemName="podium1.jpg" />
            <AnuncioRotativo imagemName="podium1.jpg" />
            <AnuncioRotativo imagemName="podium1.jpg" />
            <AnuncioRotativo imagemName="podium1.jpg" />
            <AnuncioRotativo imagemName="podium1.jpg" />
            <AnuncioRotativo imagemName="podium1.jpg" />

            <AnuncioRotativo imagemName="podium1.jpg" />

            <AnuncioRotativo imagemName="podium1.jpg" />

            <AnuncioRotativo imagemName="podium1.jpg" />

            <AnuncioRotativo imagemName="podium1.jpg" />

            <AnuncioRotativo imagemName="podium1.jpg" />

            <AnuncioRotativo imagemName="podium1.jpg" />

            <AnuncioRotativo imagemName="podium1.jpg" />


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
