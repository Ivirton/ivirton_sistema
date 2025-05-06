// backend/config/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uogqtlofsmvofetnsvug.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvZ3F0bG9mc212b2ZldG5zdnVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NDY0NTUsImV4cCI6MjA1OTAyMjQ1NX0.E4OZIqiY0EchGdrZd9eWaQCrYrrunwogayMau7sUFAU';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
