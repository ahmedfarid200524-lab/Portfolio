"use client";

import { useEffect, useRef } from "react";

const SEGMENTS = 28;   // tail length
const FOLLOW = 0.42;   // how tightly each segment follows the previous one (0-1)
const HEAD_FOLLOW = 0.35;
const MAX_WIDTH = 14;  // thickest part of the ribbon

export default function SwarmCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, raf = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const mouse = { x: w / 2, y: h / 2, active: false };
    const pts = Array.from({ length: SEGMENTS }, () => ({ x: w / 2, y: h / 2 }));
    let grow = 0;       // 0 normal, 1 hovering a link/button
    let growTarget = 0;
    let pulse = 0;      // click pulse

    const onMove = (e: MouseEvent) => {
      if (!mouse.active) {
        mouse.active = true;
        pts.forEach((p) => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      growTarget = hit ? 1 : 0;
    };

    const onDown = () => (pulse = 1);
    const onLeave = () => (mouse.active = false);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      grow += (growTarget - grow) * 0.12;
      pulse *= 0.9;

      if (mouse.active) {
        // Head chases the mouse, every other point chases the one before it
        pts[0].x += (mouse.x - pts[0].x) * HEAD_FOLLOW;
        pts[0].y += (mouse.y - pts[0].y) * HEAD_FOLLOW;
        for (let i = 1; i < SEGMENTS; i++) {
          pts[i].x += (pts[i - 1].x - pts[i].x) * FOLLOW;
          pts[i].y += (pts[i - 1].y - pts[i].y) * FOLLOW;
        }

        const widthScale = 1 + grow * 0.6 + pulse * 0.8;
        ctx.strokeStyle = "#fff";
        ctx.fillStyle = "#fff";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Tapered tail: thick near the head, thin and faded at the end
        for (let i = 0; i < SEGMENTS - 1; i++) {
          const t = 1 - i / (SEGMENTS - 1);
          ctx.globalAlpha = 0.15 + t * 0.85;
          ctx.lineWidth = Math.max(0.5, t * t * MAX_WIDTH * widthScale);

          const a = pts[i];
          const b = pts[i + 1];
          const c = pts[Math.min(i + 2, SEGMENTS - 1)];
          // Smooth the joints with midpoint curves
          ctx.beginPath();
          ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
          ctx.quadraticCurveTo(b.x, b.y, (b.x + c.x) / 2, (b.y + c.y) / 2);
          ctx.stroke();
        }

        // Head
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, (MAX_WIDTH / 2) * widthScale, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference"
    />
  );
}