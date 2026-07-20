#Requires -Version 5.1
param(
  [int]$IntervalMinutes = 15,
  [int]$Loops = 0  # 0 = run forever until Ctrl+C
)
$ErrorActionPreference = 'Continue'
$root = 'C:\Users\ANGEL\MRPRODUCTION'
$logDir = Join-Path $root 'logs\competition'
$statusFile = Join-Path $logDir 'LIVE-STATUS.md'
$historyFile = Join-Path $logDir 'history.jsonl'
New-Item -ItemType Directory -Path $logDir -Force | Out-Null

$products = @(
  @{ name='Mind-Reply'; url='https://mind-reply.com'; primary='Grok 4.5'; challenger='Claude Opus 4.8' },
  @{ name='AUREL'; url='https://aurel.mind-reply.com'; primary='Claude Opus 4.8'; challenger='Grok 4.5' },
  @{ name='Regex Forge'; url='https://regex-forge.vercel.app'; primary='Grok 4.5'; challenger='Claude Opus 4.8' },
  @{ name='SDR Agent'; url='https://sdr-agent-flax.vercel.app'; primary='Grok 4.5'; challenger='Claude Opus 4.8' },
  @{ name='Code Tutor'; url='https://code-tutor-flame.vercel.app'; primary='Claude Opus 4.8'; challenger='Grok 4.5' },
  @{ name='Code Lens'; url='https://code-lens-henna.vercel.app'; primary='Grok 4.5'; challenger='Claude Opus 4.8' },
  @{ name='SQL Studio'; url='https://sql-studio-weld.vercel.app'; primary='Claude Opus 4.8'; challenger='Grok 4.5' },
  @{ name='L402 Skills'; url='https://l402-skills.vercel.app'; primary='Grok 4.5'; challenger='Claude Opus 4.8' },
  @{ name='Owner Hub'; url='https://angellllkr-eng.github.io'; primary='Grok 4.5'; challenger='Claude Opus 4.8' }
)

function Probe($url) {
  try {
    $r = Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 12
    return @{ code = [int]$r.StatusCode; server = [string]$r.Headers['Server']; ok = $true }
  } catch {
    $code = 0
    try { if ($_.Exception.Response) { $code = [int]$_.Exception.Response.StatusCode } } catch {}
    return @{ code = $code; server = 'DOWN'; ok = $false; err = $_.Exception.Message }
  }
}

$i = 0
while ($true) {
  $i++
  $now = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
  $rows = @()
  $fails = @()
  foreach ($p in $products) {
    $u = $p.url
    $res = Probe $u
    $state = if ($res.ok) { 'COMPETE' } else { 'ALERT' }
    if (-not $res.ok) { $fails += $p.name }
    $rows += "| $($p.name) | $($p.url) | $($res.code) | $($p.primary) | $($p.challenger) | 0/5000 | $state |"
    $hist = [ordered]@{ ts=$now; product=$p.name; url=$p.url; http=$res.code; server=$res.server; primary=$p.primary; challenger=$p.challenger; ok=$res.ok }
    ($hist | ConvertTo-Json -Compress) | Add-Content -LiteralPath $historyFile -Encoding UTF8
  }

  $md = @(
    '# LIVE COMPETITION STATUS',
    "Updated: $now",
    'Owner: angellllkr-eng (only human)',
    'Target: 5k visitors per product — models compete until achieved',
    '',
    '| Product | URL | HTTP | Primary | Challenger | Progress to 5k | State |',
    '|---|---|---|---|---|---|---|'
  ) + $rows + @(
    '',
    "## Alerts",
    $(if ($fails.Count -eq 0) { '- None. All public endpoints responding.' } else { '- DOWN: ' + ($fails -join ', ') }),
    '',
    '## Model tiers active',
    '- T0 Grok 4.5 (growth/speed)',
    '- T1 Claude Opus 4.8 (premium conversion)',
    '- T2 grok-build (technical/SEO specialist)',
    '',
    '## Next actions',
    '1. Keep public URLs green',
    '2. Ship primary + challenger content packs daily',
    '3. Promote winners weekly until 5k/product',
    '',
    "Loop: $i | Interval: ${IntervalMinutes}m"
  )
  Set-Content -LiteralPath $statusFile -Value ($md -join "`n") -Encoding UTF8
  Write-Host "[$now] monitor loop $i | fails=$($fails.Count) | wrote $statusFile"

  if ($Loops -gt 0 -and $i -ge $Loops) { break }
  Start-Sleep -Seconds ([Math]::Max(60, $IntervalMinutes * 60))
}
