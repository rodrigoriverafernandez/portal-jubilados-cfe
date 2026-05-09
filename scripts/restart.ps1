Write-Host "Restarting development services..."
docker compose down --volumes
docker compose up --build
exit $LASTEXITCODE
