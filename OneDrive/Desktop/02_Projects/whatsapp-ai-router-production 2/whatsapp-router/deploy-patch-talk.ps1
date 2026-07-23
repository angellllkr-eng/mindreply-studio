# PATCH talk + WhatsApp Router — One-shot deploy script
# Run this after you have CLOUDFLARE_API_TOKEN set

$ErrorActionPreference = "Stop"
$base = "$env:OneDrive\Desktop\whatsapp-ai-router-production 2\whatsapp-router"

Write-Host "=== PATCH talk Deploy ===" -ForegroundColor Cyan

# Step 1: Deploy Whisper Worker
Write-Host "`n[1/4] Deploying PATCH talk (Whisper Worker)..." -ForegroundColor Yellow
Set-Location "$base\whisper-worker"
$whisperOutput = npx wrangler deploy 2>&1
$whisperUrl = ($whisperOutput | Select-String -Pattern "https://patch-talk[^\s]+\.workers\.dev").Matches.Value
if ($whisperUrl) {
    Write-Host "PATCH talk URL: $whisperUrl" -ForegroundColor Green
} else {
    Write-Host "Could not auto-detect URL. Check output:" -ForegroundColor Red
    Write-Host $whisperOutput
    exit 1
}

# Step 2: Update router wrangler.toml with the Worker URL
Write-Host "`n[2/4] Updating router config with PATCH talk URL..." -ForegroundColor Yellow
Set-Location $base
$wranglerContent = Get-Content "wrangler.toml" -Raw
$wranglerContent = $wranglerContent -replace "https://patch-talk\.YOUR-SUBDOMAIN\.workers\.dev", $whisperUrl
Set-Content -Path "wrangler.toml" -Value $wranglerContent -Encoding UTF8
Write-Host "Router wrangler.toml updated" -ForegroundColor Green

# Step 3: Deploy the WhatsApp Router
Write-Host "`n[3/4] Deploying WhatsApp Router..." -ForegroundColor Yellow
$routerOutput = npx wrangler deploy 2>&1
$routerUrl = ($routerOutput | Select-String -Pattern "https://whatsapp-ai-router[^\s]+\.workers\.dev").Matches.Value
if ($routerUrl) {
    Write-Host "Router URL: $routerUrl" -ForegroundColor Green
} else {
    Write-Host "Router deployed. Check output for URL." -ForegroundColor Yellow
    Write-Host $routerOutput
}

# Step 4: Summary
Write-Host "`n[4/4] Deploy Summary" -ForegroundColor Cyan
Write-Host "PATCH talk (STT):   $whisperUrl" -ForegroundColor White
Write-Host "WhatsApp Router:    $routerUrl" -ForegroundColor White
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Set WhatsApp secrets: npx wrangler secret put WHATSAPP_VERIFY_TOKEN" -ForegroundColor White
Write-Host "2. Set WhatsApp secrets: npx wrangler secret put WHATSAPP_APP_SECRET" -ForegroundColor White
Write-Host "3. Set WhatsApp secrets: npx wrangler secret put WHATSAPP_ACCESS_TOKEN" -ForegroundColor White
Write-Host "4. Set API keys: npx wrangler secret put OPENAI_API_KEY" -ForegroundColor White
Write-Host "5. Set API keys: npx wrangler secret put ANTHROPIC_API_KEY" -ForegroundColor White
Write-Host "6. Set API keys: npx wrangler secret put XAI_API_KEY" -ForegroundColor White
Write-Host "7. Set API keys: npx wrangler secret put GEMINI_API_KEY" -ForegroundColor White
Write-Host "8. Set API keys: npx wrangler secret put GROQ_API_KEY" -ForegroundColor White
Write-Host "9. Point Meta webhook to: $routerUrl/webhook" -ForegroundColor White
Write-Host "`nDone. PATCH talk is live." -ForegroundColor Green
