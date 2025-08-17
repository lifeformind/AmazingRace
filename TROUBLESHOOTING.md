# AmazingRace - Troubleshooting Guide

## Common Issues and Solutions

### 1. "GOOGLE_API_KEY is required" Error

**Problem**: The application can't find your Google AI Studio API key.

**Solution**:
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. Edit `.env` file and replace `your_api_key_here` with your actual key:
   ```
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

### 2. "Connection test failed" Error

**Possible Causes & Solutions**:

- **Invalid API Key**: Double-check your API key in Google AI Studio
- **Network Issues**: Verify internet connection
- **API Quota Exceeded**: Check your usage in Google AI Studio
- **Region Restrictions**: Some regions may have limited access

### 3. Installation Issues

**Problem**: npm install fails or packages are missing.

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 4. Node.js Version Issues

**Problem**: Application doesn't work with older Node.js versions.

**Solution**: Ensure you're using Node.js v14 or higher:
```bash
node --version  # Should be v14.0.0 or higher
```

### 5. Permission Denied Errors

**Problem**: API returns permission denied errors.

**Solution**:
- Verify your API key has the correct permissions in Google AI Studio
- Check if your Google Cloud project (if applicable) has the necessary APIs enabled

## Testing Your Setup

### Quick Test
```bash
npm start
```

### Interactive Mode
```bash
npm run interactive
```

### Manual Verification
1. Create a test file:
```javascript
const { JulesAgentSimple } = require('./index');

async function test() {
    const jules = new JulesAgentSimple();
    const result = await jules.initialize();
    console.log('Initialization:', result ? 'Success' : 'Failed');
}

test();
```

## Getting Help

If you're still experiencing issues:

1. Check the [Google AI Studio documentation](https://ai.google.dev/)
2. Verify your API key works in Google AI Studio directly
3. Review the error messages carefully - they often contain specific guidance
4. Ensure all dependencies are installed: `npm list`

## Environment Variables Reference

```bash
# Required
GOOGLE_API_KEY=your_api_key_here

# Optional
MODEL_NAME=gemini-pro          # AI model to use
AGENT_NAME=Jules               # Name for your agent
PROJECT_NAME=AmazingRace       # Project identifier
```