const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');

const PORT = process.env.PORT || 4747;
const CTRL_DIR = __dirname;
const MIGRATION_DIR = path.join(process.env.USERPROFILE, 'OneDrive', 'MRPRODUCTION-MIGRATION', '2026-07-17');
const GROK_BIN = path.join(MIGRATION_DIR, 'dot-grok', 'bin', 'grok.exe');
const CLAUDE_BIN = path.join(MIGRATION_DIR, 'dot-local', 'bin', 'claude.exe');

// MIME types
const mime = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon'
};

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mime[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404); res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

function runAgent(bin, args, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const proc = spawn(bin, args, {
      env: { ...process.env, FORCE_COLOR: '0', NO_COLOR: '1', GROK_NO_UPDATE_CHECK: '1', CLAUDE_NO_UPDATE_CHECK: '1' },
      timeout
    });
    let out = '', err = '';
    proc.stdout.on('data', d => out += d.toString());
    proc.stderr.on('data', d => err += d.toString());
    proc.on('close', code => {
      if (code !== 0 && !out) reject(new Error(err || `Process exited ${code}`));
      else resolve(out.trim());
    });
    proc.on('error', reject);
  });
}

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const url = req.url;

  // API routes
  if (url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, time: new Date().toISOString() }));
    return;
  }

  if (url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { message, model, provider } = JSON.parse(body);
        let reply = '';
        if (provider === 'grok') {
          reply = await runAgent(GROK_BIN, ['chat', '--model', model || 'grok-4.5', '--no-stream', message]);
        } else if (provider === 'claude') {
          reply = await runAgent(CLAUDE_BIN, ['-p', message]);
        } else if (provider === 'webui') {
          reply = 'Open WebUI is running on port 8890. Open it via the Open UI ↗ button.';
        } else if (provider === 'copilot') {
          reply = 'GitHub Copilot is active in your editor (VS Code). Use the Copilot chat panel there.';
        } else {
          reply = 'Unknown provider.';
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message, reply: 'Error: ' + e.message }));
      }
    });
    return;
  }

  if (url.startsWith('/api/system/') && req.method === 'POST') {
    const parts = url.split('/');
    const id = parts[3];
    const action = parts[4];
    if (action === 'start') {
      if (id === 'docker') {
        exec('start "" "C:\\Program Files\\Docker\\Docker\\Docker Desktop.exe"');
      } else if (id === 'open-webui-2') {
        const compose = path.join(MIGRATION_DIR, 'open-webui-2', 'docker-compose.yml');
        exec(`docker-compose -f "${compose}" up -d`);
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'starting' }));
    } else if (action === 'stop') {
      if (id === 'open-webui-2') {
        const compose = path.join(MIGRATION_DIR, 'open-webui-2', 'docker-compose.yml');
        exec(`docker-compose -f "${compose}" down`);
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'stopped' }));
    }
    return;
  }

  // Static files
  if (url === '/' || url === '/index.html') {
    serveFile(res, path.join(CTRL_DIR, 'control-plane.html'));
    return;
  }
  const filePath = path.join(CTRL_DIR, url);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    serveFile(res, filePath);
  } else {
    // Fallback to SPA
    serveFile(res, path.join(CTRL_DIR, 'control-plane.html'));
  }
});

server.listen(PORT, () => {
  console.log(`=================================================================`);
  console.log(`  🜁  AGENT CONTROL PLANE`);
  console.log(`=================================================================`);
  console.log(`  URL: http://127.0.0.1:${PORT}`);
  console.log(`  Grok:  ${GROK_BIN}`);
  console.log(`  Claude: ${CLAUDE_BIN}`);
  console.log(`=================================================================`);
});
