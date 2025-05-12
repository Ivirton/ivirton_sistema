<template>

    <section class="anuncios ">
        <img class="anunciosImagem" :src='props.imagem'>
    </section>

</template>
<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    idTrasnmissao: {
        type: String,
    },
    valor: {
        type: Number,
    },
    socket: {
        type: Object
    },
    path: {
        type: String
    },
    anuncios: {
        type: Object
    },
    imagem: {
        type: String
    }

})

props.socket.on("setImagemAnuncio", (menssagem) => {
    console.log(menssagem)
    props.imagem = `https://uogqtlofsmvofetnsvug.supabase.co/storage/v1/object/public/imagens//${menssagem.nome}`
    
});


// function proximoIndice() {
//     if (indice < anuncios.length - 1) {
//         indice++;
//     } else {
//         indice = 0;
//     }
//     return indice;
// }
// function playAnuncio() {
//     interval = setInterval(() => {
//         if (duracao === contador) {
//             //   this.proximo()
//             contador = 0
//         }

//         contador++
//     }, 1000)
// }

// function stopAnuncio() {
//     clearInterval(interval);
// }
// function setAnuncio() {
//     if (anuncios.length > 0) {
//         props.imagem = anuncios[indice].url;
//         playAnuncio();
//     }
// }

// onMounted(async () => {
//     // anuncios.value = await getAnuncio();

// });
</script>

<style scoped>
.anunciosImagem {
    max-width: 300px;
}



.anuncios {
    transition: 500ms ease-in-out;
    position: absolute;
    animation: slide-up 0.5s ease;
}



.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s, opacity 0.5s;
}

.slide-enter,
.slide-leave-to

/* .slide-leave-active no Vue < 2.1.8 */
    {
    /* opacity: 0; */
    transform: translateY(100%);
    transition: transform 1s, opacity 1s;
    /* transition: transform 1s, opacity 0.5s; */
    /* transition: 500ms ease-in-out; */

}

.slide-leave-active,
.slide-enter-to

/* .slide-enter-active no Vue < 2.1.8 */
    {
    opacity: 100%;

    transition: transform 1s, opacity 1s;
    /* animation: slide-dow 0.5s ease; */
    /* transform: translateY(1%); */
}
</style>