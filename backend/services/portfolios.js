const { getSupabase } = require('../lib/supabase');
const { rowToPortfolio, toPortfolioRowInsert } = require('./serialize');

function isGuestId(id) {
  return String(id || '').startsWith('guest_');
}

async function listPortfolios(owner) {
  const supabase = getSupabase();
  const guest = isGuestId(owner._id);
  let q = supabase.from('portfolios').select('*').order('created_at', { ascending: false });
  q = guest ? q.eq('guest_id', owner._id) : q.eq('user_id', owner._id);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return (data || []).map(rowToPortfolio);
}

async function getPortfolioForOwner(id, owner) {
  const supabase = getSupabase();
  const guest = isGuestId(owner._id);
  let q = supabase.from('portfolios').select('*').eq('id', id);
  q = guest ? q.eq('guest_id', owner._id) : q.eq('user_id', owner._id);
  const { data, error } = await q.maybeSingle();
  if (error) throw new Error(error.message);
  return data ? rowToPortfolio(data) : null;
}

async function createPortfolio(owner, body) {
  const supabase = getSupabase();
  const guest = isGuestId(owner._id);
  const row = toPortfolioRowInsert({
    userId: guest ? null : owner._id,
    guestId: guest ? owner._id : null,
    title: body.title,
    template: body.template,
    resumeFile: body.resumeFile,
    data: body.data,
    status: body.status || 'draft',
  });
  const { data, error } = await supabase.from('portfolios').insert(row).select('*').single();
  if (error) throw new Error(error.message);
  return rowToPortfolio(data);
}

async function updatePortfolio(id, owner, body) {
  const existing = await getPortfolioForOwner(id, owner);
  if (!existing) return null;

  const patch = {};
  if (body.title !== undefined) patch.title = body.title;
  if (body.template !== undefined) patch.template = body.template;
  if (body.resumeFile !== undefined) patch.resume_file = body.resumeFile;
  if (body.data !== undefined) patch.data = body.data;
  if (body.status !== undefined) patch.status = body.status;
  if (body.slug !== undefined) patch.slug = body.slug;
  if (body.isLive !== undefined) patch.is_live = body.isLive;
  if (body.views !== undefined) patch.views = body.views;

  const supabase = getSupabase();
  const { data, error } = await supabase.from('portfolios').update(patch).eq('id', id).select('*').single();
  if (error) throw new Error(error.message);
  return rowToPortfolio(data);
}

async function deletePortfolio(id, owner) {
  const existing = await getPortfolioForOwner(id, owner);
  if (!existing) return null;
  const supabase = getSupabase();
  const { error } = await supabase.from('portfolios').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return existing;
}

async function getPublicLiveBySlug(slug) {
  const supabase = getSupabase();
  const { data: row, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('slug', slug)
    .eq('is_live', true)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!row) return null;

  const nextViews = (row.views || 0) + 1;
  const { error: upErr } = await supabase.from('portfolios').update({ views: nextViews }).eq('id', row.id);
  if (upErr) throw new Error(upErr.message);
  return rowToPortfolio({ ...row, views: nextViews });
}

async function findPortfolioBySlugOtherThan(slug, excludeId) {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('portfolios').select('id').eq('slug', slug).neq('id', excludeId).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

async function publishPortfolio(id, owner, slug) {
  const existing = await getPortfolioForOwner(id, owner);
  if (!existing) return null;
  const taken = await findPortfolioBySlugOtherThan(slug, id);
  if (taken) {
    const err = new Error('SLUG_TAKEN');
    err.code = 'SLUG_TAKEN';
    throw err;
  }
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('portfolios')
    .update({ is_live: true, slug, status: 'published' })
    .eq('id', id)
    .select('*')
    .single();
  if (error) {
    if (error.code === '23505') {
      const err = new Error('SLUG_TAKEN');
      err.code = 'SLUG_TAKEN';
      throw err;
    }
    throw new Error(error.message);
  }
  return rowToPortfolio(data);
}

async function unpublishPortfolio(id, owner) {
  const existing = await getPortfolioForOwner(id, owner);
  if (!existing) return null;
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('portfolios')
    .update({ is_live: false, status: 'draft' })
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return rowToPortfolio(data);
}

module.exports = {
  listPortfolios,
  getPortfolioForOwner,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPublicLiveBySlug,
  publishPortfolio,
  unpublishPortfolio,
};
