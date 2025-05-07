import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import supabase from '../config/supabaseClient.js';

const multerControler = {
    async createFile(file, nameBuckets) {
        if (!file) return res.status(400).send('Nenhum arquivo enviado.');
        const fileBuffer = fs.readFileSync(file.path);
        const { data, error } = await supabase.storage
            .from('imagens')
            .upload(`/${file.originalname}`, fileBuffer, {
                contentType: file.mimetype,
                upsert: true,
            });
        fs.unlinkSync(file.path); // remove arquivo temporário
        if (error) return res.status(500).send(error.message);
        //Buckets de armazenamento de subabase 
        const { publicURL } = supabase.storage
            .from(nameBuckets)
            .getPublicUrl(file.originalname);
    }
}

export default multerControler;
