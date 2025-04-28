const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uogqtlofsmvofetnsvug.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvZ3F0bG9mc212b2ZldG5zdnVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NDY0NTUsImV4cCI6MjA1OTAyMjQ1NX0.E4OZIqiY0EchGdrZd9eWaQCrYrrunwogayMau7sUFAU"
const supabase = createClient(supabaseUrl, supabaseKey)

const multerControler = {
    async upload(file) {
        const fileBuffer = fs.readFileSync(file.path);
        const { data, error } = await supabase.storage
            .from('imagens')
            .upload(`/${file.originalname}`, fileBuffer, {
                contentType: file.mimetype,
                upsert: true,
            });

        fs.unlinkSync(file.path); // remove arquivo temporário

        if (error) return res.status(500).send(error.message);

        const { publicURL } = supabase.storage
            .from('imagens')
            .getPublicUrl(file.originalname);
    }
}