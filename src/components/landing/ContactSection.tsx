"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cv } from "@/data/cv";

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

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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

  const inputCls = (err?: { message?: string }) => 
    `w-full liquid-glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:bg-white/5 ${err ? "border border-red-500/50" : "border border-white/5"}`;

  return (
    <section id="contact" className="bg-black py-24 md:py-32 px-6 overflow-hidden relative" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-white tracking-tight flex gap-4 flex-wrap">
            <span>Let&apos;s build</span>
            <span 
              className="text-white/40 font-light lowercase" 
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
            >
              something.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input {...register("name")} placeholder="Your name" className={inputCls(errors.name)} />
                  {errors.name && <p className="mt-1.5 text-[10px] text-red-400 font-mono pl-2">{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register("email")} type="email" placeholder="you@company.com" className={inputCls(errors.email)} />
                  {errors.email && <p className="mt-1.5 text-[10px] text-red-400 font-mono pl-2">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <select {...register("service")} className={inputCls()}>
                    <option value="" className="bg-black">Select service ▾</option>
                    {services.map((s) => <option key={s} value={s} className="bg-black">{s}</option>)}
                  </select>
                </div>
                <div>
                  <select {...register("budget")} className={inputCls()}>
                    <option value="" className="bg-black">Select budget range ▾</option>
                    {budgets.map((b) => <option key={b} value={b} className="bg-black">{b}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={`${inputCls(errors.message)} resize-none`}
                />
                {errors.message && <p className="mt-1.5 text-[10px] text-red-400 font-mono pl-2">{errors.message.message}</p>}
              </div>

              {status === "sent" && (
                <div className="liquid-glass rounded-xl border border-green-500/20 px-4 py-3 text-xs text-green-400">
                  Message sent! I&apos;ll reply within 24 hours.
                </div>
              )}
              {status === "error" && (
                <div className="liquid-glass rounded-xl border border-red-500/20 px-4 py-3 text-xs text-red-400">
                  Something went wrong. Please email me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="liquid-glass rounded-full px-8 py-4 text-white text-sm font-medium hover:bg-white/10 transition-colors w-full md:w-auto disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Contact Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            <div className="liquid-glass rounded-3xl p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-white/80">Available for freelance · {cv.rates.hourly}</span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/40 font-mono tracking-widest uppercase text-xs">Email</span>
                  <span className="text-white">{cv.email}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/40 font-mono tracking-widest uppercase text-xs">Phone</span>
                  <span className="text-white">{cv.phone}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/40 font-mono tracking-widest uppercase text-xs">Location</span>
                  <span className="text-white">{cv.location}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href={cv.github} target="_blank" rel="noreferrer" className="flex-1 liquid-glass rounded-full py-4 flex items-center justify-center text-xs font-mono font-bold tracking-widest text-white/60 hover:text-white transition-colors">
                GITHUB
              </a>
              <a href={cv.linkedin} target="_blank" rel="noreferrer" className="flex-1 liquid-glass rounded-full py-4 flex items-center justify-center text-xs font-mono font-bold tracking-widest text-white/60 hover:text-white transition-colors">
                LINKEDIN
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
