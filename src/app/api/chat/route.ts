import { streamText } from "ai";
import { ollama } from "ollama-ai-provider";

const SYSTEM = `You are an AI assistant on Ali Hassan's portfolio website.

About Ali:
- Software Engineer, Full-Stack Developer, ML/AI Engineer
- Software Engineering
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

const rateLimit = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  entry.count++;
  return entry.count > 10;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return new Response("Too many requests", { status: 429 });
  }

  const { messages } = await req.json();

  if (!Array.isArray(messages)) {
    return new Response("Invalid input", { status: 400 });
  }

  const trimmed = messages.slice(-6);

  const result = streamText({
    model: ollama("llama3") as unknown as Parameters<typeof streamText>[0]["model"],
    system: SYSTEM,
    messages: trimmed,
  });

  return result.toUIMessageStreamResponse();
}
