"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const MIN_DURATION = 2200; // ms: the count never finishes faster than this

export default function Preloader() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = "hidden"; // lock scrolling while loading

    let loaded = document.readyState === "complete";
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad);

    const duration = reduce ? 800 : MIN_DURATION;
    const start = performance.now();
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      let value = Math.round(eased * 100);

      // Hold at 99% until the page has really finished loading
      if (!loaded) value = Math.min(value, 99);

      setProgress(value);

      if (value >= 100) {
        timeout = setTimeout(() => {
          setDone(true);
          root.style.overflow = "";
        }, 350);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      window.removeEventListener("load", onLoad);
      root.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading"
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-white p-6 text-neutral-900 sm:p-10 dark:bg-neutral-950 dark:text-white"
        >
          {/* Top row */}
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
            <span>Ahmed Farid</span>
            <span className="text-neutral-500 dark:text-neutral-400">Portfolio</span>
          </div>

          {/* Counter + progress line */}
          <div>
            <div className="flex items-start leading-none">
              <span className="text-[28vw] font-medium tabular-nums tracking-tighter sm:text-[20vw]">
                {progress}
              </span>
              <span className="mt-[2vw] text-[6vw] font-medium sm:text-[4vw]">%</span>
            </div>

            <div className="mt-6 h-px w-full bg-neutral-200 dark:bg-white/20">
              <div
                className="h-full origin-left bg-neutral-900 dark:bg-white"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}