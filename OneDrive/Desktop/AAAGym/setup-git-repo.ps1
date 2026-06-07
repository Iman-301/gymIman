# PowerShell script to set up a proper git repository for AAAGym
# Run this script from the AAAGym folder

Write-Host "Setting up Git repository for AAAGym..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "backend") -or -not (Test-Path "frontend")) {
    Write-Host "ERROR: Please run this script from the AAAGym folder!" -ForegroundColor Red
    exit 1
}

# Check if .git already exists
if (Test-Path ".git") {
    Write-Host "Git repository already exists in this folder." -ForegroundColor Yellow
    $response = Read-Host "Do you want to reinitialize? (y/n)"
    if ($response -ne "y") {
        Write-Host "Aborted." -ForegroundColor Yellow
        exit 0
    }
    Remove-Item -Recurse -Force .git
}

# Initialize git repository
Write-Host "Initializing git repository..." -ForegroundColor Cyan
git init

# Add files
Write-Host "Adding project files..." -ForegroundColor Cyan
git add .gitignore
git add vercel.json
git add .vercelignore
git add package.json
git add update-api-urls.js
git add DEPLOYMENT.md
git add README-DEPLOYMENT.md
git add GIT-SETUP.md

# Add backend (excluding node_modules and dist)
Write-Host "Adding backend files..." -ForegroundColor Cyan
Get-ChildItem -Path "backend" -Recurse -File | Where-Object {
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "\\dist\\" -and
    $_.FullName -notmatch "\\.env" -and
    $_.FullName -notmatch "\\.log$"
} | ForEach-Object {
    git add $_.FullName
}

# Add frontend
Write-Host "Adding frontend files..." -ForegroundColor Cyan
git add frontend/

# Check status
Write-Host "`nChecking staged files..." -ForegroundColor Cyan
$stagedCount = (git status --short | Measure-Object -Line).Lines
Write-Host "Total staged files: $stagedCount" -ForegroundColor Green

# Check for exp/ files
$expFiles = git status --short | Where-Object { $_ -match "exp/" } | Measure-Object -Line
if ($expFiles.Lines -gt 0) {
    Write-Host "WARNING: Found $($expFiles.Lines) files from exp/ directory!" -ForegroundColor Red
    Write-Host "These should NOT be in your repository." -ForegroundColor Red
} else {
    Write-Host "✓ No exp/ files found. Good!" -ForegroundColor Green
}

Write-Host "`nSetup complete! Review with: git status" -ForegroundColor Green
Write-Host "When ready, commit with: git commit -m 'Initial commit'" -ForegroundColor Cyan

