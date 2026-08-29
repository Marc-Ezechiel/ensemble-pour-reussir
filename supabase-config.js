// ==========================================================
// CONFIGURATION SUPABASE — Ensemble Pour Reussir
// ==========================================================
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// ⚠️ Remplace par tes vraies valeurs (Project Settings → API)
const SUPABASE_URL = "https://cqxuvssjwaygaqoqjuxj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_MBxF50BzcrX1vud7naT8AQ_VKlnBYwB";

window.supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ⚠️ Remplace par le vrai lien du groupe WhatsApp d'étude
window.WHATSAPP_GROUPE_ETUDE = "https://chat.whatsapp.com/lien-a-remplacer";
