import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
import MarkdownIt from 'markdown-it';

const genAI = new GoogleGenerativeAI("AIzaSyATvovzUQbtNKjGWHVsftzUCqR-g96-pqw");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const md = new MarkdownIt();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow JSON requests

// API Route
app.get('/api/data1', async (req, res) => {
    const prompt = "What do you think about the yolovg3 model. Give the response in markdown format. ";

    const result = await model.generateContent(prompt);
    const htmlContent = md.render(result.response.text());
    res.json({ message: htmlContent  });
    console.log(result.response.text());
    
});

// Start Server
const PORT = 5000; // Change if needed
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
