import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Render / Cloud Health Check
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static assets from dist
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
      // Don't cache index.html so updates are immediate
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  }));

  // SPA client-side fallback
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.status(503).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Build Required</title></head>
        <body style="font-family:sans-serif;background:#050505;color:#F5F3EF;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
          <div style="text-align:center;padding:2rem;border:1px solid #333;border-radius:12px;background:#111;">
            <h2 style="color:#C6A76A;">OSOOL Luxury Watches</h2>
            <p>Application build directory not found. Please run <code>npm run build</code> first.</p>
          </div>
        </body>
      </html>
    `);
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`OSOOL production server is running on http://0.0.0.0:${PORT}`);
});
