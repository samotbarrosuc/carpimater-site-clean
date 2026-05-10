import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  contacto: z.string().min(9, "Contacto deve ter pelo menos 9 caracteres"),
  mensagem: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = contactSchema.parse(req.body);

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("ERROR: RESEND_API_KEY not configured");
      return res.status(500).json({ error: "Email service not configured" });
    }

    const to = "info@carpimater.pt"; // Seu email
    const from = "CarpiMater <info@carpimater.pt>";
    const replyTo = data.contacto.includes("@") ? data.contacto : undefined;

    const subject = `Nova mensagem de contacto - ${data.nome}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937;">Nova mensagem de contacto</h2>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nome:</strong> ${data.nome}</p>
          <p><strong>Contacto:</strong> ${data.contacto}</p>
          ${data.mensagem ? `<p><strong>Mensagem:</strong></p><p style="white-space: pre-wrap;">${data.mensagem}</p>` : ''}
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          Esta mensagem foi enviada através do formulário de contacto do site CarpiMater.
        </p>
      </div>
    `;

    const text = `
Nova mensagem de contacto

Nome: ${data.nome}
Contacto: ${data.contacto}
${data.mensagem ? `Mensagem:\n${data.mensagem}` : ''}

Esta mensagem foi enviada através do formulário de contacto do site CarpiMater.
    `.trim();

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
    if (e instanceof z.ZodError) {
      return res.status(400).json({ error: "Dados inválidos", details: e.errors });
    }

    const errorMsg = e?.message || String(e);
    console.error("UNEXPECTED ERROR:", errorMsg);
    return res.status(500).json({ error: "Erro ao enviar email", details: errorMsg });
  }
}