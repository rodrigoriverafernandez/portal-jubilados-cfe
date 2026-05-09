param(
    [switch]$Build
)

$compose = "docker compose"

if ($Build) {
    Write-Host "Building and starting development services..."
    & $compose up --build
} else {
    Write-Host "Starting development services..."
    & $compose up
}

exit $LASTEXITCODE
