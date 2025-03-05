<template>
    <div class="coluna">

        <div class="linha">
            <Text />
            <Score />
        </div>
        <div class="linha">
            <Text valor=""/>
            <Score />
        </div>
        <div class="linha">
            Partida
            <Score />
        </div>
        
        
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import Score from './Score.vue'
import Text from './Text.vue'







const props = defineProps({
    casaNome: {
        type: Number,
        required: true,
    }

})

</script>

<style scoped>

</style>
