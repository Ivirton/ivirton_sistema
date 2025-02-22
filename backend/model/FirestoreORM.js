const dbFirebaseStore = require("../config/database/firebase/firebase");

class FirestoreORM {
    constructor(collectionName) {
        this.collection = dbFirebaseStore.collection(collectionName);
    }

    async create(id, data) {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();

        if (doc.exists) {
            console.log("Já existe um documento com esse ID.");
        } else {
            await docRef.set(data);
            console.log(`Documento com ID "${id}" criado!`);
        }
    }

    async createSubCollection(parentId, subCollectionName, subId, data) {
        const docRef = this.collection.doc(parentId).collection(subCollectionName).doc(subId);
        await docRef.set(data);
        console.log(`Subcoleção '${subCollectionName}' criada com sucesso!`);
    }

    async findAll() {
        const snapshot = await this.collection.get();
        const results = [];
        snapshot.forEach(doc => results.push(doc.data()));
        return results;
    }

    async find(id) {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();

        if (doc.exists) {
            return doc.data();
        } else {
            console.log("Nenhum documento encontrado com esse ID.");
            return null;
        }
    }

    async update(id, data) {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();

        if (doc.exists) {
            await docRef.update(data);
            console.log(`Documento com ID "${id}" atualizado com sucesso!`);
        } else {
            console.log("Nenhum documento encontrado com esse ID.");
        }
    }

    async delete(id) {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();

        if (doc.exists) {
            await docRef.delete();
            console.log(`Documento com ID "${id}" deletado com sucesso!`);
        } else {
            console.log("Nenhum documento encontrado com esse ID.");
        }
    }
}

module.exports = FirestoreORM;
