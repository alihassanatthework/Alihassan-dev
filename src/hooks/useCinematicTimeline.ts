"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export type CinematicPhase = "entry" | "typing" | "transition" | "static";

const SCHEDULE: Array<{ at: number; phase: CinematicPhase }> = [
  { at: 0,    phase: "entry" },     // walk in (0–2s)
  { at: 2000, phase: "typing" },    // type domain (2–5s)
  { at: 5000, phase: "transition" },// slide-up (5–7s)
];
const TOTAL_DURATION = 7000;

let GLOBAL_EPOCH = 0;

export function useCinematicTimeline() {
  const [phase, setPhase] = useState<CinematicPhase>("entry");
  const [isFinished, setIsFinished] = useState(false);
  const epochRef = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    GLOBAL_EPOCH += 1;
    const myEpoch = GLOBAL_EPOCH;
    epochRef.current = myEpoch;

    setPhase("entry");
    setIsFinished(false);

    const myTimers: ReturnType<typeof setTimeout>[] = [];

    SCHEDULE.forEach(({ at, phase: p }) => {
      const t = setTimeout(() => {
        if (epochRef.current !== myEpoch) return;
        setPhase(p);
      }, at);
      myTimers.push(t);
    });

    const finishTimer = setTimeout(() => {
      if (epochRef.current !== myEpoch) return;
      setPhase("static");
      setIsFinished(true);
    }, TOTAL_DURATION);
    myTimers.push(finishTimer);

    timersRef.current = myTimers;

    return () => {
      epochRef.current = -1;
      myTimers.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const skip = useCallback(() => {
    epochRef.current = -1;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setPhase("static");
    setIsFinished(true);
  }, []);

  return { phase, isFinished, skip };
}
