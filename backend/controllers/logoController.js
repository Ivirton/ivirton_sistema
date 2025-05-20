// backend/controller/AnuncioController.js
import anuncioModel from "../model/anuncioModel.js";
import verificar from "../verificadores/anuncios.js";
import multerControler from "./multerControler.js";


const AnuncioController = {

    async create(req, res) {
        // Cria o objeto com os dados do anúncio, pegando informações do arquivo e do corpo da requisição
        const visibilidade = (req.body.visibilidade === 'true') ? true : false;

        const anun = {
            nome: verificar.removerCaracteres(req.file.originalname),
            duracao: parseInt(req.body.duracao) || 0,
            visibilidade: visibilidade || false
        };

        // Salva o anúncio no banco
        anuncioModel.create(anun)
            .then((data) => {
                // Envia o arquivo para a Supabase (no bucket 'imagens')

                multerControler.createFile(req.file, "imagens", res);

                // Exibe e envia resposta de sucesso
                //  res.status(200).json(data); // Envia como resposta
                console.log({ message: "Documento criado com sucesso!", data });
                // Atenção: esse `res.status(201).json(...)` pode ser chamado 2 vezes. Deve-se ajustar!
                // Aqui poderia ser retirado e movido para dentro de `multerControler.createFile(...)`
            })
            .catch((error) => {
                // Em caso de erro, mostra mensagem no console e responde com erro
                console.error({ error: "Erro ao criar documento", details: error.message });
                res.status(500).json({ error: "Erro ao criar documento", details: error.message });
            });
    },

    async findAll(req, res) {
        try {
            const data = await anuncioModel.findAll(); // Busca todos os anúncios
            res.status(200).json(data); // Envia como resposta
        } catch (error) {
            console.error(error);
            res.status(500).json(error); // Em caso de erro
        }
    },

    async findAllActive(req, res) {
        try {
            const data = await anuncioModel.findAll(); // Busca todos os anúncios
            const ativos = Object.fromEntries(
                Object.entries(data).filter(([key, value]) => value.visibilidade === true)
            );
            console.log(ativos)
            res.status(200).json(ativos); // Envia como resposta
        } catch (error) {
            console.error(error);
            res.status(500).json(error); // Em caso de erro
        }
    },
    async findAt(req, res) {
        const { id } = req.params;
        try {
            const data = await anuncioModel.findAt(id); // Busca o anúncio por ID
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    async update(req, res) {

        const { id } = req.params;
        try {
            const result = await anuncioModel.update(id, req.body.update); // Atualiza com os novos dados
            console.log(req.params.id)
            console.log(req.body);
            res.status(200).json({ message: "Documento atualizado com sucesso!", res: result });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async delete(req, res) {
        const { id } = req.params;
        console.log(id);
        try {
            const data = await anuncioModel.findAt(id);
            multerControler.deleteFile(data.nome, "imagens");//remove do subabase
            await anuncioModel.delete(id); // Remove do banco de dados

            res.status(200).json({ message: "Documento deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar documento", details: error.message });
        }
    }
};

export default AnuncioController;
