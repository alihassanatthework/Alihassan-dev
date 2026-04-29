import { cv } from "@/data/cv";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 text-center text-sm text-slate-500">
      <p>
        © {new Date().getFullYear()} {cv.name} · Built with Next.js, Tailwind & Framer Motion
      </p>
    </footer>
  );
}
