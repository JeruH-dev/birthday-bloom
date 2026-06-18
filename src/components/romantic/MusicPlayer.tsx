/**
 * MusicPlayer.tsx
 * Floating music player with two romantic tracks.
 * Cycles automatically when a track ends; skip button jumps to the next.
 *
 * Tracks:
 *  1. FOLA — You
 *  2. Calum Scott — You Are The Reason
 *
 * ⚠️ Update the import extensions below (.mp3) if your files are .m4a / .ogg / .wav
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import track1 from "../../Media/FOLA - you (Official Audio).mp3";
import track2 from "../../Media/Calum Scott - You Are The Reason (Official Video).mp3";
import track3 from "../../Media/Anne-Marie - Birthday (Official Audio).mp3";

// ── Track list ────────────────────────────────────────────────────────────
const TRACKS = [
  { src: track1, title: "You",                artist: "FOLA"         },
  { src: track2, title: "You Are The Reason", artist: "Calum Scott"  },
  { src: track3, title: "Birthday", artist: "Anne-Marie" },
];

// ── Sound-wave bars (animated while playing) ──────────────────────────────
const BAR_HEIGHTS = [0.4, 0.7, 1.0, 0.6, 0.85, 0.5, 0.9, 0.65];

const SoundWave = () => (
  <div className="flex items-end gap-0.5 h-5">
    {BAR_HEIGHTS.map((h, i) => (
      <motion.div
        key={i}
        className="w-0.5 rounded-full bg-white"
        animate={{ height: [`${h * 100}%`, "20%", `${h * 100}%`] }}
        transition={{
          duration: 0.65 + i * 0.05,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.07,
        }}
        style={{ minHeight: 4 }}
      />
    ))}
  </div>
);

// ── Play / Pause icon ─────────────────────────────────────────────────────
const PlayIcon  = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);
const SkipIcon  = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M6 18l8.5-6L6 6v12zm8.5-6l-1.5 1.06V12l1.5 1.06zM16 6h2v12h-2z" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────
export const MusicPlayer = () => {
  const [visible,      setVisible]      = useState(false);
  const [playing,      setPlaying]      = useState(false);
  const [trackIndex,   setTrackIndex]   = useState(0);
  const [showLabel,    setShowLabel]    = useState(false);

  const audioRef  = useRef<HTMLAudioElement | null>(null);
  const labelTimer = useRef<number>(0);

  const currentTrack = TRACKS[trackIndex];

  // ── Bootstrap audio on mount ──────────────────────────────────────────
  useEffect(() => {
    const audio       = new Audio(currentTrack.src);
    audio.loop        = false;
    audio.volume      = 0.40;
    audioRef.current  = audio;

    // Auto-advance to next track when one ends
    const onEnded = () => advanceTrack();
    audio.addEventListener("ended", onEnded);

    // Show player and start autoplay after a short delay
    const t = window.setTimeout(() => {
      setVisible(true);
      setPlaying(true);
      audio.play().catch(() => {});
    }, 2000);

    return () => {
      clearTimeout(t);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Swap src whenever trackIndex changes ──────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = !audio.paused;
    audio.pause();
    audio.src  = TRACKS[trackIndex].src;
    audio.load();

    if (wasPlaying) {
      audio.play().catch(() => {});
    }

    // Flash the label for 5 s on track change
    setShowLabel(true);
    clearTimeout(labelTimer.current);
    labelTimer.current = window.setTimeout(() => setShowLabel(false), 5000);
  }, [trackIndex]);

  // ── Helpers ───────────────────────────────────────────────────────────
  const advanceTrack = useCallback(() => {
    setTrackIndex((i) => (i + 1) % TRACKS.length);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setPlaying(true);
          // Show label briefly when first pressed
          setShowLabel(true);
          clearTimeout(labelTimer.current);
          labelTimer.current = window.setTimeout(() => setShowLabel(false), 3000);
        })
        .catch(() => {});
    }
  }, [playing]);

  const skipTrack = useCallback(() => {
    advanceTrack();
  }, [advanceTrack]);

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-[500] flex flex-col items-end gap-2"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1,   y:  0 }}
          exit={{    opacity: 0, scale: 0.7, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* ── Now-playing label ─────────────────────────────────────── */}
          <AnimatePresence>
            {showLabel && (
              <motion.div
                className="flex flex-col items-end gap-0.5 max-w-[200px]"
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1    }}
                exit={{    opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="px-3 py-2 rounded-2xl text-right"
                  style={{
                    background: "hsl(340 65% 48% / 0.92)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <p className="font-body text-white text-xs opacity-80 leading-none mb-0.5">
                    ♪ Now playing
                  </p>
                  <p className="font-body font-semibold text-white text-sm leading-tight truncate">
                    {currentTrack.title}
                  </p>
                  <p className="font-body text-white text-xs opacity-75 leading-none mt-0.5">
                    {currentTrack.artist}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Controls row ──────────────────────────────────────────── */}
          <div className="flex items-center gap-2">

            {/* Skip button */}
            <motion.button
              type="button"
              onClick={skipTrack}
              className="w-9 h-9 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              style={{
                background: "hsl(340 55% 42% / 0.85)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 2px 12px hsl(340 65% 55% / 0.3)",
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{   scale: 0.90 }}
              aria-label="Skip to next track"
              title={`Next: ${TRACKS[(trackIndex + 1) % TRACKS.length].title}`}
            >
              <SkipIcon />
            </motion.button>

            {/* Play / Pause button */}
            <motion.button
              type="button"
              onClick={togglePlay}
              className="relative w-14 h-14 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              style={{
                background:
                  "linear-gradient(135deg, hsl(340 65% 55%), hsl(355 60% 65%))",
                boxShadow: playing
                  ? "0 0 0 3px hsl(340 65% 68% / 0.4), 0 8px 30px hsl(340 65% 55% / 0.55)"
                  : "0 4px 20px hsl(340 65% 55% / 0.35)",
              }}
              whileHover={{ scale: 1.10 }}
              whileTap={{   scale: 0.92 }}
              animate={
                playing
                  ? {
                      boxShadow: [
                        "0 0 0 3px hsl(340 65% 68% / 0.4), 0 8px 30px hsl(340 65% 55% / 0.5)",
                        "0 0 0 7px hsl(340 65% 68% / 0.15), 0 8px 40px hsl(340 65% 55% / 0.7)",
                        "0 0 0 3px hsl(340 65% 68% / 0.4), 0 8px 30px hsl(340 65% 55% / 0.5)",
                      ],
                    }
                  : {}
              }
              transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
              aria-label={playing ? "Pause music" : "Play music"}
            >
              {playing ? <SoundWave /> : <PlayIcon />}
            </motion.button>
          </div>

          {/* ── Track dots indicator ──────────────────────────────────── */}
          <div className="flex gap-1.5 justify-center">
            {TRACKS.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setTrackIndex(i)}
                className="rounded-full focus:outline-none"
                style={{
                  width:      i === trackIndex ? 16 : 6,
                  height:     6,
                  background: i === trackIndex
                    ? "hsl(340 65% 75%)"
                    : "hsl(340 40% 60% / 0.5)",
                }}
                animate={{ width: i === trackIndex ? 16 : 6 }}
                transition={{ duration: 0.3 }}
                aria-label={`Play ${TRACKS[i].title}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};