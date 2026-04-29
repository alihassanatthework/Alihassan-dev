import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/chatbot/Chatbot";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ali Hassan | Full-Stack Developer & ML Engineer | Lahore, Pakistan",
  description:
    "Software engineer building production-grade web apps and ML pipelines. React, Django, Spring Boot, YOLOv8. 10+ projects shipped, 6+ clients served. Available for freelance.",
  keywords: ["Full-Stack Developer", "ML Engineer", "React", "Django", "YOLOv8", "Freelance", "Lahore", "Pakistan"],
  authors: [{ name: "Ali Hassan" }],
  openGraph: {
    title: "Ali Hassan — Full-Stack Developer & ML/AI Engineer",
    description: "Full-stack apps · ML pipelines · Computer vision. From architecture to deployment.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Hassan — Full-Stack Developer & ML/AI Engineer",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ali Hassan",
  jobTitle: "Software Engineer",
  description: "Full-Stack Developer and ML/AI Engineer based in Lahore, Pakistan",
  email: "alihassan.at.the.work@gmail.com",
  telephone: "+923106831523",
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  sameAs: ["https://github.com/alihassanatthework", "https://linkedin.com/in/ali-hassan-at-the-work"],
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Management and Technology" },
  knowsAbout: ["React", "Django", "Spring Boot", "Machine Learning", "Computer Vision", "Node.js", "TypeScript", "Python", "YOLOv8", "TensorFlow", "XGBoost"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen bg-[#07080f] text-[#eae9fc]">
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
