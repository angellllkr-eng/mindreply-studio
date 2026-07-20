#!/usr/bin/env pwsh

# MindReply Shell — Cloudflare Pages Deployment
# This script deploys Shell to Cloudflare Pages using your API token

param(
    [string]$ApiToken = "",
    [string]$AccountId = ""
)

if (-not $ApiToken) {
    Write-Host "Enter your Cloudflare API Token:" -ForegroundColor Yellow
    $ApiToken = Read-Host
}

if (-not $AccountId) {
    Write-Host "Enter your Cloudflare Account ID:" -ForegroundColor Yellow
    $AccountId = Read-Host
}

$shellPath = "$PSScriptRoot\shell\dist"

if (-not (Test-Path $shellPath)) {
    Write-Host "Error: Shell dist directory not found at $shellPath" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  MindReply Shell Deployment            ║" -ForegroundColor Cyan
Write-Host "║  Cloudflare Pages                      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "📁 Shell directory: $shellPath" -ForegroundColor Green
Write-Host "🌐 Project name: mindreply-shell" -ForegroundColor Green
Write-Host ""

# Create deployment payload
$files = @()
Get-ChildItem -Path $shellPath -File | ForEach-Object {
    $filePath = $_.FullName
    $fileName = $_.Name
    $fileContent = [System.IO.File]::ReadAllBytes($filePath)
    $fileBase64 = [Convert]::ToBase64String($fileContent)
    
    $files += @{
        name    = $fileName
        content = $fileBase64
    }
}

Write-Host "📦 Files to upload: $($files.Count)" -ForegroundColor Yellow
$files | ForEach-Object { Write-Host "   - $($_.name)" -ForegroundColor Gray }
Write-Host ""

Write-Host "🚀 Deploying to Cloudflare Pages..." -ForegroundColor Yellow

# Deploy using curl (Cloudflare Pages API doesn't have direct file upload, use wrangler instead)
Write-Host ""
Write-Host "Note: Using Cloudflare Wrangler CLI for deployment" -ForegroundColor Gray

# Check if wrangler is installed
$wranglerCheck = wrangler --version 2>$null
if (-not $wranglerCheck) {
    Write-Host "⚠️  Wrangler not installed. Installing..." -ForegroundColor Yellow
    npm install -g @cloudflare/wrangler
}

# Set environment variables for Wrangler
$env:CLOUDFLARE_API_TOKEN = $ApiToken
$env:CLOUDFLARE_ACCOUNT_ID = $AccountId

try {
    Write-Host "Deploying with Wrangler..." -ForegroundColor Yellow
    & wrangler pages deploy "$shellPath" --project-name mindreply-shell
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "╔════════════════════════════════════════════════════╗" -ForegroundColor Green
        Write-Host "║  ✅ DEPLOYMENT SUCCESSFUL                          ║" -ForegroundColor Green
        Write-Host "╠════════════════════════════════════════════════════╣" -ForegroundColor Green
        Write-Host "║  Project: mindreply-shell                          ║" -ForegroundColor Green
        Write-Host "║  URL: https://mindreply-shell.pages.dev            ║" -ForegroundColor Cyan
        Write-Host "║                                                    ║" -ForegroundColor Green
        Write-Host "║  Next: Add CNAME in Cloudflare DNS                ║" -ForegroundColor Green
        Write-Host "║  Name: shell                                       ║" -ForegroundColor Green
        Write-Host "║  Target: mindreply-shell.pages.dev                ║" -ForegroundColor Green
        Write-Host "║                                                    ║" -ForegroundColor Green
        Write-Host "║  Then visit: https://shell.mind-reply.com          ║" -ForegroundColor Cyan
        Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ Deployment failed. Check errors above." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host ""
    Write-Host "❌ Error: $_" -ForegroundColor Red
    exit 1
}
