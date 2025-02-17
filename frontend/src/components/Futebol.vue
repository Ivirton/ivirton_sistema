<template>
    <div class="coluna">
        
        <div class="linha">
            <input class="form-control" type="text">
            <div style="display: flex; align-items: center;">
                <i class="fas fa-minus"></i>
                <strong class="pontos" id="">0</strong>
                <i class="fas fa-plus"></i>
            </div>
        </div>
        <div class="linha">
            <input class="form-control" type="text">
            <div style="display: flex; align-items: center;">
                <i class="fas fa-minus"></i>
                <strong class="pontos">0</strong>
                <i class="fas fa-plus"></i>
            </div>
        </div>
        <div class="linha">
            Partida
            <div style="display: flex; align-items: center;">
                <i class="fas fa-solid fa-minus"></i>
                <strong class="partida">0</strong>
                <i class=" fas fa-solid fa-plus"></i>
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps({
    largura: {
        type: Number,
        required: true,
    }
})
</script>

<style scoped>

.fas {
    font-size: 12px;
    font-weight: 900;
    background-color: rgb(0 123 255);
    width: 33px;
    height: 33px;
    padding: 11px;
    display: flex
;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 3px;
    color: #ffffff;
    cursor: pointer;
    border-radius: 100%;
    box-shadow: 0px 0px 5px 2px #e7e5e5;
    margin: 0px 2px 0px 6px;
}
</style>
