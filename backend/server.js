const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { buildAllowedOrigins } = require('./config/origins');
const { assertSupabaseEnv, getSupabase } = require('./lib/supabase');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && !process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET must be set when NODE_ENV=production');
  process.exit(1);
}

assertSupabaseEnv();

const app = express();

if (isProduction) {
  app.set('trust proxy', 1);
}

const allowedOrigins = buildAllowedOrigins();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (!isProduction) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.warn(`[CORS] Blocked origin: ${origin}. Set FRONTEND_URL, FRONTEND_URLS, or ALLOWED_ORIGINS on the API.`);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/portfolios', require('./routes/portfolios'));
app.use('/api/ai', require('./routes/ai'));

app.get('/api/health', async (req, res) => {
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('users').select('id').limit(1);
    const payload = {
      ok: true,
      database: error ? 'error' : 'connected',
      supabase: !error,
      uptime: process.uptime(),
    };
    if (error) {
      payload.errorMessage = error.message;
      payload.errorCode = error.code || '';
      payload.hint =
        'Render: set SUPABASE_URL (https://YOUR-REF.supabase.co, no /rest/v1/) and SUPABASE_SERVICE_ROLE_KEY (legacy service_role JWT eyJ...). Redeploy after saving env.';
    }
    res.json(payload);
  } catch (e) {
    res.status(503).json({ ok: false, database: 'error', message: e.message });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'PortfolioMaker API is running 🚀' });
});

const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('✅ Supabase configured');
    if (isProduction && allowedOrigins.length === 0) {
      console.warn('[CORS] No FRONTEND_URL / FRONTEND_URLS / ALLOWED_ORIGINS set — browser requests from your live site will be blocked.');
    }
  });
}

module.exports = app;
