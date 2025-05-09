<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Upload de Imagem</h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="enviarAnuncio" enctype="multipart/form-data">
              <div class="linha">
                <div class="form-group">
                  <label for="checkbox" class="col-form-label">Ativo</label>
                  <input class="form-check-input" type="checkbox" v-model="visibilidade" id="checkbox">
                </div>
                <div class="form-group">
                  <label for="duracao" class="col-form-label">Duração</label>
                  <input class="form-control" v-model="duracao" type="number" style="width: 70px;" id="duracao" required>
                </div>
                <div class="form-group">
                  <label for="imagem" class="col-form-label">Escolher Imagem</label>
                  <input type="file" class="form-control" @change="handleFileUpload" style="width: 142px;" id="imagem" required>
                </div>
              </div>
              <div class="modal-footer" style="margin-top: 12px;">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="submit" class="btn btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { defineProps,defineEmits } from 'vue'
 
  const duracao = ref(20)
  const visibilidade = ref(true)
  const imagem = ref(null)
  
  function handleFileUpload(event) {
    imagem.value = event.target.files[0]
  }
  
  async function enviarAnuncio() {
    const formData = new FormData()
    formData.append('imagem', imagem.value)
    formData.append('duracao', duracao.value)
    formData.append('visibilidade', visibilidade.value)
  
    try {
      const response = await axios.post('/api/anuncios', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      console.log('Anúncio enviado com sucesso!', response.data)
      // aqui você pode fechar o modal ou atualizar a lista
    } catch (error) {
      console.error('Erro ao enviar anúncio:', error)
    }
  }
  </script>
  
  <style scoped>
  /* Seus estilos aqui */
  </style>
  