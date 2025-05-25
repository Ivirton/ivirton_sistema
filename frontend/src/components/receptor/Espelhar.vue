<template>
    <section v-if="props.espelhamento.visibilidade">

        <iframe id="vdoIframe" :style="{
            left: props.espelhamento.posicao.x + '%',
            top: props.espelhamento.posicao.y + 'vh',
            // zoom: props.espelhamento.posicao.z + '%' ,
            width: props.espelhamento.posicao.z + '%',
            height: props.espelhamento.posicao.z + 'vh',
            position: 'absolute',
            zIndex: 1000,
            transition: '500ms ease-in-out',
            animation: 'slide-up 0.5s ease',
            transform: 'translateY(0)',

        }" :src="props.espelhamento.url" </iframe>
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
    espelhamento: {
        type: Object
    },

})

onMounted(async () => {
    const iframe = document.getElementsByTagName('vdoIframe');
    console.log(iframe[0])

});




const videoEspelhamento = document.getElementsByName("video")
console.log(videoEspelhamento)

function listen(porta, path, setValor) {
    props.socket.on(porta, (menssagem) => {
        if (path == menssagem['path'] && props.socket.id != menssagem.socketId && menssagem.id == props.idTrasnmissao) {
            console.log("RX")
            console.log(menssagem)
            setValor(menssagem.valor);
        }
    });
}
listen("visibilidade", "espelhamento/visibilidade", (valor) => {
    props.espelhamento.visibilidade = valor
})
listen("posicao", "espelhamento/posicao/x", (valor) => {
    props.espelhamento.posicao.x = valor
})
listen("posicao", "espelhamento/posicao/y", (valor) => {
    props.logo.posicao.y = valor
})
listen("posicao", "espelhamento/posicao/z", (valor) => {
    props.espelhamento.posicao.z = valor
})

props.socket.on("playEspelhar", (menssagem) => {
    
        console.log("RX")
        console.log(menssagem)
        const vdo = document.getElementsByTagName('video')
        vdo[0].play()
       
    
});
listen("nome", "espelhamento/url", (valor) => props.espelhamento.url = valor)


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