const { JulesAgentSimple } = require('./index');

/**
 * Interactive CLI for testing Jules Agent
 * Run with: node interactive.js
 */
async function interactiveMode() {
    console.log('🤖 Jules Agent Interactive Mode');
    console.log('================================\n');

    try {
        const jules = new JulesAgentSimple();
        const initialized = await jules.initialize();
        
        if (!initialized) {
            console.error('❌ Failed to initialize Jules agent.');
            process.exit(1);
        }

        console.log('✅ Jules is ready! Type your messages below.');
        console.log('Commands: /help, /task <description>, /brainstorm <topic>, /quit\n');

        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'You: '
        });

        rl.prompt();

        rl.on('line', async (input) => {
            const trimmedInput = input.trim();
            
            if (trimmedInput === '/quit' || trimmedInput === '/exit') {
                console.log('👋 Goodbye!');
                rl.close();
                return;
            }
            
            if (trimmedInput === '/help') {
                console.log('\n📖 Available Commands:');
                console.log('/help - Show this help message');
                console.log('/task <description> - Run a specific task');
                console.log('/brainstorm <topic> - Brainstorm ideas about a topic');
                console.log('/quit - Exit the interactive mode');
                console.log('Or just type any message to chat with Jules!\n');
                rl.prompt();
                return;
            }
            
            if (trimmedInput.startsWith('/task ')) {
                const task = trimmedInput.substring(6);
                console.log(`\n🎯 Running task: ${task}`);
                const result = await jules.runTask(task);
                console.log(`Jules: ${result.success ? result.response : 'Error: ' + result.error}\n`);
                rl.prompt();
                return;
            }
            
            if (trimmedInput.startsWith('/brainstorm ')) {
                const topic = trimmedInput.substring(12);
                console.log(`\n💡 Brainstorming: ${topic}`);
                const result = await jules.brainstorm(topic);
                console.log(`Jules: ${result.success ? result.response : 'Error: ' + result.error}\n`);
                rl.prompt();
                return;
            }
            
            if (trimmedInput) {
                console.log('\n🤖 Jules is thinking...');
                const result = await jules.chat(trimmedInput);
                console.log(`Jules: ${result.success ? result.response : 'Error: ' + result.error}\n`);
            }
            
            rl.prompt();
        });

        rl.on('close', () => {
            console.log('\n👋 Interactive session ended.');
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ Error starting interactive mode:', error.message);
        
        if (error.message.includes('GOOGLE_API_KEY')) {
            console.log('\n📝 Please set up your API key first:');
            console.log('1. cp .env.example .env');
            console.log('2. Add your Google AI Studio API key to .env');
            console.log('3. Run: npm start');
        }
    }
}

if (require.main === module) {
    interactiveMode();
}