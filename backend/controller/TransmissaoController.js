const TransmissaoModel = require("../model/transmissaoModel");


const TransmissaoController = {
    async create(req, res) {
        try {
            const { id, nome } = req.body;
            await TransmissaoModel.create(id, { nome });
            res.status(201).json({ message: "Documento criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar documento", details: error.message });
        }
    },

    async createSubCollection(req, res) {
        try {
            await TransmissaoModel.createSubCollection();
            res.status(201).json({ message: "Subcoleção criada com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar subcoleção", details: error.message });
        }
    },

    async findAll(req, res) {
        try {
            
            const documentos = await TransmissaoModel.findAll();
            console.log(documentos)
            res.status(200).json(documentos);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar documentos", details: error.message });
        }
    },

    async findAt(req, res) {
        try {
            const { id } = req.params;
            const documento = await TransmissaoModel.findAt(id);
            if (documento) {
                res.status(200).json(documento);
            } else {
                res.status(404).json({ message: "Documento não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar documento", details: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome } = req.body;
            await TransmissaoModel.update(id, nome);
            res.status(200).json({ message: "Documento atualizado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar documento", details: error.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            await TransmissaoModel.delete(id);
            res.status(200).json({ message: "Documento deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar documento", details: error.message });
        }
    }
};

module.exports = TransmissaoController;
