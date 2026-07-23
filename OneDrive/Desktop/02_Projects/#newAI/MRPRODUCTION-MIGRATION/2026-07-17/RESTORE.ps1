# MRPRODUCTION Migration Restore
# Run on new laptop in a FRESH PowerShell window
# Usage:  Set-Location "C:\Users\<you>\OneDrive\MRPRODUCTION-MIGRATION\2026-07-17"
#         .\RESTORE.ps1

$ErrorActionPreference = "Stop"
$src = $PSScriptRoot
$home = $env:USERPROFILE

Write-Host ""
Write-Host "=== MRPRODUCTION MIGRATION RESTORE ===" -ForegroundColor Cyan
Write-Host "Source: $src" -ForegroundColor DarkGray
Write-Host "Target: $home" -ForegroundColor DarkGray
Write-Host ""

# 1. Grok
Write-Host "[1/8] Restoring .grok (Grok 4.5 + config + auth)..." -ForegroundColor Yellow
if (Test-Path "$src\dot-grok") {
    Copy-Item "$src\dot-grok" "$home\.grok" -Recurse -Force
    Write-Host "  OK" -ForegroundColor Green
} else { Write-Host "  SKIP - not in kit" -ForegroundColor Red }

# 2. Claude
Write-Host "[2/8] Restoring .claude (credentials + config)..." -ForegroundColor Yellow
if (Test-Path "$src\dot-claude") {
    Copy-Item "$src\dot-claude" "$home\.claude" -Recurse -Force
    Write-Host "  OK" -ForegroundColor Green
} else { Write-Host "  SKIP" -ForegroundColor Red }

# 3. .local/bin (claude.exe)
Write-Host "[3/8] Restoring .local (claude binary)..." -ForegroundColor Yellow
if (Test-Path "$src\dot-local") {
    Copy-Item "$src\dot-local" "$home\.local" -Recurse -Force
    Write-Host "  OK" -ForegroundColor Green
} else { Write-Host "  SKIP" -ForegroundColor Red }

# 4. .config
Write-Host "[4/8] Restoring .config (agent configs)..." -ForegroundColor Yellow
if (Test-Path "$src\dot-config") {
    Copy-Item "$src\dot-config" "$home\.config" -Recurse -Force
    Write-Host "  OK" -ForegroundColor Green
} else { Write-Host "  SKIP" -ForegroundColor Red }

# 5. Desktop launchers
Write-Host "[5/8] Restoring Desktop launchers..." -ForegroundColor Yellow
$desktop = "$home\Desktop"
if (-not (Test-Path $desktop)) { New-Item -ItemType Directory -Path $desktop -Force | Out-Null }
if (Test-Path "$src\desktop-launchers") {
    Get-ChildItem "$src\desktop-launchers" -Filter "*.bat" | ForEach-Object {
        Copy-Item $_.FullName "$desktop\$($_.Name)" -Force
    }
    Write-Host "  OK - $($((Get-ChildItem "$src\desktop-launchers" -Filter '*.bat').Count)) launchers" -ForegroundColor Green
} else { Write-Host "  SKIP" -ForegroundColor Red }

# 6. MRPRODUCTION estate (if not already there)
Write-Host "[6/8] Checking MRPRODUCTION estate..." -ForegroundColor Yellow
$mrp = "$home\MRPRODUCTION"
if (-not (Test-Path $mrp)) {
    Write-Host "  MRPRODUCTION not found - you need to copy the estate folder separately" -ForegroundColor Red
    Write-Host "  (it's too large for OneDrive - use external drive or git)" -ForegroundColor DarkGray
} else {
    # Restore desktop-suite
    if (Test-Path "$src\desktop-suite") {
        $suiteDest = "$mrp\tools\desktop-suite"
        if (-not (Test-Path "$mrp\tools")) { New-Item -ItemType Directory -Path "$mrp\tools" -Force | Out-Null }
        Copy-Item "$src\desktop-suite" $suiteDest -Recurse -Force
        Write-Host "  desktop-suite restored" -ForegroundColor Green
    }
    # Restore docs
    if (Test-Path "$src\docs") {
        Copy-Item "$src\docs" "$mrp\docs" -Recurse -Force
        Write-Host "  docs restored" -ForegroundColor Green
    }
    # Restore infrastructure
    if (Test-Path "$src\infrastructure") {
        Copy-Item "$src\infrastructure" "$mrp\infrastructure" -Recurse -Force
        Write-Host "  infrastructure restored" -ForegroundColor Green
    }
}

# 7. Open WebUI 2 (into MRPRODUCTION)
Write-Host "[7/8] Restoring Open WebUI 2 config..." -ForegroundColor Yellow
if (Test-Path "$src\open-webui-2") {
    $owuiDest = "$mrp\infrastructure\docker\open-webui-2"
    if (-not (Test-Path "$mrp\infrastructure\docker")) { New-Item -ItemType Directory -Path "$mrp\infrastructure\docker" -Force | Out-Null }
    Copy-Item "$src\open-webui-2" $owuiDest -Recurse -Force
    Write-Host "  OK" -ForegroundColor Green
} else { Write-Host "  SKIP" -ForegroundColor Red }

# 8. Raycast local data
Write-Host "[8/8] Restoring Raycast data..." -ForegroundColor Yellow
if (Test-Path "$src\raycast-local") {
    $rcDest = "$home\AppData\Local\Raycast"
    if (Test-Path $rcDest) {
        Write-Host "  Raycast already installed - merging data" -ForegroundColor DarkGray
    }
    Copy-Item "$src\raycast-local" $rcDest -Recurse -Force
    Write-Host "  OK" -ForegroundColor Green
} else { Write-Host "  SKIP" -ForegroundColor Red }

Write-Host ""
Write-Host "=== RESTORE COMPLETE ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor White
Write-Host "  1. Install Docker Desktop" -ForegroundColor White
Write-Host "  2. Install Raycast" -ForegroundColor White
Write-Host "  3. Desktop -> MULTI AGENT STACK.bat" -ForegroundColor White
Write-Host "  4. Browser -> http://127.0.0.1:8890" -ForegroundColor White
Write-Host ""
Write-Host "VERIFY:" -ForegroundColor White
Write-Host "  grok --version    (should show 0.2.x)" -ForegroundColor DarkGray
Write-Host "  claude --version  (should show 2.1.x)" -ForegroundColor DarkGray
Write-Host ""
