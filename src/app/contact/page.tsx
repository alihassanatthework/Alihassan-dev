import type { Metadata } from "next";
import FadeIn from "@/components/ui/FadeIn";
import ContactForm from "@/components/sections/ContactForm";
import { cv } from "@/data/cv";
import { Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Ali Hassan",
  description: "Get in touch to discuss your project.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <FadeIn>
        <div className="mb-16 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">Get in Touch</p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Let&apos;s Work Together</h1>
          <p className="mt-4 text-lg text-slate-400">
            Have a project in mind? I&apos;d love to hear about it.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="space-y-6">
          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-white/5 bg-white/2 p-6">
              <h2 className="mb-6 font-semibold text-white">Contact Info</h2>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3 text-slate-400">
                  <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                  {cv.email}
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <MapPin className="h-4 w-4 text-indigo-400 shrink-0" />
                  {cv.location}
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Clock className="h-4 w-4 text-indigo-400 shrink-0" />
                  Typically responds within 24h
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-medium text-emerald-400">Available for projects</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                Currently accepting new clients. Rates: {cv.rates.hourly}
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-2">
          <FadeIn delay={0.2}>
            <div className="rounded-xl border border-white/5 bg-white/2 p-8">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
