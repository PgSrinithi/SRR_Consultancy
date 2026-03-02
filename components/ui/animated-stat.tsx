"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedStat({
  value,
  suffix = "",
  prefix = "",
  className,
}: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(0)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref} className={className} />;
}
