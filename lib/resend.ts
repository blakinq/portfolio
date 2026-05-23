import { Resend } from "resend"

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export function buildContactEmail({ name, email, message }: ContactPayload) {
  return {
    subject: `Portfolio contact — ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <div style="font-family:Inter,system-ui,sans-serif;line-height:1.6;color:#111;">
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p style="white-space:pre-wrap;">${message.replace(/</g, "&lt;")}</p>
      </div>
    `,
  }
}
