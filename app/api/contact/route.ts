import { NextResponse } from "next/server"
import { z } from "zod"
import { buildContactEmail, getResend } from "@/lib/resend"
import { site } from "@/content/site"

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  honey: z.string().max(0).optional(),
})

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON." },
      { status: 400 },
    )
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    const first = parsed.error.issues[0]
    return NextResponse.json(
      { success: false, error: first?.message ?? "Invalid input." },
      { status: 400 },
    )
  }

  const resend = getResend()
  const to = process.env.CONTACT_EMAIL_TO ?? site.email

  // Dev fallback when Resend is not configured: log and accept.
  if (!resend) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] (no Resend key — logging only)", parsed.data)
      return NextResponse.json({ success: true })
    }
    return NextResponse.json(
      { success: false, error: "Email service is not configured." },
      { status: 500 },
    )
  }

  const email = buildContactEmail(parsed.data)
  const { error } = await resend.emails.send({
    from: `Portfolio <onboarding@resend.dev>`,
    to: [to],
    replyTo: parsed.data.email,
    subject: email.subject,
    text: email.text,
    html: email.html,
  })

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message ?? "Failed to send." },
      { status: 502 },
    )
  }

  return NextResponse.json({ success: true })
}
