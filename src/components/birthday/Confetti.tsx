import { useCallback } from "react";
import confetti from "canvas-confetti";

export const useConfetti = () => {
  const isMobile = typeof window !== "undefined" && (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

  const fireConfetti = useCallback((options?: confetti.Options) => {
    confetti({
      particleCount: isMobile ? 30 : 100,
      spread: isMobile ? 55 : 70,
      origin: { y: 0.6 },
      scalar: isMobile ? 0.8 : 1,
      ticks: isMobile ? 80 : undefined,
      colors: ["#e84393", "#a855f7", "#f59e0b", "#38bdf8", "#f97316", "#34d399"],
      ...options,
    });
  }, [isMobile]);

  const fireCannon = useCallback(() => {
    const end = Date.now() + (isMobile ? 1200 : 2000);
    const fire = () => {
      confetti({
        particleCount: isMobile ? 4 : 3,
        angle: 60,
        spread: isMobile ? 40 : 55,
        origin: { x: 0 },
        colors: ["#e84393", "#a855f7", "#f59e0b"],
        scalar: isMobile ? 0.8 : 1,
      });
      confetti({
        particleCount: isMobile ? 4 : 3,
        angle: 120,
        spread: isMobile ? 40 : 55,
        origin: { x: 1 },
        colors: ["#38bdf8", "#f97316", "#34d399"],
        scalar: isMobile ? 0.8 : 1,
      });
      if (Date.now() < end) requestAnimationFrame(fire);
    };
    fire();
  }, [isMobile]);

  const fireStars = useCallback(() => {
    confetti({
      particleCount: isMobile ? 24 : 50,
      spread: 360,
      ticks: isMobile ? 80 : 100,
      origin: { x: 0.5, y: 0.5 },
      shapes: ["star"],
      colors: ["#f59e0b", "#fbbf24", "#fcd34d"],
      scalar: isMobile ? 1 : 1.5,
    });
  }, [isMobile]);

  return { fireConfetti, fireCannon, fireStars };
};
