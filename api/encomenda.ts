import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { z } from 'zod'
import { getNomeMaterial, NOMES_FLUTUANTES_HIBRIDOS, NOMES_RODAPES, NOMES_VINILICOS } from '../src/content/nomes-materiais.js'
import { PRECO_FLUTUANTE_HIBRIDO_M2, PRECO_RODAPE_PVC_BRANCO_ML, PRECO_RODAPE_PVC_ML, PRECO_VINILICO_SPC_M2 } from '../src/content/precos-materiais.js'

// Esta função é autónoma para ser carregada corretamente no runtime da Vercel.
const FLOORING_BOX_AREA_M2 = 1.76
const BASEBOARD_BAR_LENGTH_M = 2.25
const NOTIFICATION_EMAIL = 'tomas.a.barros@hotmail.com'
const RESEND_FROM = 'CarpiMater <info@carpimater.pt>'
const TERMS_VERSION = '2026-08-24'
const INACTIVE_REFERENCES = new Set(['VIN-TAR-001', 'VIN-FOR-001'])
const hasReference = (collection: Record<string, string>, reference: string) => (
  Object.prototype.hasOwnProperty.call(collection, reference)
)

const getOrderProduct = (kind: 'flooring' | 'baseboard', reference: string) => {
  if (INACTIVE_REFERENCES.has(reference)) return null
  const vinyl = hasReference(NOMES_VINILICOS, reference)
  const hybrid = hasReference(NOMES_FLUTUANTES_HIBRIDOS, reference)
  const baseboard = hasReference(NOMES_RODAPES, reference)
  if ((kind === 'flooring' && !vinyl && !hybrid) || (kind === 'baseboard' && !baseboard)) return null

  const name = getNomeMaterial(reference)
  if (!name) return null

  const unitPrice = kind === 'flooring'
    ? hybrid ? PRECO_FLUTUANTE_HIBRIDO_M2 : PRECO_VINILICO_SPC_M2
    : reference === 'ROD-001'
      ? PRECO_RODAPE_PVC_BRANCO_ML
      : reference === 'ROD-011'
        ? 0
        : PRECO_RODAPE_PVC_ML

  return {
    name,
    reference,
    unitPrice,
  }
}

const itemSchema = z.object({
  productId: z.number().int().positive(),
  name: z.string(),
  reference: z.string(),
  kind: z.enum(['flooring', 'baseboard']),
  units: z.number().int().positive(),
  suppliedAmount: z.number().nonnegative(),
  includeWaste: z.boolean(),
  unitPrice: z.number().nonnegative(),
})

const applicationQuoteSchema = z.object({
  distrito: z.string().min(1),
  concelho: z.string().min(1),
  preferredDate: z.string().trim().max(50).optional(),
  area: z.number().positive(),
  rodape: z.number().nonnegative(),
  underlayLines: z.array(z.object({
    type: z.enum(['vinilico', 'hibrido']),
    areaM2: z.number().positive(),
    total: z.number().nonnegative(),
    precoMedioM2: z.number().nonnegative(),
  })).max(2).default([]),
  underlayTotal: z.number().nonnegative().default(0),
  applicationTotal: z.number().nonnegative(),
}).nullish()

const optionalText = z.preprocess(
  (value) => typeof value === 'string' && value.trim() === '' ? undefined : value,
  z.string().optional(),
)

const optionalEmail = z.preprocess(
  (value) => typeof value === 'string' && value.trim() === '' ? undefined : value,
  z.string().email().optional(),
)

