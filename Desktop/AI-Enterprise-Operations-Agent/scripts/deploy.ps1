# Windows 11 Deployment Script for AI Enterprise Platform

Write-Host "🚀 Deploying AI Enterprise Operations Platform..." -ForegroundColor Cyan

# Set variables
$REPO_URL = "https://github.com/NICHOLASKARANI/AI-Enterprise-Operations-Agent.git"
$DEPLOY_PATH = "$env:USERPROFILE\AI-Enterprise-Operations-Agent"

# Clone or update repository
if (Test-Path $DEPLOY_PATH) {
    Write-Host "📦 Updating existing repository..." -ForegroundColor Yellow
    Set-Location $DEPLOY_PATH
    git pull
} else {
    Write-Host "📥 Cloning repository..." -ForegroundColor Yellow
    git clone $REPO_URL $DEPLOY_PATH
    Set-Location $DEPLOY_PATH
}

# Install Docker Desktop if not present
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "🐳 Installing Docker Desktop..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri "https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe" -OutFile "$env:TEMP\docker-installer.exe"
    Start-Process -Wait -FilePath "$env:TEMP\docker-installer.exe" -ArgumentList "install"
}

# Start Docker services
Write-Host "🐳 Starting Docker services..." -ForegroundColor Yellow
docker-compose -f backend/docker-compose.yml up -d

# Setup Kubernetes
Write-Host "☸️ Setting up Kubernetes..." -ForegroundColor Yellow
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
kubectl apply -f kubernetes/ingress.yaml

# Setup monitoring
Write-Host "📊 Setting up monitoring..." -ForegroundColor Yellow
kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/bundle.yaml
kubectl apply -f monitoring/prometheus.yml

# Frontend deployment
Write-Host "🎨 Building frontend..." -ForegroundColor Yellow
Set-Location frontend
npm install
npm run build

# Deploy frontend
docker build -t ai-enterprise-frontend .
docker run -d -p 3000:80 ai-enterprise-frontend

# Configure RBAC
Write-Host "🔐 Configuring RBAC..." -ForegroundColor Yellow
kubectl apply -f kubernetes/rbac.yaml

# Initialize database
Write-Host "🗄️ Initializing database..." -ForegroundColor Yellow
docker exec -it ai-enterprise-postgres psql -U postgres -d ai_enterprise -f /init.sql

# Setup OpenAI API key
$OPENAI_KEY = Read-Host -Prompt "Enter your OpenAI API key" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($OPENAI_KEY)
$PlainKey = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
kubectl create secret generic openai-secret --from-literal=api-key=$PlainKey

# Health check
Write-Host "🏥 Running health checks..." -ForegroundColor Yellow
Start-Sleep -Seconds 10
Invoke-WebRequest -Uri "http://localhost:8000/health" -UseBasicParsing

Write-Host "✅ Deployment Complete!" -ForegroundColor Green
Write-Host "📊 Access the platform:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000"
Write-Host "   API: http://localhost:8000"
Write-Host "   Metrics: http://localhost:9090"
Write-Host "   Grafana: http://localhost:3001"