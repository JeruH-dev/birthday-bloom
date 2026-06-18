import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onReveal: () => void;
  revealed: boolean;
}

const AnimatedFlower = ({
  delay = 0,
  scale = 1,
  className = "",
}: {
  delay?: number;
  scale?: number;
  className?: string;
}) => {
  const petalCount = 6;
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: 80 * scale, height: 80 * scale }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {Array.from({ length: petalCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `rotate(${(360 / petalCount) * i}deg)` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: delay + 0.1 + i * 0.06, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div
            style={{
              position: "absolute",
              width: 18 * scale,
              height: 30 * scale,
              borderRadius: "50% 50% 40% 40%",
              background:
                "linear-gradient(180deg, hsl(345 80% 80%) 0%, hsl(340 65% 68%) 100%)",
              top: 2,
              left: "50%",
              transform: "translateX(-50%)",
              opacity: 0.85,
            }}
          />
        </motion.div>
      ))}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.7, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div
          style={{
            width: 18 * scale,
            height: 18 * scale,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, hsl(38 95% 78%), hsl(36 80% 62%))",
            boxShadow: `0 2px 10px hsl(36 80% 60% / 0.6)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const FloatingHeart = ({
  style,
  delay = 0,
}: {
  style?: React.CSSProperties;
  delay?: number;
}) => (
  <motion.div
    className="absolute text-3xl select-none pointer-events-none"
    style={style}
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: [0, 0.7, 0.7, 0],
      y: [20, 0, -30, -60],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    aria-hidden="true"
  >
    ❤️
  </motion.div>
);

export const HeroSection = ({ onReveal, revealed }: HeroSectionProps) => {
  const [showButton, setShowButton] = useState(false);
  const [clicked, setClicked] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    onReveal();
    setTimeout(() => {
      const next = document.getElementById("love-letter");
      if (next) next.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, hsl(345 60% 14%) 0%, hsl(320 55% 17%) 40%, hsl(270 50% 16%) 70%, hsl(340 60% 13%) 100%)",
      }}
    >
      {/* Ambient glow blobs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(340 65% 58% / 0.22) 0%, transparent 70%)",
          top: "-10%",
          left: "-10%",
          animation: "float-gentle 8s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(270 55% 65% / 0.18) 0%, transparent 70%)",
          bottom: "-10%",
          right: "-10%",
          animation: "float-gentle 10s ease-in-out infinite reverse",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(36 80% 60% / 0.1) 0%, transparent 70%)",
          top: "30%",
          right: "5%",
          animation: "float-gentle 12s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* Floating hearts around the scene */}
      <FloatingHeart style={{ left: "5%", top: "20%" }} delay={0.5} />
      <FloatingHeart style={{ left: "8%", top: "60%" }} delay={1.5} />
      <FloatingHeart style={{ right: "6%", top: "30%" }} delay={1} />
      <FloatingHeart style={{ right: "10%", top: "65%" }} delay={2} />
      <FloatingHeart style={{ left: "45%", top: "8%" }} delay={0.8} />

      {/* Flower cluster — top left */}
      <div className="absolute top-8 left-8 flex gap-4 pointer-events-none" aria-hidden="true">
        <AnimatedFlower delay={0.4} scale={0.6} />
        <AnimatedFlower delay={0.6} scale={0.45} className="mt-6" />
      </div>

      {/* Flower cluster — bottom right */}
      <div className="absolute bottom-8 right-8 flex gap-4 pointer-events-none" aria-hidden="true">
        <AnimatedFlower delay={0.7} scale={0.55} className="mb-4" />
        <AnimatedFlower delay={0.5} scale={0.65} />
      </div>

      {/* Main flower wreath */}
      <div
        className="absolute pointer-events-none flex items-center justify-center"
        style={{ width: 380, height: 380, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        aria-hidden="true"
      >
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (360 / 8) * i * (Math.PI / 180);
          const r = 165;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(${Math.cos(angle) * r - 20}px, ${Math.sin(angle) * r - 20}px)`,
              }}
            >
              <AnimatedFlower delay={0.3 + i * 0.08} scale={0.38} />
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-5xl mb-4 select-none"
          aria-hidden="true"
        >
          🌹
        </motion.div>

        <motion.h1
          className="font-display font-bold leading-tight mb-6 shimmer-text"
          style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Happy Birthday, My Love ❤️
        </motion.h1>

        <motion.p
          className="font-body text-lg sm:text-xl leading-relaxed mb-10"
          style={{ color: "hsl(345 60% 82%)", maxWidth: "520px", margin: "0 auto 2.5rem" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Today is a celebration of the amazing person you are and the happiness
          you bring into my life.
        </motion.p>

        {showButton && !revealed && (
          <motion.button
            type="button"
            onClick={handleClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-body font-semibold text-white text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            style={{
              background:
                "linear-gradient(135deg, hsl(340 65% 55%), hsl(355 60% 62%), hsl(36 80% 60%))",
              boxShadow:
                "0 0 30px hsl(340 65% 55% / 0.5), 0 4px 20px hsl(340 65% 55% / 0.3)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: [
                "0 0 30px hsl(340 65% 55% / 0.5), 0 4px 20px hsl(340 65% 55% / 0.3)",
                "0 0 50px hsl(340 65% 55% / 0.7), 0 4px 30px hsl(340 65% 55% / 0.5)",
                "0 0 30px hsl(340 65% 55% / 0.5), 0 4px 20px hsl(340 65% 55% / 0.3)",
              ],
            }}
            transition={{
              opacity: { delay: 0, duration: 0.5 },
              scale: { delay: 0, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
              boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.07, y: -2 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Open your birthday surprise"
          >
            <span>Open Your Surprise</span>
            <span className="text-xl animate-bounce-soft inline-block" aria-hidden="true">
              💝
            </span>
          </motion.button>
        )}

        {revealed && (
          <motion.p
            className="font-handwriting text-xl"
            style={{ color: "hsl(345 70% 80%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Your countdown is below — see you on July 27 ✨
          </motion.p>
        )}
      </div>

      {/* Scroll indicator */}
      {!revealed && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          aria-hidden="true"
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: "hsl(345 40% 65%)" }}>
            scroll
          </span>
          <motion.div
            className="w-5 h-8 border-2 rounded-full flex items-start justify-center pt-1"
            style={{ borderColor: "hsl(345 50% 55%)" }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "hsl(345 65% 65%)" }}
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};