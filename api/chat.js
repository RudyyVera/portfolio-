import 'dotenv/config';
import fetch from 'node-fetch';

// Rate limiting en memoria (simplificado para Vercel)
// En producción usar Redis o base de datos
const requestCounts = new Map();
const RATE_LIMIT = 10; // 10 requests
const TIME_WINDOW = 60000; // por minuto (60 segundos)

function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.socket?.remoteAddress || 
         'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const userRequests = requestCounts.get(ip) || [];
  
  // Limpiar requests antiguos (más de TIME_WINDOW)
  const recentRequests = userRequests.filter(time => now - time < TIME_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return true;
  }
  
  // Guardar nueva request
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  
  return false;
}

export default async function handler(req, res) {
  // Solo acepta POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validar rate limit
  const clientIP = getClientIP(req);
  if (isRateLimited(clientIP)) {
    return res.status(429).json({ 
      error: 'Demasiadas solicitudes. Por favor espera un minuto.',
      retryAfter: 60
    });
  }

  try {
    const { messages, model = 'deepseek/deepseek-r1-0528:free' } = req.body;

    // Validar que messages exista y sea array
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Validar que cada mensaje tenga contenido
    const validMessages = messages.every(msg => 
      msg.role && msg.content && typeof msg.content === 'string'
    );
    
    if (!validMessages) {
      return res.status(400).json({ error: 'Invalid message structure' });
    }

    // Límite de caracteres por mensaje (prevenir abuso)
    const maxLength = 1000;
    if (messages.some(msg => msg.content.length > maxLength)) {
      return res.status(400).json({ error: 'Message too long' });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.VERCEL_URL || 'http://localhost:3000',
        'X-Title': 'RudIBot 3D Chatbot'
      },
      body: JSON.stringify({ model, messages }),
      timeout: 30000 // 30 segundos máximo
    });

    // Validar respuesta
    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ 
        error: errorData.error?.message || 'API error'
      });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Chat API Error:', error);
    
    if (error.name === 'AbortError' || error.message?.includes('timeout')) {
      return res.status(504).json({ error: 'Request timeout. Please try again.' });
    }
    
    res.status(500).json({ error: 'Server error. Try again later.' });
  }
}
