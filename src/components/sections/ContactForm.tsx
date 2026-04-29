"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  budget: z.string().optional(),
  message: z.string().min(20, "Please tell me a bit more (min 20 chars)"),
});

type FormData = z.infer<typeof schema>;

const budgetOptions = ["< $5k", "$5k–15k", "$15k–50k", "$50k+", "Hourly / ongoing"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-slate-400">Name *</label>
          <input
            {...register("name")}
            placeholder="Your name"
            className={cn(
              "w-full rounded-lg border bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500",
              errors.name ? "border-red-500/50" : "border-white/10"
            )}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-slate-400">Email *</label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@company.com"
            className={cn(
              "w-full rounded-lg border bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500",
              errors.email ? "border-red-500/50" : "border-white/10"
            )}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-slate-400">Budget range</label>
        <select
          {...register("budget")}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">Select a range…</option>
          {budgetOptions.map((o) => (
            <option key={o} value={o} className="bg-[#0a0a0f]">
              {o}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-slate-400">Message *</label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Tell me about your project, goals, and timeline…"
          className={cn(
            "w-full resize-none rounded-lg border bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500",
            errors.message ? "border-red-500/50" : "border-white/10"
          )}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      {status === "sent" && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          Message sent! I&apos;ll get back to you within 24 hours.
        </div>
      )}
      {status === "error" && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          Something went wrong. Please email me directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500 disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
