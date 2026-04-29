"use client";

import { motion } from "framer-motion";
import { cv } from "@/data/cv";
import FadeIn from "@/components/ui/FadeIn";

export default function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-5xl px-6 py-24">
      <FadeIn>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-[#00e5bf]" />
          <span className="font-mono text-xs uppercase tracking-[2px] text-[#00e5bf]">Testimonials</span>
        </div>
        <h2 className="mb-8 text-4xl font-black tracking-[-1px] text-[#eae9fc]">What clients say.</h2>
      </FadeIn>

      <div className="grid gap-5 sm:grid-cols-3">
        {cv.reviews.map((r, i) => (
          <FadeIn key={r.initials} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex h-full flex-col rounded-xl border border-white/6 bg-white/2 p-6"
            >
              <div className="mb-3 text-sm tracking-[3px] text-[#f0c040]">★★★★★</div>
              <p className="flex-1 text-sm leading-relaxed italic text-white/45 mb-5">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold"
                    style={{
                      background: `rgba(${
                        r.color === "#00e5bf" ? "0,229,191" :
                        r.color === "#4d7cff" ? "77,124,255" : "249,115,22"
                      },0.1)`,
                      color: r.color,
                    }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#eee]">{r.author}</div>
                    <div className="text-[10px] text-[#00e5bf]">✓ Verified</div>
                  </div>
                </div>
                <div className="font-mono text-[9px] text-white/25 text-right">{r.project}</div>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
