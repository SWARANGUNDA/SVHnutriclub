"use client";

import { motion, AnimatePresence, type Transition } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const enterTransition: Transition = {
  duration: 0.4,
  ease: "easeOut",
};

const exitTransition: Transition = {
  duration: 0.25,
  ease: "easeIn",
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={enterTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
