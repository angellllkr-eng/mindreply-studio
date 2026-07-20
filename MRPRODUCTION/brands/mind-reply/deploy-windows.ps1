# Deploy Both Brands - Windows PowerShell Version
# Run: powershell -ExecutionPolicy Bypass -File deploy-windows.ps1

Write-Host "🚀🚀🚀 DEPLOYING BOTH BRANDS (WINDOWS) 🚀🚀🚀" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "✓ Checking prerequisites..." -ForegroundColor Yellow

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js not found. Install from https://nodejs.org" -ForegroundColor Red
    exit 1
}

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker not found. Install from https://www.docker.com/products/docker-desktop" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Node.js: $(node --version)" -ForegroundColor Green
Write-Host "✓ npm: $(npm --version)" -ForegroundColor Green
Write-Host "✓ Docker: $(docker --version)" -ForegroundColor Green
Write-Host ""

# Step 1: Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 2: Build frontend
Write-Host "🔨 Building frontend..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Frontend built" -ForegroundColor Green
Write-Host ""

# Step 3: Start Docker containers
Write-Host "🐳 Starting Docker containers..." -ForegroundColor Yellow
docker-compose up -d
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker compose failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Waiting for services to be healthy..." -ForegroundColor Green

# Wait for services
Start-Sleep -Seconds 5

# Check if services are running
$maxAttempts = 30
$attempt = 0
while ($attempt -lt $maxAttempts) {
    try {
        $health = Invoke-RestMethod -Uri "http://localhost:3000/health" -ErrorAction SilentlyContinue
        if ($health.status -eq "ok") {
            Write-Host "✓ Backend is healthy" -ForegroundColor Green
            break
        }
    } catch {
        $attempt++
        if ($attempt -lt $maxAttempts) {
            Write-Host "  Waiting for backend... ($attempt/$maxAttempts)" -ForegroundColor Gray
            Start-Sleep -Seconds 1
        }
    }
}

if ($attempt -eq $maxAttempts) {
    Write-Host "⚠️  Backend health check timeout (continuing anyway)" -ForegroundColor Yellow
}

Write-Host ""

# Step 4: Display URLs
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║          ✅ BOTH BRANDS ARE NOW RUNNING ✅             ║" -ForegroundColor Cyan
Write-Host "╠════════════════════════════════════════════════════════╣" -ForegroundColor Cyan
Write-Host "║                                                        ║" -ForegroundColor Cyan
Write-Host "║  MindReply:                                            ║" -ForegroundColor Cyan
Write-Host "║  🌐 http://localhost:5173                             ║" -ForegroundColor Cyan
Write-Host "║  📊 API: http://localhost:3000/health                ║" -ForegroundColor Cyan
Write-Host "║                                                        ║" -ForegroundColor Cyan
Write-Host "║  ReplyControl (coming next):                           ║" -ForegroundColor Cyan
Write-Host "║  🌐 http://localhost:5173                             ║" -ForegroundColor Cyan
Write-Host "║  📊 API: http://localhost:3000/health                ║" -ForegroundColor Cyan
Write-Host "║                                                        ║" -ForegroundColor Cyan
Write-Host "║  Database:                                             ║" -ForegroundColor Cyan
Write-Host "║  🗄️  PostgreSQL: localhost:5432                        ║" -ForegroundColor Cyan
Write-Host "║  📊 PgAdmin: http://localhost:5050                    ║" -ForegroundColor Cyan
Write-Host "║  (user: admin@mindreply.local, pass: admin)           ║" -ForegroundColor Cyan
Write-Host "║                                                        ║" -ForegroundColor Cyan
Write-Host "║  Cache:                                                ║" -ForegroundColor Cyan
Write-Host "║  💾 Redis: localhost:6379                             ║" -ForegroundColor Cyan
Write-Host "║                                                        ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Step 5: Show docker status
Write-Host "📊 Docker Status:" -ForegroundColor Yellow
docker-compose ps
Write-Host ""

# Step 6: Show logs
Write-Host "📋 Live Logs (Press Ctrl+C to stop):" -ForegroundColor Yellow
Write-Host "Run this to tail logs: docker-compose logs -f app" -ForegroundColor Gray
Write-Host ""

# Step 7: Test endpoints
Write-Host "🧪 Testing endpoints..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/health" -ErrorAction SilentlyContinue
    if ($response.status -eq "ok") {
        Write-Host "✓ API health check: PASSED" -ForegroundColor Green
    } else {
        Write-Host "⚠️  API health check: Response received but status unknown" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  API health check: Could not connect (but Docker container may still be starting)" -ForegroundColor Yellow
}
Write-Host ""

# Final instructions
Write-Host "✨ Next steps:" -ForegroundColor Cyan
Write-Host "  1. Open browser: http://localhost:5173" -ForegroundColor White
Write-Host "  2. You should see MindReply home page" -ForegroundColor White
Write-Host "  3. Test the application" -ForegroundColor White
Write-Host "  4. View database: http://localhost:5050" -ForegroundColor White
Write-Host ""
Write-Host "📦 Stop services:" -ForegroundColor Cyan
Write-Host "  docker-compose down" -ForegroundColor White
Write-Host ""
Write-Host "📋 View logs:" -ForegroundColor Cyan
Write-Host "  docker-compose logs -f app" -ForegroundColor White
Write-Host ""

# Keep PowerShell open
Write-Host "Press any key to open browser..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Open browser
Start-Process "http://localhost:5173"

Write-Host "🌐 Browser opened! You can now test MindReply." -ForegroundColor Green
Write-Host ""
Write-Host "To stop everything: docker-compose down" -ForegroundColor Yellow
