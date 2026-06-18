import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  rotation: number;
  speed: number;
  size: number;
  opacity: number;
  drift: number;
  driftSpeed: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
}

const PETAL_COLORS = [
  "rgba(232, 98, 138, 0.7)",
  "rgba(245, 150, 170, 0.65)",
  "rgba(249, 180, 200, 0.6)",
  "rgba(220, 80, 120, 0.6)",
  "rgba(255, 182, 200, 0.55)",
  "rgba(235, 120, 155, 0.65)",
  "rgba(200, 150, 180, 0.5)",
];

function drawPetal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rotation: number,
  size: number,
  color: string,
  opacity: number
) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();

  // Petal shape using bezier curves
  const w = size * 0.5;
  const h = size;
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(w, -h * 0.3, w * 1.2, -h * 0.7, 0, -h);
  ctx.bezierCurveTo(-w * 1.2, -h * 0.7, -w, -h * 0.3, 0, 0);

  ctx.fillStyle = color;
  ctx.fill();

  // Subtle vein line
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -h * 0.85);
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 0.5;
  ctx.stroke();

  ctx.restore();
}

function createPetal(canvasWidth: number): Petal {
  return {
    x: Math.random() * canvasWidth,
    y: -30,
    rotation: Math.random() * Math.PI * 2,
    speed: 0.6 + Math.random() * 1.2,
    size: 10 + Math.random() * 16,
    opacity: 0.5 + Math.random() * 0.45,
    drift: Math.sin(Math.random() * Math.PI * 2) * 1.5,
    driftSpeed: 0.01 + Math.random() * 0.015,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.02 + Math.random() * 0.03,
  };
}

export const RosePetals = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const rafRef = useRef<number>(0);
  const frameCount = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initial petals
    const initialCount = Math.floor(window.innerWidth / 60);
    for (let i = 0; i < initialCount; i++) {
      const p = createPetal(canvas.width);
      p.y = Math.random() * canvas.height; // distribute on start
      petalsRef.current.push(p);
    }

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      frameCount.current++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new petals occasionally
      if (frameCount.current % 12 === 0 && petalsRef.current.length < 55) {
        petalsRef.current.push(createPetal(canvas.width));
      }

      petalsRef.current = petalsRef.current.filter((p) => {
        p.wobble += p.wobbleSpeed;
        p.y += p.speed;
        p.x += p.drift + Math.sin(p.wobble) * 0.6;
        p.rotation += 0.01 + Math.sin(p.wobble * 0.5) * 0.008;

        drawPetal(ctx, p.x, p.y, p.rotation, p.size, p.color, p.opacity);
        return p.y < canvas.height + 50;
      });
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};