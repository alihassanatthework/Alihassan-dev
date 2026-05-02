"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

export type CinematicPhase = "entry" | "typing" | "transition" | "static";

interface CinematicContextType {
  phase: CinematicPhase;
  isFinished: boolean;
  skip: () => void;
}

const CinematicContext = createContext<CinematicContextType | undefined>(undefined);

const SCHEDULE: Array<{ at: number; phase: CinematicPhase }> = [
  { at: 0,    phase: "entry" },     // walk in (0–2s)
  { at: 2000, phase: "typing" },    // type domain (2–5s)
  { at: 5000, phase: "transition" },// slide-up (5–7s)
];
const TOTAL_DURATION = 7000;

export function CinematicProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<CinematicPhase>("entry");
  const [isFinished, setIsFinished] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const skip = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setPhase("static");
    setIsFinished(true);
  }, []);

  useEffect(() => {
    const myTimers: ReturnType<typeof setTimeout>[] = [];

    SCHEDULE.forEach(({ at, phase: p }) => {
      const t = setTimeout(() => {
        setPhase(p);
      }, at);
      myTimers.push(t);
    });

    const finishTimer = setTimeout(() => {
      setPhase("static");
      setIsFinished(true);
    }, TOTAL_DURATION);
    myTimers.push(finishTimer);

    timersRef.current = myTimers;

    return () => {
      myTimers.forEach(clearTimeout);
    };
  }, []);

  return (
    <CinematicContext.Provider value={{ phase, isFinished, skip }}>
      {children}
    </CinematicContext.Provider>
  );
}

export function useCinematic() {
  const context = useContext(CinematicContext);
  if (context === undefined) {
    throw new Error("useCinematic must be used within a CinematicProvider");
  }
  return context;
}
