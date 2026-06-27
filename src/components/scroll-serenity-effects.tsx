"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

export function ScrollSerenityEffects() {
  const { scrollYProgress } = useScroll();
  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const backdropOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.2, 0.55, 0.32]);
  const [mouse, setMouse] = useState({ x: 0, y: 0, visible: false });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onMove = (event: PointerEvent) => setMouse({ x: event.clientX, y: event.clientY, visible: true });
    const onLeave = () => setMouse((current) => ({ ...current, visible: false }));
    const onScroll = () => setScrolled(true);
    const onClick = (event: MouseEvent) => {
      const ripple = { id: Date.now(), x: event.clientX, y: event.clientY };
      setRipples((current) => [...current, ripple]);
      window.setTimeout(() => setRipples((current) => current.filter((item) => item.id !== ripple.id)), 900);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <motion.div aria-hidden className="scroll-serenity-backdrop" style={{ y: backdropY, opacity: backdropOpacity }}>
        <div className="scroll-serenity-grid" />
        {[12, 28, 43, 61, 77, 88].map((left, index) => (
          <span
            key={left}
            className="scroll-serenity-dot"
            style={{
              animationDelay: `${index * 0.35}s`,
              left: `${left}%`,
              top: `${18 + ((index * 17) % 68)}%`,
              opacity: scrolled ? undefined : 0
            }}
          />
        ))}
      </motion.div>
      <div
        aria-hidden
        className="mouse-serenity-gradient"
        style={{
          left: mouse.x,
          top: mouse.y,
          opacity: mouse.visible ? 1 : 0
        }}
      />
      {ripples.map((ripple) => (
        <span key={ripple.id} aria-hidden className="serenity-ripple" style={{ left: ripple.x, top: ripple.y }} />
      ))}
    </>
  );
}
