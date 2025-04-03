<template>
    <section class="scorebord">
        
            <div class="linha" style="border-bottom: 0.1px solid #353535;">
                <div class="equipes">
                    <div class="linha casa">
                        <strong class="nome">Casa</strong>
                        <strong class="pontos">0</strong>
                    </div>
                    <div class="linha visitante">
                        <strong class="pontos">0</strong>
                        <strong class="nome">Visitante</strong>
                    </div>
                </div>
                <div class="cronometro">
                    <div class="linha">

                        <strong class="pontos">00:00</strong>
                        <strong style="padding: 0px 17px 0px 0px;">1t°</strong>
                    </div>
                </div>
            </div>
        

    </section>
</template>
<script setup>



</script>
<style scoped>
* {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
}

.scorebord {
    top: 40px;
    position: absolute;
    z-index: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: black;
    animation: slide-up 0.5s ease;
}

.cronometro {}

.casa {
    background-color: rgb(69, 2, 252);
}

.visitante {
    background-color: red;
}

.equipes {
    display: flex;
    flex-direction: row;
}

.nome {
    padding: 7px 10px 7px 10px;

    min-width: 100px;
    text-align: center;
}

.pontos {
    padding: 7px 17px 7px 17px;
    background-color: rgba(41, 38, 38, 0.301);
    text-align: center;
}

.linha {
    display: flex;
    flex-direction: row;

}

coluna {
    display: flex;
    flex-direction: column;
}
</style>