<script setup>
import Navegacao from '../components/Navegacao.vue'
import Camada from '../components/Camada.vue'
import Posicao from '@/components/Posicao.vue';
import Futebol from '@/components/Futebol.vue';
import Score from '@/components/Score.vue'
import Text from '@/components/Text.vue'
import Cronometro from '@/components/Cronometro.vue';
import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import socket from '@/socket';






const route = useRoute();
const id = ref(null);
let transmissor = reactive({ "Logo": { "posicao": { "x": 44, "y": 22, "z": 33 }, "url": "", "visibilidade": true }, "anuncios": { "rotativo": { "posicao": { "x": 0, "y": 0, "z": 0 }, "visibilidade": true } }, "id": "-OKVHr-b7vev09wM3hXm", "nome": "equipe 1", "placar": { "cronometro": { "duracao": 60, "icone": "play", "minuto": 0, "segundo": 0, "tipo": 1 }, "jogo": { "casa": { "nome": "casa", "pontos": 0 }, "partida": 1, "visitante": { "nome": "visitante", "pontos": 0 } }, "posicao": { "x": 10, "y": 23, "z": 33 }, "visibilidade": true } })
async function getTransmissao() {
    try {

        const response = await axios.get(`http://localhost:4000/api/transmissao/${id.value}`);
        if (response.data.erro) {
            console.log('API não encontrada!');
        } else {
            console.log(response)
            return response.data;

        }
    } catch (error) {
        console.log('Erro ao buscar API');
    }
}

onMounted(async () => {
    id.value = route.query.id; // Pegando o parâmetro 'id' da URL
    const data = await getTransmissao()
    transmissor.nome = data.nome
    transmissor = data
    document.title += " " + transmissor.nome


});

socket.on("connection", (menssagem) => {
    console.log(socket.id)
    console.log(menssagem)
    socket.emit(`entra`, { "id": id.value });
})

function enviarData(data){
    socket.emit(`menssagem`, data);
    console.log(data)
}


socket.on(`menssagem`, (menssagem) => {
    console.log(menssagem)
    // socket.emit(`menssagem`, menssagem);
   
});

</script>
<template>
    <Navegacao />
    <main class="main">
        <article class="body">

            <section class="section card1">
                <Camada titulo="Placar" />
                <div class="accordion" id="accordionExample">

                    <!-- Acordeon item 1 Posicao-->
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Posição
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <Posicao v-bind:position="transmissor.placar.posicao" />
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
                                        <Text />
                                        <Score  @somarpontos="enviarData" :id="transmissor.id" name="casa" />
                                    </div>
                                    <div class="linha">
                                        <Text />
                                        <Score />
                                    </div>
                                    <div class="linha">
                                        Partida
                                        <Score />
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
                                <Cronometro />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </article>
        <article class="aside">

            <section class="section card1">
                <Camada titulo="Merchandising" />
                <div class="accordion" id="accordionExample">
                    <!-- Acordeon item 1 Posicao-->
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapsesex" aria-expanded="true" aria-controls="collapsesex">
                                Posição
                            </button>
                        </h2>
                        <div id="collapsesex" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <Posicao v-bind:position="transmissor.anuncios.rotativo.posicao" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="section card1">
                <Camada titulo="Logo" />
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
                                <Posicao v-bind:position="transmissor.Logo.posicao" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="section card1">
                <Camada titulo="Anúncios" />

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
                                <Posicao v-bind:position="transmissor.anuncios.rotativo.posicao" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    </main>

</template>

<style scoped>
.main {
    width: 100%;
    height: 115vh;
    background: rgb(131,58,180);
    background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 40%, rgba(253,53,36,1) 50%, rgba(252,176,69,1) 100%);
 
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
