const { createClient } = require('@supabase/supabase-js');

let client;

function normalizeSupabaseUrl(url) {
  if (!url || typeof url !== 'string') return url;
  let u = url.trim().replace(/\/+$/, '');
  // createClient expects project root only; /rest/v1 is added by the SDK
  u = u.replace(/\/rest\/v1\/?$/i, '');
  return u;
}

function getSupabase() {
  if (!client) {
    const url = normalizeSupabaseUrl(process.env.SUPABASE_URL);
    const key =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
    if (!url || !key) {
      throw new Error(
        'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY)'
      );
    }
    client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

function assertSupabaseEnv() {
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!process.env.SUPABASE_URL || !key) {
    console.error(
      'Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY). Server-only — never expose in the browser.'
    );
    process.exit(1);
  }
}

module.exports = { getSupabase, assertSupabaseEnv };
