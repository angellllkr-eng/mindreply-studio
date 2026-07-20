#Requires -Version 5.1
$ErrorActionPreference = "Continue"
$env:Path = "C:\Program Files\nodejs;C:\Program Files\Git\cmd;C:\Users\ANGEL\AppData\Roaming\npm;C:\Users\ANGEL\.local\bin;C:\Users\ANGEL\.grok\bin;" + $env:Path
Write-Host "=== DESKTOP-73C17P4 BOOTSTRAP ===" -ForegroundColor Cyan
Write-Host "node: $(node -v 2>$null)"
Write-Host "npm:  $(npm -v 2>$null)"
Write-Host "git:  $(git --version 2>$null)"
Write-Host "vercel: $(vercel --version 2>$null)"
Write-Host "supabase: $(supabase --version 2>$null)"
Write-Host "AUREL: C:\Users\ANGEL\MRPRODUCTION\brands\aurel"
Write-Host "Supabase ref: aziwdgndohdgnwztpwdi"
Write-Host "Live: https://aurel-one.vercel.app"
Write-Host "DNS needed: CNAME aurel -> a00feb97f3cf4b49.vercel-dns-017.com. (Proxy OFF)"
