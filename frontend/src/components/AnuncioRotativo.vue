<script setup>
import CheckBoxInput from '@/components/CheckBoxInput.vue';
import axios from 'axios';
const props = defineProps({
    imagemName: {
        type: String
    },
    id:{
        type:String
    },
    duracao:{
        type:Number
    },
    anuncio: {
        type: Object
    },
    socket: {
        type: Object
    }
})

const imagem = `https://uogqtlofsmvofetnsvug.supabase.co/storage/v1/object/public/imagens//${props.imagemName}`
function toggleSelection(card, checkbox) {
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
        card.classList.add("selected");
    } else {
        card.classList.remove("selected");
    }
}

function removerItem(id) {
    async function getAnuncio() {
    try {
        const response = await axios.delete(`/api/anuncios/${id}`);
        if (response.data.erro) {
            console.log('API não encontrada!');
            return [];
        } else {
           
            return response.data;
        }
    } catch (error) {
        console.log('Erro ao buscar API:', error);
        return [];
    }
}
}
props.socket.on(`duracao`, (menssagem) => {
    if (props.socket.id != menssagem.socketId && menssagem.id == props.id) {
        console.log("RX")
        console.log(menssagem)
        props.duracao = menssagem.valor
    }
});

function sendData() {
    props.socket.emit(`duracao`, {
        id: props.id,
        socketId: props.socket.id,
        update: { 'duracao': props.duracao },
        valor: props.duracao
    });
}


</script>

<template>
    <div class="carde">
        <img :src="imagem" >
        <div class="body_head">
            <CheckBoxInput />
            <input type="number" class="form-control" placeholder="0" v-model="props.duracao" @input="sendData()" aria-describedby="basic-addon2">
            <a href="#" class="btn btn-danger" @click="removerItem(props.id)" role="button">Remover</a>
            <i class="bi bi-x-square-fill"></i>
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
    width: 320px;
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