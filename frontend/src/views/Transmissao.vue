<script >
import Navegacao from '../components/Navegacao.vue'
import axios from 'axios';

export default {
    data() {
        return {
            transmissao: [],
            nome: '',
            erro: '',
            sucesso: ''
        };
    },
    methods: {
        async getTransmissao() {
            try {
                const response = await axios.get('http://localhost:4000/api/transmissao');
                if (response.data.erro) {
                    this.erro = 'API não encontrada!';
                } else {
                    this.transmissao = response.data;
                    console.log(transmissao)
                }
            } catch (error) {
                // this.erro = 'Erro ao buscar API';
            }
        },
        async addTransmissao() {
            if (!this.nome) {
                console.log("erro");
                return;
            }
            try {
                const response = await axios.post('http://localhost:4000/api/transmissao', {
                    id: this.nome,
                    nome: this.nome
                });
                if (response.status === 201) {
                    this.getTransmissao();
                    this.sucesso = 'Transmissão adicionada com sucesso!';
                    this.transmissao.push({
                        id: this.nome,
                        nome: this.nome
                    });
                    this.nome = '';
                    this.sucesso = ""
                    
                } else {
                    // this.erro = 'Falha ao adicionar transmissão';
                }
            } catch (error) {
                // this.erro = 'Erro ao salvar transmissão';
            }
        },
        async removeTransmissao(id) {
          
            try {
                const response = await axios.delete(`http://localhost:4000/api/transmissao/${id}`);
                if (response.status === 200) {
                    this.sucesso = 'Transmissão removida com sucesso!';
                    // this.transmissao = this.transmissao.filter(trans => trans.id !== id);
                    this.getTransmissao();
                } else {
                    this.erro = 'Falha ao remover transmissão';
                }
            } catch (error) {
                this.erro = 'Erro ao remover transmissão';
            }
        }
    },
    mounted() {
        this.getTransmissao();
    }
};
</script>

<template>
    <Navegacao />
    <main class="main">
        <div class="container">
            <div class="row">
                <div class="col-md-10 offset-md-1 card1">
                    <div class="linha">
                        <h2 class="mb-4">Transmissões</h2>
                    </div>
                    <form @submit.prevent="addTransmissao" class="linha">
                        <div class="input-group mb-3">
                            <input v-model="nome" style="margin-right: 20px;" type="text" class="form-control"
                                name="nome" placeholder="Nome">
                            <button class="btn btn-primary" type="submit">Salvar</button>
                        </div>
                    </form>

                    <div v-if="sucesso" class="alert alert-success">{{ sucesso }}</div>
                    <div v-if="erro" class="alert alert-danger">{{ erro }}</div>

                    <table class="table table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th>Receptor</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="trans in transmissao" :key="trans.id">
                                <td>
                                    <a :href="`/transmissor?id=${trans.id}`">{{ trans.nome }}</a>
                                </td>
                                <td>
                                    
                                    <button @click="removeTransmissao(trans.id)" class="btn">
                                        <i class="fa fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
