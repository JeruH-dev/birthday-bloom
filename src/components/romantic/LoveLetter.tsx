import { motion } from "framer-motion";
import { useRef } from "react";

const letterLines = [
  "Dear My Love,",
  "",
  "Happy birthday to the woman who makes my world brighter.",
  "",
  "Every moment with you is a memory I treasure. Your smile,",
  "your kindness, your strength, and the little things you do",
  "mean more to me than words can explain.",
  "",
  "I hope this new chapter brings you endless happiness,",
  "success, peace, and everything beautiful you deserve.",
  "",
  "Thank you for being you.",
  "",
  "Forever yours ❤️",
];

const WaxSeal = () => (
  <div className="relative flex items-center justify-center" aria-hidden="true">
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      {/* Outer seal */}
      <circle cx="36" cy="36" r="34" fill="hsl(340 65% 52%)" />
      <circle cx="36" cy="36" r="30" fill="hsl(340 60% 48%)" />
      {/* Decorative star burst */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={36 + Math.cos(angle) * 20}
            y1={36 + Math.sin(angle) * 20}
            x2={36 + Math.cos(angle) * 28}
            y2={36 + Math.sin(angle) * 28}
            stroke="hsl(340 70% 65%)"
            strokeWidth="2"
          />
        );
      })}
      {/* Heart */}
      <path
        d="M36 48 C36 48 22 38 22 28 C22 23 26 19 31 20 C33 20 35 22 36 24 C37 22 39 20 41 20 C46 19 50 23 50 28 C50 38 36 48 36 48Z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  </div>
);

const Sparkle = ({ x, y, delay }: { x: string; y: string; delay: number }) => (
  <motion.div
    className="absolute pointer-events-none select-none text-lg"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
    viewport={{ once: false, margin: "-50px" }}
    transition={{ delay, duration: 2, repeat: Infinity, repeatDelay: 3 }}
    aria-hidden="true"
  >
    ✨
  </motion.div>
);

export const LoveLetter = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="love-letter"
      className="relative z-10 py-24 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, hsl(345 50% 96%) 0%, hsl(270 35% 96%) 50%, hsl(36 40% 97%) 100%)",
      }}
    >
      {/* Section header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="font-handwriting text-xl mb-2"
          style={{ color: "hsl(340 45% 55%)" }}
        >
          A letter from my heart
        </p>
        <h2
          className="font-display font-bold"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "hsl(340 55% 28%)" }}
        >
          Words I Want You to Know
        </h2>
        <div
          className="w-20 h-0.5 mx-auto mt-4 rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, hsl(340 65% 68%), transparent)" }}
        />
      </motion.div>

      {/* Letter */}
      <motion.div
        ref={containerRef}
        className="relative max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 50, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: "1000px" }}
      >
        {/* Decorative sparkles around the letter */}
        <Sparkle x="-5%" y="10%" delay={0.5} />
        <Sparkle x="102%" y="20%" delay={1.2} />
        <Sparkle x="-3%" y="70%" delay={0.8} />
        <Sparkle x="104%" y="75%" delay={1.5} />
        <Sparkle x="48%" y="-4%" delay={1} />

        {/* Paper card */}
        <div
          className="relative rounded-2xl overflow-hidden paper-texture"
          style={{
            padding: "clamp(2rem, 5vw, 3.5rem)",
            boxShadow:
              "0 4px 6px rgba(0,0,0,0.05), 0 10px 30px rgba(180,90,100,0.12), 0 40px 80px rgba(180,90,100,0.07)",
          }}
        >
          {/* Decorative top line */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, hsl(340 65% 68%) 30%, hsl(355 60% 72%) 70%, transparent 100%)",
            }}
          />

          {/* Wax seal top right */}
          <div className="absolute top-5 right-5">
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <WaxSeal />
            </motion.div>
          </div>

          {/* Decorative flowers corner */}
          <div className="absolute bottom-4 left-4 text-3xl select-none opacity-30" aria-hidden="true">
            🌸🌺
          </div>

          {/* Letter content */}
          <div className="relative z-10 pr-16 sm:pr-20">
            {letterLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  delay: 0.1 + i * 0.04,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                {line === "" ? (
                  <div className="h-5" />
                ) : (
                  <p
                    className={`font-handwriting leading-relaxed ${
                      i === 0
                        ? "text-2xl sm:text-3xl font-bold mb-1"
                        : i === letterLines.length - 1
                        ? "text-xl sm:text-2xl font-bold"
                        : "text-lg sm:text-xl"
                    }`}
                    style={{
                      color:
                        i === 0 || i === letterLines.length - 1
                          ? "hsl(340 60% 35%)"
                          : "hsl(340 35% 28%)",
                    }}
                  >
                    {line}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom decorative line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, hsl(340 65% 78%) 30%, hsl(355 60% 82%) 70%, transparent 100%)",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};