<script setup>
import { defineEmits } from 'vue';
import CheckBoxInput from '@/components/CheckBoxInput.vue';
import axios from 'axios';

const emit = defineEmits(['removido']);

const props = defineProps({
    
    id: String,
    duracao: Number,
    socket: Object,
    anuncio:Object
});

const imagem = `https://uogqtlofsmvofetnsvug.supabase.co/storage/v1/object/public/imagens/${props.anuncio.nome}`;



async function removerItem(id) {
    try {
        const response = await axios.delete(`/api/anuncios/${id}`);
        if (response.status === 200) {
            emit('removido', id); // emite evento para o componente pai remover da lista
            window.location.reload(); // recarrega a página
        }
    } catch (error) {
        console.error('Erro ao remover anúncio:', error);
    }
}

props.socket.on(`duracao`, (mensagem) => {
    if (props.socket.id !== mensagem.socketId && mensagem.id === props.id) {
        props.anuncio.duracao = mensagem.valor;
    }
});

function sendData() {
    props.socket.emit(`duracao`, {
        id: props.anuncio.id,
        socketId: props.socket.id,
        update: { 'duracao': props.anuncio.duracao },
        valor: props.anuncio.duracao
    });
}
</script>
<template>
    <div class="carde">
        <img :src="imagem">
        <div class="body_head">
            <CheckBoxInput :anuncio="props.anuncio" :id="props.id" :socket="props.socket" />
            <input type="number" class="form-control" placeholder="0" v-model="props.anuncio.duracao" @input="sendData()" />
            <a  class="btn btn-danger" @click.prevent="removerItem(props.anuncio.id)">Remover</a>
        </div>
    </div>
</template>


<style scoped>
img{
    border-radius: 5px;
}
.carde {
    display: flex
;
    width: 250px;
    background-color: #fff;
    flex-direction: column;
    height: fit-content;
    border-radius: 6px;
    box-shadow: 6px -1px 20px #00000040;
    margin-left: 8px;
    margin-bottom: 8px;
    margin-top: 8px;

}


.body_head {
    display: flex;
    height: 49px;
    justify-content: space-around;
    align-items: center;
    background-color: #1e1b1b;
}

.card-img-top {
    width: 100%;
    border-radius: 5px;
}

.form-control {
    width: 70px;
}
</style>