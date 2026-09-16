"use client";

import * as React from "react";

interface FlowingDot {
  x: number;
  y: number;
  dir: "left" | "right" | "up" | "down";
  speed: number;
  color: string;
  size: number;
  alpha: number;
  maxAlpha: number;
  trail: { x: number; y: number; alpha: number }[];
  distanceTraveled: number;
  maxDistance: number;
}

export function FlowingGridField({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const mouseRef = React.useRef<{ x: number; y: number; active: boolean }>({ x: -999, y: -999, active: false });
  const isReducedMotion = React.useRef(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotion.current = motionQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion.current = e.matches;
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const GRID_SIZE = 28; // 28px grid unit
    let width = 0;
    let height = 0;
    let animationFrameId: number;
    let isVisible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);

    // Visibility observer to pause when scrolled out of view
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    // Colors: Coral (#cc785c), Amber (#e8a55a), Teal (#5db8a6), Luminous Ink/Cream
    const colors = [
      "rgba(204, 120, 92, 1)",  // coral
      "rgba(204, 120, 92, 0.8)",
      "rgba(232, 165, 90, 0.9)", // amber
      "rgba(93, 184, 166, 0.85)", // teal
      "rgba(250, 249, 245, 0.9)", // cream
    ];

    const directions: ("left" | "right" | "up" | "down")[] = ["left", "right", "up", "down"];

    // Initialize flowing dots
    const MAX_DOTS = 32;
    const dots: FlowingDot[] = [];

    const createDot = (): FlowingDot => {
      // Pick an intersection point centered around the middle 70% of the canvas
      const minX = Math.floor((width * 0.15) / GRID_SIZE);
      const maxX = Math.floor((width * 0.85) / GRID_SIZE);
      const minY = Math.floor((height * 0.1) / GRID_SIZE);
      const maxY = Math.floor((height * 0.85) / GRID_SIZE);

      const gridX = Math.floor(minX + Math.random() * Math.max(1, maxX - minX)) * GRID_SIZE;
      const gridY = Math.floor(minY + Math.random() * Math.max(1, maxY - minY)) * GRID_SIZE;

      const dir = directions[Math.floor(Math.random() * directions.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const maxAlpha = 0.5 + Math.random() * 0.5;

      return {
        x: gridX,
        y: gridY,
        dir,
        speed: 1 + Math.floor(Math.random() * 2), // 1 or 2 px per step
        color,
        size: Math.random() > 0.6 ? 4 : 3, // crisp 3x3 or 4x4 integer squares
        alpha: 0,
        maxAlpha,
        trail: [],
        distanceTraveled: 0,
        maxDistance: (4 + Math.floor(Math.random() * 12)) * GRID_SIZE, // Travel 4-12 grid units
      };
    };

    for (let i = 0; i < MAX_DOTS; i++) {
      const dot = createDot();
      // stagger initial progress
      dot.distanceTraveled = Math.random() * dot.maxDistance;
      dot.alpha = Math.random() * dot.maxAlpha;
      dots.push(dot);
    }

    // Interactive mouse listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    let lastTime = performance.now();

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      void dt;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * 0.42;
      const maxRadius = Math.max(width, height) * 0.52;

      // 1. Living Stepped Pixel Particles (No grid box lines drawn over paper)

      // 2. Animate and Draw Flowing Grid Dots
      if (!isReducedMotion.current) {
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];

          // Fade in at birth, fade out at end
          const progress = dot.distanceTraveled / dot.maxDistance;
          if (progress < 0.2) {
            dot.alpha = (progress / 0.2) * dot.maxAlpha;
          } else if (progress > 0.8) {
            dot.alpha = ((1 - progress) / 0.2) * dot.maxAlpha;
          } else {
            dot.alpha = dot.maxAlpha;
          }

          // Distance from focal center affects alpha so particles don't spill off the edge
          const dx = dot.x - centerX;
          const dy = dot.y - centerY;
          const distFromCenter = Math.sqrt(dx * dx + dy * dy);
          const focalFade = Math.max(0, 1 - distFromCenter / (maxRadius * 0.95));
          const effectiveAlpha = dot.alpha * focalFade;

          // Record trail
          dot.trail.unshift({ x: dot.x, y: dot.y, alpha: effectiveAlpha });
          if (dot.trail.length > 8) {
            dot.trail.pop();
          }

          // Draw trail segments along grid track
          for (let t = 0; t < dot.trail.length; t++) {
            const tr = dot.trail[t];
            const trailAlpha = tr.alpha * (1 - t / dot.trail.length) * 0.5;
            if (trailAlpha > 0.01) {
              ctx.fillStyle = dot.color.replace(/[\d\.]+\)$/, `${trailAlpha})`);
              ctx.fillRect(Math.round(tr.x), Math.round(tr.y), dot.size - 1, dot.size - 1);
            }
          }

          // Draw head dot
          if (effectiveAlpha > 0.02) {
            ctx.fillStyle = dot.color.replace(/[\d\.]+\)$/, `${effectiveAlpha})`);
            ctx.fillRect(Math.round(dot.x), Math.round(dot.y), dot.size, dot.size);

            // Subtle glow around head
            ctx.fillStyle = dot.color.replace(/[\d\.]+\)$/, `${effectiveAlpha * 0.25})`);
            ctx.fillRect(Math.round(dot.x - 2), Math.round(dot.y - 2), dot.size + 4, dot.size + 4);
          }

          // Advance dot along grid line
          switch (dot.dir) {
            case "right":
              dot.x += dot.speed;
              break;
            case "left":
              dot.x -= dot.speed;
              break;
            case "down":
              dot.y += dot.speed;
              break;
            case "up":
              dot.y -= dot.speed;
              break;
          }

          dot.distanceTraveled += dot.speed;

          // Snap to exact grid intersections and decide turns
          const isAtIntersectionX = Math.round(dot.x) % GRID_SIZE === 0;
          const isAtIntersectionY = Math.round(dot.y) % GRID_SIZE === 0;

          if (isAtIntersectionX && isAtIntersectionY) {
            dot.x = Math.round(dot.x);
            dot.y = Math.round(dot.y);

            // 35% probability of a 90-degree orthogonal turn at intersections
            if (Math.random() < 0.35) {
              if (dot.dir === "left" || dot.dir === "right") {
                dot.dir = Math.random() > 0.5 ? "up" : "down";
              } else {
                dot.dir = Math.random() > 0.5 ? "left" : "right";
              }
            }
          }

          // Respawn if distance limit reached or wandered outside focal radius
          if (dot.distanceTraveled >= dot.maxDistance || distFromCenter > maxRadius) {
            dots[i] = createDot();
          }
        }
      }

      // Dots animation completes
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className || ""}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-85 dark:opacity-95"
      />
    </div>
  );
}
