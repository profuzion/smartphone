import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/content/site";

export const runtime = "nodejs";

/**
 * /api/contact — Zod-validated, honeypot-protected, Resend-backed.
 *
 * RESEND_API_KEY      — required at runtime. Without it we fail soft
 *                       so local dev still submits cleanly.
 * CONTACT_TO_EMAIL    — where inbound enquiries land (defaults to
 *                       site.contact.email).
 * CONTACT_FROM_EMAIL  — verified sender in your Resend domain.
 */

const Schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  business: z.string().trim().max(160).optional().default(""),
  town: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10).max(5000),
  company: z.string().max(0).optional(), // honeypot — must be empty
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed request." },
      { status: 400 },
    );
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please double-check the form — one of the fields looks off.",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          msg: i.message,
        })),
      },
      { status: 422 },
    );
  }

  const { name, email, business, town, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? `website@${new URL(site.url).hostname}`;

  if (!apiKey) {
    // Dev-only soft success. NEVER deploy without RESEND_API_KEY.
    console.warn("[contact] RESEND_API_KEY not set — skipping send.");
    console.warn("[contact] Would have sent:", { name, email, business, town, message });
    return NextResponse.json({ ok: true, message: "Received." });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry · ${name}${business ? ` (${business})` : ""}`,
      text: [
        `Name:     ${name}`,
        `Email:    ${email}`,
        `Business: ${business || "—"}`,
        `Town:     ${town || "—"}`,
        ``,
        `Message:`,
        message,
        ``,
        `— sent from ${site.url}/#contact`,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[contact] Resend failure:", err);
    return NextResponse.json(
      {
        ok: false,
        message: "Couldn't reach our mailer. Please email us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, message: "Received." });
}
