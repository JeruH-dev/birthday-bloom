import { motion } from "framer-motion";

const HeartBeat = () => (
  <motion.span
    animate={{ scale: [1, 1.3, 1, 1.15, 1] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    className="inline-block"
    aria-hidden="true"
  >
    ❤️
  </motion.span>
);

const Star = ({ i }: { i: number }) => (
  <motion.span
    className="absolute text-xl select-none pointer-events-none"
    style={{
      left: `${10 + i * 12}%`,
      top: `${20 + (i % 3) * 25}%`,
    }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0.5, 1.2, 0.5],
      y: [0, -10, 0],
    }}
    transition={{
      duration: 3 + i * 0.5,
      repeat: Infinity,
      delay: i * 0.4,
      ease: "easeInOut",
    }}
    aria-hidden="true"
  >
    {["✨", "💫", "🌟", "⭐", "💕", "🌸", "🌹"][i % 7]}
  </motion.span>
);

export const RomanticFooter = () => (
  <footer
    className="relative z-10 overflow-hidden py-20 px-4 text-center"
    style={{
      background:
        "linear-gradient(160deg, hsl(345 60% 14%) 0%, hsl(320 55% 17%) 50%, hsl(270 50% 16%) 100%)",
    }}
  >
    {/* Ambient glow */}
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(340 65% 58% / 0.1) 0%, transparent 70%)",
      }}
    />

    {/* Floating stars */}
    {Array.from({ length: 7 }).map((_, i) => (
      <Star key={i} i={i} />
    ))}

    <div className="relative z-10">
      {/* Big heart */}
      <motion.div
        className="text-6xl mb-6 inline-block"
        initial={{ scale: 0, rotate: -20 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        aria-hidden="true"
      >
        🌹
      </motion.div>

      <motion.h2
        className="font-display font-bold mb-3"
        style={{
          fontSize: "clamp(1.8rem, 5vw, 3rem)",
          color: "white",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Happy Birthday, My Queen 👑
      </motion.h2>

      <motion.p
        className="font-handwriting text-xl sm:text-2xl mb-8"
        style={{ color: "hsl(345 60% 75%)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.7 }}
      >
        May this year be the most beautiful chapter of your life.
      </motion.p>

      {/* Divider */}
      <motion.div
        className="w-32 h-0.5 mx-auto mb-8 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(340 65% 68%), transparent)",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />

      <motion.p
        className="font-body text-sm tracking-wider uppercase"
        style={{ color: "hsl(345 30% 60%)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        Made with all my heart <HeartBeat />
      </motion.p>

      <motion.div
        className="flex justify-center gap-3 mt-8 text-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        aria-label="Decorative emoji row"
        role="img"
      >
        {["🌹", "💕", "✨", "🎂", "💖", "🌸", "💫"].map((e, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          >
            {e}
          </motion.span>
        ))}
      </motion.div>

      {/* Tiny credit */}
      <p className="mt-12 text-xs tracking-widest uppercase opacity-20" style={{ color: "white" }}>
        Made with love by <a href="https://gideon-efiakedoho-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">Gideon Efiakedoho</a>
      </p>
    </div>
  </footer>
);