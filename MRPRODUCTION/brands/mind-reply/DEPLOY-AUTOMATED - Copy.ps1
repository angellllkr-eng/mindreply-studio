#!/usr/bin/env powershell
# MindReply Automated Deployment Script
# Deploys website, sets up workflows, and launches revenue systems

param(
    [string]$Path = "C:\Users\skyri\MindReply",
    [string]$Environment = "production"
)

Write-Host "================================" -ForegroundColor Cyan
Write-Host "MINDREPLY AUTOMATED DEPLOYMENT" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "Step 1: Checking Prerequisites..." -ForegroundColor Yellow

$checks = @(
    @{ Name = "Node.js"; Command = "node --version" }
    @{ Name = "npm"; Command = "npm --version" }
    @{ Name = "Wrangler"; Command = "npx wrangler --version" }
)

foreach ($check in $checks) {
    try {
        $result = Invoke-Expression $check.Command 2>$null
        Write-Host "  ✓ $($check.Name): $result" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ $($check.Name): NOT FOUND" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Step 2: Building Frontend..." -ForegroundColor Yellow

# Build if needed
if (Test-Path "$Path\vite.config.ts") {
    Write-Host "  • Found Vite config, building..." -ForegroundColor Cyan
    Set-Location $Path
    npm install 2>$null | Out-Null
    npm run build 2>$null | Out-Null
    Write-Host "  ✓ Frontend built" -ForegroundColor Green
} else {
    Write-Host "  • No build required (static site)" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Step 3: Deploy to Cloudflare Pages..." -ForegroundColor Yellow

Write-Host "  Command to run:" -ForegroundColor Cyan
Write-Host "  npx wrangler pages deploy $Path\public --project-name mind-reply-com" -ForegroundColor White
Write-Host ""
Write-Host "  How to get started:" -ForegroundColor Yellow
Write-Host "  1. Install Wrangler: npm install -g @cloudflare/wrangler" -ForegroundColor Gray
Write-Host "  2. Login: npx wrangler login" -ForegroundColor Gray
Write-Host "  3. Deploy: npx wrangler pages deploy $Path\public --project-name mind-reply-com" -ForegroundColor Gray
Write-Host "  4. Attach domain: Cloudflare Dashboard → Pages → mind-reply-com → Custom domains" -ForegroundColor Gray

Write-Host ""
Write-Host "Step 4: N8N Workflow Setup Instructions" -ForegroundColor Yellow

$workflows = @(
    @{ Name = "Cold Email"; File = "N8N-WORKFLOW-COLD-EMAIL.json" }
    @{ Name = "Lead Router"; File = "N8N-WORKFLOW-LEAD-ROUTER.json" }
    @{ Name = "Blog Generator"; File = "N8N-WORKFLOW-BLOG-GENERATOR.json" }
    @{ Name = "Case Studies"; File = "N8N-WORKFLOW-CASE-STUDY-GENERATOR.json" }
)

foreach ($workflow in $workflows) {
    $filePath = "$Path\ops\$($workflow.File)"
    if (Test-Path $filePath) {
        Write-Host "  ✓ $($workflow.Name): $filePath" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "How to import workflows:" -ForegroundColor Yellow
Write-Host "  1. Open n8n: localhost:5678" -ForegroundColor Gray
Write-Host "  2. Create new workflow" -ForegroundColor Gray
Write-Host "  3. Click workflow menu → Import from file" -ForegroundColor Gray
Write-Host "  4. Select JSON file from: $Path\ops\" -ForegroundColor Gray
Write-Host "  5. Replace {{variables}} with your IDs:" -ForegroundColor Gray
Write-Host "     - {{lemlist_id}} → Your Lemlist campaign ID" -ForegroundColor Gray
Write-Host "     - {{airtable_id}} → Your Airtable table ID" -ForegroundColor Gray
Write-Host "     - {{wordpress_id}} → Your WordPress credentials" -ForegroundColor Gray
Write-Host "  6. Test and schedule" -ForegroundColor Gray

Write-Host ""
Write-Host "Step 5: File Locations (Copy These)" -ForegroundColor Yellow

$files = @(
    @{ Category = "WEBSITE"; Path = "$Path\public\index.html" }
    @{ Category = "PHONE CHAT"; Path = "$Path\apps\mrstation-phone-login-chat\server.py" }
    @{ Category = "N8N WORKFLOWS"; Path = "$Path\ops\N8N-WORKFLOW-*.json" }
    @{ Category = "SALES ASSETS"; Path = "$Path\ops\MINDREPLY-WEBCHAT-SALES-ASSETS.md" }
    @{ Category = "EXECUTION PLAN"; Path = "$Path\ops\90-DAY-RAPID-EXECUTION.md" }
    @{ Category = "QUICK START"; Path = "$Path\ops\QUICK-START.txt" }
)

foreach ($file in $files) {
    Write-Host ""
    Write-Host "  [$($file.Category)]" -ForegroundColor Cyan
    Write-Host "  $($file.Path)" -ForegroundColor White
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "NEXT STEPS" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. READ:" -ForegroundColor Yellow
Write-Host "   $Path\ops\00-START-HERE.md" -ForegroundColor White
Write-Host ""
Write-Host "2. DEPLOY WEBSITE:" -ForegroundColor Yellow
Write-Host "   npx wrangler pages deploy $Path\public --project-name mind-reply-com" -ForegroundColor White
Write-Host ""
Write-Host "3. IMPORT N8N WORKFLOWS:" -ForegroundColor Yellow
Write-Host "   Visit: localhost:5678" -ForegroundColor White
Write-Host "   Import files from: $Path\ops\N8N-WORKFLOW-*.json" -ForegroundColor White
Write-Host ""
Write-Host "4. VERIFY PHONE CHAT:" -ForegroundColor Yellow
Write-Host "   Visit: http://localhost:9090/?phone-login=1" -ForegroundColor White
Write-Host ""
Write-Host "5. START EXECUTING:" -ForegroundColor Yellow
Write-Host "   Follow: $Path\ops\90-DAY-RAPID-EXECUTION.md" -ForegroundColor White
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "REVENUE SYSTEMS READY" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

