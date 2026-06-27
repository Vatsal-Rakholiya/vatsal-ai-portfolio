"use client";

import { useEffect, useRef, useState } from "react";

export function ReactiveCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();
  const target = useRef({ x: -80, y: -80 });
  const current = useRef({ x: -80, y: -80 });
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) {
      return;
    }

    const move = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      setVisible(true);
    };

    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x - 26}px, ${current.current.y - 26}px, 0) scale(${pressed ? 0.72 : 1})`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x - 3}px, ${target.current.y - 3}px, 0)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [pressed]);

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[80] h-[52px] w-[52px] rounded-full border border-mint/45 bg-ink/90 shadow-[0_0_22px_rgba(71,245,180,0.18)] transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={dotRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[81] h-1.5 w-1.5 rounded-full border border-mint/60 bg-ink transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
