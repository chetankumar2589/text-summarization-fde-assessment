# Text Summarization API through n8n

## Overview
This project implements an end-to-end text summarization system using n8n workflow automation and a React frontend, integrated with the Groq LLM API (Llama-3.3-70b-versatile).

## System Architecture

### Components
1. **n8n Workflow** - Automation backend
2. **React Frontend** - User interface
3. **Groq API** - LLM for text summarization
4. **ngrok** - Tunneling service for local development

### Data Flow
User Input (React) → ngrok → n8n Webhook → Groq API → n8n Response → React Display


## n8n Workflow Design

### Workflow Nodes
1. **Webhook (Trigger)**
   - Method: POST
   - Path: `/text-summary`
   - Receives: `{ text_to_analyze: string }`

2. **HTTP Request (Groq API)**
   - Endpoint: `https://api.groq.com/openai/v1/chat/completions`
   - Model: `llama-3.3-70b-versatile`
   - Purpose: Generates text summary

3. **Set (Data Formatting)**
   - Extracts summary from API response
   - Formats: `{ final_result: string }`

4. **Respond to Webhook**
   - Returns formatted JSON to frontend

### Workflow File
- Location: `n8n-workflow.json`
- Export Date: November 4, 2025

## Frontend Architecture

### Technology Stack
- **React** (Class Components)
- **Fetch API** (HTTP requests)
- **CSS** (Custom styling)

### Components
1. **App.js** - Main application container, state management
2. **TextAnalyzer.js** - Text input and submission
3. **ResultDisplay.js** - Summary display and actions

### Key Features
- Input validation (minimum 10 characters)
- Loading states
- Error handling
- Copy to clipboard functionality
- Responsive design

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- Docker
- ngrok account

### n8n Setup (Since I have a local, self-hosted n8n setup, I have used this.)
1. Start n8n via Docker:
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n


2. Import workflow:
- Open http://localhost:5678
- Import `n8n-workflow.json`
- Activate workflow

3. Start ngrok tunnel:
ngrok http 5678


### Frontend Setup
1. Navigate to frontend directory:
cd text-summarizer-frontend


2. Install dependencies:
npm install


3. Update API endpoint in code (if ngrok URL changed)

4. Start development server:
npm start


## API Integration

### Request Format
POST https://YOUR-NGROK-URL/webhook/text-summary
Content-Type: application/json

{
"text_to_analyze": "Your text here"
}


### Response Format

{
"final_result": "Summarized text here"
}


## Tools & Technologies

| Tool | Purpose | Version |
|------|---------|---------|
| n8n | Workflow automation | Latest |
| React | Frontend framework | 18.x |
| Groq API | LLM service | Llama-3.3-70b |
| ngrok | Local tunneling | 3.x |
| Docker | Container runtime | Latest |

## Implementation Approach

### Design Decisions
1. **Class Components** - Used for explicit state management
2. **Groq over Gemini** - Better reliability and speed
3. **ngrok** - Quick local-to-public URL mapping
4. **Separate CSS files** - Maintainable styling

### Challenges & Solutions
- **Challenge**: Webhook registration errors in n8n
- **Solution**: Proper "Respond" configuration in Webhook node

- **Challenge**: CORS issues
- **Solution**: n8n handles CORS automatically for webhooks

## Demo Credentials
- n8n: Local Docker instance
- Groq API Key: [In workflow configuration]
- ngrok URL: `https://dbda8fb469cd.ngrok-free.app`

## Time Taken
- n8n Workflow: 45 minutes
- React Frontend: 30 minutes
- Integration & Testing: 15 minutes
- Documentation: 10 minutes
- **Total: ~100 minutes (under 2.5 hours)**

## Author
Patruni Chetan Kumar
Date: November 4, 2025
Text Summarization API
