# ✨ Animation & Motion System

The motion in Birthday Bloom is built on **Framer Motion**, following professional cinematography principles to create a "World Class" interactive experience.

## 🎥 Cinematography Principles

### 1. Camera Simulation (Zoom/Pan/Tilt)
Instead of simple fades, scenes transition using camera-like motion:
- **Depth Shift**: Scenes often start with a `1.1x` scale and `blur(20px)`, smoothly focusing as the content appears.
- **Perspective Rotations**: The `FakeChat` and `CinematicIntro` use `rotateX` and `rotateY` to give a 3D depth feel.

### 2. Orchestration & Staggering
We use Framer Motion `variants` to control the sequence of elements:
- **StaggerChildren**: Ensures that text lines and buttons appear one after another, creating a rhythmic visual pace.
- **Spring Physics**: We avoid linear easing. Instead, we use `stiffness: 150` and `damping: 20` for natural, organic movement.

### 3. Kinetic Typography
Text is never static. It uses:
- **TypeWriter Effects**: Realistic character-by-character typing.
- **Pop-out & Zoom-in**: For emphasis on the name and "Happy Birthday" reveal.

---

## 🌪️ Atmospheric Particles
The background uses the `FloatingElements` system which features:
- **3-Layer Parallax**: Background atmosphere, Mid-ground symbols, and Foreground details.
- **Mood-Aware Speed**: Particles move slower for romantic themes and faster for energetic themes.

---

## 🎭 Specialized Transition & Celebration Effects (v3.1)

### 1. Password Lock Glassmorphic Wobble
- **Wobble/Shake Effect**: Passcode entries that do not match the expected key trigger a spring-based lateral shake animation (`x: [-10, 10, -10, 10, 0]`) to give natural feedback without layout shifts.
- **Blur Overlay Fade**: Transitioning out of the lock screen triggers a smooth backdrop-filter transition, dissolving the blur and letting the user step into the storytelling flow.

### 2. Cake Countdown Scaling Number
- **3-2-1 Countdown Ticks**: Each countdown number scale expands from `0.3x` to `1.2x` with a quick spring bounce (`stiffness: 300, damping: 15`), fading out as the next tick occurs.
- **Centralized Timeline**: Timings are fully synchronized using a centralized config object (`CINEMATIC_TIMINGS`), avoiding overlapping timeouts or race conditions on mobile.

### 3. Layered Pyrotechnics
- **Staggered Sides**: Corner cannons fire with high velocity and narrow spread.
- **Radial Climax**: Centered bursts expand outward right above the cake area.
- **Glitter Rain**: Gold and silver stars descend slowly with low gravity and random horizontal drift.

---

## 🛠️ Implementation Details
Most animations are found in:
- `src/components/birthday/CinematicIntro.tsx`
- `src/components/birthday/MainBirthday.tsx`
- `src/components/birthday/FloatingElements.tsx`
- `src/components/birthday/PasswordUnlock.tsx`
- `src/components/birthday/CakeCutting.tsx`
- `src/components/birthday/Confetti.tsx`

For custom animations, use the `useStoryVariants` hook in the cinematic directory.
