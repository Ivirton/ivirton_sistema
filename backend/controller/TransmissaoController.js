// backend/controller/TransmissaoController.js
import transmissaoModel from "../model/transmissaoModel.js";

const TransmissaoController = {
    async create(req, res) {
        const { nome } = req.body;
        transmissaoModel.create(nome)
            .then((data) => {
                res.status(201).json({ message: "Documento criado com sucesso!", data });
            })
            .catch((error) => {
                res.status(500).json({ error: "Erro ao criar documento", details: error.message });
            });
    },

    async findAll(req, res) {
        transmissaoModel.findAll()
            .then((data) => {
                console.log(data);
                res.status(200).json(data);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json(error);
            });
    },

    async findAt(req, res) {
        const { nome } = req.params;
        transmissaoModel.findAt(nome)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: error.message });
            });
    },

    async update(req, res) {
        const { nome } = req.params;
        transmissaoModel.update(nome, req.body)
            .then((result) => {
                console.log(result);
                res.status(200).json({ message: "Documento atualizado com sucesso!", result });
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    },

    async delete(req, res) {
        const { id } = req.params;
        console.log(id);
        transmissaoModel.delete(id)
            .then(() => {
                res.status(200).json({ message: "Documento deletado com sucesso!" });
            })
            .catch((error) => {
                res.status(500).json({ error: "Erro ao deletar documento", details: error.message });
            });
    }
};

export default TransmissaoController;
