import { useState } from "react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: "❤️",
    title: "Your Beautiful Heart",
    description:
      "The way you care for everyone around you with such pure, unconditional love.",
    color: "hsl(340 65% 58%)",
    bg: "hsl(340 65% 58% / 0.08)",
    border: "hsl(340 65% 68% / 0.25)",
  },
  {
    icon: "✨",
    title: "Your Smile",
    description:
      "That smile of yours has the power to make my whole world feel right again.",
    color: "hsl(36 80% 58%)",
    bg: "hsl(36 80% 58% / 0.08)",
    border: "hsl(36 80% 68% / 0.25)",
  },
  {
    icon: "🌹",
    title: "Your Kindness",
    description:
      "You have the rare gift of making everyone feel seen, heard, and valued.",
    color: "hsl(355 65% 62%)",
    bg: "hsl(355 65% 62% / 0.08)",
    border: "hsl(355 65% 72% / 0.25)",
  },
  {
    icon: "💫",
    title: "How You Make Life Better",
    description:
      "Every ordinary day becomes something magical simply because you're in it.",
    color: "hsl(270 50% 62%)",
    bg: "hsl(270 50% 62% / 0.08)",
    border: "hsl(270 50% 72% / 0.25)",
  },
  {
    icon: "💕",
    title: "The Memories We Create",
    description:
      "From the biggest adventures to the quietest moments, I treasure them all.",
    color: "hsl(320 60% 60%)",
    bg: "hsl(320 60% 60% / 0.08)",
    border: "hsl(320 60% 70% / 0.25)",
  },
  {
    icon: "🌸",
    title: "Your Strength",
    description:
      "You face every challenge with grace and courage that inspires me every single day.",
    color: "hsl(340 50% 65%)",
    bg: "hsl(340 50% 65% / 0.08)",
    border: "hsl(340 50% 75% / 0.25)",
  },
];

const ReasonCard = ({
  icon,
  title,
  description,
  color,
  bg,
  border,
  delay,
}: (typeof reasons)[0] & { delay: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-default rounded-2xl p-6 sm:p-7 reason-card"
      style={{
        background: hovered ? bg : "rgba(255,255,255,0.7)",
        border: `1px solid ${hovered ? border : "rgba(232,170,185,0.2)"}`,
        backdropFilter: "blur(10px)",
        boxShadow: hovered
          ? `0 20px 50px ${color.replace(")", " / 0.18)")}, 0 0 0 1.5px ${border}`
          : "0 2px 12px rgba(180,90,110,0.06)",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <motion.div
        className="text-4xl mb-4 inline-block select-none"
        animate={hovered ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1 }}
        transition={{ duration: 0.5 }}
        aria-hidden="true"
      >
        {icon}
      </motion.div>

      {/* Title */}
      <h3
        className="font-display font-semibold text-xl mb-2 transition-colors"
        style={{ color: hovered ? color : "hsl(340 55% 25%)" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="font-body text-sm sm:text-base leading-relaxed"
        style={{ color: "hsl(340 25% 45%)" }}
      >
        {description}
      </p>

      {/* Glow dot top-right */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 rounded-full"
        style={{ background: color }}
        animate={hovered ? { scale: 1.5, opacity: 1 } : { scale: 1, opacity: 0.4 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />
    </motion.div>
  );
};

export const ReasonsSection = () => (
  <section
    className="relative z-10 py-24 px-4 overflow-hidden"
    style={{
      background:
        "linear-gradient(160deg, hsl(340 45% 97%) 0%, hsl(270 35% 96%) 50%, hsl(340 50% 97%) 100%)",
    }}
  >
    {/* Soft bg pattern */}
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `radial-gradient(hsl(340 65% 68% / 0.06) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }}
    />

    <div className="max-w-5xl mx-auto relative z-10">
      {/* Header */}
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
          let me count the ways...
        </p>
        <h2
          className="font-display font-bold"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "hsl(340 55% 28%)",
          }}
        >
          Why I Love You 💕
        </h2>
        <div
          className="w-20 h-0.5 mx-auto mt-4 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(340 65% 68%), transparent)",
          }}
        />
        <p
          className="mt-4 font-body text-base max-w-md mx-auto"
          style={{ color: "hsl(340 30% 48%)" }}
        >
          Hover over each card to feel the love.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {reasons.map((reason, i) => (
          <ReasonCard key={reason.title} {...reason} delay={i * 0.1} />
        ))}
      </div>
    </div>
  </section>
);