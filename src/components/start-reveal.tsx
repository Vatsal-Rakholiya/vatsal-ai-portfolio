"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, LoaderCircle, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const query = "who is Vatsal Rakholiya";

export function StartReveal() {
  const [typed, setTyped] = useState("");
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  const statusItems = useMemo(
    () => [
      "Searching portfolio graph",
      "Reading data science projects",
      "Matching AI, NLP, RAG, forecasting signals",
      "Profile found"
    ],
    []
  );

  useEffect(() => {
    const timers: number[] = [];

    timers.push(
      window.setTimeout(() => {
        let index = 0;
        const interval = window.setInterval(() => {
          index += 1;
          setTyped(query.slice(0, index));

          if (index >= query.length) {
            window.clearInterval(interval);
          }
        }, 48);
      }, 420)
    );

    statusItems.forEach((_, index) => {
      timers.push(window.setTimeout(() => setStep(index + 1), 1500 + index * 420));
    });

    timers.push(window.setTimeout(() => setVisible(false), 3850));

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [statusItems]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-label="Loading Vatsal Rakholiya portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-ink px-4"
        >
          <div aria-hidden className="loader-lab-bg absolute inset-0" />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(71,245,180,0.14),transparent_34rem)]" />

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative w-full max-w-2xl rounded-lg border border-mint/20 bg-ink/86 p-4 shadow-[0_0_80px_rgba(71,245,180,0.16)] backdrop-blur-2xl sm:p-6"
          >
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-mint">ai discovery console</p>
                <p className="mt-2 text-sm text-white/52">Initializing portfolio search before launch</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-mint/30 bg-mint/10 text-mint">
                <Sparkles size={19} />
              </div>
            </div>

            <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
              <div className="flex items-center gap-3">
                <Search className="shrink-0 text-mint" size={20} />
                <div className="min-h-8 flex-1 py-1 font-mono text-sm text-white sm:text-base">
                  <span>{typed}</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.75, repeat: Infinity }}
                    className="ml-1 inline-block h-5 w-2 translate-y-1 bg-mint"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {statusItems.map((item, index) => {
                const active = step === index + 1;
                const complete = step > index + 1;
                const revealed = step >= index + 1;

                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: revealed ? 1 : 0.28, x: 0 }}
                    transition={{ duration: 0.28 }}
                    className="flex items-center gap-3 px-1 py-1.5 text-sm text-white/62"
                  >
                    {complete || (item === "Profile found" && step >= 4) ? (
                      <CheckCircle2 size={16} className="text-mint" />
                    ) : active ? (
                      <LoaderCircle size={16} className="animate-spin text-amber" />
                    ) : (
                      <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-white/28" />
                    )}
                    <span>{item}</span>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 12 }}
              className="mt-5 rounded-md border border-mint/25 bg-mint/10 p-4"
            >
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-mint">result</p>
              <p className="mt-2 text-lg font-semibold text-white">Vatsal Rakholiya</p>
              <p className="mt-1 text-sm text-white/62">Data Scientist | ML, NLP, RAG, forecasting, document intelligence</p>
            </motion.div>

            <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.45, ease: "easeInOut" }}
                className="h-full bg-mint"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
