param(
    [string]$Mode = "production-preview",
    [string]$Branch = "agent/obsidian-command-foundry",
    [switch]$RunGit = $true,
    [switch]$RunBuild = $true,
    [switch]$CreateN8nSpecs = $true
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "===================================================="
Write-Host " OBSIDIAN COMMAND FOUNDRY"
Write-Host " Secure local production activation engine"
Write-Host "===================================================="
Write-Host ""

$Root = Get-Location
Write-Host "Repo root: $Root"
Write-Host "Mode: $Mode"
Write-Host "Branch: $Branch"
Write-Host ""

$RequiredDirs = @(
    "data",
    "registry",
    "automation-specs",
    "scripts",
    "docs",
    "reports",
    "security",
    "deployment",
    "workstreams",
    "routes-plan",
    "production"
)

foreach ($dir in $RequiredDirs) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
        Write-Host "Created folder: $dir"
    }
}

if (!(Test-Path "scripts/obsidian_command_foundry.py")) {
    Write-Host "Missing scripts/obsidian_command_foundry.py"
    Write-Host "Create the Python file from the second code block, then run this again."
    exit 1
}

if ($RunGit) {
    try {
        git rev-parse --is-inside-work-tree | Out-Null
        $currentBranch = git branch --show-current
        Write-Host "Current Git branch: $currentBranch"

        if ($currentBranch -ne $Branch) {
            $branchExists = git branch --list $Branch
            if ($branchExists) {
                git checkout $Branch
            } else {
                git checkout -b $Branch
            }
            Write-Host "Using branch: $Branch"
        }
    } catch {
        Write-Host "Git unavailable or not a repo. Continuing local-only."
    }
}

$pythonCmd = "python"
try {
    & $pythonCmd --version | Out-Null
} catch {
    $pythonCmd = "py"
}

Write-Host ""
Write-Host "Running Obsidian Command Foundry Python engine..."
Write-Host ""

& $pythonCmd "scripts/obsidian_command_foundry.py" `
    --mode $Mode `
    --branch $Branch `
    --create-n8n-specs $CreateN8nSpecs

if ($RunBuild) {
    if (Test-Path "package.json") {
        Write-Host ""
        Write-Host "package.json detected. Running safe build checks if scripts exist..."
        $packageText = Get-Content "package.json" -Raw

        if ($packageText -match '"build"') {
            Write-Host "Running npm run build..."
            try {
                npm run build
            } catch {
                Write-Host "Build failed. Python report will keep production blocked."
            }
        }

        if ($packageText -match '"lint"') {
            Write-Host "Running npm run lint..."
            try {
                npm run lint
            } catch {
                Write-Host "Lint failed. Logged for repair."
            }
        }
    }
}

if ($RunGit) {
    try {
        git status --short

        Write-Host ""
        Write-Host "Suggested commit:"
        Write-Host "git add data registry automation-specs scripts docs reports security deployment workstreams routes-plan production"
        Write-Host "git commit -m `"chore: activate obsidian command foundry`""
        Write-Host "git push -u origin $Branch"
    } catch {
        Write-Host "Git status unavailable."
    }
}

Write-Host ""
Write-Host "===================================================="
Write-Host " OBSIDIAN COMMAND FOUNDRY COMPLETE"
Write-Host " Review reports/obsidian-production-report.md"
Write-Host "===================================================="
``
