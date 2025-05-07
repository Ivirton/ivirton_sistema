// backend/controller/AnuncioController.js
import AnuncioModel from "../model/anuncioModel.js";
import multerControler from "./multerControler.js";
const anuncioModel = new AnuncioModel();

const AnuncioController = {

    async create(req, res) {
        const anun = {
            nome: req.file.originalname,
            duracao: req.body.duracao || 0,
            visibilidade: req.body.visibilidade || false
        };

        anuncioModel.create(anun)
            .then((data) => {
                multerControler.createFile(req.file, "imagens")
                console.log({ message: "Documento criado com sucesso!", data })
                res.status(201).json({ message: "Documento criado com sucesso!", data });
            })
            .catch((error) => {
                console.error({ error: "Erro ao criar documento", details: error.message })
                res.status(500).json({ error: "Erro ao criar documento", details: error.message });
            });
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
