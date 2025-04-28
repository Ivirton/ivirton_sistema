<script setup>
import Navegacao from '../components/Navegacao.vue'
import AnuncioRotativo from '@/components/AnuncioRotativo.vue';
import modalUploadAnuncio from '@/components/modalUploadAnuncio.vue';



</script>
<template>

    <Navegacao />

    <main class="main">
        <div class="linha">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#exampleModal" data-bs-whatever="@mdo">Novo</button>
        </div>
        
        <modalUploadAnuncio />
        <AnuncioRotativo imagem="https://uogqtlofsmvofetnsvug.supabase.co/storage/v1/object/public/imagens//156533.Z6-RhayMMSs5.jpg" />
        <AnuncioRotativo />
        <AnuncioRotativo />
        <AnuncioRotativo />



    </main>

</template>

<style>
.main {
    width: 100%;
    height: 100vh;
    background-color: rgb(66, 65, 65);
}
</style>
