<script setup>
import Scorebord1 from '@/components/receptor/Scorebord1.vue';

window.document.title = "Receptor"
</script>
<template>
    <main>
        <Scorebord1 
        
        />
    </main>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Jersey+25&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Teko:wght@300..700&display=swap');

body {
    width: 100%;
    height: 100vh;
}
.card {
    position: absolute;
    left: 200px;
    top: 600px;
    width: max-content;
    display: flex;
    justify-content: start;
    align-items: center;
    text-transform: uppercase;
    border-radius: 5px;
}

.glass {
    position: relative;
    /* transform: translateX(-50%); */
    padding: 10px;
    background: linear-gradient(to bottom, #010101c7, #000000a3);
    border-radius: 6px;
    /* box-shadow: -4px 5px 10px rgb(0 0 0 / 10%); */
    text-align: center;
    z-index: 999;
    border: 1px solid #aaff00ad;
    overflow: hidden;
    backdrop-filter: blur(25px);

}
* {

font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

font-optical-sizing: auto;
font-style: normal;
color: #fff;
box-sizing: border-box;
padding: 0;
margin: 0;
}
.glass-card {
    background: rgba(255, 255, 255, 0.1);
    /* Transparente */
    backdrop-filter: blur(10px);
    /* Efeito de vidro */
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 20px;
    padding: 20px;
    width: 300px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    /* Sombra suave */
    color: #fff;
    text-align: center;
}
</style>
