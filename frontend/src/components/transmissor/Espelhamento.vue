<section class="section card1">

                <Camada titulo="Espelhamento" path="espelhamento/visibilidade"
                    :valor="transmissor.espelhamento.visibilidade" :idTrasnmissao="route.query.id" :socket="socket" />
                <div class="accordion" id="accordionExample">
                    <!-- Acordeon item 1 Posicao-->
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapselink" aria-expanded="true" aria-controls="collapselink">
                                Posição

                            </button>
                        </h2>
                        <div id="collapselink" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <Posicao titulo="Largura" path="espelhamento/posicao/x"
                                    :valor="transmissor.espelhamento.posicao.x" :socket="socket"
                                    :idTrasnmissao="route.query.id" />

                                <Posicao titulo="Altura" path="espelhamento/posicao/y"
                                    :valor="transmissor.espelhamento.posicao.y" :socket="socket"
                                    :idTrasnmissao="route.query.id" />
                                 <Posicao titulo="Tamanho" path="espelhamento/posicao/z" :valor="transmissor.espelhamento.posicao.z"
                                    :socket="socket" :idTrasnmissao="route.query.id" />

                            </div>
                        </div>
                    </div>
                    <!-- Acordeon -->
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseLink" aria-expanded="true" aria-controls="collapseLink">
                                Espelhar Tela
                            </button>
                        </h2>
                        <div id="collapseLink" class="accordion-collapse collapse show"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p >Url:</p>
                                <Text :idTrasnmissao="route.query.id" :valor="transmissor.espelhamento.url"
                                            :socket="socket" path="espelhamento/url" />
                               
                            </div>
                             <i  class="fas fa-play" @click="play()"></i>
                            
                        </div>
                    </div>
                </div>
            </section>