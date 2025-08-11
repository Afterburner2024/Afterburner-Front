"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  durationMs?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function CountUp({
  value,
  durationMs = 800,
  className,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(0);
  const toRef = useRef(value);

  useEffect(() => {
    fromRef.current = display;
    toRef.current = value;
    startRef.current = null;

    let rafId = 0;
    const step: FrameRequestCallback = (t) => {
      if (startRef.current === null) startRef.current = t;
      const elapsed = t - (startRef.current ?? 0);
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const next = Math.round(
        fromRef.current + (toRef.current - fromRef.current) * eased
      );
      setDisplay(next);
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [value, durationMs]);

  return <span className={className}>{`${prefix}${display}${suffix}`}</span>;
}

export default CountUp;
