<template>

    <Scorebord1 path="placar/" :placar="transmissor.placar" :socket="socket" :idTrasnmissao="route.query.id" />

    <Anuncios path="anuncios/rotativo" :anuncios="transmissor.anuncios.rotativo"
        :imagem="transmissor.anuncios.rotativo.imagem" :idTrasnmissao="transmissor.id" :socket="socket" />
    <Logo :logo="transmissor.Logo" :idTrasnmissao="transmissor.id" :socket="socket" path="Logo/" />
    <Qrcode :Qrcode="transmissor.Qrcode" :idTrasnmissao="transmissor.id" :socket="socket" path="Qrcode/"/>
    
    <!-- <Espelhar :espelhamento="transmissor.espelhamento" :idTrasnmissao="transmissor.id" :socket="socket"
        path="espelhamento/" /> -->



</template>

<script setup>
import Scorebord1 from '@/components/receptor/Scorebord1.vue';
import Anuncios from '@/components/receptor/Anuncios.vue';
import Espelhar from '@/components/receptor/Espelhar.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import socket from '@/socket';
import { onMounted, reactive, ref, transformVNodeArgs } from 'vue';
import Logo from '@/components/receptor/Logo.vue';
import Qrcode from '@/components/receptor/Qrcode.vue';

const route = useRoute();
const id = ref(null);
const videoEspelhamento = null
let data = null
let transmissor = reactive({
    "Logo": { "posicao": { "x": 0, "y": 0, "z": 0 }, "url": "", "visibilidade": true },
    "anuncios": {
        rotativo: {
            posicao: { x: 0, y: 0, z: 0 },
            visibilidade: true,
            play: false,
            imagem: "",
            duracao: 0,
            indice: 0
        }
    }, "id": null, "nome": "",
    "placar": { "cronometro": { "visibilidade": true, "duracao": 0, "icone": true, "minuto": 0, "segundo": 0, "tipo": "1", "hora": 0 }, "jogo": { "casa": { "nome": "casa", "pontos": 0, color: "#596b57" }, "partida": { pontos: 1 }, "visitante": { "nome": "visitante", "pontos": 0, color: "#596b57" } }, "posicao": { "x": 0, "y": 0, "z": 0 }, "visibilidade": true },
    espelhamento: {
        posicao: { x: 0, y: 0, z: 0 },
        visibilidade: false,
        url: ""
    },
    Qrcode: {
        posicao: { x: 0, y: 0, z: 0 },
        url: "",
        visibilidade: false
    },
})

async function getTransmissao() {
    try {
        // const baseURL = import.meta.env.VITE_API_URL || ""; 
        const response = await axios.get(`/api/transmissao/${id.value}`);
        console.log(response.data)
        if (response.data.erro) {
            console.log('API não encontrada!');
        } else {

            return response.data;
        }
    } catch (error) {
        console.log('Erro ao buscar API:', error);
    }
}
onMounted(async () => {
    id.value = route.query.id; // Pegando o parâmetro 'id' da URL
    data = await getTransmissao();
    if (data) {
        transmissor.nome = data.nome;
        transmissor.id = data.id;
        // receptor.value = `/receptor?id=${data.id}`
        transmissor.Logo = data.Logo;
        transmissor.anuncios = data.anuncios;
        transmissor.placar = data.placar;
        transmissor.Qrcode = data.Qrcode;
        transmissor.espelhamento = data.espelhamento;
        document.title += " " + data.nome;



    }
});
window.document.title = "Receptor"



</script>
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


* {

    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    font-optical-sizing: auto;
    font-style: normal;
    color: #fff;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

body {
    background-color: #ffffff00;
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
