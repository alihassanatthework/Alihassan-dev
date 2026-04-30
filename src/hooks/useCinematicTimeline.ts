"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export type CinematicPhase = "entry" | "typing" | "reveal" | "text" | "transition" | "static";

const SCHEDULE: Array<{ at: number; phase: CinematicPhase }> = [
  { at: 0,     phase: "entry" },
  { at: 3000,  phase: "typing" },
  { at: 6000,  phase: "reveal" },
  { at: 8000,  phase: "text" },
  { at: 10000, phase: "transition" },
];
const TOTAL_DURATION = 12000;

export function useCinematicTimeline() {
  const [phase, setPhase] = useState<CinematicPhase>("entry");
  const [isFinished, setIsFinished] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const finished = useRef(false);

  useEffect(() => {
    finished.current = false;

    SCHEDULE.forEach(({ at, phase }) => {
      const t = setTimeout(() => {
        if (finished.current) return;
        setPhase(phase);
      }, at);
      timers.current.push(t);
    });

    const finishTimer = setTimeout(() => {
      finished.current = true;
      setPhase("static");
      setIsFinished(true);
    }, TOTAL_DURATION);
    timers.current.push(finishTimer);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  const skip = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    finished.current = true;
    setPhase("static");
    setIsFinished(true);
  }, []);

  return { phase, isFinished, skip };
}
