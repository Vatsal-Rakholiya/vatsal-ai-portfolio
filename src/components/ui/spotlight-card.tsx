"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type GlowColor = "blue" | "purple" | "green" | "red" | "orange";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  glowColor?: GlowColor;
};

const glowColorMap: Record<GlowColor, { base: number; spread: number }> = {
  blue: { base: 195, spread: 120 },
  purple: { base: 270, spread: 120 },
  green: { base: 145, spread: 100 },
  red: { base: 5, spread: 80 },
  orange: { base: 34, spread: 90 }
};

type GlowStyle = CSSProperties & {
  "--base": number;
  "--spread": number;
  "--x": string;
  "--y": string;
  "--xp": string;
  "--yp": string;
};

export function GlowCard({ children, className = "", glowColor = "green" }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { base, spread } = glowColorMap[glowColor];

  useEffect(() => {
    const syncPointer = (event: PointerEvent) => {
      const card = cardRef.current;
      if (!card) {
        return;
      }

      card.style.setProperty("--x", event.clientX.toFixed(2));
      card.style.setProperty("--xp", (event.clientX / window.innerWidth).toFixed(2));
      card.style.setProperty("--y", event.clientY.toFixed(2));
      card.style.setProperty("--yp", (event.clientY / window.innerHeight).toFixed(2));
    };

    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  return (
    <div
      ref={cardRef}
      data-glow-card
      style={
        {
          "--base": base,
          "--spread": spread,
          "--x": "0",
          "--y": "0",
          "--xp": "0",
          "--yp": "0"
        } as GlowStyle
      }
      className={`relative isolate overflow-hidden border border-white/10 bg-white/[0.035] shadow-[0_1rem_2rem_-1rem_black] backdrop-blur-xl ${className}`}
    >
      <div data-glow-card-aura />
      {children}
    </div>
  );
}
