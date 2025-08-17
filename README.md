# AmazingRace

A project integrating Google's Jules agent (Google AI/Gemini) for interactive tasks and conversations.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Google AI Studio API key

### Setup

1. **Clone and navigate to the repository**
   ```bash
   cd AmazingRace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run setup verification**
   ```bash
   npm run test-setup
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Google AI Studio API key:
   ```
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

5. **Get your API key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy it to your `.env` file

6. **Run the demo**
   ```bash
   npm start
   ```

### Alternative: Interactive Mode
```bash
npm run interactive
```

## 🤖 Using Jules Agent

### Basic Usage

```javascript
const JulesAgent = require('./jules-agent');

async function example() {
    const jules = new JulesAgent();
    await jules.initialize();
    
    // Simple chat
    const response = await jules.chat('Hello Jules!');
    console.log(response);
    
    // Run a task
    const result = await jules.runTask('Plan a race game', {
        participants: 4,
        theme: 'amazing race'
    });
    console.log(result);
}
```

### Available Scripts

- `npm start` - Run the main demo
- `npm run interactive` - Start interactive chat mode
- `npm run test-setup` - Verify your setup is correct

### Jules Agent Methods

- `jules.initialize()` - Initialize the agent
- `jules.chat(message, context)` - Chat with the agent
- `jules.runTask(task, parameters)` - Execute a specific task
- `jules.testConnection()` - Test API connectivity

## 🔧 Configuration

Environment variables in `.env`:

- `GOOGLE_API_KEY` - Your Google AI Studio API key (required)
- `MODEL_NAME` - AI model to use (default: gemini-pro)
- `AGENT_NAME` - Name for your agent (default: Jules)

## 📁 Project Structure

```
AmazingRace/
├── README.md              # Main documentation
├── TROUBLESHOOTING.md     # Detailed troubleshooting guide
├── package.json           # Node.js project configuration
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── index.js              # Main demo script
├── interactive.js        # Interactive chat mode
├── test-setup.js         # Setup verification tests
├── jules-agent.js        # Advanced agent implementation
└── jules-agent-simple.js # Simple agent implementation (recommended)
```

## 🎯 Features

- ✅ Google AI/Gemini integration
- ✅ Simple chat interface
- ✅ Task execution framework
- ✅ Interactive command-line mode
- ✅ Error handling and connection testing
- ✅ Configurable parameters
- ✅ Environment-based configuration
- ✅ Setup verification tests
- ✅ Comprehensive documentation

## 🛠️ Troubleshooting

### Common Issues

1. **"GOOGLE_API_KEY is required" error**
   - Make sure you've created a `.env` file from `.env.example`
   - Verify your API key is correctly set in the `.env` file

2. **"Connection test failed" error**
   - Check your internet connection
   - Verify your API key is valid and active
   - Ensure you have sufficient quota in Google AI Studio

3. **Dependencies issues**
   - Run `npm install` to ensure all packages are installed
   - Check that you're using Node.js v14 or higher

## 📝 License

ISC