// Importa a configuração do banco de dados Firebase
import dbFirebase from "../config/firebaseConfig.js";

// Importa funções do Firebase Realtime Database para manipulação de dados
import { ref, set, push, get, update, remove, child } from 'firebase/database';

// Importa a entidade base de uma transmissão
import transmissorEntity from "./transmissao.js";

// Classe responsável por manipular os dados da entidade "transmissao"
class TransmissaoModel {

    // Cria uma nova transmissão com base em um nome
    async create(nome) {
        if (!nome) {
            return Promise.reject(new Error("Nome é obrigatório"));
        }

        // Cria um objeto base da transmissão a partir da entidade
        const newTransmissao = { ...transmissorEntity };
        newTransmissao.nome = nome;

        // Referência para o caminho 'transmissao' no Firebase
        const usersRef = ref(dbFirebase, 'transmissao');

        // Cria um novo nó no caminho com uma chave única
        const newUserRef = push(usersRef);
        newTransmissao.id = newUserRef.key;

        try {
            // Salva os dados da nova transmissão no Firebase
            await set(newUserRef, newTransmissao);
            return newTransmissao;
        } catch (error) {
            console.error("Erro ao criar transmissão:", error);
            throw error;
        }
    }

    // Retorna todas as transmissões cadastradas
    async findAll() {
        return get(child(ref(dbFirebase), "/transmissao"))
            .then(snapshot => snapshot.exists() ? snapshot.val() : null)
            .catch(error => {
                console.error("Erro ao buscar transmissões:", error);
                throw error;
            });
    }

    // Busca uma transmissão específica pelo nome (na prática, pela chave do Firebase)
    async findAt(nome) {
        return get(child(ref(dbFirebase), `/transmissao/${nome}`))
            .then(snapshot => snapshot.exists() ? snapshot.val() : null)
            .catch(error => {
                console.error("Erro ao buscar transmissão:", error);
                throw error;
            });
    }

    // Atualiza campos específicos de uma transmissão a partir do ID
    // Exemplo de updates: { 'placar/jogo/visitante/pontos': 1 }
    async update(id, updates) {
        const transmissionRef = ref(dbFirebase, `/transmissao/${id}`);
        return update(transmissionRef, updates)
            .then(() => ({ message: "Transmissão atualizada com sucesso" }))
            .catch(error => {
                console.error("Erro ao atualizar transmissão:", error);
                throw error;
            });
    }

    // Remove uma transmissão do banco de dados usando o ID
    async delete(id) {
        return remove(ref(dbFirebase, `/transmissao/${id}`))
            .then(() => ({ message: "Transmissão removida com sucesso" }))
            .catch(error => {
                console.error("Erro ao remover transmissão:", error);
                throw error;
            });
    }
}

// Instancia a classe e exporta como singleton para uso em outros arquivos
const transmissaoModel = new TransmissaoModel();
export default transmissaoModel;