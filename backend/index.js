import express from 'express';
import { WebSocketServer } from 'ws';
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const PORT = 5000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var arr = ['','','',''];

app.use(cors({
    origin: "http://localhost:5173",  // Allow React frontend
    methods: ["GET", "POST"],         // Allow specific methods
    allowedHeaders: ["Content-Type"]  // Allow specific headers
}));

const wss = new WebSocketServer({ host: "0.0.0.0", port: 8080 });
let receivedMessage = '';
let waitingResolvers = [];
wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        receivedMessage = message.toString();

        // Respond to any waiting HTTP requests
        waitingResolvers.forEach(resolve => resolve(receivedMessage));
        waitingResolvers = []; // Clear the list after resolving
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

app.get('/', (req, res) =>{
    res.sendFile(__dirname+"/views/index.html");
})

app.post('/send', (req,res)=>{
    const  message  = "Hello World";
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // Broadcast message to all WebSocket clients
    wss.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(message);
        }
    });

    res.json({ status: 'Message sent' });
})

let index = 0;

app.get('/receive', async (req, res) => {
    if (receivedMessage) {
        const messageToSend = receivedMessage;
        receivedMessage = null;  // ✅ Reset after sending
        return res.json({ message: messageToSend });
    }

    console.log('Waiting for a WebSocket message...');
    const message = await new Promise((resolve) => {
        waitingResolvers.push(resolve);
    });

    res.json({ message });
});

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
})

