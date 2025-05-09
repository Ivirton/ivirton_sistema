// Importa a configuração do Firebase Realtime Database
import dbFirebase from "../config/firebaseConfig.js";

// Importa funções do Firebase necessárias para criar, ler, atualizar e deletar dados
import { ref, set, push, get, update, remove, child } from 'firebase/database';

// Classe responsável por manipular os dados de anúncios no Firebase
class AnuncioModel {

    // Método para criar um novo anúncio
    async create(data) {
        if (!data) {
            return Promise.reject(new Error("dados é obrigatório"));
        }

        // Define a estrutura do novo anúncio com valores padrão, caso não venham no 'data'
        const novoAnuncio = {
            id: "",
            nome: data.nome || "",
            duracao: data.duracao || 20,           // duração padrão: 20 segundos
            visibilidade: data.visibilidade || false, // padrão: visível = false
        };

        // Referência para o caminho 'anuncios' no banco de dados
        const usersRef = ref(dbFirebase, 'anuncios');

        // Gera uma nova chave única para o anúncio
        const newUserRef = push(usersRef);
        novoAnuncio.id = newUserRef.key;

        try {
            // Salva o novo anúncio no Firebase
            await set(newUserRef, novoAnuncio);
            return novoAnuncio;
        } catch (error) {
            console.error("Erro ao criar anuncio:", error);
            throw error;
        }
    }

    // Método para buscar todos os anúncios salvos
    async findAll() {
        return get(child(ref(dbFirebase), "/anuncios"))
            .then(snapshot => snapshot.exists() ? snapshot.val() : null)
            .catch(error => {
                console.error("Erro ao buscar anuncios:", error);
                throw error;
            });
    }

    // Método para buscar um único anúncio pelo ID
    async findAt(id) {
        return get(child(ref(dbFirebase), `/anuncios/${id}`))
            .then(snapshot => snapshot.exists() ? snapshot.val() : null)
            .catch(error => {
                console.error("Erro ao buscar anuncio:", error);
                throw error;
            });
    }

    // Método para atualizar um ou mais campos de um anúncio existente
    // Exemplo de uso: update("id123", { 'nome': "1DIA.jpg" })
    async update(id, updates) {
        const anuncioRef = ref(dbFirebase, `/anuncios/${id}`);
        return update(anuncioRef, updates)
            .then(() => ({ message: "Anúncio atualizado com sucesso" }))
            .catch(error => {
                console.error("Erro ao atualizar anuncio:", error);
                throw error;
            });
    }

    // Método para deletar um anúncio do banco de dados
    async delete(id) {
        return remove(ref(dbFirebase, `/anuncios/${id}`))
            .then(() => ({ message: "Anúncio removido com sucesso" }))
            .catch(error => {
                console.error("Erro ao remover anuncio:", error);
                throw error;
            });
    }
}

// Instancia única da classe para ser utilizada em outros arquivos
const anuncioModel = new AnuncioModel()
export default anuncioModel;
