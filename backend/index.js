import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
import MarkdownIt from 'markdown-it';

const genAI = new GoogleGenerativeAI("#");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const md = new MarkdownIt();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow JSON requests

// API Route
app.get('/api/data1', async (req, res) => {
    const prompt = "I am creating an app which detects if a fruit is rotten or not. For a sample test of a banana, my ML model gave detected ripe with 80% confidence. Gas sensor detected 50ppm of ethylene. ELectrical impedance analysis detected 2.5 ohms and piezoelectric sensor gave firmness output of 1.2N . What do you think is the fruit ripe or rotten? Give a detailed report of the analysis and the response should be in markdown format. ";

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
