<template>
    <Navegacao />
    <main class="main">
        <article class="body">
            <!-- SCOREBORD -->
            <section class="section card1">
                <!-- Cabecalho  -->
                <Camada titulo="Placar" path="placar/visibilidade" :valor="transmissor.placar.visibilidade"
                    :idTrasnmissao="route.query.id" :socket="socket" />
                <div class="linha">
                    <div></div>
                    <a class="link" target="_blank" v-bind:href="receptor">
                        Link
                    </a>
                </div>
                <div class="accordion" id="accordionExample">
                    <!-- Acordeon item 1 Posicao-->
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Posição
                            </button>
                        </h2>
                        <!-- posicao  -->
                        <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">

                                <Posicao titulo="Largura" path="placar/posicao/x" :valor="transmissor.placar.posicao.x"
                                    :socket="socket" :idTrasnmissao="route.query.id" />
                                <Posicao titulo="Altura" path="placar/posicao/y" :valor="transmissor.placar.posicao.y"
                                    :socket="socket" :idTrasnmissao="route.query.id" />
                                <Posicao titulo="Tamanho" path="placar/posicao/z" :valor="transmissor.placar.posicao.z"
                                    :socket="socket" :idTrasnmissao="route.query.id" />
                            </div>
                        </div>
                    </div>
                    <!-- Acordeon item 2  Times -->
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwu" aria-expanded="false" aria-controls="collapseTwu">
                                Times
                            </button>
                        </h2>
                        <div id="collapseTwu" class="accordion-collapse collapse show"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="coluna">
                                    <div class="linha">
                                        <Color :idTrasnmissao="route.query.id"
                                            :valor="transmissor.placar.jogo.casa.color" :socket="socket"
                                            path="placar/jogo/casa/color" />
                                        <Text :idTrasnmissao="route.query.id" :valor="transmissor.placar.jogo.casa.nome"
                                            :socket="socket" path="placar/jogo/casa/nome" />
                                        <Score :idTrasnmissao="route.query.id" path="placar/jogo/casa/pontos"
                                            :valor="transmissor.placar.jogo.casa.pontos" :socket="socket" />
                                    </div>
                                    <div class="linha">
                                        <Color :idTrasnmissao="route.query.id"
                                            :valor="transmissor.placar.jogo.visitante.color" :socket="socket"
                                            path="placar/jogo/visitante/color" />
                                        <Text :idTrasnmissao="route.query.id"
                                            :valor="transmissor.placar.jogo.visitante.nome" :socket="socket"
                                            path="placar/jogo/visitante/nome" />
                                        <Score path="placar/jogo/visitante/pontos" :idTrasnmissao="route.query.id"
                                            :valor="transmissor.placar.jogo.visitante.pontos" :socket="socket" />

                                    </div>
                                    <div class="linha">
                                        Partida
                                        <Score :idTrasnmissao="route.query.id" path="placar/jogo/partida/pontos"
                                            :valor="transmissor.placar.jogo.partida.pontos" :socket="socket" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Acordeon item 3  Cronometro -->
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTre" aria-expanded="false" aria-controls="collapseTre">
                                Cronômetro
                            </button>
                        </h2>
                        <div id="collapseTre" class="accordion-collapse collapse show"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <Cronometro :cronometro="transmissor.placar.cronometro" path="placar/cronometro"
                                    :idTrasnmissao="route.query.id" :socket="socket" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
        <article class="aside">
            <!-- LOGO  -->
            <section class="section card1">
                <Camada titulo="Logo" path="Logo/visibilidade" :valor="transmissor.Logo.visibilidade"
                    :idTrasnmissao="route.query.id" :socket="socket" />
                <div class="accordion" id="accordionExample">
                    <!-- Acordeon item 1 Posicao-->
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapsefive" aria-expanded="true" aria-controls="collapsefive">
                                Posição
                            </button>
                        </h2>
                        <div id="collapsefive" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <Posicao titulo="Largura" path="Logo/posicao/x" :valor="transmissor.Logo.posicao.x"
                                    :socket="socket" :idTrasnmissao="route.query.id" />
                                <Posicao titulo="Altura" path="Logo/posicao/y" :valor="transmissor.Logo.posicao.y""
                                    :socket="socket" :idTrasnmissao="route.query.id" />
                                <Posicao titulo="Tamanho" path="Logo/posicao/z" :valor="transmissor.Logo.posicao.z"" 
                                    :socket="socket" :idTrasnmissao="route.query.id" />
                            </div>
                        </div>
                    </div>
                       <!-- Acordeon item 1 d-->
                       <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapsefive01" aria-expanded="true" aria-controls="collapsefive01">
                                Imagem
                            </button>
                        </h2>
                        <div id="collapsefive01" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                               <img src="" alt="">
                               <h1>ola</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- ANÚNCIOS  -->
            <section class="section card1">

                <Camada titulo="Anúncios" path="anuncios/rotativo/visibilidade"
                    :valor="transmissor.anuncios.rotativo.visibilidade" :idTrasnmissao="route.query.id"
                    :socket="socket" />
                <div class="accordion" id="accordionExample">
                    <!-- Acordeon item 1 Posicao-->
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapsefor" aria-expanded="true" aria-controls="collapsefor">
                                Posição
                            </button>
                        </h2>
                        <div id="collapsefor" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <Posicao titulo="Largura" path="anuncios/rotativo/posicao/x"
                                    :valor="transmissor.anuncios.rotativo.posicao.x" :socket="socket"
                                    :idTrasnmissao="route.query.id" />
                                <Posicao titulo="Altura" path="anuncios/rotativo/posicao/y"
                                    :valor="transmissor.anuncios.rotativo.posicao.y" :socket="socket"
                                    :idTrasnmissao="route.query.id" />
                                <Posicao titulo="Tamanho" path="anuncios/rotativo/posicao/z"
                                    :valor="transmissor.anuncios.rotativo.posicao.z" :socket="socket"
                                    :idTrasnmissao="route.query.id" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    </main>
