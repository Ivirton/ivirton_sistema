<script>
import Navegacao from '@/components/Navegacao.vue';
import axios from 'axios';

export default {
    data() {
        return {
            cep: '',
            endereco: null,
            erro: ''
        };
    },
    methods: {
        async buscarCep() {
            this.erro = '';
            this.endereco = null;
            if (!this.cep) {
                this.erro = 'Por favor, digite um CEP válido';
                return;
            }
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${this.cep}/json/`);
                if (response.data.erro) {
                    this.erro = 'CEP não encontrado';
                } else {
                    this.endereco = response.data;
                }
            } catch (error) {
                this.erro = 'Erro ao buscar o CEP';
            }
        }
    }
};
</script>


<template>
    <Navegacao />
    <main class="main">
        <div class="container ">
            <div class="row">
                <div class="col-md-10 offset-md-1 card1">
                    <div class="linha">
                        <h2 class="mb-4">Transmissões</h2>
                    </div>
                    <form class="linha"  method="post">
                        <div class="input-group mb-3">
                            <input style="margin-right: 20px;" type="text" class="form-control" name="nome"
                                placeholder="Nome">
                            <button class="btn btn-primary " type="submit">in</button>
                        </div>
                    </form>
                    <ul>
                        <li v-for="transmissao in transmissoes" :key="transmissao.id">
                            {{ transmissao.nome }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

       
    </main>
</template>

<style>
.main {
    width: 100%;
    height: 100vh;
    background-color: rgb(66, 65, 65);
}

.mt-5 {
    margin-top: 3rem !important;
    background-color: rgba(127, 255, 212, 0);
}

.card1 {
    position: relative;
    background-color: rgb(255, 255, 255);
    padding: 25px 10px 25px 6px;
    border-radius: 6px;
    box-shadow: 1px 5px 8px 1px #0e0e0e87;
    min-width: 309px;
    margin-bottom: 6px;
}

.linha {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
    padding: 0px 6px 0px 6px;
    align-items: center;
}
</style>
