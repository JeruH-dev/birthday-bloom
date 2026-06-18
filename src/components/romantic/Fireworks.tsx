/**
 * Fireworks.tsx — canvas fireworks overlay
 *
 * Bug-fix: canvas is always mounted so canvasRef.current is never null
 * when the animation effect fires. Visibility is controlled via opacity.
 */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ── Romantic colour palette ───────────────────────────────────────────────
const COLORS = [
  "#ff6b9d", "#ff4d7f", "#ffa8c5", "#c9b8e8",
  "#eeb062", "#ffffff",  "#ff85a8", "#d4a0d4",
  "#f9c6d3", "#ffe066",  "#b8a0e8", "#ff3399",
];

// ── Types ─────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  alpha: number; color: string;
  size: number; decay: number; gravity: number;
}

interface TrailDot {
  x: number; y: number; alpha: number; size: number;
}

interface Rocket {
  x: number; y: number;
  vx: number; vy: number;
  color: string;
  trail: TrailDot[];
  targetY: number;
  exploded: boolean;
  particles: Particle[];
}

// ── Helpers ───────────────────────────────────────────────────────────────
const rndColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

function createRocket(W: number, H: number): Rocket {
  const color   = rndColor();
  const x       = W * 0.15 + Math.random() * W * 0.7;
  const targetY = H * (0.12 + Math.random() * 0.35);
  const vy      = (targetY - H) / 55;          // reach apex in ~55 frames
  return { x, y: H, vx: (Math.random() - 0.5) * 1.5, vy, color, trail: [], targetY, exploded: false, particles: [] };
}

function burst(x: number, y: number, color: string): Particle[] {
  const out: Particle[] = [];
  const count = 70 + Math.floor(Math.random() * 50);

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
    const speed = 1.8 + Math.random() * 4.5;
    out.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: Math.random() < 0.25 ? rndColor() : color,
      size: 2 + Math.random() * 2.8,
      decay: 0.010 + Math.random() * 0.008,
      gravity: 0.055 + Math.random() * 0.04,
    });
  }
  // Extra glitter sparkles
  for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 5;
    out.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: Math.random() < 0.5 ? "#ffffff" : color,
      size: 1 + Math.random() * 1.5,
      decay: 0.022 + Math.random() * 0.01,
      gravity: 0.04,
    });
  }
  return out;
}

function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, alpha: number) {
  if (alpha <= 0 || r <= 0) return;
  ctx.save();
  ctx.globalAlpha = Math.min(1, alpha);
  ctx.fillStyle   = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// Rocket launch schedule (ms after activation)
const SCHEDULE_MS = [100, 500, 950, 1300, 1700, 2100, 2550, 2950, 3400, 3850, 4250, 4700];
const SHOW_DURATION_MS = 8000;

// ── Props & component ─────────────────────────────────────────────────────
interface FireworksProps { active: boolean; }

export const Fireworks = ({ active }: FireworksProps) => {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const opacityRef = useRef(0);                    // track current css opacity
  const rafRef     = useRef<number>(0);
  const timersRef  = useRef<number[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const activeRef  = useRef(false);                // guard against double-fire

  // ── Always-mounted canvas; resize on every window resize ──────────────
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, []);

  // ── Fire when active flips true ───────────────────────────────────────
  useEffect(() => {
    if (!active || activeRef.current) return;
    activeRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;                          // canvas is always mounted, so this never happens

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ensure correct dimensions
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    // ── Schedule rockets ──────────────────────────────────────────────
    SCHEDULE_MS.forEach((ms) => {
      const t = window.setTimeout(() => {
        rocketsRef.current.push(createRocket(canvas.width, canvas.height));
      }, ms);
      timersRef.current.push(t);
    });

    // ── Animation loop ────────────────────────────────────────────────
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      // Motion-blur trail
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rocketsRef.current = rocketsRef.current.filter((r) => {
        if (!r.exploded) {
          r.x  += r.vx;
          r.y  += r.vy;
          r.vy += 0.06;

          r.trail.push({ x: r.x, y: r.y, alpha: 1, size: 3 + Math.random() });
          if (r.trail.length > 20) r.trail.shift();

          r.trail.forEach((td, i) => {
            td.alpha = (i / r.trail.length) * 0.75;
            dot(ctx, td.x, td.y, td.size * (i / r.trail.length), r.color, td.alpha);
          });
          dot(ctx, r.x, r.y, 3.5, "#ffffff", 0.95);

          if (r.y <= r.targetY || r.vy >= -0.2) {
            r.exploded   = true;
            r.particles  = burst(r.x, r.y, r.color);

            // Flash at explosion origin
            ctx.save();
            ctx.globalAlpha = 0.65;
            const g = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, 70);
            g.addColorStop(0, r.color);
            g.addColorStop(1, "transparent");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(r.x, r.y, 70, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        } else {
          r.particles = r.particles.filter((p) => {
            p.x  += p.vx;
            p.y  += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.98;
            p.alpha -= p.decay;
            if (p.alpha <= 0) return false;
            dot(ctx, p.x, p.y, p.size * p.alpha, p.color, p.alpha);
            if (Math.random() < 0.15) {
              dot(ctx, p.x - p.vx * 2, p.y - p.vy * 2, p.size * 0.4, p.color, p.alpha * 0.4);
            }
            return true;
          });
          return r.particles.length > 0;
        }
        return true;
      });
    };

    rafRef.current = requestAnimationFrame(tick);

    // ── Fade out and stop ─────────────────────────────────────────────
    const stopTimer = window.setTimeout(() => {
      cancelAnimationFrame(rafRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, SHOW_DURATION_MS);
    timersRef.current.push(stopTimer);

    return () => {
      cancelAnimationFrame(rafRef.current);
      timersRef.current.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 200 }}
      aria-hidden="true"
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  );
};