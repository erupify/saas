// ═══════════════════════════════════════════════════════════════
//  Erupify — Supabase Client
//  ⚠️  Replace YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY
//     with your real values from: https://supabase.com/dashboard
//     Project Settings → API
// ═══════════════════════════════════════════════════════════════

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL     = 'YOUR_SUPABASE_URL';       // e.g. https://xxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // your anon/public key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
