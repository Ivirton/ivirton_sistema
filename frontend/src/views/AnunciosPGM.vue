<template>
    <section class="anuncios " v-if="anuncios.visibilidade">
        <img class="anunciosImagem" :src='imagem'>
    </section>
</template>

<script setup>
const imagem = ref("https://uogqtlofsmvofetnsvug.supabase.co/storage/v1/object/public/imagens//anuncio.png")

import socket from '@/socket';

socket.on("setImagemAnuncio", (menssagem) => {
    imagem = `https://uogqtlofsmvofetnsvug.supabase.co/storage/v1/object/public/imagens//${menssagem.nome}`
});
window.document.title = "PGM"
</script>

<style scoped>
.anunciosImagem {
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 9999;
}
</style>