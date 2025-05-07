<script setup>
import CheckBoxInput from '@/components/CheckBoxInput.vue';
const props = defineProps({
    largura: {
        type: Number,

    },
    imagemName: {
        type: String
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
    document.getElementById(id).remove();
}
</script>

<template>
    <div class="carde">



        <img :src="imagem" class="" alt="...">
        <div class="body_head">
            <CheckBoxInput />
            <input type="number" class="form-control" placeholder="0" aria-describedby="basic-addon2">
            <a href="#" class="btn btn-danger" role="button">Remover</a>
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