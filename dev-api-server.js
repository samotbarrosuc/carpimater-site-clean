import http from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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
  '/api/encomenda': async (req, res) => {
    if (req.method !== 'POST') {
      return new MockResponse(res).status(405).json({ error: 'Method not allowed' });
    }

    const body = JSON.parse(req.body || '{}');
    if (!process.env.RESEND_API_KEY) {
      return new MockResponse(res).status(503).json({ error: 'Email service not configured' });
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const to = process.env.NOTIFICATION_EMAIL?.trim() || 'tomas.a.barros@hotmail.com';
      const from = process.env.RESEND_FROM?.trim() || 'CarpiMater <onboarding@resend.dev>';
      const items = Array.isArray(body.items) ? body.items : [];
      const itemLines = items.map((item) => `${item.name} - ${item.units} ${item.kind === 'flooring' ? 'caixas' : 'barras'} - ${item.suppliedAmount} ${item.kind === 'flooring' ? 'm²' : 'm'}`).join('\n');
      if (!body.comprovativo?.name || !body.comprovativo?.base64) {
        return new MockResponse(res).status(400).json({ error: 'Comprovativo em falta' });
      }
      const { error } = await resend.emails.send({
        from,
        to: [to],
        replyTo: body.email,
        subject: `Nova encomenda ${body.reference ? `[${body.reference}] ` : ''}- ${body.nome || 'Cliente'}`,
        html: `<h2>Nova encomenda CarpiMater</h2>${body.reference ? `<p><strong>Referência:</strong> ${body.reference}</p>` : ''}<p><strong>Cliente:</strong> ${body.nome || 'N/A'}</p><p><strong>Telefone:</strong> ${body.telefone || 'N/A'}</p><p><strong>Email:</strong> ${body.email || 'N/A'}</p><p><strong>Morada:</strong> ${body.morada || 'N/A'}</p><p><strong>Opção:</strong> ${body.delivery || 'N/A'}</p><p><strong>Pagamento:</strong> ${body.paymentMethod === 'iban' ? 'Transferência bancária (IBAN)' : 'MB Way'}</p><p><strong>Comprovativo anexado:</strong> ${body.comprovativo.name}</p><pre>${itemLines}</pre><p>Total: ${body.subtotal || 0} €</p>`,
        text: `Nova encomenda de ${body.nome || 'Cliente'}${body.reference ? ` (referência ${body.reference})` : ''}\n\nPagamento: ${body.paymentMethod === 'iban' ? 'Transferência bancária (IBAN)' : 'MB Way'}\nComprovativo anexado: ${body.comprovativo.name}\n\n${itemLines}\n\nTotal: ${body.subtotal || 0} €`,
        attachments: [{ filename: body.comprovativo.name, content: Buffer.from(body.comprovativo.base64, 'base64'), contentType: body.comprovativo.type }],
      });
      if (error) return new MockResponse(res).status(502).json({ error: error.message || 'Falha ao enviar email' });
      return new MockResponse(res).json({ ok: true });
    } catch (error) {
      return new MockResponse(res).status(500).json({ error: error.message || 'Erro ao enviar email' });
    }
  },
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

    // Use real Resend in development
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const DEFAULT_NOTIFICATION_EMAIL = "tomas.a.barros@hotmail.com";
      const to = process.env.NOTIFICATION_EMAIL?.trim() || DEFAULT_NOTIFICATION_EMAIL;
      const from = process.env.RESEND_FROM?.trim() || "CarpiMater <onboarding@resend.dev>";
      const replyTo = body.contact?.email?.trim() || to;

      // Build email content (simplified version)
      const subject = `Pedido de orçamento de ${body.contact?.nome || 'Cliente'} — Ref. ${body.quoteReference || 'N/A'}`;
      const html = `
        <h2>Novo pedido de orçamento</h2>
        <p><strong>Nome:</strong> ${body.contact?.nome || 'N/A'}</p>
        <p><strong>Telemóvel:</strong> ${body.contact?.telemovel || 'N/A'}</p>
        <p><strong>Email:</strong> ${body.contact?.email || 'N/A'}</p>
        <p><strong>Referência:</strong> ${body.quoteReference || 'N/A'}</p>
        <p><strong>Produto:</strong> ${body.produtoNome || 'N/A'}</p>
        <p><strong>Área:</strong> ${body.step1?.area || 'N/A'} m²</p>
        <p><strong>Estimativa:</strong> ${body.estimate?.valorMin ? `€${body.estimate.valorMin} - €${body.estimate.valorMax}` : 'N/A'}</p>
        ${body.comentarios ? `<p><strong>Comentários:</strong> ${body.comentarios}</p>` : ''}
      `;
      const text = `Novo pedido de orçamento de ${body.contact?.nome || 'Cliente'}`;

      const { error } = await resend.emails.send({
        from,
        to: [to],
        replyTo,
        subject,
        html,
        text,
      });

      if (error) {
        console.error('❌ Resend error:', error);
        return new MockResponse(res).status(502).json({ error: error.message || 'Falha ao enviar email' });
      }

      console.log('✅ Email enviado com sucesso para:', to);
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

  '/api/contact': async (req, res) => {
    if (req.method !== 'POST') {
      return new MockResponse(res).status(405).json({ error: 'Method not allowed' });
    }

    const body = JSON.parse(req.body || '{}');
    const nome = String(body.nome || '').trim();
    const contacto = String(body.contacto || '');
    if (nome.length < 2 || !/^9\d{8}$/.test(contacto)) {
      return new MockResponse(res).status(400).json({ error: 'Indique o nome e um telemóvel com 9 algarismos, começado por 9.' });
    }
    body.nome = nome;
    body.contacto = contacto;
    console.log('📧 Contacto enviado:', {
      nome: body.nome,
      telefone: body.contacto,
      mensagem: body.mensagem,
    });

    // Use real Resend in development
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const DEFAULT_NOTIFICATION_EMAIL = "samotbarros@hotmail.com";
      const to = process.env.NOTIFICATION_EMAIL?.trim() || DEFAULT_NOTIFICATION_EMAIL;
      const from = process.env.RESEND_FROM?.trim() || "CarpiMater <onboarding@resend.dev>";
      const replyTo = undefined; // Não usar reply-to para telefones

      // Build email content
      const subject = `Nova mensagem de contacto de ${body.nome || 'Cliente'}`;
      const html = `
        <h2>Nova mensagem de contacto</h2>
        <p><strong>Nome:</strong> ${body.nome || 'N/A'}</p>
        <p><strong>Contacto:</strong> ${body.contacto || 'N/A'}</p>
        ${body.mensagem ? `<p><strong>Mensagem:</strong> ${body.mensagem.replace(/\n/g, '<br>')}</p>` : ''}
      `;
      const text = `Nova mensagem de contacto de ${body.nome || 'Cliente'}`;

      const emailData = {
        from,
        to: [to],
        subject,
        html,
        text,
      };

      const { error } = await resend.emails.send(emailData);

      if (error) {
        console.error('❌ Resend error:', error);
        return new MockResponse(res).status(502).json({ error: error.message || 'Falha ao enviar email' });
      }

      console.log('✅ Email enviado com sucesso para:', to);
      return new MockResponse(res).json({ ok: true });
    } catch (e) {
      console.error('❌ Erro ao enviar email:', e.message);
      return new MockResponse(res).status(500).json({ error: 'Erro ao enviar email' });
    }
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
  console.log('  - POST /api/error-report');
  console.log('  - POST /api/contact\n');
});
