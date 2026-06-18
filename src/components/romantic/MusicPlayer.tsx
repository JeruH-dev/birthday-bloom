import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Replace this path with your own .mp3 audio file
const AUDIO_SRC = "";

export const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (AUDIO_SRC) {
      audioRef.current = new Audio(AUDIO_SRC);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.35;
    }
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => {
      clearTimeout(timer);
      audioRef.current?.pause();
    };
  }, []);

  const toggle = useCallback(() => {
    if (!audioRef.current) {
      // No audio file — just show the toggle state
      setPlaying((p) => !p);
      return;
    }

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {
        // Autoplay blocked — that's OK
      });
    }
  }, [playing]);

  const bars = [0.4, 0.7, 1, 0.6, 0.8, 0.5, 0.9, 0.65];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-[500] flex flex-col items-center gap-2"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {playing && (
              <motion.div
                className="px-3 py-1.5 rounded-full font-body text-xs font-medium text-white pointer-events-none"
                style={{ background: "hsl(340 65% 48% / 0.9)" }}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
              >
                ♪ Playing love songs
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={toggle}
            className="relative w-14 h-14 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            style={{
              background:
                "linear-gradient(135deg, hsl(340 65% 55%), hsl(355 60% 65%))",
              boxShadow: playing
                ? "0 0 0 4px hsl(340 65% 68% / 0.35), 0 8px 30px hsl(340 65% 55% / 0.5)"
                : "0 4px 20px hsl(340 65% 55% / 0.35)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={
              playing
                ? {
                    boxShadow: [
                      "0 0 0 4px hsl(340 65% 68% / 0.35), 0 8px 30px hsl(340 65% 55% / 0.5)",
                      "0 0 0 8px hsl(340 65% 68% / 0.15), 0 8px 40px hsl(340 65% 55% / 0.7)",
                      "0 0 0 4px hsl(340 65% 68% / 0.35), 0 8px 30px hsl(340 65% 55% / 0.5)",
                    ],
                  }
                : {}
            }
            transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
            aria-label={playing ? "Pause music" : "Play romantic music"}
          >
            {/* Sound wave bars or play icon */}
            {playing ? (
              <div className="flex items-end gap-0.5 h-5">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 rounded-full bg-white"
                    animate={{ height: [`${h * 100}%`, "25%", `${h * 100}%`] }}
                    transition={{
                      duration: 0.7 + i * 0.05,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.08,
                    }}
                    style={{ minHeight: "4px" }}
                  />
                ))}
              </div>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};