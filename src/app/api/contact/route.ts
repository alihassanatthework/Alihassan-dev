import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, budget, message, service } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER || "alihassan.at.the.work@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER || "alihassan.at.the.work@gmail.com",
      to: process.env.CONTACT_EMAIL || "alihassan.at.the.work@gmail.com",
      subject: `New Inquiry from ${name} - ${service || "General"}`,
      text: `
        Name: ${name}
        Email: ${email}
        Service: ${service || "Not specified"}
        Budget: ${budget || "Not specified"}
        
        Message:
        ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("GMAIL SEND ERROR:", error.message || error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
