import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const romanticMessage =
  "You are one of the best things that ever happened to me. I am grateful for every moment with you. I can't wait to create more memories together.";

const CONFETTI_COLORS = [
  "#e8628a",
  "#f5a0b8",
  "#f9c6d3",
  "#c9b8e8",
  "#eeb062",
  "#ff85a8",
  "#d4a0d4",
];

function fireRomanticConfetti() {
  const duration = 3500;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: CONFETTI_COLORS,
      shapes: ["circle", "square"],
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: CONFETTI_COLORS,
      shapes: ["circle", "square"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();

  // Big center burst
  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: CONFETTI_COLORS,
      gravity: 0.8,
      scalar: 1.2,
    });
  }, 200);
}

const FloatingConfettiPiece = ({ i }: { i: number }) => {
  const left = 10 + (i * 17) % 80;
  const duration = 2 + Math.random() * 2;
  const emoji = ["🎊", "🎉", "💕", "🌸", "✨"][i % 5];
  return (
    <motion.div
      className="absolute pointer-events-none text-2xl select-none"
      style={{ left: `${left}%`, top: 0 }}
      initial={{ y: -30, opacity: 1, rotate: 0 }}
      animate={{ y: "110vh", opacity: 0, rotate: 720 }}
      transition={{ duration, delay: i * 0.15, ease: "easeIn" }}
      aria-hidden="true"
    >
      {emoji}
    </motion.div>
  );
};

export const SurpriseReveal = () => {
  const [state, setState] = useState<"idle" | "celebrating" | "revealed">("idle");
  const timerRef = useRef<number>(0);

  const handleClick = useCallback(() => {
    if (state !== "idle") return;
    setState("celebrating");
    fireRomanticConfetti();
    timerRef.current = window.setTimeout(() => setState("revealed"), 2200);
  }, [state]);

  return (
    <section
      className="relative z-10 py-24 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, hsl(270 35% 96%) 0%, hsl(340 50% 97%) 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto relative z-10 text-center">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              color: "hsl(340 55% 28%)",
            }}
          >
            One Last Surprise
          </h2>
          <div
            className="w-16 h-0.5 mx-auto mt-4 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(340 65% 68%), transparent)",
            }}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="button"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <motion.button
                type="button"
                onClick={handleClick}
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-body font-semibold text-white text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/70"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(340 65% 55%), hsl(320 60% 62%), hsl(270 50% 62%))",
                  boxShadow: "0 8px 30px hsl(340 65% 55% / 0.45)",
                }}
                whileHover={{ scale: 1.07, y: -3 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 8px 30px hsl(340 65% 55% / 0.45)",
                    "0 8px 50px hsl(340 65% 55% / 0.65)",
                    "0 8px 30px hsl(340 65% 55% / 0.45)",
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity },
                  hover: { duration: 0.3 },
                }}
                aria-label="Reveal your final surprise"
              >
                <span>One More Surprise</span>
                <motion.span
                  className="text-2xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  aria-hidden="true"
                >
                  💖
                </motion.span>
              </motion.button>

              <p
                className="mt-5 font-body text-sm"
                style={{ color: "hsl(340 30% 52%)" }}
              >
                Click to reveal something special ✨
              </p>
            </motion.div>
          )}

          {state === "celebrating" && (
            <motion.div
              key="celebrating"
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Falling emoji confetti */}
              {Array.from({ length: 12 }).map((_, i) => (
                <FloatingConfettiPiece key={i} i={i} />
              ))}

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <p
                  className="font-handwriting text-3xl sm:text-4xl font-bold"
                  style={{ color: "hsl(340 60% 38%)" }}
                >
                  🎊 Surprise! 🎊
                </p>
                <div
                  className="flex justify-center gap-3 mt-4 text-3xl"
                  aria-hidden="true"
                >
                  {["🌹", "💕", "✨", "🌸", "💖"].map((e, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {state === "revealed" && (
            <motion.div
              key="revealed"
              className="glass-card rounded-3xl p-8 sm:p-10 text-left relative overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                boxShadow:
                  "0 20px 60px hsl(340 65% 55% / 0.15), 0 0 0 1.5px hsl(340 65% 78% / 0.3)",
              }}
            >
              {/* Decorative top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(340 65% 68%), hsl(355 60% 72%), hsl(36 80% 70%))",
                }}
              />

              <div className="text-center mb-6">
                <motion.div
                  className="text-5xl mb-3"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                >
                  💖
                </motion.div>
                <h3
                  className="font-display font-bold text-2xl sm:text-3xl"
                  style={{ color: "hsl(340 55% 28%)" }}
                >
                  A message from my heart
                </h3>
              </div>

              <blockquote>
                <p
                  className="font-handwriting text-xl sm:text-2xl leading-relaxed text-center"
                  style={{ color: "hsl(340 45% 32%)" }}
                >
                  "{romanticMessage}"
                </p>
              </blockquote>

              <p
                className="mt-6 text-center font-handwriting text-lg font-bold"
                style={{ color: "hsl(340 55% 55%)" }}
              >
                — With all my love ❤️
              </p>

              <div className="flex justify-center gap-3 mt-6 text-2xl" aria-hidden="true">
                {["🌹", "💕", "✨", "🎂", "🌸"].map((e, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>

              {/* Reset button */}
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setState("idle");
                    clearTimeout(timerRef.current);
                  }}
                  className="font-body text-sm underline underline-offset-2 transition-opacity hover:opacity-80"
                  style={{ color: "hsl(340 45% 55%)" }}
                >
                  Replay the surprise ✨
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};