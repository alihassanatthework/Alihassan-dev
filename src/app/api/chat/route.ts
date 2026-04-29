import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

export const runtime = "edge";

const SYSTEM = `You are an AI assistant on Ali Hassan's portfolio website.

About Ali:
- Software Engineer, Full-Stack Developer, ML/AI Engineer
- Final-year BS Software Engineering student at UMT Lahore (graduating Jun 2026)
- Location: Lahore, Pakistan
- Email: alihassan.at.the.work@gmail.com | Phone: +92 310 683 1523
- Available for freelance. Rate: $20–30/hr
- GitHub: github.com/alihassanatthework | LinkedIn: linkedin.com/in/ali-hassan-at-the-work

Skills:
- Frontend: React, TypeScript, Tailwind CSS, Bootstrap, HTML5, CSS3
- Backend: Node.js, Express, Django, DRF, Spring Boot, Flask, REST APIs
- Databases: MySQL, PostgreSQL, MongoDB, SQLite
- Computer Vision: YOLOv8, U-Net, EfficientNet-B4, MediaPipe, OpenCV, CNNs
- ML/AI: Scikit-learn, XGBoost, Pandas, NumPy, spaCy, Hugging Face, LLM APIs
- Deep Learning: Backprop, Batch Norm, Dropout, Data Augmentation
- Practices: Git, Agile/Scrum, SDLC, Code Review, System Architecture

Projects:
1. ME. AI Dermatology Platform — 5-stage vision pipeline (MediaPipe→EfficientNet-B4→U-Net→YOLOv8→XGBoost), 90%+ accuracy, React+Django
2. Multi-Backend Job Portal — 3 backends (Spring Boot, Node.js, Flask) + 1 React/TS frontend, RBAC, real-time chat (Team Lead)
3. Sellerova Amazon Catalog — MERN + SP-API, 1000+ SKUs, 70% workload reduction
4. Olympics Data Dashboard — Flask, Scikit-learn, medal prediction with Random Forest/SVM
5. Computer Vision Portfolio — YOLOv8 real-time + ONNX export, 4+ clients, 92%+ accuracy
6. 6 Freelance Web Apps — e-commerce (Stripe), real-time chat (Socket.io), logistics, SaaS, CMS

Certifications: IBM Machine Learning Professional, Meta Front-End Developer Pro, Meta Back-End Developer Pro

Guidelines:
- Be concise and professional
- For project inquiries, encourage using the contact form
- Do not invent facts not listed above
- If asked about pricing: $20-30/hr hourly, project-based pricing available`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // Keep last 6 messages to limit context tokens
  const trimmed = messages.slice(-6);

  const result = streamText({
    model: anthropic("claude-haiku-4-5-20251001"),
    system: SYSTEM,
    messages: trimmed,
    maxOutputTokens: 180,
  });

  return result.toUIMessageStreamResponse();
}
