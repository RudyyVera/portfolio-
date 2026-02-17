import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend')); // Servir archivos estáticos desde frontend

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '../frontend' });
});

app.post('/chat', async (req, res) => {
  const { messages, model = 'deepseek/deepseek-r1-0528:free' } = req.body;

  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'Free ChatBot Demo'
    },
    body: JSON.stringify({ model, messages })
  });

  const data = await r.json();
  res.status(r.status).json(data);
});

app.listen(8787, () => console.log('Proxy en http://localhost:8787'));