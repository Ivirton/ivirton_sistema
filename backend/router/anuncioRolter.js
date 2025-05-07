// backend/router/anuncioRolter.js
import express from 'express';
const anuncioRouter = express.Router();
import multer from 'multer';
import AnuncioController from '../controller/anuncioController.js';

const upload = multer({ dest: 'uploads/' });

anuncioRouter.post('/', upload.single('imagem'),AnuncioController.create)
anuncioRouter.get("/", AnuncioController.findAll);              // Buscar todos os documentos
anuncioRouter.get("/:id", AnuncioController.findAt);          // Buscar um documento por nome
anuncioRouter.put("/:id", AnuncioController.update);          // Atualizar um documento
anuncioRouter.delete("/:id", AnuncioController.delete);         // Deletar um documento

export default anuncioRouter;


// anuncioRouter.post('/', upload.single('imagem'), async (req, res) => {
//   AnuncioController.create(req);

//   const file = req.file;
//   if (!file) return res.status(400).send('Nenhum arquivo enviado.');

//   const fileBuffer = fs.readFileSync(file.path);

//   const { data, error } = await supabase.storage
//     .from('imagens')
//     .upload(`/${file.originalname}`, fileBuffer, {
//       contentType: file.mimetype,
//       upsert: true,
//     });

//   fs.unlinkSync(file.path); // remove arquivo temporário

//   if (error) return res.status(500).send(error.message);

//   const { publicURL } = supabase.storage
//     .from('imagens')
//     .getPublicUrl(file.originalname);

//   res.redirect("/anuncio");
// });








