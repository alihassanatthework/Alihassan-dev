import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, budget, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // If RESEND_API_KEY is set, use Resend. Otherwise log and return success (dev mode).
  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "portfolio@alihassan.dev",
      to: process.env.CONTACT_EMAIL ?? "alihassan.at.the.work@gmail.com",
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nBudget: ${budget ?? "not specified"}\n\n${message}`,
    });
  } else {
    console.log("Contact form submission (no RESEND_API_KEY set):", { name, email, budget, message });
  }

  return NextResponse.json({ ok: true });
}
