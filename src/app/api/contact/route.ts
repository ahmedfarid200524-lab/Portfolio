import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "Ahmedfarid200524@gmail.com";

export async function POST(req: Request) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error("GMAIL_USER or GMAIL_APP_PASSWORD is missing in .env.local");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const { name, email, subject, message, website } = body as Record<string, string>;

  // Honeypot: pretend success so bots learn nothing
  if (website) return NextResponse.json({ ok: true });

  const valid =
    typeof name === "string" && name.trim().length >= 2 && name.length <= 100 &&
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 200 &&
    typeof subject === "string" && subject.trim().length >= 3 && subject.length <= 150 &&
    typeof message === "string" && message.trim().length >= 10 && message.length <= 5000;

  if (!valid) return NextResponse.json({ error: "Invalid fields" }, { status: 400 });

  const clean = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.GMAIL_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Portfolio: ${clean(subject)} (from ${clean(name)})`,
      text: `Name: ${clean(name)}\nEmail: ${email}\nSubject: ${clean(subject)}\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
}