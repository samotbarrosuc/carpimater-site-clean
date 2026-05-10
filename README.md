# CarpiMater — Instalação Local e Deploy Vercel

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

O site abre em http://localhost:5173 e inclui as rotas serverless de `/api`.

Se quiser correr apenas o frontend sem as rotas de API locais, use:

```bash
npm run dev:web
```

## Build de Produção

```bash
npm run build
```

O output vai para a pasta `dist/`.

## Variáveis de Ambiente

Copia o ficheiro `.env.example` para `.env` e preenche os valores:

```bash
cp .env.example .env
```

| Variável            | Descrição                                   |
|---------------------|---------------------------------------------|
| `RESEND_API_KEY`    | Chave API do Resend (https://resend.com)    |
| `NOTIFICATION_EMAIL`| Email que recebe os pedidos de orçamento    |
| `RESEND_FROM`       | Endereço de envio (ex: `CarpiMater <noreply@carpimater.pt>`) |

## Deploy no Vercel

### Via CLI

```bash
npm install -g vercel
vercel --prod
```

### Via Git (recomendado)

1. Faz push para o GitHub
2. Liga o repositório no [vercel.com](https://vercel.com)
3. Define as variáveis de ambiente no painel do Vercel
4. Cada `git push` faz deploy automático

### Variáveis de ambiente no Vercel

No painel do Vercel → Settings → Environment Variables, adiciona:
- `RESEND_API_KEY`
- `NOTIFICATION_EMAIL`
- `RESEND_FROM`

## Estrutura

```
carpimater/
├── api/                  # Funções serverless (Vercel)
│   ├── simulacao.ts      # Envia email com pedido de orçamento
│   └── error-report.ts   # Reporta erros do site
├── src/                  # Código React
│   ├── components/       # Componentes UI
│   ├── pages/            # Páginas (Home, Pavimentos, Cozinha, etc.)
│   ├── content/          # Dados de produtos e conteúdo
│   ├── context/          # React context (SimulatorContext)
│   ├── hooks/            # React hooks
│   └── lib/              # Utilitários
├── public/               # Ficheiros estáticos (imagens, etc.)
├── index.html
├── vite.config.ts
├── vercel.json
└── package.json
```
