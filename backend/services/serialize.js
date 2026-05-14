const bcrypt = require('bcryptjs');

function rowToUser(row) {
  if (!row) return null;
  const password = row.password;
  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    email: row.email,
    password,
    credits: row.credits,
    referralCode: row.referral_code,
    referredBy: row.referred_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    matchPassword(enteredPassword) {
      return bcrypt.compare(enteredPassword, password);
    },
  };
}

function toPublicUser(user) {
  if (!user) return null;
  const { password, matchPassword, ...rest } = user;
  return rest;
}

function rowToPortfolio(row) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    user: row.user_id,
    guestId: row.guest_id,
    title: row.title,
    template: row.template,
    resumeFile: row.resume_file,
    status: row.status,
    slug: row.slug,
    isLive: row.is_live,
    views: row.views,
    data: row.data,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toPortfolioRowInsert({ userId, guestId, title, template, resumeFile, data, status }) {
  return {
    user_id: userId || null,
    guest_id: guestId || null,
    title: title || 'My Portfolio',
    template: template || 'modern',
    resume_file: resumeFile ?? null,
    data: data ?? {},
    status: status || 'draft',
  };
}

module.exports = { rowToUser, toPublicUser, rowToPortfolio, toPortfolioRowInsert };
