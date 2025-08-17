/**
 * Simple test to verify the Jules Agent structure works correctly
 * This doesn't require an API key - just tests the basic setup
 */

const fs = require('fs');
const path = require('path');

function runTests() {
    console.log('🧪 Running AmazingRace Setup Tests...\n');
    
    let passed = 0;
    let total = 0;
    
    function test(description, condition) {
        total++;
        if (condition) {
            console.log(`✅ ${description}`);
            passed++;
        } else {
            console.log(`❌ ${description}`);
        }
    }
    
    // Test 1: Required files exist
    test('package.json exists', fs.existsSync('./package.json'));
    test('jules-agent.js exists', fs.existsSync('./jules-agent.js'));
    test('jules-agent-simple.js exists', fs.existsSync('./jules-agent-simple.js'));
    test('index.js exists', fs.existsSync('./index.js'));
    test('.env.example exists', fs.existsSync('./.env.example'));
    test('.gitignore exists', fs.existsSync('./.gitignore'));
    test('README.md exists', fs.existsSync('./README.md'));
    
    // Test 2: Package.json is valid
    try {
        const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        test('package.json is valid JSON', true);
        test('package.json has required dependencies', 
             pkg.dependencies && 
             pkg.dependencies['@google/generative-ai'] && 
             pkg.dependencies['dotenv']);
        test('package.json has start script', 
             pkg.scripts && pkg.scripts.start);
    } catch (e) {
        test('package.json is valid JSON', false);
        test('package.json has required dependencies', false);
        test('package.json has start script', false);
    }
    
    // Test 3: Environment example is properly configured
    try {
        const envExample = fs.readFileSync('./.env.example', 'utf8');
        test('.env.example contains GOOGLE_API_KEY', envExample.includes('GOOGLE_API_KEY'));
        test('.env.example has setup instructions', envExample.includes('makersuite.google.com'));
    } catch (e) {
        test('.env.example contains GOOGLE_API_KEY', false);
        test('.env.example has setup instructions', false);
    }
    
    // Test 4: Code structure tests
    try {
        const JulesAgent = require('./jules-agent');
        test('jules-agent.js exports a class', typeof JulesAgent === 'function');
        
        const JulesAgentSimple = require('./jules-agent-simple');
        test('jules-agent-simple.js exports a class', typeof JulesAgentSimple === 'function');
        
        const { JulesAgent: IndexJules, JulesAgentSimple: IndexJulesSimple } = require('./index');
        test('index.js exports both agent classes', 
             typeof IndexJules === 'function' && typeof IndexJulesSimple === 'function');
    } catch (e) {
        test('jules-agent.js exports a class', false);
        test('jules-agent-simple.js exports a class', false);
        test('index.js exports both agent classes', false);
    }
    
    // Test 5: Agent instantiation (without API key)
    try {
        // This should fail gracefully with a helpful error message
        const JulesAgentSimple = require('./jules-agent-simple');
        try {
            new JulesAgentSimple();
            test('Agent handles missing API key gracefully', false);
        } catch (error) {
            test('Agent handles missing API key gracefully', 
                 error.message.includes('GOOGLE_API_KEY is required'));
        }
    } catch (e) {
        test('Agent handles missing API key gracefully', false);
    }
    
    // Test 6: README content
    try {
        const readme = fs.readFileSync('./README.md', 'utf8');
        test('README contains setup instructions', readme.includes('Quick Start'));
        test('README contains troubleshooting info', readme.includes('Troubleshooting'));
        test('README mentions Google AI Studio', readme.includes('makersuite.google.com'));
    } catch (e) {
        test('README contains setup instructions', false);
        test('README contains troubleshooting info', false);
        test('README mentions Google AI Studio', false);
    }
    
    console.log(`\n📊 Test Results: ${passed}/${total} tests passed`);
    
    if (passed === total) {
        console.log('🎉 All tests passed! Your AmazingRace setup is ready.');
        console.log('\n📝 Next steps:');
        console.log('1. Copy .env.example to .env');
        console.log('2. Add your Google AI Studio API key');
        console.log('3. Run: npm start');
    } else {
        console.log('❌ Some tests failed. Please check the setup.');
    }
    
    return passed === total;
}

if (require.main === module) {
    runTests();
}

module.exports = { runTests };