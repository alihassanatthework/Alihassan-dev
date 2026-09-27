import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/chatbot/Chatbot";
import Navbar from "@/components/landing/Navbar";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CinematicProvider } from "@/context/CinematicContext";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

const baseUrl = "https://www.alihassan-dev.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Ali Hassan | Full Stack Developer & Software Engineer",
  description:
    "I build custom web apps and software solutions for businesses worldwide. 10+ production projects delivered with React, Django, Node.js, and AI. Available for freelance projects.",
  keywords: [
    "hire freelance web developer",
    "custom software development services",
    "freelance full stack developer",
    "website developer for hire",
    "web application development",
    "React developer for hire",
    "Django developer freelance",
    "Node.js developer",
    "custom web app development",
    "software engineer Lahore Pakistan",
    "AI ML developer freelance",
    "computer vision developer",
  ],
  authors: [{ name: "Ali Hassan" }],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Ali Hassan | Full Stack Developer & Software Engineer",
    description: "Custom web apps and software solutions. 10+ production projects delivered for global clients. React, Django, Node.js, AI.",
    url: baseUrl,
    siteName: "Ali Hassan — Software Development Services",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ali Hassan — Full Stack Developer specializing in React, Django, and AI solutions",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Hassan | Full Stack Developer & Software Engineer",
    description: "Custom web apps and software solutions. 10+ projects shipped for global clients.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/logo.png?v=3",
    apple: "/logo.png?v=3",
  },
  manifest: "/manifest.json",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ali Hassan",
    jobTitle: "Full Stack Developer",
    url: baseUrl,
    description: "Freelance Full Stack Developer and Software Engineer delivering custom web applications and AI solutions for global clients.",
    address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
    sameAs: ["https://github.com/alihassanatthework", "https://www.linkedin.com/in/alihassan-developer/"],
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Management and Technology" },
    knowsAbout: ["React", "Django", "Spring Boot", "Machine Learning", "Computer Vision", "Node.js", "TypeScript", "Python"],
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Ali Hassan — Software Development Services",
    url: baseUrl,
    description: "Custom web application development, full stack software engineering, and AI/ML solutions. 10+ production projects delivered for clients worldwide.",
    provider: { "@type": "Person", name: "Ali Hassan" },
    areaServed: "Worldwide",
    address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full Stack Web Application Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Software Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI & Machine Learning Solutions" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Backend API Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Computer Vision Applications" } },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      ratingCount: "3",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Sellerova Client" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "Ali delivered our Amazon catalog system ahead of schedule. The SP API integration was flawless and the automation reduced our team's manual workload by 70%.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Computer Vision Client" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "The dermatology classification model Ali built exceeded our expectations with 90%+ accuracy. Professional delivery and great communication.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "E-Commerce Client" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "Outstanding full-stack development work. Ali built our complete e-commerce platform with payment integration and admin dashboard.",
      },
    ],
  },
];

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