const orderSchema = z.object({
  nome: z.string().min(2),
  telefone: z.string().regex(/^9\d{8}$/),
  email: optionalEmail,
  distrito: z.string().min(1),
  concelho: z.string().min(1),
  freguesia: optionalText,
  morada: optionalText,
  observacoes: z.string().optional(),
  tipo: z.string(),
  delivery: z.enum(['material', 'installation']),
  subtotal: z.number().nonnegative(),
  items: z.array(itemSchema).min(1),
  applicationQuote: applicationQuoteSchema,
  paymentMethod: z.enum(['mbway', 'iban']).optional(),
  reference: z.string().optional(),
  termsAccepted: z.literal(true),
  termsVersion: z.literal(TERMS_VERSION),
  comprovativo: z.object({
    name: z.string().min(1),
    type: z.enum(['application/pdf', 'image/jpeg', 'image/png']),
    size: z.number().positive().max(3 * 1024 * 1024),
    base64: z.string().min(1),
  }).optional(),
})

type OrderData = z.infer<typeof orderSchema>
type VerifiedItem = OrderData['items'][number]

function formatEur(value: number) {
  return `${value.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
}

function formatQuantity(value: number) {
  return value.toLocaleString('pt-PT', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character] || character)
}

function buildEmailContent(data: OrderData, items: VerifiedItem[], verifiedSubtotal: number, termsAcceptedAt: Date) {
  const reference = data.reference || 'Sem referência'
  const payment = data.paymentMethod === 'iban' ? 'Transferência bancária (IBAN)' : 'MB Way'
  const delivery = data.delivery === 'installation' ? 'Material + pedido de aplicação' : 'Só material'
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:4px 0;color:#1f2937">${value}</td></tr>`

  const productRows = items.map((item) => {
    const unit = item.kind === 'flooring' ? 'm²' : 'm'
    const packageName = item.kind === 'flooring' ? 'caixas' : 'barras'
    const itemTotal = item.suppliedAmount * item.unitPrice
    return `<tr>
      <td style="padding:10px 12px;border-top:1px solid #e5e7eb">${escapeHtml(item.name)}<br><span style="font-size:12px;color:#6b7280">${escapeHtml(item.reference)}</span></td>
      <td style="padding:10px 12px;border-top:1px solid #e5e7eb;text-align:center">${item.units} ${packageName}</td>
      <td style="padding:10px 12px;border-top:1px solid #e5e7eb;text-align:center">${formatQuantity(item.suppliedAmount)} ${unit}</td>
      <td style="padding:10px 12px;border-top:1px solid #e5e7eb;text-align:right;font-weight:700">${formatEur(itemTotal)}</td>
    </tr>`
  }).join('')

  const underlayRows = data.applicationQuote?.underlayLines.map((line) => {
    const label = line.type === 'vinilico'
      ? 'Manta plástica para pavimento vinílico'
      : 'Sub-pavimento para pavimento flutuante'
    return row(label, `${formatQuantity(line.areaM2)} m² × ${formatEur(line.precoMedioM2)}/m² = <strong>${formatEur(line.total)}</strong>`)
  }).join('') || ''

  const applicationHtml = data.applicationQuote
    ? `<p style="margin:0 0 4px;font-weight:700;font-size:13px;text-transform:uppercase;color:#374151">Orçamento previsto de aplicação</p>
       <table style="border-collapse:collapse;margin-bottom:18px">
         ${row('Local', `${escapeHtml(data.applicationQuote.concelho)}, ${escapeHtml(data.applicationQuote.distrito)}`)}
         ${data.applicationQuote.preferredDate ? row('Data pretendida', escapeHtml(data.applicationQuote.preferredDate)) : ''}
         ${row('Área a aplicar', `${formatQuantity(data.applicationQuote.area)} m²`)}
         ${row('Rodapé a aplicar', `${formatQuantity(data.applicationQuote.rodape)} m`)}
         ${underlayRows}
         ${row('Estimativa', `<strong>${formatEur(data.applicationQuote.applicationTotal)}</strong> — não incluída no pagamento`)}
       </table>
       <p style="margin:-10px 0 18px;font-size:12px;color:#6b7280">Valor indicativo, sujeito a confirmação em obra após verificação do pavimento atual.</p>`
    : `<p style="margin:0 0 18px;font-size:13px;color:#6b7280">Transporte gratuito na Região Centro. Outras zonas sujeitas a contacto prévio e confirmação de disponibilidade.</p>`

  const observations = data.observacoes?.trim()
  const location = [data.freguesia, data.concelho, data.distrito].filter(Boolean).join(', ')
  const subject = `Nova encomenda - ${data.nome} (Ref. ${reference})`
  const html = `<!DOCTYPE html><html lang="pt"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#1a1a1a;background:#fff">
<p style="margin:0 0 4px;font-size:13px;color:#777">Nova encomenda — ${escapeHtml(reference)}</p>
<h2 style="margin:0 0 16px;font-size:20px;font-weight:700;border-bottom:2px solid #e5e7eb;padding-bottom:8px">Encomenda de ${escapeHtml(data.nome)}</h2>
<p style="margin:0 0 4px;font-weight:700;font-size:13px;text-transform:uppercase;color:#374151">Cliente e entrega</p>
<table style="border-collapse:collapse;margin-bottom:18px">
  ${row('Nome', escapeHtml(data.nome))}
  ${row('Telemóvel', escapeHtml(data.telefone))}
  ${row('Email', escapeHtml(data.email || 'Não indicado'))}
  ${row('Local', escapeHtml(location))}
  ${data.morada ? row('Morada', escapeHtml(data.morada)) : ''}
  ${observations ? row('Observações', escapeHtml(observations)) : ''}
</table>
<p style="margin:0 0 4px;font-weight:700;font-size:13px;text-transform:uppercase;color:#374151">Encomenda</p>
<table style="border-collapse:collapse;margin-bottom:12px">
  ${row('Opção', delivery)}
  ${row('Pagamento', payment)}
  ${row('Comprovativo', data.comprovativo ? `${escapeHtml(data.comprovativo.name)} (anexo)` : 'Não anexado')}
</table>
<p style="margin:0 0 4px;font-weight:700;font-size:13px;text-transform:uppercase;color:#374151">Aceitação contratual</p>
<table style="border-collapse:collapse;margin-bottom:18px">
  ${row('Termos aceites', 'Sim')}
  ${row('Versão', escapeHtml(data.termsVersion))}
  ${row('Data e hora', escapeHtml(termsAcceptedAt.toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' })))}
</table>
<table style="width:100%;max-width:760px;border-collapse:collapse;margin-bottom:18px;border:1px solid #e5e7eb">
  <thead><tr style="background:#f3f4f6"><th style="padding:9px 12px;text-align:left">Produto</th><th style="padding:9px 12px">Quantidade</th><th style="padding:9px 12px">Fornecido</th><th style="padding:9px 12px;text-align:right">Valor</th></tr></thead>
  <tbody>${productRows}</tbody>
  <tfoot><tr style="background:#19242e;color:#fff"><td colspan="3" style="padding:11px 12px;font-weight:700">Total dos materiais</td><td style="padding:11px 12px;text-align:right;font-weight:700;color:#f08a45">${formatEur(verifiedSubtotal)}</td></tr></tfoot>
</table>
${applicationHtml}
</body></html>`

  const itemLines = items.map((item) => {
    const unit = item.kind === 'flooring' ? 'm²' : 'm'
    const packageName = item.kind === 'flooring' ? 'caixas' : 'barras'
    return `${item.name} (${item.reference}) — ${item.units} ${packageName} — ${formatQuantity(item.suppliedAmount)} ${unit}`
  })
  const applicationText = data.applicationQuote
    ? [
        '',
        'ORÇAMENTO PREVISTO DE APLICAÇÃO (não incluído no pagamento)',
        `Local: ${data.applicationQuote.concelho}, ${data.applicationQuote.distrito}`,
        ...(data.applicationQuote.preferredDate ? [`Data pretendida: ${data.applicationQuote.preferredDate}`] : []),
        `Área: ${formatQuantity(data.applicationQuote.area)} m²`,
        `Rodapé: ${formatQuantity(data.applicationQuote.rodape)} m`,
        ...data.applicationQuote.underlayLines.map((line) => {
          const label = line.type === 'vinilico' ? 'Manta plástica para pavimento vinílico' : 'Sub-pavimento para pavimento flutuante'
          return `${label}: ${formatQuantity(line.areaM2)} m² × ${formatEur(line.precoMedioM2)}/m² = ${formatEur(line.total)}`
        }),
        `Estimativa: ${formatEur(data.applicationQuote.applicationTotal)}`,
        'Valor indicativo, sujeito a confirmação em obra após verificação do pavimento atual.',
      ]
    : ['', 'Transporte gratuito na Região Centro. Outras zonas sujeitas a confirmação de disponibilidade.']
  const text = [
    `Nova encomenda de ${data.nome} — Ref. ${reference}`,
    '',
    `Telemóvel: ${data.telefone}`,
    `Email: ${data.email || 'Não indicado'}`,
    `Local: ${location}`,
    ...(data.morada ? [`Morada: ${data.morada}`] : []),
    ...(observations ? [`Observações: ${observations}`] : []),
    '',
    `Opção: ${delivery}`,
    `Pagamento: ${payment}`,
    `Comprovativo: ${data.comprovativo ? `${data.comprovativo.name} (anexo)` : 'Não anexado'}`,
    `Termos e Condições aceites: Sim — versão ${data.termsVersion} — ${termsAcceptedAt.toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' })}`,
    '',
    'PRODUTOS',
    ...itemLines,
    `Total dos materiais: ${formatEur(verifiedSubtotal)}`,
    ...applicationText,
  ].join('\n')

  return { subject, html, text }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('ORDER_EMAIL_ERROR: RESEND_API_KEY not configured')
    return res.status(503).json({ error: 'Serviço de email não configurado' })
  }

  const parsed = orderSchema.safeParse(req.body)
  if (!parsed.success) {
    console.error('ORDER_VALIDATION_ERROR', parsed.error.flatten())
    return res.status(400).json({ error: 'Dados inválidos', details: parsed.error.flatten() })
  }

  const data = parsed.data
  const verifiedItems: VerifiedItem[] = []
  for (const item of data.items) {
    const product = getOrderProduct(item.kind, item.reference)
    if (!product) return res.status(400).json({ error: 'Produto indisponível' })
    verifiedItems.push({
      ...item,
      name: product.name,
      reference: product.reference,
      unitPrice: product.unitPrice,
      suppliedAmount: item.units * (item.kind === 'flooring' ? FLOORING_BOX_AREA_M2 : BASEBOARD_BAR_LENGTH_M),
    })
  }

  const verifiedSubtotal = verifiedItems.reduce((total, item) => total + item.suppliedAmount * item.unitPrice, 0)
  const { subject, html, text } = buildEmailContent(data, verifiedItems, verifiedSubtotal, new Date())

  try {
    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from: RESEND_FROM,
      to: [NOTIFICATION_EMAIL],
      replyTo: data.email?.trim() || NOTIFICATION_EMAIL,
      subject,
      html,
      text,
      attachments: data.comprovativo ? [{
        filename: data.comprovativo.name,
        content: Buffer.from(data.comprovativo.base64, 'base64'),
        contentType: data.comprovativo.type,
      }] : undefined,
    })

    if (result.error) {
      console.error('ORDER_EMAIL_ERROR', result.error)
      return res.status(502).json({ error: 'Não foi possível enviar a encomenda por email. Tente novamente.' })
    }

    console.log('ORDER_EMAIL_SENT', result.data?.id)
    return res.json({ ok: true, messageId: result.data?.id })
  } catch (error) {
    console.error('ORDER_EMAIL_EXCEPTION', error)
    return res.status(502).json({ error: 'Não foi possível enviar a encomenda por email. Tente novamente.' })
  }
}
