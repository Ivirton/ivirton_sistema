// backend/controller/AnuncioController.js
import AnuncioModel from "../model/anuncioModel.js";
const anuncioModel = new AnuncioModel();

const AnuncioController = {
    async create(req) {
        const anun = {
            nome: req.file.originalname,
            duracao: req.body.duracao,
            visibilidade: req.body.visibilidade
        };
        console.log(anun);
        try {
            await anuncioModel.create(anun);
            // Se necessário, pode adicionar um retorno ou mensagem aqui
        } catch (error) {
            console.error("Erro ao criar anúncio:", error);
            // Pode lançar erro ou tratar como preferir
        }
    },

    async findAll(req, res) {
        try {
            const data = await anuncioModel.findAll();
            console.log(data);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },

    async findAt(req, res) {
        const { id } = req.params;
        try {
            const data = await anuncioModel.findAt(id);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        try {
            const result = await anuncioModel.update(id, req.body);
            console.log(result);
            res.status(200).json({ message: "Documento atualizado com sucesso!", res: result });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async delete(req, res) {
        const { id } = req.params;
        console.log(id);
        try {
            await anuncioModel.delete(id);
            res.status(200).json({ message: "Documento deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar documento", details: error.message });
        }
    }
};

export default AnuncioController;
