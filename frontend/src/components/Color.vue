<template>
    <input class="form-control" type="color" v-model="props.valor"   >
</template>
<script setup>



const props = defineProps({

idTrasnmissao: {
    type: String,

},
valor: {
    type: String,
},
socket: {
    type: Object
},

path:{
    type:String
}

})

</script>
<style scoped>
.form-control{
    width: 60px;
    height: 37px;
    margin-right: 4px;
}
</style>