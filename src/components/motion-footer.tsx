"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import type { Portfolio } from "@/types/portfolio";

export function MotionFooter({ portfolio }: { portfolio: Portfolio }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });

  const lineX = useTransform(scrollYProgress, [0, 1], ["22%", "-8%"]);
  const lift = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const opacity = useTransform(scrollYProgress, [0.14, 0.65], [0, 1]);
  const text = portfolio.siteText;
  const headline = portfolio.profile.headline.replace(/\bJunior\s+/gi, "").trim();

  return (
    <motion.footer ref={ref} className="relative isolate overflow-hidden border-t border-white/10 px-4 pb-8 pt-24 sm:px-6 lg:px-8">
      <motion.div
        aria-hidden
        style={{ x: lineX }}
        className="absolute left-[-10vw] top-16 h-px w-[120vw] bg-gradient-to-r from-transparent via-mint/55 to-transparent"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(circle_at_50%_100%,rgba(71,245,180,0.16),transparent_34rem)]" />

      <div className="mx-auto max-w-7xl">
        <motion.div style={{ opacity, y: lift }} className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-mint">{text.footerKicker}</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">{text.footerTitle}</h2>
          </div>
          <a href={`mailto:${portfolio.profile.email}`} className="inline-flex w-fit items-center gap-2 rounded-md border border-mint/30 px-4 py-3 text-sm font-semibold text-mint transition hover:border-signal hover:text-signal">
            {text.footerCta}
            <ArrowUpRight size={17} />
          </a>
        </motion.div>

        <motion.div style={{ opacity }} className="mt-8 grid gap-5 border-t border-white/10 pt-6 text-sm text-white/56 md:grid-cols-3">
          <p>{headline}</p>
          <p>{portfolio.profile.location}</p>
          <div className="flex flex-wrap gap-4 md:justify-end">
            {portfolio.profile.linkedinUrl && (
              <a href={portfolio.profile.linkedinUrl} className="hover:text-mint">
                LinkedIn
              </a>
            )}
            {portfolio.profile.githubUrl && (
              <a href={portfolio.profile.githubUrl} className="hover:text-mint">
                GitHub
              </a>
            )}
            <a href="#top" className="hover:text-mint">
              Back to top
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
