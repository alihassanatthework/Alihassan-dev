import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">404</h1>
      <p className="text-white/50 text-lg mb-8">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="rounded-full bg-white px-8 py-3 text-black text-sm font-medium hover:bg-zinc-200 transition-colors uppercase tracking-[0.1em]"
      >
        Back to Home
      </Link>
    </div>
  );
}
