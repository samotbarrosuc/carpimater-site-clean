import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { z } from "zod";

const estimateSchema = z
  .object({
    areaTotalM2: z.number(),
    materialNecessario: z.number(),
    rodapeNecessario: z.number(),
    numeroPerfis: z.number(),
    numeroDeslocacoes: z.number(),
    distanceKm: z.number(),
    custoMaterial: z.number(),
    custoMaoObra: z.number(),
    custoRodape: z.number(),
    custoPerfis: z.number(),
    custoDeslocacaoKm: z.number(),
    custoPortagens: z.number(),
    custoMaterialCliente: z.number(),
    custoRodapeCliente: z.number(),
    custoPerfisCliente: z.number(),
    totalBase: z.number(),
    valorMin: z.number(),
    valorMax: z.number(),
  })
  .passthrough();

const bodySchema = z.object({
  contact: z.object({
    nome: z.string().min(2),
    telemovel: z.string().min(9),
    email: z.string().email().optional(),
  }),
  comentarios: z.string().optional(),
  step1: z.object({
    produtoId: z.number(),
    distrito: z.string(),
    concelho: z.string(),
    freguesia: z.string(),
    morada: z.string().optional(),
    area: z.number(),
    rodape: z.number(),
    rodapeProdutoId: z.number(),
    pavimentoAtual: z.string(),
    estadoPavimento: z.string(),
    portas: z.number(),
    soMaoDeObra: z.boolean(),
  }),
  estimate: estimateSchema,
  attachments: z
    .array(
      z.object({
        name: z.string(),
        type: z.string(),
        size: z.number(),
        base64: z.string(),
      })
    )
    .optional(),
  produtoNome: z.string(),
  produtoReferencia: z.string().optional(),
  rodapeNome: z.string(),
  rodapeReferencia: z.string().optional(),
  materialLabel: z.string().optional(),
  siteVariant: z.enum(["vinilico", "flutuante", "cozinha"]).optional(),
  quoteReference: z.string().min(3),
});

