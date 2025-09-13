# Brisk Practice Suite - Deployment Guide

## Overview

This guide covers the complete deployment process for Brisk Practice Suite, from local development to production deployment on Kubernetes with Terraform infrastructure management.

## Prerequisites

### Required Tools
- Docker Desktop 4.0+
- Kubernetes 1.27+
- Terraform 1.5+
- kubectl
- Helm 3.0+
- Node.js 18+
- Python 3.12+
- PostgreSQL 15+

### Cloud Provider Setup
- AWS Account with appropriate IAM permissions
- Azure Account (alternative)
- Domain name for the application
- SSL certificates (Let's Encrypt or commercial)

## Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-org/brisk-practice-suite.git
cd brisk-practice-suite
```

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Configure environment variables
DATABASE_URL=postgresql://brisk:password@localhost:5432/brisk_dev
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key-here
OPENAI_API_KEY=your-openai-key
```

### 3. Backend Setup
```bash
cd backend/brisk_backend

# Install dependencies
poetry install

# Run database migrations
poetry run alembic upgrade head

# Start development server
poetry run fastapi dev app/main.py
```

### 4. Frontend Setup
```bash
cd frontend/brisk_frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 5. Database Setup
```bash
# Start PostgreSQL with Docker
docker run -d \
  --name brisk-postgres \
  -e POSTGRES_DB=brisk_dev \
  -e POSTGRES_USER=brisk \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  postgres:15-alpine

# Start Redis
docker run -d \
  --name brisk-redis \
  -p 6379:6379 \
  redis:7-alpine
```

## Docker Deployment

### 1. Build Images
```bash
# Build backend image
docker build -t brisk/api:latest ./backend

# Build frontend image
docker build -t brisk/web:latest ./frontend
```

### 2. Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: brisk
      POSTGRES_USER: brisk
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  api:
    image: brisk/api:latest
    environment:
      DATABASE_URL: postgresql://brisk:${POSTGRES_PASSWORD}@postgres:5432/brisk
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis
    ports:
      - "8000:8000"

  web:
    image: brisk/web:latest
    environment:
      VITE_API_URL: http://localhost:8000
    ports:
      - "3000:3000"
    depends_on:
      - api

volumes:
  postgres_data:
```

### 3. Start Services
```bash
docker-compose up -d
```

## Kubernetes Deployment

### 1. Namespace Creation
```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: brisk-practice
  labels:
    name: brisk-practice
```

### 2. ConfigMap
```yaml
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: brisk-config
  namespace: brisk-practice
data:
  ENVIRONMENT: "production"
  LOG_LEVEL: "INFO"
  CORS_ORIGINS: "https://app.briskpractice.com"
```

### 3. Secrets
```yaml
# k8s/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: brisk-secrets
  namespace: brisk-practice
type: Opaque
data:
  database-url: <base64-encoded-database-url>
  redis-url: <base64-encoded-redis-url>
  secret-key: <base64-encoded-secret-key>
  openai-api-key: <base64-encoded-openai-key>
```

### 4. Database Deployment
```yaml
# k8s/postgres.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: brisk-practice
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15-alpine
        env:
        - name: POSTGRES_DB
          value: brisk
        - name: POSTGRES_USER
          value: brisk
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: brisk-secrets
              key: postgres-password
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: postgres-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 100Gi
```

### 5. API Deployment
```yaml
# k8s/api-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: brisk-api
  namespace: brisk-practice
spec:
  replicas: 3
  selector:
    matchLabels:
      app: brisk-api
  template:
    metadata:
      labels:
        app: brisk-api
    spec:
      containers:
      - name: api
        image: brisk/api:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: brisk-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: brisk-secrets
              key: redis-url
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5
```

### 6. Web Deployment
```yaml
# k8s/web-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: brisk-web
  namespace: brisk-practice
spec:
  replicas: 2
  selector:
    matchLabels:
      app: brisk-web
  template:
    metadata:
      labels:
        app: brisk-web
    spec:
      containers:
      - name: web
        image: brisk/web:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "200m"
```

### 7. Services
```yaml
# k8s/services.yaml
apiVersion: v1
kind: Service
metadata:
  name: brisk-api-service
  namespace: brisk-practice
spec:
  selector:
    app: brisk-api
  ports:
  - port: 8000
    targetPort: 8000
  type: ClusterIP

---
apiVersion: v1
kind: Service
metadata:
  name: brisk-web-service
  namespace: brisk-practice
spec:
  selector:
    app: brisk-web
  ports:
  - port: 3000
    targetPort: 3000
  type: ClusterIP
```

### 8. Ingress
```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: brisk-ingress
  namespace: brisk-practice
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - app.briskpractice.com
    - api.briskpractice.com
    secretName: brisk-tls
  rules:
  - host: app.briskpractice.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: brisk-web-service
            port:
              number: 3000
  - host: api.briskpractice.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: brisk-api-service
            port:
              number: 8000
```

### 9. Deploy to Kubernetes
```bash
# Apply all configurations
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -n brisk-practice
kubectl get services -n brisk-practice
kubectl get ingress -n brisk-practice
```

## Terraform Infrastructure

### 1. Provider Configuration
```hcl
# terraform/providers.tf
terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.20"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.10"
    }
  }
}

provider "aws" {
  region = var.aws_region
}
```

### 2. VPC Configuration
```hcl
# terraform/vpc.tf
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "brisk-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["${var.aws_region}a", "${var.aws_region}b", "${var.aws_region}c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  enable_vpn_gateway = false
  enable_dns_hostnames = true
  enable_dns_support = true

  tags = {
    Environment = var.environment
    Application = "brisk-practice-suite"
  }
}
```

### 3. EKS Cluster
```hcl
# terraform/eks.tf
module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name    = "brisk-cluster"
  cluster_version = "1.27"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    main = {
      desired_capacity = 3
      max_capacity     = 10
      min_capacity     = 1

      instance_types = ["t3.medium"]
      
      k8s_labels = {
        Environment = var.environment
        Application = "brisk-practice-suite"
      }
    }
  }

  tags = {
    Environment = var.environment
    Application = "brisk-practice-suite"
  }
}
```

### 4. RDS Database
```hcl
# terraform/rds.tf
resource "aws_rds_cluster" "brisk" {
  cluster_identifier      = "brisk-postgres"
  engine                 = "aurora-postgresql"
  engine_version         = "15.3"
  database_name          = "brisk"
  master_username        = "brisk_admin"
  manage_master_user_password = true
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.brisk.name
  
  backup_retention_period = 7
  preferred_backup_window = "03:00-04:00"
  
  enabled_cloudwatch_logs_exports = ["postgresql"]
  
  tags = {
    Environment = var.environment
    Application = "brisk-practice-suite"
  }
}

resource "aws_rds_cluster_instance" "brisk" {
  count              = 2
  identifier         = "brisk-postgres-${count.index}"
  cluster_identifier = aws_rds_cluster.brisk.id
  instance_class     = "db.r6g.large"
  engine             = aws_rds_cluster.brisk.engine
  engine_version     = aws_rds_cluster.brisk.engine_version
}
```

### 5. ElastiCache Redis
```hcl
# terraform/redis.tf
resource "aws_elasticache_subnet_group" "brisk" {
  name       = "brisk-cache-subnet"
  subnet_ids = module.vpc.private_subnets
}

resource "aws_elasticache_replication_group" "brisk" {
  replication_group_id       = "brisk-redis"
  description                = "Redis cluster for Brisk Practice Suite"
  
  node_type                  = "cache.r6g.large"
  port                       = 6379
  parameter_group_name       = "default.redis7"
  
  num_cache_clusters         = 2
  automatic_failover_enabled = true
  multi_az_enabled          = true
  
  subnet_group_name = aws_elasticache_subnet_group.brisk.name
  security_group_ids = [aws_security_group.redis.id]
  
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  
  tags = {
    Environment = var.environment
    Application = "brisk-practice-suite"
  }
}
```

### 6. S3 Storage
```hcl
# terraform/s3.tf
resource "aws_s3_bucket" "brisk_documents" {
  bucket = "brisk-practice-documents-${var.environment}"
  
  tags = {
    Environment = var.environment
    Application = "brisk-practice-suite"
  }
}

resource "aws_s3_bucket_encryption_configuration" "brisk_documents" {
  bucket = aws_s3_bucket.brisk_documents.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_versioning" "brisk_documents" {
  bucket = aws_s3_bucket.brisk_documents.id
  versioning_configuration {
    status = "Enabled"
  }
}
```

### 7. Deploy Infrastructure
```bash
# Initialize Terraform
cd terraform
terraform init

# Plan deployment
terraform plan -var-file="environments/production.tfvars"

# Apply infrastructure
terraform apply -var-file="environments/production.tfvars"

# Get cluster credentials
aws eks update-kubeconfig --region us-west-2 --name brisk-cluster
```

## Monitoring & Observability

### 1. Prometheus & Grafana
```bash
# Add Helm repositories
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Install Prometheus
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --values monitoring/prometheus-values.yaml

# Install Grafana
helm install grafana grafana/grafana \
  --namespace monitoring \
  --values monitoring/grafana-values.yaml
```

### 2. Logging with ELK Stack
```bash
# Install Elasticsearch
helm install elasticsearch elastic/elasticsearch \
  --namespace logging \
  --create-namespace \
  --values logging/elasticsearch-values.yaml

# Install Kibana
helm install kibana elastic/kibana \
  --namespace logging \
  --values logging/kibana-values.yaml

# Install Filebeat
helm install filebeat elastic/filebeat \
  --namespace logging \
  --values logging/filebeat-values.yaml
```

## SSL/TLS Configuration

### 1. Cert-Manager Installation
```bash
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Create ClusterIssuer
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@briskpractice.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

## Backup & Disaster Recovery

### 1. Database Backups
```bash
# Automated backup script
#!/bin/bash
BACKUP_DIR="/backups/postgres"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="brisk_backup_${TIMESTAMP}.sql"

# Create backup
pg_dump -h $DB_HOST -U $DB_USER -d brisk > "${BACKUP_DIR}/${BACKUP_FILE}"

# Compress backup
gzip "${BACKUP_DIR}/${BACKUP_FILE}"

# Upload to S3
aws s3 cp "${BACKUP_DIR}/${BACKUP_FILE}.gz" s3://brisk-backups/postgres/

# Cleanup old backups (keep 30 days)
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete
```

### 2. Velero for Kubernetes Backups
```bash
# Install Velero
velero install \
  --provider aws \
  --plugins velero/velero-plugin-for-aws:v1.7.0 \
  --bucket brisk-k8s-backups \
  --backup-location-config region=us-west-2 \
  --snapshot-location-config region=us-west-2

# Create backup schedule
velero schedule create daily-backup \
  --schedule="0 2 * * *" \
  --include-namespaces brisk-practice
```

## Security Hardening

### 1. Network Policies
```yaml
# k8s/network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: brisk-network-policy
  namespace: brisk-practice
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: kube-system
  - to: []
    ports:
    - protocol: TCP
      port: 443
    - protocol: TCP
      port: 80
```

### 2. Pod Security Standards
```yaml
# k8s/pod-security-policy.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: brisk-practice
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

## Performance Optimization

### 1. Horizontal Pod Autoscaler
```yaml
# k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: brisk-api-hpa
  namespace: brisk-practice
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: brisk-api
  minReplicas: 3
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### 2. Vertical Pod Autoscaler
```yaml
# k8s/vpa.yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: brisk-api-vpa
  namespace: brisk-practice
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: brisk-api
  updatePolicy:
    updateMode: "Auto"
  resourcePolicy:
    containerPolicies:
    - containerName: api
      maxAllowed:
        cpu: 2
        memory: 4Gi
      minAllowed:
        cpu: 100m
        memory: 256Mi
```

## Troubleshooting

### Common Issues

1. **Pod Startup Failures**
```bash
# Check pod logs
kubectl logs -n brisk-practice deployment/brisk-api

# Describe pod for events
kubectl describe pod -n brisk-practice <pod-name>

# Check resource constraints
kubectl top pods -n brisk-practice
```

2. **Database Connection Issues**
```bash
# Test database connectivity
kubectl run -it --rm debug --image=postgres:15-alpine --restart=Never -- \
  psql -h postgres-service -U brisk -d brisk

# Check database service
kubectl get svc -n brisk-practice postgres-service
```

3. **Ingress Issues**
```bash
# Check ingress controller logs
kubectl logs -n ingress-nginx deployment/ingress-nginx-controller

# Verify ingress configuration
kubectl describe ingress -n brisk-practice brisk-ingress
```

### Health Checks
```bash
# API health check
curl -f http://api.briskpractice.com/health

# Database health check
kubectl exec -it -n brisk-practice deployment/brisk-api -- \
  python -c "import psycopg2; print('DB OK')"

# Redis health check
kubectl exec -it -n brisk-practice deployment/brisk-api -- \
  redis-cli -h redis-service ping
```

This deployment guide provides a comprehensive approach to deploying Brisk Practice Suite in production environments with proper security, monitoring, and disaster recovery capabilities.
