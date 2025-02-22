<script setup>
 import Navegacao from '../components/Navegacao.vue'
    import AnuncioRotativo from '@/components/AnuncioRotativo.vue';
 
</script>
<template>

    <Navegacao />

    <main class="main" >
        <AnuncioRotativo/>
        <AnuncioRotativo/>

        <AnuncioRotativo/>

        
    </main>
  
</template>

<style>
.main{
    width: 100%;
    height: 100vh;
    background-color: rgb(66, 65, 65);
}
</style>
