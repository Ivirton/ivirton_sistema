import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import verificar from "../verificadores/anuncios.js";

import supabase from '../config/supabaseClient.js';

// Cria um objeto com a função createFile, responsável por lidar com o upload
const multerControler = {
    
    async createFile(file, nameBuckets, res) {
        
        const nomeArquivo =  verificar.removerCaracteres(file.originalname); // Pega o nome original do arquivo
        // Essa função recebe o arquivo enviado e o nome do bucket onde ele será salvo
        // Verifica se nenhum arquivo foi enviado pelo usuário
        if (!file) return res.status(400).send('Nenhum arquivo enviado.');

        // Lê o conteúdo do arquivo temporário salvo no servidor
        const fileBuffer = fs.readFileSync(file.path);

         // Envia esse arquivo para a Supabase Storage no bucket 'imagens'
        const { data, error } = await supabase.storage
            .from(nameBuckets)               // Ex: 'imagens'
            .upload(nomeArquivo, fileBuffer, {
                contentType: file.mimetype, // Define o tipo do arquivo (ex: image/png)
                upsert: true,               // Se já existir, sobrescreve o arquivo
            });

        // Remove o arquivo temporário do servidor após o upload
        fs.unlinkSync(file.path);

        // Se houve algum erro durante o upload, envia uma resposta de erro
        if (error) return res.status(500).send({ erro: 'Erro ao enviar arquivo', detalhes: error.message });

        // Recupera a URL pública do arquivo enviado para que possa ser acessado pela web
        const { publicURL } = supabase.storage
            .from(nameBuckets)
            .getPublicUrl(nomeArquivo);

        // Retorna a URL do arquivo como resposta JSON
        return res.status(200).json({
            mensagem: 'Arquivo enviado com sucesso!',
            urlPublica: publicURL
        });
    },
    async deleteFile(fileName,nameBuckets) {
        // Função para remover aquivo do Supabase
        const { data, error } = await supabase.storage
            .from(nameBuckets) // nome do bucket
            .remove([fileName]); // passa o nome exato do arquivo
    
        if (error) {
            console.error("Erro ao deletar aquivo do Supabase:", error.message);
            return { success: false, message: error.message };
        }
    
        return { success: true, message: "Arquivo deletado com sucesso!", data };
    }
}


export default multerControler;
