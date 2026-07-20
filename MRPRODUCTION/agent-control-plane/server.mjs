import http from 'http'
import { spawn, exec } from 'child_process'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.ACP_PORT || process.env.PORT || 4747)
const HOME = process.env.USERPROFILE || process.env.HOME || ''
const ROOT = path.join(HOME, 'MRPRODUCTION')

function firstExisting(paths) {
  for (const p of paths) {
    if (p && fs.existsSync(p)) return p
  }
  return null
}

const GROK_BIN = firstExisting([
  path.join(HOME, '.grok', 'bin', 'grok.exe'),
  path.join(HOME, 'OneDrive', 'MRPRODUCTION-MIGRATION', '2026-07-17', 'dot-grok', 'bin', 'grok.exe'),
  path.join(HOME, 'OneDrive', 'LAPTOP-MIGRATION-2026-07-17', '02-GROK', 'bin', 'grok.exe')
])

const CLAUDE_BIN = firstExisting([
  path.join(HOME, 'AppData', 'Roaming', 'npm', 'claude.cmd'),
  path.join(HOME, 'AppData', 'Roaming', 'npm', 'claude'),
  path.join(HOME, '.local', 'bin', 'claude.exe'),
  path.join(HOME, 'AppData', 'Local', 'Programs', 'claude', 'claude.exe'),
  path.join(HOME, 'OneDrive', 'MRPRODUCTION-MIGRATION', '2026-07-17', 'dot-local', 'bin', 'claude.exe')
])

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
}

function run(bin, args, timeoutMs = 120000) {
  return new Promise((resolve, reject) => {
    if (!bin) return reject(new Error('Binary not found'))
    const proc = spawn(bin, args, {
      env: {
        ...process.env,
        FORCE_COLOR: '0',
        NO_COLOR: '1',
        GROK_NO_UPDATE_CHECK: '1',
        CLAUDE_NO_UPDATE_CHECK: '1'
      },
      windowsHide: true,
      cwd: ROOT
    })
    let out = ''
    let err = ''
    const t = setTimeout(() => {
      try { proc.kill() } catch {}
      reject(new Error('Timeout'))
    }, timeoutMs)
    proc.stdout.on('data', (d) => { out += d.toString() })
    proc.stderr.on('data', (d) => { err += d.toString() })
    proc.on('error', (e) => { clearTimeout(t); reject(e) })
    proc.on('close', (code) => {
      clearTimeout(t)
      if (code !== 0 && !out.trim()) reject(new Error(err.trim() || `exit ${code}`))
      else resolve((out || err).trim())
    })
  })
}

async function chatGrok(message, model = 'grok-4.5') {
  if (!GROK_BIN) throw new Error('Grok CLI missing at ~/.grok/bin/grok.exe')
  const raw = await run(GROK_BIN, [
    '-p', message,
    '-m', model,
    '--cwd', ROOT,
    '--output-format', 'json',
    '--always-approve',
    '--permission-mode', 'bypassPermissions'
  ])
  try {
    const data = JSON.parse(raw)
    return data.text || data.message || raw
  } catch {
    return raw
  }
}

async function chatClaude(message) {
  if (!CLAUDE_BIN) {
    throw new Error('Claude CLI missing. Install: npm i -g @anthropic-ai/claude-code then claude login')
  }
  return run(CLAUDE_BIN, [
    '-p', message,
    '--model', 'opus',
    '--permission-mode', 'bypassPermissions',
    '--dangerously-skip-permissions',
    '--allowedTools', 'Read,Write,Edit,Bash,Glob,Grep'
  ].filter(Boolean), 180000)
}

