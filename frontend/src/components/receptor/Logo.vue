<template>
    <section class="logo " v-if="props.logo.visibilidade"
     :style="{ left: props.logo.posicao.x + '%', top: props.logo.posicao.y + 'vh', zoom: props.logo.posicao.z + '%' }" >
        <img class="logoImagem" :src='props.logo.url'>
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
    logo: {
        type: Object
    },

})




function listen(porta, path, setValor) {
    props.socket.on(porta, (menssagem) => {
        if (path == menssagem['path'] && props.socket.id != menssagem.socketId && menssagem.id == props.idTrasnmissao) {
            console.log("RX")
            console.log(menssagem)
            setValor(menssagem.valor);
        }
    });
}
listen("visibilidade", "Logo/visibilidade", (valor) => {
    props.logo.visibilidade = valor
})
listen("posicao", "Logo/posicao/x", (valor) => {
    props.logo.posicao.x = valor
})
listen("posicao", "Logo/posicao/y", (valor) => {
    props.logo.posicao.y = valor
})
listen("posicao", "Logo/posicao/z", (valor) => {
    props.logo.posicao.z = valor
})


</script>

<style scoped>
.logoImagem {
    max-width: 300px;
}



.logo {
    transition: 500ms ease-in-out;
    position: absolute;
    animation: slide-up 0.5s ease;
}



.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s, opacity 0.5s;
}
@keyframes slide-up {
    from {
        opacity: 0;
        transform: translateY(-100%);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}


.changed {
    transform: translateY(20px);
    opacity: 0;
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