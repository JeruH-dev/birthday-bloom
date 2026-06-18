import { useEffect, useRef } from "react";

interface TrailHeart {
  id: number;
  x: number;
  y: number;
  createdAt: number;
  size: number;
  emoji: string;
}

const HEART_EMOJIS = ["❤️", "💕", "💗", "💖", "🌹", "✨", "💫"];

export const CursorTrail = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<TrailHeart[]>([]);
  const idRef = useRef(0);
  const lastPos = useRef({ x: -999, y: -999 });

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 40) return; // throttle by distance
      lastPos.current = { x: e.clientX, y: e.clientY };

      const heart: TrailHeart = {
        id: idRef.current++,
        x: e.clientX,
        y: e.clientY,
        createdAt: Date.now(),
        size: 14 + Math.random() * 10,
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      };

      heartsRef.current.push(heart);

      const el = document.createElement("div");
      el.style.cssText = `
        position: fixed;
        left: ${heart.x - heart.size / 2}px;
        top: ${heart.y - heart.size}px;
        font-size: ${heart.size}px;
        pointer-events: none;
        z-index: 99999;
        user-select: none;
        line-height: 1;
        animation: cursor-heart 1.2s ease-out forwards;
      `;
      el.textContent = heart.emoji;
      el.setAttribute("aria-hidden", "true");

      // Inline keyframe via style
      el.style.animation = "none";
      el.offsetHeight; // reflow
      el.style.animation = "cursor-heart-rise 1.2s ease-out forwards";

      document.body.appendChild(el);

      setTimeout(() => {
        if (document.body.contains(el)) document.body.removeChild(el);
      }, 1300);
    };

    // Inject cursor-heart keyframe dynamically
    const styleTag = document.createElement("style");
    styleTag.textContent = `
      @keyframes cursor-heart-rise {
        0%   { opacity: 1; transform: translateY(0) scale(1) rotate(-10deg); }
        50%  { opacity: 0.8; transform: translateY(-30px) scale(1.3) rotate(10deg); }
        100% { opacity: 0; transform: translateY(-70px) scale(0.5) rotate(0deg); }
      }
    `;
    document.head.appendChild(styleTag);

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (document.head.contains(styleTag)) document.head.removeChild(styleTag);
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" />;
};