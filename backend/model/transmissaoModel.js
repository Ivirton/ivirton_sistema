const dbFirebaseStore = require("../config/database/firebase/firebase");

const TransmissaoModel = {
    async create(id, data) {
        const docRef = dbFirebaseStore.collection('transmissao').doc(id);
        const doc = await docRef.get();

        if (doc.exists) {
            console.log("Já existe um documento com esse ID.");
        } else {
            await docRef.set(data);
            console.log(`Documento com ID "${id}" criado!`);
        }
    },

    async createSubCollection(id,data,idColletion,nameColletion) {
        const idTransmissao = "1";
        const dadosPlacar = {
            pontosEquipeA: 10,
            pontosEquipeB: 8,
            status: "finalizado"
        };

        const docRef = dbFirebaseStore
            .collection('transmissao')
            .doc(id)
            .collection(nameColletion)
            .doc(idColletion); 

        await docRef.set(data);
        console.log("Subcoleção  criada com sucesso!");
    },

    async findAll() {
        try {
            const snapshot = await dbFirebaseStore.collection('transmissao').get();
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
            const docRef = dbFirebaseStore.collection('transmissao').doc(id);
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

    async update(id, novoNome) {
        try {
            const docRef = dbFirebaseStore.collection('transmissao').doc(id);
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
            const docRef = dbFirebaseStore.collection('transmissao').doc(id);
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

module.exports = TransmissaoModel

// Correta chamada da função assíncrona
// (async () => {
//     console.log(await TransmissaoModel.findAll());
// })();
