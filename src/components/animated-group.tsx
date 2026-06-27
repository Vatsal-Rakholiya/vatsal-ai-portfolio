"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
};

const defaultContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const defaultItem: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 18 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.28,
      duration: 1.1
    }
  }
};

export function AnimatedGroup({ children, className, variants }: AnimatedGroupProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants?.container ?? defaultContainer}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={variants?.item ?? defaultItem}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
