<template>

    <section class="anuncios " v-if="anuncios.visibilidade"
     :style="{ left: props.anuncios.posicao.x + 'vw', top: props.anuncios.posicao.y + 'vh', zoom: props.anuncios.posicao.z + '%' }" >
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

function listen(porta, path, setValor) {
    props.socket.on(porta, (menssagem) => {
        if (path == menssagem['path'] && props.socket.id != menssagem.socketId && menssagem.id == props.idTrasnmissao) {
            console.log("RX")
            console.log(menssagem)
            setValor(menssagem.valor);
        }
    });
}
listen("visibilidade", "anuncios/rotativo/visibilidade", (valor) => {
    props.anuncios.visibilidade = valor
})
listen("posicao", "anuncios/rotativo/posicao/x", (valor) => {
    props.anuncios.posicao.x = valor
})
listen("posicao", "anuncios/rotativo/posicao/y", (valor) => {
    props.anuncios.posicao.y = valor
})
listen("posicao", "anuncios/rotativo/posicao/z", (valor) => {
    props.anuncios.posicao.z = valor
})


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