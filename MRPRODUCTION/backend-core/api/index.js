// Vercel serverless entry — re-exports the express app
import app from '../src/index.js';
export default async function handler(req, res) {
  // Vercel passes (req, res) compatible with express via @vercel/node
  return app(req, res);
}
