const dbFirebaseStore = require("../config/database/firebase/firebase");

const TransmissorModel = {
    async create(id, data) {
        const docRef = dbFirebaseStore.collection('transmissor').doc(id);
        const doc = await docRef.get();

        if (doc.exists) {
            console.log("Já existe um documento com esse ID.");
        } else {
            await docRef.set(data);
            console.log(`Documento com ID "${id}" criado!`);
        }
    },
    async findAll() {
        try {
            const snapshot = await dbFirebaseStore.collection('transmissor').get();
            const results = [];

            snapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });

            return results;
        } catch (error) {
            console.error("Erro ao buscar todos os documentos:", error);
            return [];
        }
    },

    async findAt(id) {
        try {
            const docRef = dbFirebaseStore.collection('transmissor').doc(id);
            const doc = await docRef.get();

            if (doc.exists) {
                console.log("Documento encontrado:", doc.data());
                return doc.data();
            } else {
                console.log("Nenhum documento encontrado com esse ID.");
                return null;
            }
        } catch (error) {
            console.error("Erro ao buscar documento:", error);
            return null;
        }
    },

    async update(id, campo,novoCampo) {
        try {
            const docRef = dbFirebaseStore.collection('transmissor').doc(id);
            const doc = await docRef.get();

            if (doc.exists) {
                await docRef.update({ nome: novoNome });
                console.log(`Campo 'nome' do documento com ID "${id}" atualizado para: ${novoNome}`);
            } else {
                console.log("Nenhum documento encontrado com esse ID.");
            }
        } catch (error) {
            console.error("Erro ao atualizar campo:", error);
        }
    },

    async delete(id) {
        try {
            const docRef = dbFirebaseStore.collection('transmissor').doc(id);
            const doc = await docRef.get();

            if (doc.exists) {
                await docRef.delete();
                console.log(`Documento com ID "${id}" deletado com sucesso!`);
            } else {
                console.log("Nenhum documento encontrado com esse ID.");
            }
        } catch (error) {
            console.error("Erro ao deletar documento:", error);
        }
    }
};

module.exports = TransmissorModel

// Correta chamada da função assíncrona
// (async () => {
//     console.log(await TransmissorModel.findAll());
// })();
