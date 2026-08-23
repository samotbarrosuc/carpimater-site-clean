import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { z } from 'zod'
import { getProdutoById } from '../src/content/vinil'
import { getRodapeById } from '../src/content/rodapes'
import { BASEBOARD_BAR_LENGTH_M, FLOORING_BOX_AREA_M2 } from '../src/lib/calculations'

const itemSchema = z.object({
  productId: z.number().int().positive(), name: z.string(), reference: z.string(), kind: z.enum(['flooring', 'baseboard']), units: z.number().int().positive(),
  suppliedAmount: z.number().nonnegative(), includeWaste: z.boolean(), unitPrice: z.number().nonnegative(),
})
const applicationQuoteSchema = z.object({
  distrito: z.string().min(1), concelho: z.string().min(1), area: z.number().positive(), rodape: z.number().nonnegative(), applicationTotal: z.number().nonnegative(),
}).optional()
const orderSchema = z.object({
  nome: z.string().min(2), telefone: z.string().min(9), email: z.string().email(), morada: z.string().min(5),
  observacoes: z.string().optional(), tipo: z.string(), delivery: z.enum(['material', 'installation']), subtotal: z.number().nonnegative(), items: z.array(itemSchema).min(1),
  applicationQuote: applicationQuoteSchema,
  paymentMethod: z.enum(['mbway', 'iban']).optional(),
  reference: z.string().optional(),
  comprovativo: z.object({ name: z.string().min(1), type: z.enum(['application/pdf', 'image/jpeg', 'image/png']), size: z.number().positive().max(3 * 1024 * 1024), base64: z.string().min(1) }),
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const parsed = orderSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Dados inválidos', details: parsed.error.flatten() })
  const data = parsed.data
  const verifiedItems = []
  for (const item of data.items) {
    if (item.kind === 'flooring') {
      const product = getProdutoById(item.productId, 'vinilico')
      if (!product || product.sobConsulta) return res.status(400).json({ error: 'Produto indisponível' })
      verifiedItems.push({ ...item, name: product.nome, reference: product.referencia, unitPrice: product.precoM2, suppliedAmount: item.units * FLOORING_BOX_AREA_M2 })
    } else {
      const product = getRodapeById(item.productId)
      if (!product) return res.status(400).json({ error: 'Produto indisponível' })
      verifiedItems.push({ ...item, name: product.nome, reference: product.referencia, unitPrice: product.precoMl, suppliedAmount: item.units * BASEBOARD_BAR_LENGTH_M })
    }
  }
  const verifiedSubtotal = verifiedItems.reduce((total, item) => total + item.units * (item.kind === 'flooring' ? FLOORING_BOX_AREA_M2 : BASEBOARD_BAR_LENGTH_M) * item.unitPrice, 0)
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return res.status(503).json({ error: 'Serviço de email não configurado' })
  const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] || character)
  const itemLines = verifiedItems.map((item) => `${item.name} (${item.reference}) - ${item.units} ${item.kind === 'flooring' ? 'caixas' : 'barras'} - ${item.suppliedAmount.toFixed(2)} ${item.kind === 'flooring' ? 'm²' : 'm'} - ${item.includeWaste ? 'com' : 'sem'} desperdício`).join('\n')
  const transportNotice = 'Gratuito na Região Centro. Outras zonas sujeitas a contacto prévio e confirmação de disponibilidade.'
  const applicationLine = data.applicationQuote ? `<p><strong>Aplicação e deslocação (estimativa, não cobrada):</strong> ${data.applicationQuote.applicationTotal.toFixed(2)} € (${escapeHtml(data.applicationQuote.area.toString())} m², ${escapeHtml(data.applicationQuote.distrito)} / ${escapeHtml(data.applicationQuote.concelho)})</p>` : `<p><strong>Transporte do material:</strong> ${transportNotice}</p>`
  const paymentLine = `<p><strong>Pagamento:</strong> ${data.paymentMethod === 'iban' ? 'Transferência bancária (IBAN)' : 'MB Way'}</p>`
  const referenceLine = data.reference ? `<p><strong>Referência:</strong> ${escapeHtml(data.reference)}</p>` : ''
  const proofLine = `<p><strong>Comprovativo anexado:</strong> ${escapeHtml(data.comprovativo.name)}</p>`
  const html = `<h2>Nova encomenda CarpiMater</h2>${referenceLine}<p><strong>Cliente:</strong> ${escapeHtml(data.nome)}</p><p><strong>Telefone:</strong> ${escapeHtml(data.telefone)}</p><p><strong>Email:</strong> ${escapeHtml(data.email)}</p><p><strong>Morada:</strong> ${escapeHtml(data.morada)}</p><p><strong>Opção:</strong> ${data.delivery === 'installation' ? 'Material + aplicação' : 'Só material'}</p>${paymentLine}${proofLine}<h3>Produtos</h3><pre>${escapeHtml(itemLines)}</pre>${applicationLine}<p><strong>Material:</strong> ${verifiedSubtotal.toFixed(2)} €</p><p>${escapeHtml(data.observacoes || '')}</p>`
  const resend = new Resend(apiKey)
  const applicationText = data.applicationQuote
    ? `\nAplicação e deslocação (estimativa, não cobrada): ${data.applicationQuote.applicationTotal.toFixed(2)} € (${data.applicationQuote.area} m², ${data.applicationQuote.distrito} / ${data.applicationQuote.concelho})`
    : `\nTransporte do material: ${transportNotice}`
  const result = await resend.emails.send({
    from: process.env.RESEND_FROM || 'CarpiMater <onboarding@resend.dev>',
    to: [process.env.NOTIFICATION_EMAIL || 'tomas.a.barros@hotmail.com'],
    replyTo: data.email,
    subject: `Nova encomenda ${data.reference ? `[${data.reference}] ` : ''}- ${data.nome}`,
    html,
    text: `Nova encomenda de ${data.nome}${data.reference ? ` (referência ${data.reference})` : ''}\n\nPagamento: ${data.paymentMethod === 'iban' ? 'Transferência bancária (IBAN)' : 'MB Way'}\nComprovativo anexado: ${data.comprovativo.name}\n\n${itemLines}\n\nMaterial a pagar: ${verifiedSubtotal.toFixed(2)} €${applicationText}`,
    attachments: [{ filename: data.comprovativo.name, content: Buffer.from(data.comprovativo.base64, 'base64'), contentType: data.comprovativo.type }],
  })
  if (result.error) return res.status(502).json({ error: result.error.message })
  return res.json({ ok: true, messageId: result.data?.id })
}
