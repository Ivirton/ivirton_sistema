// backend/model/AnuncioModel.js
import dbFirebase from "../config/firebaseConfig.js";
import { ref, set, push, get, update, remove, child } from 'firebase/database';

class AnuncioModel {

    async create(data) {
        if (!data) {
            return Promise.reject(new Error("dados é obrigatório"));
        }

        const novoAnuncio = {
            id: "",
            nome: data.nome || "",
            duracao: data.duracao || 20,
            visibilidade: data.visibilidade || false,
        };

        const usersRef = ref(dbFirebase, 'anuncios');
        const newUserRef = push(usersRef);
        novoAnuncio.id = newUserRef.key;

        try {
            await set(newUserRef, novoAnuncio);
            return novoAnuncio;
        } catch (error) {
            console.error("Erro ao criar anuncio:", error);
            throw error;
        }
    }

    async findAll() {
        return get(child(ref(dbFirebase), "/anuncios"))
            .then(snapshot => snapshot.exists() ? snapshot.val() : null)
            .catch(error => {
                console.error("Erro ao buscar anuncios:", error);
                throw error;
            });
    }

    async findAt(id) {
        return get(child(ref(dbFirebase), `/anuncios/${id}`))
            .then(snapshot => snapshot.exists() ? snapshot.val() : null)
            .catch(error => {
                console.error("Erro ao buscar anuncio:", error);
                throw error;
            });
    }

    async update(id, updates) {

       //update: {'nome': "1DIA.jpg"}
        const anuncioRef = ref(dbFirebase, `/anuncios/${id}`);
        return update(anuncioRef, updates)
            .then(() => ({ message: "Anúncio atualizado com sucesso" }))
            .catch(error => {
                console.error("Erro ao atualizar anuncio:", error);
                throw error;
            });
    }

    async delete(id) {
        return remove(ref(dbFirebase, `/anuncios/${id}`))
            .then(() => ({ message: "Anúncio removido com sucesso" }))
            .catch(error => {
                console.error("Erro ao remover anuncio:", error);
                throw error;
            });
    }
}
const anuncioModel = new AnuncioModel()
export default anuncioModel;
