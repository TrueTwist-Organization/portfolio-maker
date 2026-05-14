/** Public API origin — no trailing slash. Required in production (Vercel env). */
const raw = import.meta.env.VITE_API_URL || ''
export const API_BASE_URL = raw.replace(/\/+$/, '')

export const AI_API_BASE = `${API_BASE_URL}/api/ai`
