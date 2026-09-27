"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Something went wrong</h1>
      <p className="text-white/50 text-lg mb-8">An unexpected error occurred.</p>
      <button
        onClick={reset}
        className="rounded-full bg-white px-8 py-3 text-black text-sm font-medium hover:bg-zinc-200 transition-colors uppercase tracking-[0.1em]"
      >
        Try Again
      </button>
    </div>
  );
}
