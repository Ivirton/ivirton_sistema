<template>
    <div class="linha">
        <div class="linha">
            <div class="coluna">
                <small>min</small>
                <input class="form-control" min="0" placeholder="0m" type="number" v-model="props.cronometro.minuto"
                    @input="sendData('minuto', props.cronometro.minuto)">
            </div>
            <div class="coluna">
                <small>seg</small>
                <input class="form-control" min="0" placeholder="0s" type="number" v-model="props.cronometro.segundo"
                    @input="sendData('segundo', props.cronometro.segundo)">
            </div>
            <div class="coluna">
                <small>duracao</small>
                <input class="form-control" min="0" placeholder="0s" type="number" v-model="props.cronometro.duracao"
                    @input="sendData('segundo', props.cronometro.segundo)">
            </div>
        </div>
        <div style="display: flex;align-content: center; align-items: center;">
            <i v-if="cronometro.icone" class="fas fa-pause" @click="play()"></i>
            <i v-else class="fas fa-play" @click="play()"></i>
            <i class="fas fa-stop" @click="stop()"></i>
        </div>
    </div>
    <div class="linha">
        <div class="coluna">
            <small>Tipo</small>
            <select class="form-select" id="selectbox" v-model="props.cronometro.tipo"
                @change="sendData('tipo', props.cronometro.tipo)">
                <option value="" selected="selected" disabled="disabled">Tipo</option>
                <option value="0">Progressivo</option>
                <option value="1">Regressivo</option>
            </select>
        </div>
        <Switch :valor="props.cronometro.visibilidade" path="placar/cronometro/visibilidade"
            :idTrasnmissao="props.idTrasnmissao" :socket="props.socket" />

    </div>


</template>
<script setup>
import { defineProps } from 'vue';
import Switch from './Switch.vue';

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
    cronometro: {
        type: Object
    }

})

function play() {
    props.cronometro.icone = !props.cronometro.icone
    sendData("icone", props.cronometro.icone)
}
function stop() {
    props.cronometro.icone = false
    sendData("icone", props.cronometro.icone)
    props.cronometro.minuto = 0
    props.cronometro.segundo = 0
    sendData("minuto", props.cronometro.minuto)
    sendData("segundo", props.cronometro.segundo)
}

props.socket.on(`cronometro`, (menssagem) => {
    if (`${props.path}/${menssagem.key}` == menssagem.path && props.socket.id != menssagem.socketId && menssagem.id == props.idTrasnmissao) {
        console.log("RX")
        console.log(menssagem)
        props.cronometro[menssagem.key] = menssagem.valor
    }
});
function sendData(key, valor) {

    props.socket.emit(`cronometro`, {
        "id": props.idTrasnmissao,
        socketId: props.socket.id,
        update: { [`${props.path}/${key}`]: valor },
        valor: valor,
        key: key,
        path: `${props.path}/${key}`
    });
}

</script>

<style scoped>
.form-control {
    margin-left: 4px;
    width: 70px;
}

.form-select {
    margin-left: 4px;


}

small {
    font-size: .875em;
    margin-left: 8px;
    color: #737272;
}

.coluna {
    display: flex;
    flex-direction: column;
}

.fas {
    font-size: 12px;
    font-weight: 900;
    background-color: rgb(0 123 255);
    width: 33px;
    height: 33px;
    padding: 11px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 3px;
    color: #ffffff;
    cursor: pointer;
    border-radius: 100%;
    box-shadow: 0px 0px 5px 2px #e7e5e5;
    margin: 0px 2px 0px 6px;
    transition: all .1s ease-in-out;

}

.form-select {
    --bs-form-select-bg-img: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e);
    display: block;
    width: 100%;
    padding: .375rem 2.25rem .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--bs-body-color);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: var(--bs-body-bg);
    background-image: var(--bs-form-select-bg-img), var(--bs-form-select-bg-icon, none);
    background-repeat: no-repeat;
    background-position: right .75rem center;
    background-size: 16px 12px;
    border: var(--bs-border-width) solid var(--bs-border-color);
    border-radius: var(--bs-border-radius);
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
</style>
