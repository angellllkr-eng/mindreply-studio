@echo off
chcp 65001 >nul
title Agent Control Plane - URL Mode
set "DIR=%USERPROFILE%\OneDrive\MRPRODUCTION-MIGRATION\2026-07-17\agent-control-plane"
cd /d "%DIR%"
echo 🜁  Agent Control Plane (Cloud URL)
echo ==========================================
echo 1. Starting local server...
start /b node server.js > server.log 2>&1
timeout /t 3 >nul
echo 2. Starting cloud tunnel...
echo    This will give you a public URL...
echo.
npx localtunnel --port 4747 --subdomain agent-control-plane-%RANDOM%
echo.
echo Press any key to stop...
pause >nul
taskkill /f /im node.exe >nul 2>&1
