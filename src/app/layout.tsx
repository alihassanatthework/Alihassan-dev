import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/chatbot/Chatbot";
import Navbar from "@/components/landing/Navbar";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

const baseUrl = "https://www.alihassan-dev.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Ali Hassan | Software Engineer & Full Stack Developer & ML Engineer",
  description:
    "Expert Software Engineer specializing in Full Stack Web Development (React, Django, Node.js) and Machine Learning (Computer Vision, YOLOv8). 10+ production projects shipped for global clients.",
  keywords: [
    "Software Engineer Lahore",
    "Full Stack Developer Pakistan",
    "ML AI Engineer",
    "Computer Vision Specialist",
    "React TypeScript Developer",
    "Django Backend Expert",
    "Amazon SP API Automation",
    "YOLOv8 Object Detection",
    "SaaS Architecture",
    "Freelance Software Engineer",
    "UMT Software Engineering"
  ],
  authors: [{ name: "Ali Hassan" }],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Ali Hassan | Software Engineer & Full Stack Developer & ML AI Engineer",
    description: "Architecting production-grade systems with React, Django, and AI. Explore 10+ shipped projects.",
    url: baseUrl,
    siteName: "Ali Hassan Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Ali Hassan - Software Engineer Portfolio",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Hassan | Software Engineer & Full Stack Developer & ML AI Engineer",
    description: "Full Stack Web & AI Solutions. Shipped 10+ production-grade projects.",
    images: ["/profile.jpg"],
  },
  icons: {
    icon: "/logo.png?v=3",
    apple: "/logo.png?v=3",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ali Hassan",
  jobTitle: "Software Engineer",
  description: "Full Stack Developer and ML AI Engineer based in Lahore, Pakistan",
  email: "alihassan.at.the.work@gmail.com",
  telephone: "+923106831523",
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  sameAs: ["https://github.com/alihassanatthework", "https://www.linkedin.com/in/alihassan-developer/"],
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Management and Technology" },
  knowsAbout: ["React", "Django", "Spring Boot", "Machine Learning", "Computer Vision", "Node.js", "TypeScript", "Python", "YOLOv8", "TensorFlow", "XGBoost"],
};

import { CinematicProvider } from "@/context/CinematicContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-6879VC7QMY";

  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#000000] text-[#eae9fc]" suppressHydrationWarning>
        <CinematicProvider>
          <Navbar />
          {children}
          <Chatbot />
        </CinematicProvider>
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
