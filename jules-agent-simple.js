const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

class JulesAgentSimple {
    constructor() {
        this.apiKey = process.env.GOOGLE_API_KEY;
        this.modelName = process.env.MODEL_NAME || 'gemini-pro';
        this.agentName = process.env.AGENT_NAME || 'Jules';
        
        if (!this.apiKey) {
            throw new Error('GOOGLE_API_KEY is required. Please set it in your .env file.');
        }
        
        // Initialize the Google Generative AI client
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.model = this.genAI.getGenerativeModel({ model: this.modelName });
    }

    async initialize() {
        try {
            console.log(`Initializing ${this.agentName} agent...`);
            // Test the connection with a simple prompt
            await this.testConnection();
            console.log(`${this.agentName} agent initialized successfully!`);
            return true;
        } catch (error) {
            console.error('Failed to initialize Jules agent:', error.message);
            
            // Provide helpful error messages
            if (error.message.includes('API_KEY_INVALID')) {
                console.error('❌ Invalid API key. Please check your GOOGLE_API_KEY in .env file.');
            } else if (error.message.includes('PERMISSION_DENIED')) {
                console.error('❌ Permission denied. Make sure your API key has the correct permissions.');
            } else if (error.message.includes('QUOTA_EXCEEDED')) {
                console.error('❌ API quota exceeded. Please check your Google AI Studio usage.');
            }
            
            return false;
        }
    }

    async testConnection() {
        try {
            const result = await this.model.generateContent("Hello! This is a connection test.");
            return result.response.text();
        } catch (error) {
            throw new Error(`Connection test failed: ${error.message}`);
        }
    }

    async chat(message, options = {}) {
        try {
            const {
                temperature = 0.7,
                maxOutputTokens = 1000,
                topK = 32,
                topP = 1
            } = options;

            // Configure generation parameters
            const generationConfig = {
                temperature,
                topK,
                topP,
                maxOutputTokens,
            };

            const result = await this.model.generateContent({
                contents: [{ role: 'user', parts: [{ text: message }] }],
                generationConfig
            });

            return {
                success: true,
                response: result.response.text(),
                agent: this.agentName,
                metadata: {
                    candidateCount: result.response.candidates?.length || 0,
                    finishReason: result.response.candidates?.[0]?.finishReason
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                agent: this.agentName
            };
        }
    }

    async runTask(task, parameters = {}) {
        console.log(`${this.agentName} is running task: ${task}`);
        
        const taskPrompt = `
Task: ${task}
Parameters: ${JSON.stringify(parameters, null, 2)}

Please help me complete this task. Provide a clear, actionable response.
`;
        
        return await this.chat(taskPrompt, parameters);
    }

    async askQuestion(question, context = '') {
        const prompt = context 
            ? `Context: ${context}\n\nQuestion: ${question}\n\nPlease provide a helpful answer based on the context.`
            : question;
            
        return await this.chat(prompt);
    }

    async brainstorm(topic, count = 5) {
        const prompt = `Please brainstorm ${count} creative ideas about: ${topic}. Format your response as a numbered list.`;
        return await this.chat(prompt);
    }
}

module.exports = JulesAgentSimple;