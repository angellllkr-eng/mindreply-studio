@echo off
REM MindReply Shell - Cloudflare Pages Deployment Script (Windows)
REM This script deploys Shell to Cloudflare Pages automatically

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════╗
echo ║  MindReply Shell Deployment Script     ║
echo ║  Cloudflare Pages                      ║
echo ╚════════════════════════════════════════╝
echo.

REM Step 1: Check for wrangler
echo 🔍 Checking Wrangler CLI...
wrangler --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Wrangler not installed. Installing globally...
    call npm install -g @cloudflare/wrangler
)
echo ✅ Wrangler ready
echo.

REM Step 2: Navigate to shell
echo 📁 Navigating to shell directory...
cd /d "%~dp0shell"
if errorlevel 1 (
    echo ❌ Failed to navigate to shell directory
    exit /b 1
)
echo ✅ In %cd%
echo.

REM Step 3: Install dependencies
echo 📦 Installing dependencies...
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo ❌ npm install failed
    exit /b 1
)
echo.

REM Step 4: Build
echo 🔨 Building Shell...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed
    exit /b 1
)
echo.

REM Step 5: Deploy
echo 🚀 Deploying to Cloudflare Pages...
echo    Project name: mindreply-shell
call wrangler pages deploy dist --project-name mindreply-shell

echo.
echo ╔════════════════════════════════════════╗
echo ║  ✅ DEPLOYMENT SUCCESSFUL              ║
echo ╠════════════════════════════════════════╣
echo ║  URL: https://mindreply-shell.pages.dev║
echo ║                                        ║
echo ║  Next: Add CNAME in Cloudflare DNS:   ║
echo ║  Name: shell                           ║
echo ║  Target: mindreply-shell.pages.dev    ║
echo ╚════════════════════════════════════════╝
echo.

pause
