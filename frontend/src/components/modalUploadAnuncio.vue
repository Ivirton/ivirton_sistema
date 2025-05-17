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
                
                <input class="ui-checkbox"   type="checkbox" v-model="visibilidade" id="checkbox">
              </div>
              <div class="form-group">
                <label for="duracao" class="col-form-label">Duração</label>
                <input class="form-control" v-model="duracao" type="number" style="width: 70px;" id="duracao" required>
              </div>
              <div class="form-group">
                <label for="imagem" class="col-form-label">Escolher Imagem</label>
                <input type="file" class="form-control" @change="handleFileUpload" style="width: 142px;" id="imagem"
                  required>
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
import { defineProps, defineEmits } from 'vue'

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
    window.location.reload(); // recarrega a página

    // aqui você pode fechar o modal ou atualizar a lista
  } catch (error) {
    console.error('Erro ao enviar anúncio:', error)
  }
}
</script>


<style scoped>
/* From Uiverse.io by Galahhad */
/* checkbox settings 👇 */
#checkbox {
    /* margin: 10px; */
    /* position: absolute; */
    /* box-shadow: -2px 2px 20px 2px black; */
    width: 27px;
    height: 27px;
    border-radius: 100%;
}

.ui-checkbox {
    /* position: absolute; */
    --primary-color: #1677ff;
    --secondary-color: #fff;
    --primary-hover-color: #4096ff;
    /* checkbox */
    --checkbox-diameter: 20px;
    --checkbox-border-radius: 5px;
    --checkbox-border-color: #d9d9d9;
    --checkbox-border-width: 1px;
    --checkbox-border-style: solid;
    /* checkmark */
    --checkmark-size: 1.2;
}

.ui-checkbox,
.ui-checkbox *,
.ui-checkbox *::before,
.ui-checkbox *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.ui-checkbox {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: var(--checkbox-diameter);
    height: var(--checkbox-diameter);
    border-radius: var(--checkbox-border-radius);
    background: var(--secondary-color);
    border: var(--checkbox-border-width) var(--checkbox-border-style) var(--checkbox-border-color);
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    cursor: pointer;
    position: relative;
}

.ui-checkbox::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-box-shadow: 0 0 0 calc(var(--checkbox-diameter) / 2.5) var(--primary-color);
    box-shadow: 0 0 0 calc(var(--checkbox-diameter) / 2.5) var(--primary-color);
    border-radius: inherit;
    opacity: 0;
    -webkit-transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
    -o-transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
    transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
}

.ui-checkbox::before {
    top: 40%;
    left: 50%;
    content: "";
    position: absolute;
    width: 4px;
    height: 7px;
    border-right: 2px solid var(--secondary-color);
    border-bottom: 2px solid var(--secondary-color);
    -webkit-transform: translate(-50%, -50%) rotate(45deg) scale(0);
    -ms-transform: translate(-50%, -50%) rotate(45deg) scale(0);
    transform: translate(-50%, -50%) rotate(45deg) scale(0);
    opacity: 0;
    -webkit-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
    -o-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
    transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
}

/* actions */

.ui-checkbox:hover {
    border-color: var(--primary-color);
}

.ui-checkbox:checked {
    background: var(--primary-color);
    border-color: transparent;
}

.ui-checkbox:checked::before {
    opacity: 1;
    -webkit-transform: translate(-50%, -50%) rotate(45deg) scale(var(--checkmark-size));
    -ms-transform: translate(-50%, -50%) rotate(45deg) scale(var(--checkmark-size));
    transform: translate(-50%, -50%) rotate(45deg) scale(var(--checkmark-size));
    -webkit-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
    -o-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
    transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
}

.ui-checkbox:active:not(:checked)::after {
    -webkit-transition: none;
    -o-transition: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    transition: none;
    opacity: 1;
}
</style>