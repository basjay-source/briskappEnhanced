# AI Adviser API Configuration Guide

## Overview
The Advanced AI Adviser System integrates with multiple official UK government APIs to provide real-time, accurate information. This guide explains how to configure API credentials.

## Required API Keys

### 1. HMRC API (HM Revenue & Customs)
**Purpose:** Real-time tax data, MTD submissions, compliance information

**How to obtain:**
1. Visit: https://developer.service.hmrc.gov.uk/
2. Create a developer account
3. Register your application
4. Subscribe to the following APIs:
   - Individual Tax API
   - Corporation Tax API
   - VAT API
   - Self Assessment API
   - Making Tax Digital (MTD)

**Configuration:**
```bash
# Add to .env file
REACT_APP_HMRC_API_KEY=your_hmrc_api_key_here
REACT_APP_HMRC_CLIENT_ID=your_client_id
REACT_APP_HMRC_CLIENT_SECRET=your_client_secret
```

**Available Endpoints:**
- `/organisations/vat/{vrn}/obligations` - VAT obligations
- `/individuals/self-assessment/{utr}` - SA data
- `/organisations/corporation-tax/{utr}` - CT data
- `/organisations/details/paye/{payeReference}` - PAYE data

### 2. Companies House API
**Purpose:** Company information, director details, filing history

**How to obtain:**
1. Visit: https://developer.company-information.service.gov.uk/
2. Register for an API key (free)
3. No application approval needed for basic access

**Configuration:**
```bash
# Add to .env file
REACT_APP_COMPANIES_HOUSE_API_KEY=your_companies_house_key_here
```

**Available Endpoints:**
- `/search/companies` - Search for companies
- `/company/{company_number}` - Company profile
- `/company/{company_number}/officers` - Director information
- `/company/{company_number}/filing-history` - Filing records
- `/company/{company_number}/persons-with-significant-control` - PSC data

### 3. OpenAI API (Optional - For Enhanced Conversational AI)
**Purpose:** Advanced natural language processing

**How to obtain:**
1. Visit: https://platform.openai.com/
2. Create an account
3. Navigate to API keys section
4. Create a new API key

**Configuration:**
```bash
# Add to .env file
REACT_APP_OPENAI_API_KEY=your_openai_key_here
```

## Environment Setup

### Development Environment
Create a `.env.local` file in the frontend directory:

```bash
# HMRC Configuration
REACT_APP_HMRC_API_KEY=your_hmrc_key
REACT_APP_HMRC_CLIENT_ID=your_client_id
REACT_APP_HMRC_CLIENT_SECRET=your_client_secret
REACT_APP_HMRC_REDIRECT_URI=http://localhost:3000/hmrc/callback

# Companies House Configuration
REACT_APP_COMPANIES_HOUSE_API_KEY=your_ch_key

# OpenAI Configuration (Optional)
REACT_APP_OPENAI_API_KEY=your_openai_key

# Feature Flags
REACT_APP_ENABLE_HMRC_INTEGRATION=true
REACT_APP_ENABLE_CH_INTEGRATION=true
REACT_APP_ENABLE_AI_CONVERSATION=true
```

### Production Environment
Set environment variables in your hosting platform:

**Vercel/Netlify:**
```bash
vercel env add REACT_APP_HMRC_API_KEY
vercel env add REACT_APP_COMPANIES_HOUSE_API_KEY
```

**AWS/Docker:**
Add to your deployment configuration or container environment variables.

## API Usage & Rate Limits

### HMRC API
- **Sandbox Environment:** Unlimited (for testing)
- **Production Environment:** 
  - Rate limit: 3 requests per second per application
  - OAuth 2.0 authentication required
  - Fraud prevention headers mandatory

### Companies House API
- **Rate Limit:** 600 requests per 5 minutes
- **Authentication:** Basic auth with API key
- **Free tier:** Unlimited basic requests

### OpenAI API
- **Rate Limits:** Vary by tier (see OpenAI pricing)
- **Costs:** Pay per token usage
- **Recommended Model:** GPT-4 for professional responses

## Security Best Practices

### 1. Never Commit API Keys
```bash
# Add to .gitignore
.env
.env.local
.env.production
.env.development
```

### 2. Use Environment Variables
```typescript
// Good
const apiKey = process.env.REACT_APP_HMRC_API_KEY

// Bad
const apiKey = 'sk-abc123xyz' // Never hardcode!
```

