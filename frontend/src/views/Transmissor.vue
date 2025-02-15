<script setup>
import Navegacao from '../components/Navegacao.vue'
window.document.title = "Transmissor"
</script>
<template>

    <Navegacao />
    <main class="main">
        <div class="container ">

         
        </div>
    </main>
   
</template>

<style>
.main {
    width: 100%;
    height: 100vh;
    background-color: rgb(66, 65, 65);
}
.mt-5 {
    margin-top: 3rem !important;
    background-color: rgba(127, 255, 212, 0);
}
.card1 {
    position: relative;
    background-color: rgb(255, 255, 255);
    padding: 25px 10px 25px 6px;
    border-radius: 6px;
    box-shadow: 1px 5px 8px 1px #0e0e0e87;
    min-width: 309px;
    margin-bottom: 6px;
}

.linha {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
    padding: 0px 6px 0px 6px;
    align-items: center;
}
</style>
