# DigitalOcean App Platform Deployment Guide

## Quick Start Deployment

1. **Fork/clone** this repository to your GitHub account
2. Go to **DigitalOcean App Platform** dashboard
3. **Create new app** from GitHub repository: `basjay-source/briskappEnhanced`
4. **Upload** the `.do/app.yaml` specification file
5. **Configure environment variables**:
   - `SECRET_KEY`: Generate secure random string (use: `openssl rand -hex 32`)
   - `OPENAI_API_KEY`: Your OpenAI API key from dashboard
6. **Deploy** and wait for build completion (~5-10 minutes)
7. **Access** your application at the provided URL

## Prerequisites

1. **DigitalOcean Account** with App Platform access
2. **GitHub Repository** connected to DigitalOcean
3. **OpenAI API Key** for AI adviser functionality
4. **Domain Name** (optional, for custom domain)

## Environment Variables Setup

Before deploying, configure these environment variables in the DigitalOcean App Platform dashboard:

### Required Secrets (User Must Provide)
```bash
# Generate a secure secret key
SECRET_KEY=your-secret-key-here-use-openssl-rand-hex-32

# OpenAI API key for AI advisers
OPENAI_API_KEY=sk-your-openai-api-key-from-dashboard

# Optional: Additional integrations
STRIPE_API_KEY=your-stripe-api-key-if-using-payments
SENDGRID_API_KEY=your-sendgrid-api-key-for-emails
```

### Auto-Generated Variables (DigitalOcean Managed)
- `DATABASE_URL` - PostgreSQL connection string (auto-injected)
- `REDIS_URL` - Redis connection string (auto-injected)
- `CORS_ORIGINS` - Automatically set to web service URL
- `ALLOWED_HOSTS` - Automatically set to API service URL

## Deployment Methods

### Method 1: DigitalOcean Dashboard (Recommended)
1. **Login** to DigitalOcean → Apps → Create App
2. **Connect GitHub**: Select `basjay-source/briskappEnhanced`
3. **Choose branch**: `main` (or your deployment branch)
4. **Upload spec**: Use `.do/app.yaml` file from repository
5. **Configure secrets**: Add `SECRET_KEY` and `OPENAI_API_KEY`
6. **Deploy**: Click "Create Resources" and wait for completion

### Method 2: doctl CLI
```bash
# Install doctl CLI
curl -sL https://github.com/digitalocean/doctl/releases/download/v1.94.0/doctl-1.94.0-linux-amd64.tar.gz | tar -xzv
sudo mv doctl /usr/local/bin

# Authenticate
doctl auth init

# Create app from spec
doctl apps create --spec .do/app.yaml

# Set environment variables
doctl apps update <app-id> --spec .do/app.yaml
```

## Application Architecture

### Services Deployed
1. **brisk-api** (FastAPI Backend)
   - 2 instances on basic-s
   - Health checks on `/health`
   - Auto-scaling enabled
   
2. **brisk-web** (React Frontend)
   - 1 instance on basic-xxs
   - Static asset serving
   - SPA routing support

3. **brisk-postgres** (Database)
   - PostgreSQL 15
   - Automatic backups
   - SSL connections

4. **brisk-redis** (Cache)
   - Redis 7
   - Session storage
   - Background jobs

### Pre-Deploy Jobs
1. **db-migrate**: Runs Alembic migrations
2. **seed-data**: Creates initial database schema

## Build Configuration Details

### Backend (FastAPI + Poetry)
```yaml
build_command: |
  cd backend/brisk_backend &&
  poetry config virtualenvs.create false &&
  poetry install --no-dev --no-interaction --no-ansi

run_command: poetry run uvicorn app.main:app --host 0.0.0.0 --port $PORT --workers 2
```

### Frontend (React + Vite)
```yaml
build_command: |
  npm ci &&
  npm run build

run_command: npm run preview -- --host 0.0.0.0 --port $PORT
```

## Multi-Language Support

The application includes comprehensive internationalization (i18n) support:
- **11 Languages**: English (US/UK), Spanish, French, German, Italian, Portuguese, Arabic, Hindi, Chinese (Simplified/Traditional)
- **RTL Support**: Arabic language with right-to-left layout
- **Dynamic Switching**: Language switcher in navigation header
- **Persistent Preferences**: Language choice saved in browser storage

## Scaling & Performance

### Instance Sizing Recommendations
| Environment | API Instances | Web Instances | Database | Redis | Monthly Cost |
|-------------|---------------|---------------|----------|-------|--------------|
| Development | 1x basic-xxs | 1x basic-xxs | basic-xs | basic-xxs | ~$25-30 |
| Staging | 2x basic-s | 1x basic-xxs | basic-s | basic-xxs | ~$45-60 |
| Production | 3x basic-s | 2x basic-xxs | professional-xs | basic-s | ~$80-120 |

### Auto-Scaling Configuration
- **CPU Threshold**: 80% utilization
- **Memory Threshold**: 85% utilization
- **Restart Monitoring**: Alert after 5 restarts in 5 minutes

## Monitoring & Observability

