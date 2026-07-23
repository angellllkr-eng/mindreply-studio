# ============================================================
# MRPRODUCTION — RESTORE ALL TO DESKTOP
# Run on NEW laptop in a FRESH PowerShell window
# Usage:  Set-Location "$env:USERPROFILE\OneDrive\MRPRODUCTION-MIGRATION\2026-07-17"
#         .\RESTORE-ALL-DESKTOP.ps1
# ============================================================

$ErrorActionPreference = "Continue"
$src = $PSScriptRoot
$home = $env:USERPROFILE
$desktop = "$home\Desktop"
$shell = New-Object -ComObject WScript.Shell

Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "  ║    MRPRODUCTION — FULL DESKTOP RESTORE           ║" -ForegroundColor Cyan
Write-Host "  ║    All apps · icons · organized · ready          ║" -ForegroundColor Cyan
Write-Host "  ╚══════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# --- 1. Restore agent configs ---
Write-Host "[1/7] Restoring Grok 4.5 config..." -ForegroundColor Yellow
if (Test-Path "$src\dot-grok") { Copy-Item "$src\dot-grok" "$home\.grok" -Recurse -Force; Write-Host "  OK" -ForegroundColor Green }

Write-Host "[2/7] Restoring Claude Opus config..." -ForegroundColor Yellow
if (Test-Path "$src\dot-claude") { Copy-Item "$src\dot-claude" "$home\.claude" -Recurse -Force; Write-Host "  OK" -ForegroundColor Green }

Write-Host "[3/7] Restoring .local (claude binary)..." -ForegroundColor Yellow
if (Test-Path "$src\dot-local") { Copy-Item "$src\dot-local" "$home\.local" -Recurse -Force; Write-Host "  OK" -ForegroundColor Green }

Write-Host "[4/7] Restoring .config (agent configs)..." -ForegroundColor Yellow
if (Test-Path "$src\dot-config") { Copy-Item "$src\dot-config" "$home\.config" -Recurse -Force; Write-Host "  OK" -ForegroundColor Green }

# --- 5. Restore SuperGrok UI ---
Write-Host "[5/7] Restoring SuperGrok Heavy UI..." -ForegroundColor Yellow
$sgSrc = "$src\super-grok\grok-ui"
$sgDst = "$home\MRPRODUCTION\tools\super-grok\grok-ui"
if (Test-Path $sgSrc) {
  if (-not (Test-Path "$home\MRPRODUCTION\tools\super-grok")) { New-Item -ItemType Directory -Path "$home\MRPRODUCTION\tools\super-grok" -Force | Out-Null }
  Copy-Item $sgSrc $sgDst -Recurse -Force
  Write-Host "  OK — SuperGrok UI at $sgDst" -ForegroundColor Green
}

# --- 6. Restore desktop launchers ---
Write-Host "[6/7] Creating desktop shortcuts with icons..." -ForegroundColor Yellow

# SuperGrok Heavy UI
if (Test-Path "$sgDst\Start-Grok-UI.bat") {
  $lnk = $shell.CreateShortcut("$desktop\SuperGrok Heavy UI.lnk")
  $lnk.TargetPath = "$sgDst\Start-Grok-UI.bat"
  $lnk.WorkingDirectory = $sgDst
  $lnk.IconLocation = "C:\Windows\System32\shell32.dll,14"
  $lnk.Description = "SuperGrok Heavy UI — Grok 4.5 + Claude Opus Control Plane"
  $lnk.Save()
  Write-Host "  ⚡ SuperGrok Heavy UI" -ForegroundColor Green
}

# Grok 4.5 CLI
if (Test-Path "$src\desktop-launchers\Grok 4.5.bat") {
  Copy-Item "$src\desktop-launchers\Grok 4.5.bat" "$desktop\Grok 4.5.bat" -Force
  $lnk = $shell.CreateShortcut("$desktop\Grok 4.5.lnk")
  $lnk.TargetPath = "$desktop\Grok 4.5.bat"
  $lnk.IconLocation = "C:\Windows\System32\shell32.dll,13"
  $lnk.Description = "Grok 4.5 CLI — open mode, no boundaries"
  $lnk.Save()
  Write-Host "  ⚡ Grok 4.5 CLI" -ForegroundColor Green
}

# Claude Opus
if (Test-Path "$src\desktop-launchers\Claude Opus.bat") {
  Copy-Item "$src\desktop-launchers\Claude Opus.bat" "$desktop\Claude Opus.bat" -Force
  $lnk = $shell.CreateShortcut("$desktop\Claude Opus.lnk")
  $lnk.TargetPath = "$desktop\Claude Opus.bat"
  $lnk.IconLocation = "C:\Windows\System32\shell32.dll,12"
  $lnk.Description = "Claude Opus — open mode, no boundaries"
  $lnk.Save()
  Write-Host "  🧠 Claude Opus" -ForegroundColor Green
}

