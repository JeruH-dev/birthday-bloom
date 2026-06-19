/**
 * Romantic Birthday Website — Main Orchestrator
 *
 * Flow:
 *  1. LoadingScreen   (3.5 s)
 *  2. HeroSection     (landing — "Open Your Surprise 💝")
 *  3. CountdownTimer  (visible after CTA click — counts to July 27 2026)
 *  4. LoveLetter  +  MemoryGallery  +  ReasonsSection  +  SurpriseReveal
 *                     (unlocked only when countdown reaches zero)
 *  5. RomanticFooter  (always visible once loading ends)
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { LoadingScreen }  from "@/components/romantic/LoadingScreen";
import { RosePetals }     from "@/components/romantic/RosePetals";
import { CursorTrail }    from "@/components/romantic/CursorTrail";
import { HeroSection }    from "@/components/romantic/HeroSection";
import { CountdownTimer } from "@/components/romantic/CountdownTimer";
import { LoveLetter }     from "@/components/romantic/LoveLetter";
import { MemoryGallery }  from "@/components/romantic/MemoryGallery";
import { ReasonsSection } from "@/components/romantic/ReasonsSection";
import { SurpriseReveal } from "@/components/romantic/SurpriseReveal";
import { MusicPlayer }    from "@/components/romantic/MusicPlayer";
import { RomanticFooter } from "@/components/romantic/RomanticFooter";
import { Fireworks }      from "@/components/romantic/Fireworks";

// ── Helper: has the birthday already passed? ─────────────────────────────
const BIRTHDAY = new Date(2026, 6, 27, 0, 0, 0); // July 27 2026 (month = 0-indexed)
const birthdayAlreadyHere = () => Date.now() >= BIRTHDAY.getTime();

// ── Smooth scroll helper ─────────────────────────────────────────────────
function scrollTo(id: string, delay = 400) {
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, delay);
}

// ── Page component ───────────────────────────────────────────────────────
const Index = () => {
  /** Phase 1 — loading intro */
  const [loading, setLoading] = useState(true);

  /** Phase 2 — countdown section visible (after hero CTA click) */
  const [showCountdown, setShowCountdown] = useState(false);

  /** Phase 3 — love letter + gallery + reasons + surprise visible
   *            (after countdown reaches 0 OR if birthday already passed) */
  const [showContent, setShowContent] = useState(false);

  /** Fires the fireworks canvas burst when countdown hits zero */
  const [fireworksActive, setFireworksActive] = useState(false);

  const contentRevealedRef = useRef(false);

  // On first mount: if birthday has already passed, unlock everything immediately
  useEffect(() => {
    if (birthdayAlreadyHere()) {
      setShowCountdown(true);
      setShowContent(true);
      contentRevealedRef.current = true;
    }
  }, []);

  // Reset scroll when loading ends
  useEffect(() => {
    if (!loading) window.scrollTo({ top: 0, behavior: "instant" });
  }, [loading]);

  // ── Handlers ────────────────────────────────────────────────────────────

  /** Hero CTA → reveal countdown section */
  const handleHeroReveal = () => {
    setShowCountdown(true);
    // If birthday is already here, also unlock the rest right away
    if (birthdayAlreadyHere() && !contentRevealedRef.current) {
      contentRevealedRef.current = true;
      setShowContent(true);
      scrollTo("love-letter", 600);
    } else {
      scrollTo("countdown", 400);
    }
  };

  /** CountdownTimer fires this once when it hits zero */
  const handleCountdownComplete = () => {
    if (contentRevealedRef.current) return;
    contentRevealedRef.current = true;
    setFireworksActive(true);          // 🎇 launch fireworks immediately
    setShowContent(true);
    scrollTo("love-letter", 2200);     // scroll after fireworks have a moment to shine
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Phase 1 — Loading screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Phases 2-4 — Main page */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* ── Always-on global effects ── */}
            <RosePetals />
            <CursorTrail />
            <MusicPlayer />

            {/* ── Fireworks — fixed canvas overlay, fires on countdown zero ── */}
            <Fireworks active={fireworksActive} />

            {/* ── Phase 2: Hero (landing page) ── */}
            <HeroSection
              onReveal={handleHeroReveal}
              revealed={showCountdown}
            />

            {/* ── Phase 3: Countdown (slides in after CTA) ── */}
            <AnimatePresence>
              {showCountdown && (
                <motion.div
                  key="countdown-section"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CountdownTimer onComplete={handleCountdownComplete} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Phase 4: Full content (unlocks when countdown = 0) ── */}
            <AnimatePresence>
              {showContent && (
                <motion.div
                  key="full-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  {/* Each section fades up with a staggered delay */}
                  {[
                    { id: "love-letter",   Component: LoveLetter,    delay: 0 },
                    { id: "gallery",       Component: MemoryGallery,  delay: 0.15 },
                    { id: "reasons",       Component: ReasonsSection, delay: 0.3 },
                    { id: "surprise",      Component: SurpriseReveal, delay: 0.45 },
                  ].map(({ id, Component, delay }) => (
                    <motion.div
                      key={id}
                      id={id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Component />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Footer — always visible after loading ── */}
            <RomanticFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;