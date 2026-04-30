"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export type CinematicPhase = "entry" | "typing" | "reveal" | "text" | "transition" | "static";

const SCHEDULE: Array<{ at: number; phase: CinematicPhase }> = [
  { at: 0,    phase: "entry" },
  { at: 1800, phase: "typing" },
  { at: 3400, phase: "reveal" },
  { at: 4600, phase: "text" },
  { at: 5800, phase: "transition" },
];
const TOTAL_DURATION = 7000;

let GLOBAL_EPOCH = 0;

export function useCinematicTimeline() {
  const [phase, setPhase] = useState<CinematicPhase>("entry");
  const [isFinished, setIsFinished] = useState(false);
  const epochRef = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Reset state on every fresh mount (handles HMR + StrictMode)
    GLOBAL_EPOCH += 1;
    const myEpoch = GLOBAL_EPOCH;
    epochRef.current = myEpoch;

    setPhase("entry");
    setIsFinished(false);

    const myTimers: ReturnType<typeof setTimeout>[] = [];

    SCHEDULE.forEach(({ at, phase: p }) => {
      const t = setTimeout(() => {
        if (epochRef.current !== myEpoch) return; // stale
        setPhase(p);
      }, at);
      myTimers.push(t);
    });

    const finishTimer = setTimeout(() => {
      if (epochRef.current !== myEpoch) return; // stale
      setPhase("static");
      setIsFinished(true);
    }, TOTAL_DURATION);
    myTimers.push(finishTimer);

    timersRef.current = myTimers;

    return () => {
      // Invalidate any in-flight timer callbacks from this mount
      epochRef.current = -1;
      myTimers.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const skip = useCallback(() => {
    epochRef.current = -1; // block stale timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setPhase("static");
    setIsFinished(true);
  }, []);

  return { phase, isFinished, skip };
}
