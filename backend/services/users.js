const bcrypt = require('bcryptjs');
const { getSupabase } = require('../lib/supabase');
const { rowToUser, toPublicUser } = require('./serialize');

function randomReferralCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

async function findUserByEmail(email) {
  const supabase = getSupabase();
  const normalized = String(email).toLowerCase().trim();
  const { data, error } = await supabase.from('users').select('*').eq('email', normalized).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? rowToUser(data) : null;
}

async function findUserByReferralCode(code) {
  if (!code) return null;
  const supabase = getSupabase();
  const { data, error } = await supabase.from('users').select('*').eq('referral_code', String(code).trim()).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? rowToUser(data) : null;
}

async function createUser({ name, email, password, referredBy, credits }) {
  const supabase = getSupabase();
  const hashed = await bcrypt.hash(password, 10);
  const emailNorm = String(email).toLowerCase().trim();

  for (let attempt = 0; attempt < 8; attempt++) {
    const referral_code = randomReferralCode();
    const { data, error } = await supabase
      .from('users')
      .insert({
        name: String(name).trim(),
        email: emailNorm,
        password: hashed,
        credits: credits ?? 3,
        referral_code,
        referred_by: referredBy || null,
      })
      .select('*')
      .single();

    if (!error && data) return rowToUser(data);
    if (error?.code === '23505') {
      if (String(error.message || '').toLowerCase().includes('referral_code')) {
        continue;
      }
      throw new Error('User already exists');
    }
    throw new Error(error?.message || 'Could not create user');
  }
  throw new Error('Could not assign a unique referral code');
}

async function getUserById(id) {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('users').select('*').eq('id', id).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? rowToUser(data) : null;
}

async function updateUser(id, { name, email, password }) {
  const supabase = getSupabase();
  const patch = {};
  if (name !== undefined) patch.name = String(name).trim();
  if (email !== undefined) patch.email = String(email).toLowerCase().trim();
  if (password) patch.password = await bcrypt.hash(password, 10);

  const { data, error } = await supabase.from('users').update(patch).eq('id', id).select('*').single();
  if (error) throw new Error(error.message);
  return rowToUser(data);
}

async function incrementUserCreditsById(userId, delta) {
  const supabase = getSupabase();
  const { data: row, error: readErr } = await supabase.from('users').select('credits').eq('id', userId).maybeSingle();
  if (readErr) throw new Error(readErr.message);
  if (!row) return null;
  const { error } = await supabase.from('users').update({ credits: row.credits + delta }).eq('id', userId);
  if (error) throw new Error(error.message);
  return row.credits + delta;
}

module.exports = {
  findUserByEmail,
  findUserByReferralCode,
  createUser,
  getUserById,
  updateUser,
  incrementUserCreditsById,
  toPublicUser,
};
