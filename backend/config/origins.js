/**
 * Builds the allow-list for CORS. Trims whitespace and strips trailing slashes
 * so https://app.vercel.app/ matches the browser Origin header.
 */
function normalizeOrigin(value) {
  if (!value || typeof value !== 'string') return '';
  return value.trim().replace(/\/$/, '');
}

function splitOrigins(csv) {
  if (!csv || typeof csv !== 'string') return [];
  return csv
    .split(',')
    .map((s) => normalizeOrigin(s))
    .filter(Boolean);
}

function buildAllowedOrigins() {
  const isProd = process.env.NODE_ENV === 'production';

  const localDefaults = isProd
    ? []
    : [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174',
        'http://127.0.0.1:5175',
      ];

  const explicit = splitOrigins(process.env.ALLOWED_ORIGINS);
  const extras = splitOrigins(process.env.FRONTEND_URLS);
  const primary = normalizeOrigin(process.env.FRONTEND_URL);

  const merged = [...localDefaults, ...explicit, ...extras];
  if (primary) merged.push(primary);

  return [...new Set(merged)];
}

module.exports = { buildAllowedOrigins };
