<template>
    <section class="scorebord">

        <div class="linha">
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
            <div>
                <div class="linha ">
                    <strong class="cronometro">00:00</strong>
                    <p style="padding: 0px 17px 0px 0px;">1t°</p>
                </div>
            </div>
        </div>


    </section>
</template>
<script setup>

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
    placar: {
        type: Object
    }

})



</script>
<style scoped>
* {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
}
.glass {
    position: relative;
    /* transform: translateX(-50%); */
    padding: 10px;
    background: linear-gradient(to bottom, #010101c7, #000000a3);
    border-radius: 6px;
    /* box-shadow: -4px 5px 10px rgb(0 0 0 / 10%); */
    text-align: center;
    z-index: 999;
    border: 1px solid #aaff00ad;
    overflow: hidden;
    backdrop-filter: blur(25px);

}
.scorebord {
    top: 40px;
    left: 50px;
    position: absolute;
    z-index: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: black;
    animation: slide-up 0.5s ease;
    border-radius: 8px;
}

.cronometro {
    padding: 7px 10px 7px 10px;
    /* min-width: 68px; */
    text-align: center;
}

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