# MULTI AGENT STACK
if (Test-Path "$src\desktop-launchers\MULTI AGENT STACK.bat") {
  Copy-Item "$src\desktop-launchers\MULTI AGENT STACK.bat" "$desktop\MULTI AGENT STACK.bat" -Force
  $lnk = $shell.CreateShortcut("$desktop\MULTI AGENT STACK.lnk")
  $lnk.TargetPath = "$desktop\MULTI AGENT STACK.bat"
  $lnk.IconLocation = "C:\Windows\System32\shell32.dll,19"
  $lnk.Description = "Parallel: Docker + Open WebUI + Grok + Claude"
  $lnk.Save()
  Write-Host "  🔥 MULTI AGENT STACK" -ForegroundColor Green
}

# Open WebUI 2
if (Test-Path "$src\desktop-launchers\Open WebUI 2.bat") {
  Copy-Item "$src\desktop-launchers\Open WebUI 2.bat" "$desktop\Open WebUI 2.bat" -Force
  $lnk = $shell.CreateShortcut("$desktop\Open WebUI 2.lnk")
  $lnk.TargetPath = "$desktop\Open WebUI 2.bat"
  $lnk.IconLocation = "C:\Windows\System32\shell32.dll,15"
  $lnk.Description = "Open WebUI #2 → http://127.0.0.1:8890"
  $lnk.Save()
  Write-Host "  🌐 Open WebUI 2" -ForegroundColor Green
}

# MRPRODUCTION Control
if (Test-Path "$src\desktop-launchers\MRPRODUCTION Control.bat") {
  Copy-Item "$src\desktop-launchers\MRPRODUCTION Control.bat" "$desktop\MRPRODUCTION Control.bat" -Force
  $lnk = $shell.CreateShortcut("$desktop\MRPRODUCTION Control.lnk")
  $lnk.TargetPath = "$desktop\MRPRODUCTION Control.bat"
  $lnk.IconLocation = "C:\Windows\System32\shell32.dll,21"
  $lnk.Description = "MRPRODUCTION Estate Control — Brands / Work / Speed"
  $lnk.Save()
  Write-Host "  🎛 MRPRODUCTION Control" -ForegroundColor Green
}

# --- 7. Start Menu folder ---
Write-Host "[7/7] Creating Start Menu entries..." -ForegroundColor Yellow
$startMenu = "$home\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\MRPRODUCTION"
if (-not (Test-Path $startMenu)) { New-Item -ItemType Directory -Path $startMenu -Force | Out-Null }

$shortcuts = @(
  @{Name="SuperGrok Heavy UI"; Target="$sgDst\Start-Grok-UI.bat"; Icon="shell32.dll,14"},
  @{Name="Grok 4.5"; Target="$desktop\Grok 4.5.bat"; Icon="shell32.dll,13"},
  @{Name="Claude Opus"; Target="$desktop\Claude Opus.bat"; Icon="shell32.dll,12"},
  @{Name="MULTI AGENT STACK"; Target="$desktop\MULTI AGENT STACK.bat"; Icon="shell32.dll,19"},
  @{Name="Open WebUI 2"; Target="$desktop\Open WebUI 2.bat"; Icon="shell32.dll,15"},
  @{Name="MRPRODUCTION Control"; Target="$desktop\MRPRODUCTION Control.bat"; Icon="shell32.dll,21"}
)

foreach ($s in $shortcuts) {
  if (Test-Path $s.Target) {
    $lnk = $shell.CreateShortcut("$startMenu\$($s.Name).lnk")
    $lnk.TargetPath = $s.Target
    $lnk.IconLocation = "C:\Windows\System32\$($s.Icon)"
    $lnk.Save()
  }
}
Write-Host "  Start Menu → MRPRODUCTION folder created" -ForegroundColor Green

# --- Done ---
Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "  ║    RESTORE COMPLETE                              ║" -ForegroundColor Cyan
Write-Host "  ╚══════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "  DESKTOP SHORTCUTS:" -ForegroundColor White
Write-Host "    ⚡ SuperGrok Heavy UI    → http://127.0.0.1:4748" -ForegroundColor White
Write-Host "    ⚡ Grok 4.5             → CLI open mode" -ForegroundColor White
Write-Host "    🧠 Claude Opus         → CLI open mode" -ForegroundColor White
Write-Host "    🔥 MULTI AGENT STACK    → all engines parallel" -ForegroundColor White
Write-Host "    🌐 Open WebUI 2         → http://127.0.0.1:8890" -ForegroundColor White
Write-Host "    🎛 MRPRODUCTION Control → estate operator" -ForegroundColor White
Write-Host ""
Write-Host "  START MENU → MRPRODUCTION → all shortcuts" -ForegroundColor White
Write-Host ""
Write-Host "  NEXT STEPS:" -ForegroundColor Yellow
Write-Host "    1. Install Node.js (nodejs.org)" -ForegroundColor White
Write-Host "    2. Install Docker Desktop" -ForegroundColor White
Write-Host "    3. Install Raycast" -ForegroundColor White
Write-Host "    4. Double-click SuperGrok Heavy UI" -ForegroundColor White
Write-Host "    5. npm install in grok-ui folder (first run)" -ForegroundColor White
Write-Host ""
Write-Host "  If Grok/Claude auth expired:" -ForegroundColor DarkGray
Write-Host "    grok login" -ForegroundColor DarkGray
Write-Host "    claude (sign in prompt)" -ForegroundColor DarkGray
Write-Host ""
