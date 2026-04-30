"use client";

import Image from "next/image";
import { cv } from "@/data/cv";

const roles = ["Software Engineer", "Full-Stack Developer", "AI / ML Engineer"];

/**
 * Mini version of the actual StaticHero — rendered inside the 3D monitor.
 * Visual MUST match StaticHero so the cinematic→live transition is seamless.
 */
export default function MonitorPreview({ scale = 1 }: { scale?: number }) {
  return (
    <div
      style={{
        width: 1280,
        height: 800,
        background: "#000",
        backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        color: "#fff",
      }}
    >
      {/* Mini navbar */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          gap: 22,
          fontSize: 14,
          color: "rgba(255,255,255,0.55)",
          letterSpacing: 0.5,
        }}
      >
        <span style={{ color: "#fff", fontWeight: 700 }}>
          Ali<span style={{ color: "#fff", fontWeight: 300 }}> hassan</span>
        </span>
        <span>About</span>
        <span>Skills</span>
        <span>Portfolio</span>
        <span>Services</span>
        <span>Reviews</span>
        <span>Contact</span>
        <span
          style={{
            background: "#fff",
            color: "#000",
            padding: "6px 14px",
            borderRadius: 999,
            fontWeight: 600,
            fontSize: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          ↓ Download CV
        </span>
      </div>

      {/* Avatar */}
      <div
        style={{
          position: "relative",
          width: 176,
          height: 176,
          borderRadius: "50%",
          padding: 4,
          border: "1px solid rgba(255,255,255,0.1)",
          marginBottom: 48,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            filter: "grayscale(1) contrast(1.1)",
          }}
        >
          <Image
            src="/profile.jpg"
            alt={cv.name}
            fill
            sizes="176px"
            style={{ objectFit: "cover", objectPosition: "center 18%" }}
          />
        </div>
      </div>

      {/* Name */}
      <h1
        style={{
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          margin: 0,
          marginBottom: 24,
          color: "#fff",
        }}
      >
        {cv.name.split(" ")[0]}{" "}
        <span style={{ fontWeight: 300, color: "#a1a1aa" }}>
          {cv.name.split(" ").slice(1).join(" ")}
        </span>
      </h1>

      {/* Roles */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          fontSize: 14,
          color: "#71717a",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          marginBottom: 32,
        }}
      >
        {roles.map((r, i) => (
          <span key={r} style={{ display: "inline-flex", alignItems: "center", gap: 32 }}>
            {r}
            {i < roles.length - 1 && (
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#3f3f46" }} />
            )}
          </span>
        ))}
      </div>

      {/* Tagline */}
      <p
        style={{
          fontSize: 14,
          color: "#71717a",
          maxWidth: 520,
          textAlign: "center",
          margin: 0,
          marginBottom: 48,
        }}
      >
        Crafting full-stack experiences. Designing intelligent systems. Shipping production.
      </p>

      {/* CTA */}
      <button
        style={{
          background: "#fff",
          color: "#000",
          padding: "14px 36px",
          borderRadius: 999,
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          border: "none",
        }}
      >
        Explore Universe
      </button>

      {/* Bottom links */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          display: "flex",
          gap: 48,
          fontSize: 12,
          color: "#52525b",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        <span>GitHub</span>
        <span>LinkedIn</span>
        <span>Contact</span>
      </div>
    </div>
  );
}
