const { GoogleAuth } = require('google-auth-library');
const { GenerativeServiceClient } = require('@google-ai/generativelanguage');
require('dotenv').config();

class JulesAgent {
    constructor() {
        this.apiKey = process.env.GOOGLE_API_KEY;
        this.modelName = process.env.MODEL_NAME || 'gemini-pro';
        this.agentName = process.env.AGENT_NAME || 'Jules';
        
        if (!this.apiKey) {
            throw new Error('GOOGLE_API_KEY is required. Please set it in your .env file.');
        }
        
        // Initialize the client
        this.auth = new GoogleAuth({
            credentials: {
                type: 'service_account',
                private_key: process.env.GOOGLE_PRIVATE_KEY,
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                client_id: process.env.GOOGLE_CLIENT_ID,
                auth_uri: "https://accounts.google.com/o/oauth2/auth",
                token_uri: "https://oauth2.googleapis.com/token",
            },
            scopes: ['https://www.googleapis.com/auth/generative-language']
        });
        
        this.client = new GenerativeServiceClient({
            authClient: this.auth,
        });
    }

    async initialize() {
        try {
            console.log(`Initializing ${this.agentName} agent...`);
            // Test the connection
            await this.testConnection();
            console.log(`${this.agentName} agent initialized successfully!`);
            return true;
        } catch (error) {
            console.error('Failed to initialize Jules agent:', error.message);
            return false;
        }
    }

    async testConnection() {
        // Simple test to verify the agent can connect to Google's API
        const request = {
            model: `models/${this.modelName}`,
            prompt: {
                text: 'Hello, this is a connection test.'
            }
        };
        
        try {
            const [response] = await this.client.generateText(request);
            return response;
        } catch (error) {
            throw new Error(`Connection test failed: ${error.message}`);
        }
    }

    async chat(message, context = {}) {
        try {
            const request = {
                model: `models/${this.modelName}`,
                prompt: {
                    text: message
                },
                temperature: context.temperature || 0.7,
                candidateCount: 1,
                maxOutputTokens: context.maxTokens || 1000,
            };

            const [response] = await this.client.generateText(request);
            
            if (response.candidates && response.candidates.length > 0) {
                return {
                    success: true,
                    response: response.candidates[0].output,
                    agent: this.agentName
                };
            } else {
                return {
                    success: false,
                    error: 'No response generated',
                    agent: this.agentName
                };
            }
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
        
        const taskPrompt = `Task: ${task}\nParameters: ${JSON.stringify(parameters)}\nPlease help me complete this task.`;
        
        return await this.chat(taskPrompt, parameters);
    }
}

module.exports = JulesAgent;