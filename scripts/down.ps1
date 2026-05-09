Write-Host "Stopping development services and removing volumes..."
docker compose down --volumes
exit $LASTEXITCODE
