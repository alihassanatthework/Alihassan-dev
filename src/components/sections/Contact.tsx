"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { cv } from "@/data/cv";
import FadeIn from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Valid email required"),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Tell me more"),
});
type FormData = z.infer<typeof schema>;

const services = ["Full-Stack Web App", "ML / AI Pipeline", "Computer Vision", "Backend API", "Other"];
const budgets = ["< $500", "$500–2k", "$2k–5k", "$5k+", "Hourly ($20–30/hr)"];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputCls = (err?: { message?: string }) => cn(
    "w-full rounded-lg border bg-white/4 px-3 py-2.5 text-sm text-[#eae9fc] placeholder-white/20 outline-none transition",
    "focus:border-[#00e5bf]/50 focus:ring-1 focus:ring-[#00e5bf]/30",
    err ? "border-red-500/40" : "border-white/6"
  );

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-16 pb-28">
      <FadeIn>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-[#00e5bf]" />
          <span className="font-mono text-[10px] uppercase tracking-[2px] text-[#00e5bf]">Contact</span>
        </div>
        <h2 className="mb-8 text-4xl font-black tracking-[-1px] text-[#eae9fc]">Let&apos;s build something.</h2>
      </FadeIn>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* Form */}
        <FadeIn delay={0.1}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[8px] tracking-[1px] text-white/30 uppercase mb-1 block">Name</label>
                <input {...register("name")} placeholder="Your name" className={inputCls(errors.name)} />
                {errors.name && <p className="mt-1 text-[10px] text-red-400">{errors.name.message}</p>}
              </div>
              <div>
                <label className="font-mono text-[8px] tracking-[1px] text-white/30 uppercase mb-1 block">Email</label>
                <input {...register("email")} type="email" placeholder="you@company.com" className={inputCls(errors.email)} />
                {errors.email && <p className="mt-1 text-[10px] text-red-400">{errors.email.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[8px] tracking-[1px] text-white/30 uppercase mb-1 block">Service</label>
                <select {...register("service")} className={cn(inputCls(), "bg-[#07080f]")}>
                  <option value="">Select service ▾</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="font-mono text-[8px] tracking-[1px] text-white/30 uppercase mb-1 block">Budget</label>
                <select {...register("budget")} className={cn(inputCls(), "bg-[#07080f]")}>
                  <option value="">Select range ▾</option>
                  {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="font-mono text-[8px] tracking-[1px] text-white/30 uppercase mb-1 block">Message</label>
              <textarea
                {...register("message")}
                rows={4}
                placeholder="Tell me about your project..."
                className={cn(inputCls(errors.message), "resize-none")}
              />
              {errors.message && <p className="mt-1 text-[10px] text-red-400">{errors.message.message}</p>}
            </div>

            {status === "sent" && (
              <div className="rounded-lg border border-[#00e5bf]/20 bg-[#00e5bf]/5 px-4 py-2.5 text-xs text-[#00e5bf]">
                Message sent! I&apos;ll reply within 24 hours.
              </div>
            )}
            {status === "error" && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-xs text-red-400">
                Something went wrong. Email me directly.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-xl px-6 py-2.5 text-sm font-semibold text-[#07080f] transition hover:brightness-110 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#00e5bf,#4d7cff)" }}
            >
              {status === "sending" ? "Sending…" : "Send message →"}
            </button>
          </form>
        </FadeIn>

        {/* Info */}
        <FadeIn delay={0.2}>
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-xl border border-[#00e5bf]/10 bg-[#00e5bf]/5 px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-[#00e5bf]" />
              <span className="text-xs font-medium text-[#00e5bf]">Available for freelance · {cv.rates.hourly}</span>
            </div>

            <div className="space-y-3">
              {[
                { icon: "✉", label: "Email", value: cv.email },
                { icon: "☎", label: "Phone", value: cv.phone },
                { icon: "⌖", label: "Location", value: cv.location },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/4 text-sm">{item.icon}</div>
                  <div>
                    <div className="text-[9px] text-white/25">{item.label}</div>
                    <div className="text-xs font-medium text-[#eae9fc]">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              {[
                { label: "GH", href: cv.github },
                { label: "LI", href: cv.linkedin },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/6 bg-white/4 font-mono text-[10px] font-bold text-white/40 hover:text-white/70 hover:border-white/20 transition"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
