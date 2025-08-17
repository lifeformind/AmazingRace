const JulesAgent = require('./jules-agent');
const JulesAgentSimple = require('./jules-agent-simple');

async function main() {
    console.log('=== AmazingRace - Google Jules Agent Demo ===\n');
    
    try {
        // Try the simple version first (recommended)
        console.log('Attempting to use Jules Agent (Simple API)...');
        const jules = new JulesAgentSimple();
        
        const initialized = await jules.initialize();
        if (!initialized) {
            console.error('Failed to initialize Jules agent. Please check your configuration.');
            process.exit(1);
        }
        
        console.log('\n=== Running Demo Tasks ===\n');
        
        // Demo 1: Simple chat
        console.log('1. Testing basic chat functionality...');
        const chatResult = await jules.chat('Hello Jules! Can you introduce yourself as an AI assistant for the AmazingRace project?');
        if (chatResult.success) {
            console.log('✅ Jules Response:', chatResult.response);
        } else {
            console.log('❌ Chat failed:', chatResult.error);
        }
        
        // Demo 2: Task execution
        console.log('\n2. Testing task execution...');
        const taskResult = await jules.runTask('Plan a simple amazing race game', {
            participants: 4,
            theme: 'adventure and teamwork',
            duration: '30 minutes',
            location: 'office or home environment'
        });
        if (taskResult.success) {
            console.log('✅ Task Result:', taskResult.response);
        } else {
            console.log('❌ Task failed:', taskResult.error);
        }

        // Demo 3: Question answering
        console.log('\n3. Testing question answering...');
        const qaResult = await jules.askQuestion(
            'What makes a good team building activity?',
            'We are planning activities for an AmazingRace style team building event'
        );
        if (qaResult.success) {
            console.log('✅ Q&A Result:', qaResult.response);
        } else {
            console.log('❌ Q&A failed:', qaResult.error);
        }

        // Demo 4: Brainstorming
        console.log('\n4. Testing brainstorming...');
        const brainstormResult = await jules.brainstorm('fun challenges for an office amazing race', 3);
        if (brainstormResult.success) {
            console.log('✅ Brainstorm Result:', brainstormResult.response);
        } else {
            console.log('❌ Brainstorm failed:', brainstormResult.error);
        }
        
        console.log('\n=== Demo Complete ===');
        console.log('\n🎉 Your Google Jules agent is now working in the AmazingRace repository!');
        
    } catch (error) {
        console.error('Error running demo:', error.message);
        
        if (error.message.includes('GOOGLE_API_KEY')) {
            console.log('\n📝 Setup Instructions:');
            console.log('1. Copy .env.example to .env');
            console.log('2. Get your API key from https://makersuite.google.com/app/apikey');
            console.log('3. Add your API key to the .env file');
            console.log('4. Run npm install to install dependencies');
            console.log('5. Run npm start to test the agent');
        }
    }
}

// Run the demo if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = { JulesAgent, JulesAgentSimple };