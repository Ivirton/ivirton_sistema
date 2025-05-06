const dbFirebase = require("../config/firebaseConfig");
const { ref, set, push, get, update, remove, child } = require('firebase/database');

class AnuncioModel {

    async create(data) {
       if (!data) {
           return Promise.reject(new Error("dados é obrigatório"));
       }
       const novoAnuncio = {id:"", nome:"",duracao:20}
       
       novoAnuncio.nome = data.nome
       novoAnuncio.duracao = data.duracao
       novoAnuncio.visibilidade = data.visibilidade

       const usersRef = ref(dbFirebase, `anuncios`);
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
       const transmissionRef = ref(dbFirebase, `/anuncios/${id}`);
       return update(transmissionRef, updates)
           .then(() => ({ message: "anuncio atualizada com sucesso" }))
           .catch(error => {
               console.error("Erro ao atualizar anuncio:", error);
               throw error;
           });
   }

    async delete(id) {
       return remove(ref(dbFirebase, `/anuncios/${id}`))
           .then(() => ({ message: "anuncios removida com sucesso" }))
           .catch(error => {
               console.error("Erro ao remover anuncios:", error);
               throw error;
           });
   }
}

module.exports = AnuncioModel