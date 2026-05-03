import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { z } from "zod";

const payloadSchema = z.object({
  source: z.enum([
    "window.error",
    "window.unhandledrejection",
    "simulator.submit",
  ]),
  message: z.string().min(1),
  stack: z.string().optional(),
  context: z.record(z.unknown()).optional(),
  url: z.string().optional(),
  occurredAt: z.string().optional(),
  userAgent: z.string().optional(),
  language: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.NOTIFICATION_EMAIL?.trim();
  const from =
    process.env.RESEND_FROM?.trim() || "CarpiMater <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return res.status(202).json({ ok: false, skipped: true });
  }

  const parsed = payloadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "Payload invalido" });
  }

  const data = parsed.data;
  const now = new Date().toISOString();
  const subject = `[CarpiMater] Alerta de erro no site (${data.source})`;
  const text = [
    "Foi captado um erro no website.",
    "",
    `Fonte: ${data.source}`,
    `Mensagem: ${data.message}`,
    `Quando: ${data.occurredAt || now}`,
    `URL: ${data.url || "n/d"}`,
    `User-Agent: ${data.userAgent || "n/d"}`,
    "",
    `Stack: ${data.stack || "n/d"}`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from, to: [to], subject, text });
    if (error) {
      console.error("error-report Resend error", error);
      return res.status(502).json({ ok: false });
    }
    return res.json({ ok: true });
  } catch (e) {
    console.error("error-report unexpected error", e);
    return res.status(500).json({ ok: false });
  }
}
