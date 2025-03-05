const dbFirebase = require("../config/database/firebase/firebaseConfig");
const transmissao = require("../model/transmissao");
const { ref, set,push, get, update, remove, child } = require('firebase/database');

// const TransmissaoModel = require("../model/transmissaoModel");


const TransmissaoController = {
    transmissoes: [],
    async create(req, res) {
        try {
            const { nome } = req.body;
            console.log(req.body)
            const t1 = transmissao
            t1.nome = nome
            const usersRef = ref(dbFirebase, 'transmissao');
            const newUserRef = push(usersRef); 
            t1.id = newUserRef.key
            await set(newUserRef, t1); 
    

            res.status(201).json({ message: "Documento criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar documento", details: error.message });
        }
    },


    async findAll(req, res) {
        try {
            const snapshot = await get(child(ref(dbFirebase), "/transmissao"));
            if (snapshot.exists()) {
                data = snapshot.val()
                // console.log(data);
                res.status(200).json(data);
            } else {
                console.log('Nenhum dado encontrado!');
            }


        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar documentos", details: error.message });
        }
    },

    async findAt(req, res) {
        try {
            const { nome } = req.params;
            // console.log(req.params)
            
            const snapshot = await get(child(ref(dbFirebase), `/transmissao/${nome}`));
            if (snapshot.exists()) {
                const data = snapshot.val()
                // console.log(data);
                res.status(200).json(data);
            } 
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar documento", details: error.message });
        } 
    },

    async update(req, res) {
        // try {
        //     const { id } = req.params;
        //     const { nome } = req.body;
        //     await TransmissaoModel.update(id, nome);
        //     res.status(200).json({ message: "Documento atualizado com sucesso!" });
        // } catch (error) {
        //     res.status(500).json({ error: "Erro ao atualizar documento", details: error.message });
        // }
    },

    async delete(req, res) {
        try {
            const { id } = req.body;
            console.log(req.body)
            await remove(ref(dbFirebase, `/transmissao/${id}`));
            res.status(200).json({ message: "Documento deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar documento", details: error.message });
        }
    }
};

module.exports = TransmissaoController;
