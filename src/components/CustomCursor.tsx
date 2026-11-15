"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringScaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = 0, y = 0;   // real mouse position
    let rx = 0, ry = 0; // ring position (lerped)
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        rx = x;
        ry = y;
        dotRef.current?.classList.remove("opacity-0");
        ringRef.current?.classList.remove("opacity-0");
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      ringScaleRef.current?.classList.toggle("scale-[1.8]", !!hit);
      ringScaleRef.current?.classList.toggle("bg-white/20", !!hit);
    };

    const onLeave = () => {
      visible = false;
      dotRef.current?.classList.add("opacity-0");
      ringRef.current?.classList.add("opacity-0");
    };

    const tick = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 mix-blend-difference"
      >
        <div className="-ml-1 -mt-1 h-2 w-2 rounded-full bg-white" />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 mix-blend-difference"
      >
        <div
          ref={ringScaleRef}
          className="-ml-5 -mt-5 h-10 w-10 rounded-full border border-white transition-[transform,background-color] duration-200 ease-out"
        />
      </div>
    </>
  );
}