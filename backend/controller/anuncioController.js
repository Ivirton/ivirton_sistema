const AnuncioModel = require("../model/anuncioModel");

const anuncioModel = new AnuncioModel()

const AnuncioController = {
    async create(req, res) {
        //crie uma novo anuncio 
        if(!req.body){
            res.status(500).json({ details: error.message });
        }
        anuncioModel.create(req.body).then((data) => {
            res.status(201).json({ 'message': "Documento criado com sucesso!", 'data': data });
        }).catch((error) => {
            res.status(500).json({ error: "Erro ao criar documento", details: error.message });
        })
    },

    async findAll(req, res) {
        //retorna todas as tramissoes em um arquivo json
        anuncioModel.findAll().then((data) => {
            console.log(data)
            res.status(200).json(data);
        }).catch(error => {
            console.error(error)
            res.status(500).json(error);
        })
    },

    async findAt(req, res) {
        //busca uma unica transmissao em um arquivo jason
        const { id } = req.params;
        anuncioModel.findAt(id)
            .then((data) => {
                res.status(200).json(data)
            }).catch((error) => {
                console.error(error)
                res.status(200).json(error)
            }
            )
    },

    async update(req, res) {
        const { id } = req.params;
        anuncioModel.update(id, req.body).then((result) => {
            console.log(result)
            res.status(200).json({ message: "Documento atualizado com sucesso!", "res":result});
        }).catch((err) => {
            res.status(200).json({ err: err});
        });
    },

    async delete(req, res) {
        const { id } = req.params;
        console.log(id)
        anuncioModel.delete(id).then((data) => {
            res.status(200).json({ message: "Documento deletado com sucesso!" });
        }).catch((error) => {
            res.status(500).json({ error: "Erro ao deletar documento", details: error.message });
        })
    }
};

module.exports = AnuncioController;
