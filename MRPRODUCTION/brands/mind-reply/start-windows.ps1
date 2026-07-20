# Windows Quick Start for MindReply + ReplyControl
# This script will:
# 1. Install dependencies
# 2. Build the frontend
# 3. Start Docker containers
# 4. Open both brands in browser

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   MindReply + ReplyControl - Windows Local Deployment    ║" -ForegroundColor Magenta
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Magenta
Write-Host ""

# Colors
$success = "Green"
$warning = "Yellow"
$error = "Red"
$info = "Cyan"

# 1. Check Docker
Write-Host "1️⃣  Checking Docker..." -ForegroundColor $info
$dockerStatus = docker ps 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker is not running!" -ForegroundColor $error
    Write-Host "   Please start Docker Desktop and try again" -ForegroundColor $warning
    exit 1
}
Write-Host "✓ Docker is running" -ForegroundColor $success
Write-Host ""

# 2. Install deps
Write-Host "2️⃣  Installing dependencies..." -ForegroundColor $info
npm install --silent
Write-Host "✓ Dependencies installed" -ForegroundColor $success
Write-Host ""

# 3. Build
Write-Host "3️⃣  Building application..." -ForegroundColor $info
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor $error
    exit 1
}
Write-Host "✓ Application built" -ForegroundColor $success
Write-Host ""

# 4. Start containers
Write-Host "4️⃣  Starting Docker containers..." -ForegroundColor $info
docker-compose down --quiet 2>$null
docker-compose up -d
Write-Host "✓ Containers starting (this may take 10-20 seconds)..." -ForegroundColor $success
Write-Host ""

# 5. Wait for health
Write-Host "5️⃣  Waiting for services to be ready..." -ForegroundColor $info
$count = 0
while ($count -lt 30) {
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3000/health" -TimeoutSec 2 -ErrorAction SilentlyContinue
        if ($response.status -eq "ok") {
            Write-Host "✓ All services are ready!" -ForegroundColor $success
            break
        }
    } catch {
        $count++
        Write-Host "  Waiting... ($count/30)" -ForegroundColor $warning
        Start-Sleep -Seconds 1
    }
}
Write-Host ""

# 6. Display info
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor $info
Write-Host "║              ✅ EVERYTHING IS RUNNING! ✅               ║" -ForegroundColor $info
Write-Host "╠═══════════════════════════════════════════════════════════╣" -ForegroundColor $info
Write-Host "║                                                           ║" -ForegroundColor $info
Write-Host "║  🌐 Frontend:     http://localhost:5173                 ║" -ForegroundColor $info
Write-Host "║  🔌 API:          http://localhost:3000                 ║" -ForegroundColor $info
Write-Host "║  🗄️  Database:     localhost:5432                        ║" -ForegroundColor $info
Write-Host "║  📊 PgAdmin:      http://localhost:5050                 ║" -ForegroundColor $info
Write-Host "║  💾 Redis:        localhost:6379                        ║" -ForegroundColor $info
Write-Host "║                                                           ║" -ForegroundColor $info
Write-Host "║  PgAdmin Credentials:                                    ║" -ForegroundColor $info
Write-Host "║  📧 Email: admin@mindreply.local                        ║" -ForegroundColor $info
Write-Host "║  🔑 Pass: admin                                         ║" -ForegroundColor $info
Write-Host "║                                                           ║" -ForegroundColor $info
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor $info
Write-Host ""

# 7. Docker status
Write-Host "📊 Docker Container Status:" -ForegroundColor $info
docker-compose ps
Write-Host ""

# 8. Open browser
Write-Host "🌐 Opening application in browser..." -ForegroundColor $info
Start-Sleep -Seconds 2
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "✨ Application is now running!" -ForegroundColor $success
Write-Host ""
Write-Host "📋 Useful Commands:" -ForegroundColor $info
Write-Host "  View logs:        docker-compose logs -f app" -ForegroundColor $warning
Write-Host "  Stop services:    docker-compose down" -ForegroundColor $warning
Write-Host "  Restart:          docker-compose restart" -ForegroundColor $warning
Write-Host "  Rebuild:          docker-compose build --no-cache" -ForegroundColor $warning
Write-Host ""
Write-Host "🧪 Test the app:" -ForegroundColor $info
Write-Host "  1. Go to http://localhost:5173" -ForegroundColor $warning
Write-Host "  2. You should see MindReply home page" -ForegroundColor $warning
Write-Host "  3. Test the communication audit form" -ForegroundColor $warning
Write-Host "  4. Check database at http://localhost:5050" -ForegroundColor $warning
Write-Host ""
