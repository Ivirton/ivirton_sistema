const dbFirebase = require("../config/database/firebase/firebaseConfig");
const { ref, set, push, get, update, remove, child } = require('firebase/database');
const transmissorEntity = require("./transmissao");

class TransmissaoModel {

     async create(nome) {
        if (!nome) {
            return Promise.reject(new Error("Nome é obrigatório"));
        }
        
        const newTransmissao = {...transmissorEntity}
        newTransmissao.nome = nome
        const usersRef = ref(dbFirebase, 'transmissao');
        const newUserRef = push(usersRef);
        newTransmissao.id = newUserRef.key;

        try {
            await set(newUserRef, newTransmissao);
            return newTransmissao;
        } catch (error) {
            console.error("Erro ao criar transmissão:", error);
            throw error;
        }
    }

     async findAll() {
        return get(child(ref(dbFirebase), "/transmissao"))
            .then(snapshot => snapshot.exists() ? snapshot.val() : null)
            .catch(error => {
                console.error("Erro ao buscar transmissões:", error);
                throw error;
            });
    }

     async findAt(nome) {
        return get(child(ref(dbFirebase), `/transmissao/${nome}`))
            .then(snapshot => snapshot.exists() ? snapshot.val() : null)
            .catch(error => {
                console.error("Erro ao buscar transmissão:", error);
                throw error;
            });
    }

     async update(id, updates) {
        const transmissionRef = ref(dbFirebase, `/transmissao/${id}`);
        return update(transmissionRef, updates)
            .then(() => ({ message: "Transmissão atualizada com sucesso" }))
            .catch(error => {
                console.error("Erro ao atualizar transmissão:", error);
                throw error;
            });
    }

     async delete(id) {
        return remove(ref(dbFirebase, `/transmissao/${id}`))
            .then(() => ({ message: "Transmissão removida com sucesso" }))
            .catch(error => {
                console.error("Erro ao remover transmissão:", error);
                throw error;
            });
    }
}

const transmissaoModel = new TransmissaoModel()
module.exports = transmissaoModel ;
