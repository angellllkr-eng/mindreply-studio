#!/usr/bin/env pwsh

# MindReply Shell — Automated Cloudflare Deployment
# Run: .\deploy-shell.ps1

Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  MindReply Shell Deployment Script     ║" -ForegroundColor Cyan
Write-Host "║  Deploying to Cloudflare Pages         ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Step 1: Navigate to shell directory
Write-Host "📁 Navigating to shell directory..." -ForegroundColor Yellow
cd "$PSScriptRoot\shell" -ErrorAction Stop
Write-Host "✅ In $(Get-Location)" -ForegroundColor Green

# Step 2: Install dependencies
Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ npm install failed" -ForegroundColor Red
  exit 1
}
Write-Host "✅ Dependencies installed" -ForegroundColor Green

# Step 3: Build shell
Write-Host ""
Write-Host "🔨 Building Shell..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Build failed" -ForegroundColor Red
  exit 1
}
Write-Host "✅ Build complete (shell/dist/)" -ForegroundColor Green

# Step 4: Check if wrangler is installed
Write-Host ""
Write-Host "🔍 Checking Wrangler..." -ForegroundColor Yellow
$wrangler = npm list -g @cloudflare/wrangler 2>$null
if (-not $wrangler) {
  Write-Host "⚠️  Wrangler not found globally. Installing..." -ForegroundColor Yellow
  npm install -g @cloudflare/wrangler
}
Write-Host "✅ Wrangler ready" -ForegroundColor Green

# Step 5: Deploy
Write-Host ""
Write-Host "🚀 Deploying to Cloudflare Pages..." -ForegroundColor Yellow
Write-Host "   Project: mindreply-shell" -ForegroundColor Gray
wrangler pages deploy dist --project-name mindreply-shell

if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Green
  Write-Host "║  ✅ DEPLOYMENT SUCCESSFUL              ║" -ForegroundColor Green
  Write-Host "╠════════════════════════════════════════╣" -ForegroundColor Green
  Write-Host "║  URLs:                                 ║" -ForegroundColor Green
  Write-Host "║  🌐 https://mindreply-shell.pages.dev  ║" -ForegroundColor Cyan
  Write-Host "║  🌐 https://shell.mind-reply.com       ║" -ForegroundColor Cyan
  Write-Host "║     (after DNS propagation)            ║" -ForegroundColor Gray
  Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Green
  Write-Host ""
  Write-Host "Next steps:" -ForegroundColor Yellow
  Write-Host "1. Add CNAME in Cloudflare DNS:" -ForegroundColor White
  Write-Host "   Name: shell" -ForegroundColor Gray
  Write-Host "   Content: mindreply-shell.pages.dev" -ForegroundColor Gray
  Write-Host "2. Wait 2-5 minutes for DNS propagation" -ForegroundColor White
  Write-Host "3. Visit https://shell.mind-reply.com" -ForegroundColor Cyan
  Write-Host ""
} else {
  Write-Host ""
  Write-Host "❌ Deployment failed. Check errors above." -ForegroundColor Red
  exit 1
}
