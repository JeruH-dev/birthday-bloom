import { motion } from "framer-motion";
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";

const photos = [
  {
    src: photo1,
    caption: "Our little moments",
    icon: "💕",
    tilt: "-2deg",
    delay: 0,
  },
  {
    src: photo2,
    caption: "Memories I cherish",
    icon: "🌹",
    tilt: "0deg",
    delay: 0.15,
  },
  {
    src: photo3,
    caption: "Forever memories",
    icon: "✨",
    tilt: "2deg",
    delay: 0.3,
  },
];

const PhotoCard = ({
  src,
  caption,
  icon,
  tilt,
  delay,
}: {
  src: string;
  caption: string;
  icon: string;
  tilt: string;
  delay: number;
}) => (
  <motion.div
    className="group relative cursor-default"
    initial={{ opacity: 0, y: 60, rotate: parseFloat(tilt) * 2 }}
    whileInView={{ opacity: 1, y: 0, rotate: parseFloat(tilt) }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{
      y: -12,
      rotate: 0,
      scale: 1.03,
      zIndex: 10,
      transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
    }}
    style={{ transformOrigin: "center bottom" }}
  >
    {/* Card */}
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "white",
        boxShadow:
          "0 4px 20px rgba(180,90,110,0.1), 0 1px 0 rgba(255,255,255,0.9) inset",
        padding: "12px 12px 56px 12px",
        transition: "box-shadow 0.35s ease",
      }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "4/5" }}>
        <img
          src={src}
          alt={caption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: "linear-gradient(160deg, hsl(340 65% 55% / 0) 0%, hsl(340 65% 35% / 0.4) 100%)",
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-4xl">{icon}</span>
        </motion.div>
      </div>
    </div>

    {/* Caption below — polaroid style */}
    <div
      className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-4 gap-2"
    >
      <span className="text-base" aria-hidden="true">
        {icon}
      </span>
      <p
        className="font-handwriting text-lg text-center"
        style={{ color: "hsl(340 50% 35%)" }}
      >
        {caption}
      </p>
    </div>

    {/* Glow border on hover */}
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        boxShadow: "0 0 0 2px hsl(340 65% 68%), 0 0 30px hsl(340 65% 68% / 0.3)",
      }}
      aria-hidden="true"
    />
  </motion.div>
);

export const MemoryGallery = () => (
  <section
    className="relative z-10 py-24 px-4 overflow-hidden"
    style={{
      background:
        "linear-gradient(180deg, hsl(270 35% 96%) 0%, hsl(345 45% 97%) 100%)",
    }}
  >
    {/* Decorative bg element */}
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(340 65% 58% / 0.04) 0%, transparent 100%)",
      }}
    />

    <div className="max-w-5xl mx-auto relative z-10">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="font-handwriting text-xl mb-2"
          style={{ color: "hsl(340 45% 55%)" }}
        >
          A glimpse into our world
        </p>
        <h2
          className="font-display font-bold"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "hsl(340 55% 28%)" }}
        >
          Our Beautiful Moments 🌸
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
          Every photo a story, every moment a treasure.
        </p>
      </motion.div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 items-start">
        {photos.map((photo) => (
          <PhotoCard key={photo.caption} {...photo} />
        ))}
      </div>

      {/* Replace note */}
      <motion.p
        className="text-center mt-10 font-body text-sm opacity-60 italic"
        style={{ color: "hsl(340 35% 42%)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
       Replace the photos in <code>/src/assets/photo-1.jpg</code> to personalize 💕
      </motion.p>
    </div>
  </section>
);