function formatEur(n: number): string {
  return (
    n.toLocaleString("pt-PT", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €"
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailContent(data: z.infer<typeof bodySchema>): {
  subject: string;
  html: string;
  text: string;
} {
  const {
    contact,
    step1,
    estimate,
    produtoNome,
    produtoReferencia,
    rodapeNome,
    rodapeReferencia,
    quoteReference,
  } = data;

  const materialLabel =
    data.materialLabel ||
    (data.siteVariant === "flutuante"
      ? "Flutuante"
      : data.siteVariant === "cozinha"
        ? "Cozinha"
        : "Vinílico");

  const local = `${step1.freguesia}, ${step1.concelho}, ${step1.distrito}`;
  const moradaLine = step1.morada?.trim()
    ? `<tr><td style="padding:3px 8px 3px 0;color:#555;white-space:nowrap">Morada</td><td style="padding:3px 0">${escapeHtml(step1.morada)}</td></tr>`
    : "";

  const comentarios = data.comentarios?.trim();
  const subject = `Pedido de orçamento - ${contact.nome} (Ref. ${quoteReference})`;
  const row = (label: string, value: string) =>
    `<tr><td style="padding:3px 8px 3px 0;color:#555;white-space:nowrap">${label}</td><td style="padding:3px 0">${value}</td></tr>`;

  const html = `<!DOCTYPE html><html lang="pt"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#1a1a1a;background:#fff">
<p style="margin:0 0 4px 0;font-size:13px;color:#777">Novo pedido — ${escapeHtml(quoteReference)}</p>
<h3 style="margin:0 0 16px 0;font-size:18px;font-weight:700;border-bottom:2px solid #e5e7eb;padding-bottom:8px">Pedido de ${escapeHtml(contact.nome)}</h3>
<p style="margin:0 0 4px 0;font-weight:700;font-size:13px;text-transform:uppercase;color:#374151">Contacto</p>
<table style="border-collapse:collapse;margin-bottom:16px">
  ${row("Nome", escapeHtml(contact.nome))}
  ${row("Telemovel", escapeHtml(contact.telemovel))}
  ${row("Email", escapeHtml(contact.email || "Nao indicado"))}
  ${comentarios ? row("Comentarios", escapeHtml(comentarios)) : ""}
</table>
<p style="margin:0 0 4px 0;font-weight:700;font-size:13px;text-transform:uppercase;color:#374151">Obra</p>
<table style="border-collapse:collapse;margin-bottom:16px">
  ${row("Local", escapeHtml(local))}
  ${moradaLine}
  ${row("Area", `${step1.area} m2`)}
  ${row("Rodape (ml)", `${step1.rodape}`)}
  ${row("Portas", `${step1.portas}`)}
  ${row("Pavimento atual", escapeHtml(step1.pavimentoAtual))}
  ${row("Estado", escapeHtml(step1.estadoPavimento))}
  ${row("So mao de obra", step1.soMaoDeObra ? "Sim" : "Nao")}
</table>
<p style="margin:0 0 4px 0;font-weight:700;font-size:13px;text-transform:uppercase;color:#374151">Estimativa</p>
<table style="border-collapse:collapse;margin-bottom:16px">
  ${row("Intervalo", `${formatEur(estimate.valorMin)} — ${formatEur(estimate.valorMax)}`)}
  ${row("Total base", formatEur(estimate.totalBase))}
  ${row("Distancia", `${estimate.distanceKm} km`)}
  ${row(materialLabel, `${escapeHtml(produtoNome)}${produtoReferencia ? ` (${escapeHtml(produtoReferencia)})` : ""}`)}
  ${row("Rodape", `${escapeHtml(rodapeNome)}${rodapeReferencia ? ` (${escapeHtml(rodapeReferencia)})` : ""}`)}
</table>
</body></html>`;

  const text = [
    `Pedido de orçamento de ${contact.nome} — Ref. ${quoteReference}`,
    "",
    `Telemovel: ${contact.telemovel}`,
    `Email: ${contact.email || "Nao indicado"}`,
    ...(comentarios ? [`Comentarios: ${comentarios}`] : []),
    "",
    `Local: ${local}`,
    ...(step1.morada?.trim() ? [`Morada: ${step1.morada}`] : []),
    `Area: ${step1.area} m2`,
    `Estimativa: ${formatEur(estimate.valorMin)} — ${formatEur(estimate.valorMax)}`,
  ].join("\n");

  return { subject, html, text };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("=== SIMULACAO API DEBUG ===");
  console.log("Method:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("ERROR: RESEND_API_KEY not configured");
    return res.status(503).json({ error: "API key not configured" });
  }

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    console.error("Validation error:", parsed.error.flatten());
    return res.status(400).json({ error: "Dados invalidos", details: parsed.error.flatten() });
  }

  const data = parsed.data;
  const to = "tomas.a.barros@hotmail.com";
  const from = "CarpiMater <info@carpimater.pt>";
  const replyTo = data.contact.email?.trim() || to;

  try {
    console.log("Building email content...");
    const { subject, html, text } = buildEmailContent(data);
    
    console.log("Creating Resend client...");
    const resend = new Resend(apiKey);
    
    console.log("Sending email to:", to);
    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo,
      subject,
      html,
      text,
    });

    console.log("Resend result:", result);

    if (result.error) {
      const errorMsg = result.error.message || "Unknown error";
      console.error("RESEND ERROR:", errorMsg);
      return res.status(502).json({ error: errorMsg });
    }

    console.log("SUCCESS: Email sent with ID:", result.data?.id);
    return res.json({ ok: true, messageId: result.data?.id });
    
  } catch (e: any) {
    const errorMsg = e?.message || String(e);
    console.error("UNEXPECTED ERROR:", errorMsg);
    return res.status(500).json({ error: "Erro ao enviar email", details: errorMsg });
  }
}
