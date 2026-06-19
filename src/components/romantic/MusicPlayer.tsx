/**
 * MusicPlayer.tsx
 * Floating music player with 12-second cross-fade auto-advance.
 *
 * Cross-fade logic:
 *  - Two Audio nodes ping-pong roles (outgoing / incoming).
 *  - When the active track has ≤ CROSSFADE_SEC seconds remaining,
 *    the next track silently starts and volumes ramp:
 *      outgoing: VOLUME → 0
 *      incoming: 0      → VOLUME
 *    over exactly CROSSFADE_SEC seconds via setInterval ticks.
 *  - Once complete, the outgoing node is paused/reset and the roles swap.
 *
 * Tracks:
 *  0  FOLA — You
 *  1  Calum Scott — You Are The Reason
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// new URL() handles spaces and parentheses in filenames reliably
const track1 = new URL("../../Media/FOLA - you (Official Audio).mp3",                        import.meta.url).href;
const track2 = new URL("../../Media/Calum Scott - You Are The Reason (Official Video).mp3",  import.meta.url).href;
const track3 = new URL("../../Media/Anne-Marie - Birthday (Official Audio).mp3",             import.meta.url).href;

// ── Config ────────────────────────────────────────────────────────────────
const TRACKS = [
  { src: track1, title: "You",                artist: "FOLA"        },
  { src: track2, title: "You Are The Reason", artist: "Calum Scott" },
  { src: track3, title: "Birthday",           artist: "Anne-Marie"  },
];

const VOLUME        = 0.40;   // master volume (0-1)
const CROSSFADE_SEC = 12;     // seconds before track end to begin fade
const TICK_MS       = 40;     // interval tick for volume ramp (~25 fps)

// ── Helpers ───────────────────────────────────────────────────────────────
const BAR_H = [0.4, 0.7, 1.0, 0.6, 0.85, 0.5, 0.9, 0.65];

const SoundWave = () => (
  <div className="flex items-end gap-0.5 h-5">
    {BAR_H.map((h, i) => (
      <motion.div
        key={i}
        className="w-0.5 rounded-full bg-white"
        animate={{ height: [`${h * 100}%`, "20%", `${h * 100}%`] }}
        transition={{ duration: 0.65 + i * 0.05, repeat: Infinity, ease: "easeInOut", delay: i * 0.07 }}
        style={{ minHeight: 4 }}
      />
    ))}
  </div>
);

const PlayIcon  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>;
const PauseIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
const SkipIcon  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M6 18l8.5-6L6 6v12zM16 6h2v12h-2z"/></svg>;

// ── Component ─────────────────────────────────────────────────────────────
export const MusicPlayer = () => {
  const [visible,    setVisible]    = useState(false);
  const [playing,    setPlaying]    = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [showLabel,  setShowLabel]  = useState(false);
  const [fadeLabel,  setFadeLabel]  = useState(""); // "▶ Cross-fading…" hint

  // ── Audio state ───────────────────────────────────────────────────────
  // nodes[0] and nodes[1] alternate roles; activeSlot tells which is "on air"
  const nodes      = useRef<[HTMLAudioElement, HTMLAudioElement]>([new Audio(), new Audio()]);
  const activeSlot = useRef<0 | 1>(0);          // which node is currently primary
  const nextIdx    = useRef<number>(1);          // track index of the upcoming song
  const xfading    = useRef(false);             // crossfade in progress?
  const xfadeTimer = useRef<number>(0);         // setInterval handle
  const labelTimer = useRef<number>(0);

  // ── Bootstrap ─────────────────────────────────────────────────────────
  useEffect(() => {
    const [a, b] = nodes.current;
    a.volume = VOLUME;
    b.volume = 0;
    a.src = TRACKS[0].src;
    a.load();
    // Pre-load second track into the inactive node
    b.src = TRACKS[1].src;
    b.load();

    const visibilityTimer = window.setTimeout(() => setVisible(true), 2000);
    
    // Auto-play after 5 seconds
    const autoPlayTimer = window.setTimeout(() => {
      const active = nodes.current[activeSlot.current];
      active.play().then(() => {
        setPlaying(true);
        flashLabel();
      }).catch(() => {
        // Autoplay might be blocked by browser policy
        // User can click play button manually
      });
    }, 3500);

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(autoPlayTimer);
      a.pause();
      b.pause();
    };
  }, []);

  // ── Cross-fade engine ─────────────────────────────────────────────────
  const startCrossfade = useCallback(() => {
    if (xfading.current) return;
    xfading.current = true;

    const outSlot = activeSlot.current;
    const inSlot  = (1 - outSlot) as 0 | 1;
    const outNode = nodes.current[outSlot];
    const inNode  = nodes.current[inSlot];
    const thisNextIdx = nextIdx.current;

    // Ensure incoming node has the right track (may already be loaded)
    if (inNode.src !== TRACKS[thisNextIdx].src) {
      inNode.src = TRACKS[thisNextIdx].src;
      inNode.load();
    }

    inNode.currentTime = 0;
    inNode.volume      = 0;
    inNode.play().catch(() => {});

    // Update UI immediately to show the incoming track
    setTrackIndex(thisNextIdx);
    setFadeLabel("Cross-fading…");
    flashLabel();

    const startTime  = Date.now();
    const totalMs    = CROSSFADE_SEC * 1000;

    xfadeTimer.current = window.setInterval(() => {
      const progress = Math.min((Date.now() - startTime) / totalMs, 1);
      outNode.volume = VOLUME * (1 - progress);
      inNode.volume  = VOLUME * progress;

      if (progress >= 1) {
        // Cross-fade complete — clean up outgoing node
        clearInterval(xfadeTimer.current);
        outNode.pause();
        outNode.currentTime = 0;

        // Swap roles
        activeSlot.current = inSlot;

        // Prepare NEXT cycle: load the track after thisNextIdx into the now-idle outNode
        const afterNext = (thisNextIdx + 1) % TRACKS.length;
        nextIdx.current  = afterNext;
        outNode.src      = TRACKS[afterNext].src;
        outNode.load();

        xfading.current = false;
        setFadeLabel("");
      }
    }, TICK_MS);
  }, []);

  // ── Monitor active track for crossfade window ─────────────────────────
  useEffect(() => {
    const handleTimeUpdate = () => {
      if (xfading.current) return;
      const active = nodes.current[activeSlot.current];
      if (!active.duration) return;
      const remaining = active.duration - active.currentTime;
      if (remaining > 0 && remaining <= CROSSFADE_SEC) {
        startCrossfade();
      }
    };

    // 'ended' fires if the track is shorter than CROSSFADE_SEC or timing drifts
    const handleEnded = () => {
      if (!xfading.current) startCrossfade();
    };

    const [a, b] = nodes.current;
    a.addEventListener("timeupdate", handleTimeUpdate);
    b.addEventListener("timeupdate", handleTimeUpdate);
    a.addEventListener("ended", handleEnded);
    b.addEventListener("ended", handleEnded);

    return () => {
      a.removeEventListener("timeupdate", handleTimeUpdate);
      b.removeEventListener("timeupdate", handleTimeUpdate);
      a.removeEventListener("ended", handleEnded);
      b.removeEventListener("ended", handleEnded);
    };
  }, [startCrossfade]);

  // ── Label flash helper ────────────────────────────────────────────────
  const flashLabel = useCallback((duration = 3500) => {
    setShowLabel(true);
    clearTimeout(labelTimer.current);
    labelTimer.current = window.setTimeout(() => setShowLabel(false), duration);
  }, []);

  // ── Toggle play / pause ───────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    const [a, b] = nodes.current;

    if (playing) {
      a.pause();
      b.pause();
      setPlaying(false);
    } else {
      const active = nodes.current[activeSlot.current];
      active.play().then(() => {
        setPlaying(true);
        setFadeLabel("");
        flashLabel();
        // If crossfade was in progress, resume the incoming node too
        if (xfading.current) {
          const inSlot = (1 - activeSlot.current) as 0 | 1;
          nodes.current[inSlot].play().catch(() => {});
        }
      }).catch(() => {});
    }
  }, [playing, flashLabel]);

  // ── Manual skip ──────────────────────────────────────────────────────
  const skipTrack = useCallback(() => {
    // Cancel any in-progress crossfade
    clearInterval(xfadeTimer.current);
    xfading.current = false;

    const outSlot = activeSlot.current;
    const inSlot  = (1 - outSlot) as 0 | 1;
    const outNode = nodes.current[outSlot];
    const inNode  = nodes.current[inSlot];

    const jumpTo = nextIdx.current;

    // Stop outgoing
    outNode.pause();
    outNode.currentTime = 0;
    outNode.volume = VOLUME;

    // Play incoming immediately at full volume
    inNode.volume      = VOLUME;
    inNode.currentTime = 0;
    inNode.src = TRACKS[jumpTo].src;

    if (playing) {
      inNode.play().catch(() => {});
    }

    // Swap roles
    activeSlot.current = inSlot;

    // Prep next-next track in idle node
    const afterJump   = (jumpTo + 1) % TRACKS.length;
    nextIdx.current   = afterJump;
    outNode.src       = TRACKS[afterJump].src;
    outNode.load();

    setTrackIndex(jumpTo);
    setFadeLabel("");
    flashLabel();
  }, [playing, flashLabel]);

  // ── Render ────────────────────────────────────────────────────────────
  const currentTrack = TRACKS[trackIndex];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-[500] flex flex-col items-end gap-2"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          exit={{    opacity: 0, scale: 0.7, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* ── Now-playing label ───────────────────────────── */}
          <AnimatePresence>
            {showLabel && (
              <motion.div
                className="flex flex-col items-end gap-0.5 max-w-[210px]"
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1    }}
                exit={{    opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="px-3 py-2 rounded-2xl text-right"
                  style={{ background: "hsl(340 65% 48% / 0.92)", backdropFilter: "blur(10px)" }}
                >
                  <p className="font-body text-white text-xs opacity-80 leading-none mb-0.5">
                    {fadeLabel || "♪ Now playing"}
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

          {/* ── Controls ────────────────────────────────────── */}
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
              aria-label={`Skip to: ${TRACKS[nextIdx.current]?.title ?? ""}`}
            >
              <SkipIcon />
            </motion.button>

            {/* Play / Pause */}
            <motion.button
              type="button"
              onClick={togglePlay}
              className="relative w-14 h-14 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              style={{
                background: "linear-gradient(135deg, hsl(340 65% 55%), hsl(355 60% 65%))",
                boxShadow: playing
                  ? "0 0 0 3px hsl(340 65% 68% / 0.4), 0 8px 30px hsl(340 65% 55% / 0.55)"
                  : "0 4px 20px hsl(340 65% 55% / 0.35)",
              }}
              whileHover={{ scale: 1.10 }}
              whileTap={{   scale: 0.92 }}
              animate={playing ? {
                boxShadow: [
                  "0 0 0 3px hsl(340 65% 68% / 0.4), 0 8px 30px hsl(340 65% 55% / 0.5)",
                  "0 0 0 7px hsl(340 65% 68% / 0.15), 0 8px 40px hsl(340 65% 55% / 0.7)",
                  "0 0 0 3px hsl(340 65% 68% / 0.4), 0 8px 30px hsl(340 65% 55% / 0.5)",
                ],
              } : {}}
              transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
              aria-label={playing ? "Pause music" : "Play music"}
            >
              {playing ? <SoundWave /> : <PlayIcon />}
            </motion.button>
          </div>

          {/* ── Track dot indicators ─────────────────────────── */}
          <div className="flex gap-1.5 justify-center">
            {TRACKS.map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{
                  height: 6,
                  background: i === trackIndex
                    ? "hsl(340 65% 75%)"
                    : "hsl(340 40% 60% / 0.5)",
                }}
                animate={{ width: i === trackIndex ? 16 : 6 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};