function sendJson(res, code, obj) {
  const body = JSON.stringify(obj)
  res.writeHead(code, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  })
  res.end(body)
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase()
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.end('Not found')
      return
    }
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' })
    res.end(data)
  })
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
    res.end()
    return
  }

  const url = new URL(req.url || '/', `http://127.0.0.1:${PORT}`)
  const p = url.pathname

  if (p === '/api/health') {
    return sendJson(res, 200, {
      ok: true,
      url: `http://127.0.0.1:${PORT}/aichat`,
      grok: !!GROK_BIN,
      claude: !!CLAUDE_BIN,
      grokPath: GROK_BIN,
      claudePath: CLAUDE_BIN,
      time: new Date().toISOString()
    })
  }

  if (p === '/api/chat' && req.method === 'POST') {
    let body = ''
    req.on('data', (c) => { body += c })
    req.on('end', async () => {
      try {
        const { message, model, provider } = JSON.parse(body || '{}')
        if (!message?.trim()) return sendJson(res, 400, { error: 'message required', reply: 'message required' })
        let reply = ''
        if (provider === 'claude' || model?.includes('claude') || model?.includes('opus')) {
          reply = await chatClaude(message)
        } else if (provider === 'webui') {
          reply = 'Open WebUI #2 target: http://127.0.0.1:8890 — start Docker + Open WebUI 2 from Systems tab.'
        } else if (provider === 'copilot') {
          reply = 'GitHub Copilot runs in VS Code / Cursor. Use the editor chat panel.'
        } else {
          reply = await chatGrok(message, model || 'grok-4.5')
        }
        sendJson(res, 200, { reply, model: model || 'grok-4.5', provider: provider || 'grok' })
      } catch (e) {
        sendJson(res, 500, { error: e.message, reply: 'Error: ' + e.message })
      }
    })
    return
  }

  if (p.startsWith('/api/system/') && req.method === 'POST') {
    const parts = p.split('/')
    const id = parts[3]
    const action = parts[4]
    if (action === 'start') {
      if (id === 'docker') {
        exec('start "" "C:\\Program Files\\Docker\\Docker\\Docker Desktop.exe"')
      } else if (id === 'open-webui-2') {
        const compose = path.join(ROOT, 'infrastructure', 'docker', 'open-webui-2', 'docker-compose.yml')
        if (fs.existsSync(compose)) exec(`docker compose -f "${compose}" up -d`)
      } else if (id === 'grok-cli' && GROK_BIN) {
        spawn(GROK_BIN, ['--cwd', ROOT, '--model', 'grok-4.5', '--always-approve', '--permission-mode', 'bypassPermissions'], {
          detached: true,
          stdio: 'ignore',
          cwd: ROOT
        }).unref()
      } else if (id === 'claude-cli' && CLAUDE_BIN) {
        spawn(CLAUDE_BIN, ['--model', 'opus', '--permission-mode', 'bypassPermissions', '--dangerously-skip-permissions'], {
          detached: true,
          stdio: 'ignore',
          cwd: ROOT
        }).unref()
      }
      return sendJson(res, 200, { status: 'starting', id })
    }
    if (action === 'stop' && id === 'open-webui-2') {
      const compose = path.join(ROOT, 'infrastructure', 'docker', 'open-webui-2', 'docker-compose.yml')
      if (fs.existsSync(compose)) exec(`docker compose -f "${compose}" down`)
      return sendJson(res, 200, { status: 'stopped', id })
    }
    return sendJson(res, 200, { status: 'ok', id })
  }

  // /aichat and / → SPA
  if (p === '/' || p === '/aichat' || p === '/aichat/' || p === '/index.html') {
    const dist = path.join(__dirname, 'dist', 'index.html')
    const srcIndex = path.join(__dirname, 'index.html')
    if (fs.existsSync(dist)) return serveFile(res, dist)
    return serveFile(res, srcIndex)
  }

  // static from dist or root
  const candidates = [
    path.join(__dirname, 'dist', p.replace(/^\//, '')),
    path.join(__dirname, p.replace(/^\//, ''))
  ]
  for (const fp of candidates) {
    if (fs.existsSync(fp) && fs.statSync(fp).isFile()) return serveFile(res, fp)
  }

  // SPA fallback for /aichat/*
  if (p.startsWith('/aichat')) {
    const dist = path.join(__dirname, 'dist', 'index.html')
    if (fs.existsSync(dist)) return serveFile(res, dist)
    return serveFile(res, path.join(__dirname, 'index.html'))
  }

  res.writeHead(404)
  res.end('Not found')
})

server.listen(PORT, '127.0.0.1', () => {
  console.log('=================================================================')
  console.log('  AI CHAT / AGENT CONTROL PLANE')
  console.log('=================================================================')
  console.log(`  URL:    http://127.0.0.1:${PORT}/aichat`)
  console.log(`  Health: http://127.0.0.1:${PORT}/api/health`)
  console.log(`  Grok:   ${GROK_BIN || 'MISSING'}`)
  console.log(`  Claude: ${CLAUDE_BIN || 'MISSING — npm i -g @anthropic-ai/claude-code'}`)
  console.log('=================================================================')
})