### Built-in Monitoring
- **Application Metrics**: CPU, memory, request rate
- **Database Metrics**: Connection count, query performance
- **Error Tracking**: Application logs and error rates
- **Uptime Monitoring**: Health check status

### Log Access
```bash
# Real-time logs
doctl apps logs <app-id> --type=run --follow

# Build logs
doctl apps logs <app-id> --type=build

# Specific service logs
doctl apps logs <app-id> --type=run --component=brisk-api
```

### Health Endpoints
- **API Health**: `https://your-api-domain/health`
- **Frontend**: `https://your-web-domain/`
- **Database**: Monitored via DigitalOcean dashboard

## Security Configuration

### SSL/TLS
- **Automatic HTTPS**: SSL certificates auto-provisioned
- **HSTS Headers**: Strict transport security enabled
- **Certificate Renewal**: Automatic Let's Encrypt renewal

### Environment Security
- **Encrypted Secrets**: All environment variables encrypted at rest
- **Network Isolation**: Services communicate over private network
- **Database Security**: SSL-only connections, encrypted storage

### CORS Configuration
```python
# Automatically configured in app.yaml
CORS_ORIGINS=${brisk-web.PUBLIC_URL}
ALLOWED_HOSTS=${_self.PUBLIC_URL}
```

## Database Management

### Automatic Migrations
```bash
# Pre-deploy job runs automatically
poetry run alembic upgrade head
```

### Manual Database Operations
```bash
# Connect to database
doctl databases connection <database-id>

# Create backup
doctl databases backups list <database-id>

# Restore from backup
doctl databases backups restore <database-id> <backup-id>
```

### Backup Strategy
- **Automatic Backups**: Daily backups with 7-day retention
- **Point-in-Time Recovery**: Available for professional tier
- **Manual Backups**: Can be triggered via dashboard or CLI

## Custom Domain Setup

### DNS Configuration
1. **Add Domain** in App Platform dashboard
2. **Configure DNS** records:
   ```
   Type: CNAME
   Name: your-subdomain (or @)
   Value: your-app.ondigitalocean.app
   ```
3. **SSL Certificate** automatically provisioned

### Multiple Domains
```yaml
# Add to app.yaml if needed
domains:
  - domain: yourdomain.com
    type: PRIMARY
  - domain: www.yourdomain.com
    type: ALIAS
```

## Troubleshooting Guide

### Common Build Issues
1. **Poetry Lock File**: Ensure `poetry.lock` is committed
2. **Node Version**: Verify Node.js version compatibility
3. **Environment Variables**: Check all required secrets are set
4. **Memory Limits**: Upgrade instance size if builds fail

### Runtime Issues
1. **Database Connection**: Verify `DATABASE_URL` is injected
2. **CORS Errors**: Check `CORS_ORIGINS` configuration
3. **Static Files**: Ensure Vite build output is correct
4. **Health Checks**: Verify `/health` endpoint responds

### Debug Commands
```bash
# App status
doctl apps get <app-id>

# Service details
doctl apps get <app-id> --format json | jq '.services'

# Recent deployments
doctl apps list-deployments <app-id>

# Restart service
doctl apps create-deployment <app-id>
```

### Performance Optimization
1. **Enable Caching**: Redis for session storage
2. **Static Assets**: Use CDN for large files
3. **Database Indexing**: Optimize queries
4. **Connection Pooling**: Configure in FastAPI

## Cost Optimization

### Development Environment (~$25-30/month)
- 1x basic-xxs API instance: $6/month
- 1x basic-xxs web instance: $6/month
- basic-xs PostgreSQL: $15/month
- basic-xxs Redis: $7/month

### Production Environment (~$80-120/month)
- 3x basic-s API instances: $36/month
- 2x basic-xxs web instances: $12/month
- professional-xs PostgreSQL: $30/month
- basic-s Redis: $15/month
- Bandwidth & storage: $10-20/month

### Cost Monitoring
- **Usage Alerts**: Set up billing alerts
- **Resource Monitoring**: Track CPU/memory usage
- **Right-sizing**: Adjust instances based on metrics

## Maintenance & Updates

### Automatic Updates
- **Security Patches**: Applied automatically
- **Platform Updates**: Managed by DigitalOcean
- **Dependency Updates**: Manual via GitHub

### Manual Maintenance
```bash
# Update dependencies
npm update
poetry update

# Database maintenance
poetry run alembic revision --autogenerate -m "description"
poetry run alembic upgrade head

# Redeploy
git push origin main  # Triggers auto-deployment
```

## Support & Resources

### DigitalOcean Resources
- [App Platform Documentation](https://docs.digitalocean.com/products/app-platform/)
- [Pricing Calculator](https://www.digitalocean.com/pricing/app-platform)
- [Community Forum](https://www.digitalocean.com/community)

### Application Support
- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: See `/docs` directory
- **API Documentation**: Available at `/docs` endpoint

### Emergency Procedures
1. **Rollback Deployment**: Use previous deployment in dashboard
2. **Scale Down**: Reduce instances during issues
3. **Database Recovery**: Restore from backup
4. **Contact Support**: DigitalOcean support for platform issues
