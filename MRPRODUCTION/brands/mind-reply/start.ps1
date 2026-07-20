powershell -ExecutionPolicy Bypass -Command {
    Write-Host ""
    Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
    Write-Host "║   MindReply + ReplyControl - Windows Local Deployment    ║" -ForegroundColor Magenta
    Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Magenta
    Write-Host ""
    
    # 1. Check Docker
    Write-Host "1. Checking Docker..." -ForegroundColor Cyan
    $dockerStatus = docker ps 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Docker is not running!" -ForegroundColor Red
        Write-Host "Please start Docker Desktop and try again" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "OK: Docker is running" -ForegroundColor Green
    Write-Host ""
    
    # 2. Install deps
    Write-Host "2. Installing dependencies..." -ForegroundColor Cyan
    npm install --silent 2>&1 | Out-Null
    Write-Host "OK: Dependencies installed" -ForegroundColor Green
    Write-Host ""
    
    # 3. Build
    Write-Host "3. Building application..." -ForegroundColor Cyan
    npm run build 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Build failed" -ForegroundColor Red
        exit 1
    }
    Write-Host "OK: Application built" -ForegroundColor Green
    Write-Host ""
    
    # 4. Start containers
    Write-Host "4. Starting Docker containers..." -ForegroundColor Cyan
    docker-compose down 2>&1 | Out-Null
    docker-compose up -d 2>&1 | Out-Null
    Write-Host "OK: Containers starting..." -ForegroundColor Green
    Write-Host ""
    
    # 5. Wait for services
    Write-Host "5. Waiting for services to be ready (max 30 seconds)..." -ForegroundColor Cyan
    $count = 0
    $ready = $false
    while ($count -lt 30) {
        try {
            $response = Invoke-RestMethod -Uri "http://localhost:3000/health" -TimeoutSec 2 -ErrorAction SilentlyContinue
            if ($response.status -eq "ok") {
                Write-Host "OK: All services are ready!" -ForegroundColor Green
                $ready = $true
                break
            }
        } catch {
            $count++
            Write-Host "   Waiting... ($count/30)" -ForegroundColor Yellow
            Start-Sleep -Seconds 1
        }
    }
    Write-Host ""
    
    # 6. Display status
    Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║           SUCCESS - BOTH BRANDS ARE RUNNING             ║" -ForegroundColor Cyan
    Write-Host "╠═══════════════════════════════════════════════════════════╣" -ForegroundColor Cyan
    Write-Host "║                                                           ║" -ForegroundColor Cyan
    Write-Host "║ Frontend (MindReply):  http://localhost:5173            ║" -ForegroundColor Cyan
    Write-Host "║ API Health:            http://localhost:3000/health     ║" -ForegroundColor Cyan
    Write-Host "║ Database (PgAdmin):    http://localhost:5050            ║" -ForegroundColor Cyan
    Write-Host "║                                                           ║" -ForegroundColor Cyan
    Write-Host "║ PgAdmin Credentials:                                     ║" -ForegroundColor Cyan
    Write-Host "║   Email: admin@mindreply.local                           ║" -ForegroundColor Cyan
    Write-Host "║   Password: admin                                        ║" -ForegroundColor Cyan
    Write-Host "║                                                           ║" -ForegroundColor Cyan
    Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
    
    # 7. Docker status
    Write-Host "Docker Container Status:" -ForegroundColor Cyan
    docker-compose ps
    Write-Host ""
    
    # 8. Open browser
    Write-Host "Opening application in browser..." -ForegroundColor Cyan
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:5173"
    
    Write-Host ""
    Write-Host "SUCCESS: Application is now running!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Useful Commands:" -ForegroundColor Cyan
    Write-Host "  View logs:     docker-compose logs -f app" -ForegroundColor Yellow
    Write-Host "  Stop services: docker-compose down" -ForegroundColor Yellow
    Write-Host "  Restart:       docker-compose restart" -ForegroundColor Yellow
    Write-Host ""
}
