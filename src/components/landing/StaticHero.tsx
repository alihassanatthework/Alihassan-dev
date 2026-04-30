"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cv } from "@/data/cv";

const roles = ["Software Engineer", "Full-Stack Developer", "AI / ML Engineer"];

export default function StaticHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-6">
      {/* Soft radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.04)_0%,_transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-12 h-32 w-32 rounded-full border border-white/10 p-1 md:h-44 md:w-44"
        >
          <div className="relative h-full w-full overflow-hidden rounded-full grayscale contrast-110">
            <Image
              src="/profile.jpg"
              alt={cv.name}
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "center 18%" }}
            />
          </div>
          <motion.div
            className="absolute inset-0 -z-10 rounded-full blur-2xl"
            style={{ background: "rgba(255,255,255,0.06)" }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Name — Updated to Inter and standard sizes */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 tracking-tight text-white"
        >
          {cv.name.split(" ")[0]}{" "}
          <span className="font-light text-zinc-400">
            {cv.name.split(" ").slice(1).join(" ")}
          </span>
        </motion.h1>

        {/* Roles — standard body text */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
          }}
          className="flex flex-col items-center gap-4 text-zinc-500 md:flex-row md:gap-8 body-small uppercase tracking-[0.2em]"
        >
          {roles.map((role, i) => (
            <motion.span
              key={role}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {role}
              {i < roles.length - 1 && (
                <span className="mx-4 hidden h-1 w-1 rounded-full bg-zinc-800 md:inline-block align-middle" />
              )}
            </motion.span>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 max-w-md text-zinc-500 body-small"
        >
          Crafting full-stack experiences. Designing intelligent systems. Shipping production.
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-12 rounded-full bg-white px-8 py-3 text-black transition hover:bg-zinc-200 uppercase tracking-[0.1em]"
        >
          Explore Universe
        </motion.button>
      </div>

      {/* Bottom social bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-12 caption uppercase tracking-[0.2em] text-zinc-600"
      >
        <a href={cv.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">GitHub</a>
        <a href={cv.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">LinkedIn</a>
        <a href={`mailto:${cv.email}`} className="transition-colors hover:text-white">Contact</a>
      </motion.div>
    </section>
  );
}
