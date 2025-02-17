<script setup>
import Navegacao from '../components/Navegacao.vue'
import Camada from '../components/Camada.vue'
import Posicao from '@/components/Posicao.vue';
import Futebol from '@/components/Futebol.vue';
import Cronometro from '@/components/Cronometro.vue';
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
                                <Posicao />
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
                                <Futebol/>
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
                              <Cronometro/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          
           
        </article>
        <article class="aside">

            <section class="section card1">
                <Camada titulo="Merchad" />
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
                                <Posicao />
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
                                <Posicao />
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
                                <Posicao />
                            </div>
                        </div>
                    </div>                    
                </div>
            </section>
        </article>
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
