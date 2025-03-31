const dbFirebase = require("../config/database/firebase/firebaseConfig");
const transmissao = require("../model/transmissao");
const { ref, set, push, } = require('firebase/database');
const transmissaoModel = require("../model/transmissaoModel");




const TransmissaoController = {
    async create(req, res) {
        //crie uma nova transmissao 
        const { nome } = req.body;
        transmissaoModel.create(nome).then((data) => {
            res.status(201).json({ 'message': "Documento criado com sucesso!", 'data': data });
        }).catch((error) => {
            res.status(500).json({ error: "Erro ao criar documento", details: error.message });
        })
    },

    async findAll(req, res) {
        //retorna todas as tramissoes em um arquivo json
        transmissaoModel.findAll().then((data) => {
            console.log(data)
            res.status(200).json(data);
        }).catch(error => {
            console.error(error)
            res.status(500).json(error);
        })
    },

    async findAt(req, res) {
        //busca uma unica transmissao em um arquivo jason
        const { nome } = req.params;
        transmissaoModel.findAt(nome)
            .then((data) => {
                res.status(200).json(data)
            }).catch((error) => {
                console.error(error)
                res.status(200).json(error)
            }
            )
    },

    async update(req, res) {
        const { nome } = req.params;
        transmissaoModel.update(nome, req.body).then((result) => {
            console.log(result)
            res.status(200).json({ message: "Documento atualizado com sucesso!", "res":result});
        }).catch((err) => {
            res.status(200).json({ err: err});
        });
    },

    async delete(req, res) {
        const { id } = req.params;
        console.log(id)
        transmissaoModel.delete(id).then((data) => {
            res.status(200).json({ message: "Documento deletado com sucesso!" });
        }).catch((error) => {
            res.status(500).json({ error: "Erro ao deletar documento", details: error.message });
        })
    }
};

module.exports = TransmissaoController;
