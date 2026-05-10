import http from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mock VercelRequest and VercelResponse
class MockRequest {
  constructor(req) {
    this.method = req.method;
    this.url = req.url;
    this.headers = req.headers;
    this.body = '';
  }
}

class MockResponse {
  constructor(res) {
    this.res = res;
    this.statusCode = 200;
    this.headers = { 'Content-Type': 'application/json' };
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  json(data) {
    this.res.writeHead(this.statusCode, this.headers);
    this.res.end(JSON.stringify(data));
  }

  setHeader(key, value) {
    this.headers[key] = value;
    return this;
  }
}

// Simple API handlers
const handlers = {
  '/api/simulacao': async (req, res) => {
    if (req.method !== 'POST') {
      return new MockResponse(res).status(405).json({ error: 'Method not allowed' });
    }

    const body = JSON.parse(req.body || '{}');
    console.log('📧 Simulação enviada:', {
      nome: body.contact?.nome,
      telemovel: body.contact?.telemovel,
      email: body.contact?.email,
    });

    // Simulate email sending
    try {
      // Aqui ia usar Resend, mas como estamos em dev, só logamos
      console.log('✅ Email simulado enviado com sucesso para:', process.env.NOTIFICATION_EMAIL);
      return new MockResponse(res).json({ ok: true });
    } catch (e) {
      console.error('❌ Erro ao enviar email:', e.message);
      return new MockResponse(res).status(500).json({ error: 'Erro ao enviar email' });
    }
  },

  '/api/error-report': async (req, res) => {
    if (req.method !== 'POST') {
      return new MockResponse(res).status(405).json({ error: 'Method not allowed' });
    }

    const body = JSON.parse(req.body || '{}');
    console.log('⚠️ Erro reportado:', {
      source: body.source,
      message: body.message,
      url: body.url,
    });

    return new MockResponse(res).json({ ok: true });
  },
};

// Create server
const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`).pathname;

  // Read body
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const mockReq = new MockRequest(req);
    mockReq.body = body;

    const handler = handlers[url];
    if (handler) {
      try {
        await handler(mockReq, res);
      } catch (e) {
        console.error('Handler error:', e);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`\n🚀 API Server rodando em http://localhost:${PORT}\n`);
  console.log('Endpoints disponíveis:');
  console.log('  - POST /api/simulacao');
  console.log('  - POST /api/error-report\n');
});
