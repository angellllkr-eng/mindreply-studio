@echo off
title AI Chat /aichat
cd /d "%USERPROFILE%\MRPRODUCTION\agent-control-plane"
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js missing
  pause
  exit /b 1
)
if not exist "node_modules" (
  echo Installing deps...
  call npm install
)
if not exist "dist\index.html" (
  echo Building UI...
  call npx vite build
)
start "" "http://127.0.0.1:4747/aichat"
node server.mjs
pause
