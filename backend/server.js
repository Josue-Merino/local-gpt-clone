import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const DB_NAME = process.env.DB_NAME || 'localgpt_db';

const client = new MongoClient(MONGODB_URI);
await client.connect();
console.log('✅ Conectado a MongoDB');
const db = client.db(DB_NAME);
const historyCollection = db.collection('history');

// Endpoint para comunicarse con la IA Local (Ollama)
app.post('/api/ask', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'El prompt es requerido' });

    try {
        const ollamaResponse = await axios.post('http://localhost:11434/api/generate', {
            model: 'qwen2.5:0.5b',
            prompt,
            max_tokens: 500,
            stream: false,
        });

        let result = ollamaResponse.data?.response || '';
        // Limpiamos el pensamiento de la IA desde el backend para enviar una respuesta limpia al front
        result = result.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
        
        res.json({ response: result });
    } catch (error) {
        console.error('Error en /api/ask:', error);
        res.status(500).json({ error: 'Error comunicándose con Ollama' });
    }
});

// Endpoints CRUD para el historial de chats
app.get('/api/history', async (req, res) => {
    try {
        const history = await historyCollection.find().sort({ createdAt: -1 }).toArray();
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el historial' });
    }
});

app.post('/api/history', async (req, res) => {
    const { title, messages } = req.body;
    try {
        const newChat = { title, messages, createdAt: new Date() };
        const result = await historyCollection.insertOne(newChat);
        res.status(201).json({ message: 'Chat guardado', id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: 'Error al guardar el chat' });
    }
});

app.listen(port, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${port}`);
});