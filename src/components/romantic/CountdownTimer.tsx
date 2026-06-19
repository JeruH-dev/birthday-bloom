import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Birthday: July 27 2026 ────────────────────────────────────────────────
// Month is 0-indexed in JS: January = 0, July = 7
const TARGET = new Date(2026, 5, 19, 10, 22, 45);

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days:    Math.floor(totalSeconds / 86400),
    hours:   Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isComplete: false,
  };
}

// ── Sub-components ────────────────────────────────────────────────────────
const FlipDigit = ({ value, label }: { value: number; label: string }) => {
  const formatted = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          width: "clamp(64px, 16vw, 100px)",
          height: "clamp(70px, 18vw, 110px)",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow:
            "0 8px 32px hsl(340 65% 30% / 0.4), 0 0 0 1px hsl(340 65% 58% / 0.2) inset",
        }}
      >
        {/* Top shine line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          }}
        />
        {/* Mid divider */}
        <div
          className="absolute left-0 right-0 h-px"
          style={{ top: "50%", background: "rgba(0,0,0,0.2)" }}
        />

        <AnimatePresence mode="popLayout">
          <motion.div
            key={formatted}
            className="absolute inset-0 flex items-center justify-center countdown-digit font-display font-bold text-white"
            style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)" }}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            exit={{   y:  30, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {formatted}
          </motion.div>
        </AnimatePresence>

        {/* Bottom shadow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
          style={{ background: "rgba(0,0,0,0.15)" }}
        />
      </div>

      <p
        className="font-body font-semibold uppercase tracking-widest text-xs"
        style={{ color: "hsl(345 60% 82%)" }}
      >
        {label}
      </p>
    </div>
  );
};

const Colon = () => (
  <div
    className="flex flex-col gap-3 pb-8 items-center justify-center"
    aria-hidden="true"
  >
    {[0, 1].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full"
        style={{ background: "hsl(340 65% 72%)" }}
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
      />
    ))}
  </div>
);

const BirthdayCelebration = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
    className="text-center"
  >
    <motion.div
      className="text-6xl mb-4"
      animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
      aria-hidden="true"
    >
      🎂
    </motion.div>

    <p
      className="font-handwriting text-3xl sm:text-5xl font-bold mb-4"
      style={{ color: "hsl(345 75% 80%)" }}
    >
      Today is your special day!
    </p>
    <p
      className="font-body text-base sm:text-lg mb-6"
      style={{ color: "hsl(345 50% 72%)" }}
    >
      Your surprise is now unlocked 💝
    </p>

    <div className="flex justify-center gap-3 text-4xl" aria-hidden="true">
      {["🌹", "🎊", "💕", "✨", "🎉", "🌸", "💖"].map((e, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -14, 0], scale: [1, 1.25, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18 }}
        >
          {e}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

// ── Main export ────────────────────────────────────────────────────────────
interface CountdownTimerProps {
  /** Called once, the moment the countdown reaches zero */
  onComplete?: () => void;
}

export const CountdownTimer = ({ onComplete }: CountdownTimerProps) => {
  const [time, setTime]       = useState(getTimeLeft);
  const completedRef          = useRef(false);
  const intervalRef           = useRef<number>(0);

  const fireComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    // Small delay so the "birthday is here" UI has a moment to paint
    setTimeout(() => onComplete?.(), 1800);
  };

  useEffect(() => {
    // Birthday already in the past when the page first loads
    if (time.isComplete) {
      fireComplete();
      return;
    }

    intervalRef.current = window.setInterval(() => {
      const t = getTimeLeft();
      setTime(t);
      if (t.isComplete) {
        window.clearInterval(intervalRef.current);
        fireComplete();
      }
    }, 1000);

    return () => window.clearInterval(intervalRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="countdown"
      className="relative z-10 py-24 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, hsl(340 60% 14%) 0%, hsl(320 55% 17%) 50%, hsl(270 50% 16%) 100%)",
      }}
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(340 65% 58% / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        {/* Section header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="font-handwriting text-xl mb-2"
            style={{ color: "hsl(340 60% 72%)" }}
          >
            {time.isComplete ? "The wait is over" : "Counting every heartbeat until"}
          </p>
          <h2
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
          >
            {time.isComplete ? "🎉 It's Your Birthday! 🎉" : "Your Birthday — July 27, 2026"}
          </h2>
          <div
            className="w-20 h-0.5 mx-auto mt-4 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(340 65% 68%), transparent)",
            }}
          />
        </motion.div>

        {/* Main content: digits or celebration */}
        <AnimatePresence mode="wait">
          {time.isComplete ? (
            <motion.div
              key="celebration"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <BirthdayCelebration />
            </motion.div>
          ) : (
            <motion.div
              key="digits"
              className="flex items-end justify-center gap-2 sm:gap-4 flex-wrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <FlipDigit value={time.days}    label="Days"    />
              <Colon />
              <FlipDigit value={time.hours}   label="Hours"   />
              <Colon />
              <FlipDigit value={time.minutes} label="Minutes" />
              <Colon />
              <FlipDigit value={time.seconds} label="Seconds" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sub-message */}
        {!time.isComplete && (
          <motion.p
            className="mt-10 font-body text-sm sm:text-base"
            style={{ color: "hsl(345 50% 68%)", opacity: 0.8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.6 }}
          >
            Every second is another moment I'm grateful for you. 💕
          </motion.p>
        )}
      </div>
    </section>
  );
};