</template>

<script setup>

import Navegacao from '../components/Navegacao.vue'
import Camada from '../components/Camada.vue'
import Posicao from '@/components/Posicao.vue';
import Score from '@/components/Score.vue'
import Text from '@/components/Text.vue'
import Cronometro from '@/components/Cronometro.vue';
import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import socket from '@/socket';
import Color from '@/components/Color.vue';


const route = useRoute();
const id = ref(null);
const receptor = ref(null);

let data = null
let transmissor = reactive({ "Logo": { "posicao": { "x": 0, "y": 0, "z": 0 }, "url": "", "visibilidade": true }, "anuncios": { "rotativo": { "posicao": { "x": 0, "y": 0, "z": 0 }, "visibilidade": true } }, "id": null, "nome": "", "placar": { "cronometro": {"visibilidade":true, "duracao": 0, "icone": true, "minuto": 0, "segundo": 0, "tipo": "1", "hora": 0 }, "jogo": { "casa": { "nome": "casa", "pontos": 0 }, "partida": { pontos: 1 }, "visitante": { "nome": "visitante", "pontos": 0 } }, "posicao": { "x": 0, "y": 0, "z": 0 }, "visibilidade": true } })

// socket.on(`credenciar`, (menssagem) => {
//     console.log(menssagem)
// });

async function getTransmissao() {
    try {
        // const baseURL = import.meta.env.VITE_API_URL || ""; 
        const response = await axios.get(`/api/transmissao/${id.value}`);

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
        receptor.value = `/receptor?id=${data.id}`
        transmissor.Logo = data.Logo;
        transmissor.anuncios = data.anuncios;
        transmissor.placar = data.placar;
        document.title += " " + data.nome;
        socket.emit(socket.id, { "idTransmissor": transmissor.id });
    }
});

</script>

<style scoped>
.main {
    width: 100%;
    height: 115vh;
    background: rgb(131, 58, 180);
    background: linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 40%, rgba(253, 53, 36, 1) 50%, rgba(252, 176, 69, 1) 100%);

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
