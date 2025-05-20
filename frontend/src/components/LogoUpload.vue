<template>
    <img :src="props.logo.url"  id="logo" >
    <input type="file" class="form-control" @change="handleFileUpload" id="imagem" required>
    <button type="submit" class="btn btn-primary">Salvar</button>

</template>
<script setup >
import { ref } from 'vue'

const props = defineProps({
    logo: {
        type: String
    }
})

const imagem = ref(null)
const url = ref(null)

function handleFileUpload(event) {
    imagem.value = event.target.files[0]
}
async function enviarAnuncio() {
    const formData = new FormData()
    formData.append('imagem', imagem.value)


    try {
        const response = await axios.post('/api/logo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        console.log('logo enviado com sucesso!', response.data)
        window.location.reload();


    } catch (error) {
        console.error('Erro ao enviar logo:', error)
    }
}
</script>
<style scoped >
#logo{
    width: 200px;
}

</style>