### 3. Implement Backend Proxy (Recommended)
For production, proxy API calls through your backend to keep keys secure:

```typescript
// Frontend calls your backend
fetch('/api/hmrc/proxy', { ... })

// Backend makes actual HMRC call with keys
// Keys never exposed to client
```

### 4. Rotate Keys Regularly
- Rotate API keys every 90 days
- Use separate keys for development/production
- Revoke compromised keys immediately

## Testing Without API Keys

The system includes fallback mechanisms:

### Sandbox Mode
```bash
REACT_APP_USE_SANDBOX=true
```

When API keys are not configured:
- System uses high-quality simulated data
- All features remain functional
- Responses clearly indicate "Sandbox Mode"
- Perfect for development and testing

### Mock Data Sources
- Tax rates from cached official data
- Company data from public records
- Regulatory updates from RSS feeds

## Verification & Testing

### Test HMRC Connection
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.service.hmrc.gov.uk/hello/world
```

Expected response: `{"message":"Hello World"}`

### Test Companies House Connection
```bash
curl -u YOUR_KEY: \
  https://api.company-information.service.gov.uk/company/00000006
```

Expected response: Company data for MARINE AND GENERAL MUTUAL LIFE ASSURANCE SOCIETY

### Test Within Application
1. Navigate to any module with AI Adviser
2. Ask: "What are the current tax rates?"
3. Check response metadata for data sources
4. Look for "Sources: HMRC" or "Sources: Companies House"

## Troubleshooting

### Common Issues

**"API credentials required"**
- Check environment variables are set
- Verify .env file is in correct location
- Restart development server after adding keys

**"CORS Error"**
- HMRC/CH APIs require backend proxy
- Cannot call directly from browser
- Implement server-side proxy

**"Rate limit exceeded"**
- Implement request caching
- Add exponential backoff
- Consider upgrading API tier

**"Authentication failed"**
- Verify API key is correct
- Check key hasn't expired
- Ensure proper authorization header

## Support & Resources

### Official Documentation
- **HMRC:** https://developer.service.hmrc.gov.uk/api-documentation
- **Companies House:** https://developer.company-information.service.gov.uk/api/docs/
- **OpenAI:** https://platform.openai.com/docs

### Application Support
- Check console logs for detailed errors
- Enable debug mode: `REACT_APP_DEBUG_AI=true`
- View API call logs in browser DevTools

### Getting Help
1. Review API documentation
2. Check application logs
3. Contact support with:
   - Error messages
   - API endpoint being called
   - Environment configuration (without keys!)

## Compliance & Legal

### Data Protection
- All API calls comply with GDPR
- User data encrypted in transit (HTTPS)
- No sensitive data logged
- API keys stored securely

### HMRC Requirements
- Client must consent to data sharing
- Fraud prevention headers required
- OAuth scopes must match usage
- Terms of use must be followed

### Companies House Requirements
- Public data only
- Rate limits must be respected
- Commercial use permitted (check ToS)
- Attribution recommended

## Advanced Configuration

### Custom Endpoints
```typescript
// Override default endpoints
REACT_APP_HMRC_BASE_URL=https://your-proxy.com/hmrc
REACT_APP_CH_BASE_URL=https://your-proxy.com/ch
```

### Feature Toggles
```typescript
// Enable/disable specific integrations
REACT_APP_ENABLE_REAL_TIME_TAX_RATES=true
REACT_APP_ENABLE_COMPANY_LOOKUP=true
REACT_APP_ENABLE_FILING_STATUS=true
```

### Caching Strategy
```typescript
// Configure API response caching
REACT_APP_CACHE_TAX_RATES=3600    # 1 hour
REACT_APP_CACHE_COMPANY_DATA=86400 # 24 hours
```

---

## Quick Start Checklist

- [ ] Obtain HMRC API key from developer portal
- [ ] Obtain Companies House API key
- [ ] (Optional) Obtain OpenAI API key
- [ ] Create `.env.local` file
- [ ] Add API keys to environment file
- [ ] Add `.env.local` to `.gitignore`
- [ ] Restart development server
- [ ] Test API connections
- [ ] Verify data sources in AI responses
- [ ] Configure caching if needed
- [ ] Set up backend proxy for production

---

**Last Updated:** ${new Date().toISOString().split('T')[0]}
**Version:** 1.0.0
