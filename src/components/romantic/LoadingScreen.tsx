import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const BloomingFlower = () => {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <div className="relative w-36 h-36 mx-auto">
      {/* Petals */}
      {petals.map((angle, i) => (
        <motion.div
          key={angle}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div
            className="absolute w-10 h-16 rounded-full"
            style={{
              background: "linear-gradient(180deg, hsl(340 80% 80%) 0%, hsl(340 65% 68%) 100%)",
              top: "2px",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: 0.85,
            }}
          />
        </motion.div>
      ))}
      {/* Inner petals */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={`inner-${angle}`}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + i * 0.07, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transform: `rotate(${angle + 30}deg)` }}
        >
          <div
            className="absolute w-7 h-10 rounded-full"
            style={{
              background: "linear-gradient(180deg, hsl(320 80% 82%) 0%, hsl(345 70% 72%) 100%)",
              top: "12px",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: 0.9,
            }}
          />
        </motion.div>
      ))}
      {/* Center */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div
          className="w-10 h-10 rounded-full shadow-lg z-10"
          style={{
            background: "radial-gradient(circle at 35% 35%, hsl(38 95% 75%), hsl(36 80% 60%))",
            boxShadow: "0 2px 12px hsl(36 80% 60% / 0.5)",
          }}
        />
      </motion.div>
    </div>
  );
};

const LoadingDots = () => (
  <div className="flex gap-2 justify-center mt-4">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full"
        style={{ background: "hsl(340 65% 68%)" }}
        animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [show, setShow] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const messages = [
    "Preparing something special for you",
    "Gathering all my love",
    "Almost ready…",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % messages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600);
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, hsl(345 60% 12%) 0%, hsl(320 55% 15%) 50%, hsl(270 50% 14%) 100%)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Ambient glow blobs */}
          <div
            className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background: "hsl(340 65% 58%)",
              top: "10%",
              left: "10%",
              animation: "float-gentle 6s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-72 h-72 rounded-full opacity-15 blur-3xl"
            style={{
              background: "hsl(270 55% 65%)",
              bottom: "15%",
              right: "10%",
              animation: "float-gentle 8s ease-in-out infinite reverse",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
            <BloomingFlower />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="space-y-2"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={textIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="font-handwriting text-2xl sm:text-3xl"
                  style={{ color: "hsl(345 80% 88%)" }}
                >
                  {messages[textIndex]} ❤️
                </motion.p>
              </AnimatePresence>
              <LoadingDots />
            </motion.div>

            {/* Floating hearts */}
            {["❤️", "💕", "🌹", "💫", "✨"].map((emoji, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl pointer-events-none select-none"
                style={{
                  left: `${15 + i * 18}%`,
                  top: `${20 + (i % 2) * 50}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2.5 + i * 0.4,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};