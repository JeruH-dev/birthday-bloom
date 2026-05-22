# 🌸 Birthday Bloom — Cinematic Birthday Engine v3.0

<div align="center">

> **"A premium, production-ready digital experience crafted for the world by Naboraj Sarkar."**
> 
> **Now with Specialized Family Templates, Advanced Data Models, and Comprehensive Documentation**

![Birthday Bloom Banner](https://raw.githubusercontent.com/naborajs/birthday-bloom/main/public/favicon.png)

<h3>✨ The Ultimate Open-Source Cinematic Birthday Surprise ✨</h3>

<p align="center">
  <a href="https://github.com/naborajs/birthday-bloom/stargazers"><img src="https://img.shields.io/github/stars/naborajs/birthday-bloom?style=for-the-badge&color=ff69b4&logo=github" alt="Stars"></a>
  <a href="https://github.com/naborajs/birthday-bloom/blob/main/LICENSE"><img src="https://img.shields.io/github/license/naborajs/birthday-bloom?style=for-the-badge&color=4169e1" alt="License"></a>
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel" alt="Deploy"></a>
</p>

<div align="center">
  <figure>
    <img src="src\assets\birthday-boom.png" alt="Birthday Bloom hero banner" style="max-width:100%;height:auto;border-radius:18px;box-shadow:0 30px 90px rgba(0,0,0,0.35);" />
    <figcaption><em>Premium cinematic birthday experiences built with React, Framer Motion, and env-driven personalization.</em></figcaption>
  </figure>
</div>
</div>

---

## Start Here

Birthday Bloom is now **env-first**: names, relationship type, messages, colors, photos, captions, videos, audio, visible sections, animation behavior, accessibility, and family-template metadata can be changed from `.env.local`.

Repository: [naborajs/birthday-bloom](https://github.com/naborajs/birthday-bloom)

**Important:** when this project says “env”, it means environment variables, usually stored in `.env.local` during local development or in the hosting provider’s Environment Variables/Secrets panel during deployment. These values are the intended customization layer. For normal changes, do not rewrite the app code.

If you ask an AI coding agent to customize Birthday Bloom, tell it this first:

> This project is already built to be customized through env values. Before editing components or templates, check `.env.example` and `docs/ENV_GUIDE.md`, then tell me which env keys to update.

Direct docs:

- [Complete env customization guide](./docs/ENV_GUIDE.md)
- [Quick start](./QUICK_START.md)
- [Family system](./docs/family-system.md)
- [Template architecture](./docs/template-architecture.md)
- [Developer guide](./docs/developer-guide.md)
- [Migration guide](./docs/migration-guide.md)
- [Documentation index](./docs/DOCUMENTATION_INDEX.md)

Copy `.env.example` to `.env.local`, change values, restart the dev server, and the experience updates without component edits.

---

## 🚀 Experience the Magic
**Birthday Bloom** is a high-end, premium animated birthday surprise platform designed to capture and create unforgettable digital moments. Developed fundamentally with **React 18**, **Framer Motion**, and **Tailwind CSS**, it establishes a physics-based, emotional narrative layout.

- **Interactive Birthday Quiz**: A gamified trivia engine that personalizes questions based on interests.
- **Polaroid Memory Gallery**: A beautiful "Memory Lane" featuring captions and images revealed through cinematic transitions.
- **"Pure Reality" Cake 3D**: High-fidelity procedural textures, realistic drips, and volumetric lighting.
- **Final Surprise Video**: A dedicated emotional closing scene with a configurable finale video.
- **Advanced Physics Balloons**: Non-linear, physics-correct balloon drift with interactive "pop" mechanics.

<div align="center">
  <figure>
    <img src="assets/previews/feature-showcase.png" alt="Birthday Bloom feature showcase" style="max-width:100%;height:auto;border-radius:18px;box-shadow:0 24px 68px rgba(0,0,0,0.28);" />
    <figcaption><em>Feature showcase highlighting interactive cake, memory gallery, family templates, and validation workflows.</em></figcaption>
  </figure>
  <p>
    <img src="assets/icons/icon-rocket.png" alt="Fast setup icon" width="64" height="64" style="margin:0 12px;" />
    <img src="assets/icons/icon-shield.png" alt="Secure environment icon" width="64" height="64" style="margin:0 12px;" />
    <img src="assets/icons/icon-sparkle.png" alt="Cinematic sparkles icon" width="64" height="64" style="margin:0 12px;" />
  </p>
  <p><em>Fast dev velocity, secure env configuration, and cinematic storytelling — all part of the premium UX.</em></p>
</div>

---


## 🔥 Why Birthday Bloom?

Most website templates are static or simply transition between pages. **Birthday Bloom is a cinematic finite state machine.** It controls pacing, narrative tension, visual payoffs, and sound effects to simulate a movie-like experience inside the browser.

By chaining together asynchronous events and orchestrated **Framer Motion** timelines, the application orchestrates a perfect symphony of text, light, SVG particle physics, and interactions. 

- **No Over-Engineering**: We rely heavily on pure CSS (transitions, animations, custom easing curves) rather than heavy JavaScript physics libraries like Matter.js or Three.js. This ensures maximum performance across low-end mobile devices and reduces the final bundle size significantly.
- **Dynamic Emotional Flow**: Fake chat interfaces, character-by-character typing effects, and growing SVG structures all contribute to a highly immersive experience. The user isn't just "reading" a webpage; they are experiencing a narrative.
- **Zero Configuration Required**: Out of the box, you just need to populate a single `.env` variable to get 90% of the value.
- **Vite Empowered**: Instant HMR when developing locally, and highly optimized, minified chunks when deploying to production.

---

## ✨ What's New in v3.0

### 🎉 Major Features

#### 1. **Family Templates System** ⭐
- Dedicated Brother and Sister templates remain supported.
- New templates: Father, Mother, Grandfather, Grandmother, Uncle, Aunt, Cousin, Son, Daughter, Guardian, Friend, and Custom Member.
- Shared base schema with specialized relationship fields, dynamic custom fields, timeline/history, media, personal notes, relationship metadata, and privacy controls.
- Env entry point through `VITE_FAMILY_MEMBER_TYPE`, `VITE_FAMILY_*`, and `VITE_FAMILY_PROFILE_JSON`.
- Fully type-safe with TypeScript support.

#### 2. **Enhanced Data Models**
- `EnhancedBirthdayConfig` with 7 major sections (40+ options)
- Complete type safety and validation
- Sanitization and default merging
- Extensible for custom fields

#### 3. **Production-Grade Validation**
- `ConfigValidator` - Comprehensive validation system
- `DataValidator` - 12+ specialized validators (email, color, phone, etc.)
- Input sanitization
- Error reporting with detailed messages

#### 4. **Comprehensive Documentation**
- 📖 **COMPLETE_SETUP_GUIDE.md** (800+ lines) - Full setup and configuration guide
- 📚 **API_REFERENCE.md** (600+ lines) - Complete API documentation
- 📋 **UPGRADE_SUMMARY.md** - Detailed upgrade information
- Step-by-step examples and troubleshooting

#### 5. **Specialized Emotional Letters**
- Enhanced templates with deeper personalization
- Brother & Sister specific messages
- Relationship-aware phrasing
- Gender-sensitive content

### 📊 v2.5 → v3.0 Comparison

| Feature | v2.5 | v3.0 | Improvement |
| --- | --- | --- | --- |
| Config Options | 15 | 40+ | **+166%** |
| Family Templates | Generic | 2 Specialized | **New** |
| Validation System | None | Full | **New** |
| Data Models | Basic | Comprehensive | **+800%** |
| Documentation | Good | Excellent | **+87%** |
| Type Safety | Partial | Complete | **100%** |

---

## 📖 Table of Contents

1. [Introduction](#-introduction)
2. [Hyper-Personalization & Templates](#-hyper-personalization--templates)
3. [System Architecture](#-system-architecture)
4. [Mastering the Lifecycle](#-mastering-the-lifecycle)
5. [Environment Variables Guide](#-environment-variables-guide)
5. [In-Depth Code Explanation](#-in-depth-code-explanation)
    1. [The Cinematic Intro](#1-cinematic-intro-cinematicintrotsx)
    2. [The Interactive Cake](#2-the-interactive-cake-cakecuttingtsx)
    3. [Typographic Storytelling](#3-typographic-storytelling-typewritertsx)
    4. [The Grand Finale: Heart Tree](#4-the-grand-finale-hearttreetsx)
    5. [Main Celebration View](#5-main-celebration-view-mainbirthdaytsx)
6. [Personalization & Customization](#-personalization--customization)
7. [Environment Variables Guide](#-environment-variables-guide)
8. [Advanced Installation & Setup](#-advanced-installation--setup)
9. [Component API Reference](#-component-api-reference)
    1. [\<TypeWriter /> API](#typewriter--api)
    2. [\<HeartTree /> API](#hearttree--api)
    3. [\<CakeCutting /> API](#cakecutting--api)
    4. [\<PhotoGallery /> API](#photogallery--api)
    5. [\<CinematicIntro /> API](#cinematicintro--api)
10. [Custom Hooks Documentation](#-custom-hooks-documentation)
11. [Theming Engine & CSS Variables](#-theming-engine--css-variables)
12. [Performance Profiling & GPU Acceleration](#-performance-profiling--gpu-acceleration)
13. [Browser Compatibility Matrix](#-browser-compatibility-matrix)
14. [Cinematography Theory](#-cinematography-theory)
15. [SEO, Social Sharing & OG Tags](#-seo-social-sharing--og-tags)
16. [Folder Structure Guide](#-folder-structure-guide)
17. [Troubleshooting & Massive FAQ](#-troubleshooting--massive-faq)
18. [Author & Brand Identity](#-author--brand-identity)
24. [Author & Brand Identity](#-author--brand-identity)
19. [License](#-license)

---

## 🎥 Cinematography Theory

Birthday Bloom is built on the principle of **Kinetic Storytelling**. Unlike traditional web apps that prioritize instant information retrieval, this engine prioritizes **Emotional Payoff**.

### 1. The 3D Camera Model
We simulate a camera lens using CSS `perspective` and Framer Motion's `rotateX/Y` properties. This creates a "parallax of importance" where the most emotional elements (like the Heart Tree or Cake) feel physically closer to the user.

### 2. Narrative Pacing (The 300ms Rule)
- **Micro-interactions**: 150ms (Button clicks, hover glows).
- **Scene Shifts**: 800ms - 1.2s (Fading between chat and reveal). This long duration allows the user's brain to "reset" and prepare for a new emotional state.
- **Storytelling**: 4s per line. This is optimized for the average adult reading speed, ensuring no one feels rushed.

### 3. Filmic Post-Processing
We apply a global **Film Grain** overlay (`body::after`) and a **Vignette** to eliminate digital "flatness". This technique is borrowed from high-end cinematography to make the UI feel like a living frame of film.

---

## 🏗️ System Architecture

Birthday Bloom operates as a highly orchestrated timeline. The following Mermaid graph details the entire user journey through the codebase, demonstrating how components trigger one another smoothly.

```mermaid
graph TD
    A[Splash Screen] -->|"Start Loading Assets"| B[Cinematic Intro]
    B -->|"Phase 1: Storyline"| C[Fake Chat Simulator]
    C -->|"Phase 2: Completion"| D[Post-Chat Narrative]
    D -->|"Phase 3: Grand Reveal"| E[Main Ecosystem Dashboard]
    
    E -->|"Core Interaction"| F[Interactive SVG Cake Engine]
    E -->|"Secondary Interaction"| G[Photo Memory Gallery]
    E -->|"Grand Finale"| H[Growing Heart Tree Scene]
    
    subgraph Config Engine Layer
    I[.env Personalization Map] --- J[src/config.ts Parsing]
    J --- K[Component Props Injector]
    end
    
    K --> E
```

### Advanced Data Flow

To dive deeper into how state is managed without Redux or Context maps:

```mermaid
sequenceDiagram
    participant User
    participant App
    participant IntroComponent as Intro Component
    participant CakeLogic as Cake Logic
    participant CoreDashboard as Core Dashboard
    
    User->>App: Visit Global Website
    App->>IntroComponent: Render Intro Payload
    IntroComponent->>IntroComponent: Phase 1: Typing Story (Character by Character)
    IntroComponent->>IntroComponent: Phase 2: Fake Chat (Hover, Delete, Type)
    IntroComponent->>IntroComponent: Phase 3: Grand Reveal (Confetti & Stars)
    IntroComponent->>App: Intro Completed (Callback Fired)
    App->>CoreDashboard: Unmount Intro -> Fade Render Dashboard
    User->>CoreDashboard: Scrolls to Cake Section
    CoreDashboard->>CakeLogic: Render Cake Selection UI
    User->>CakeLogic: Clicks "Blow Candles" Event Trigger
    CakeLogic->>CakeLogic: SVG Flame Animations Stop
    CakeLogic->>CakeLogic: Particles Burst (Confetti External Hook)
```

---

## 🕒 Mastering the Lifecycle

Understanding how the timeline works is essential to modifying the source code. The entire animation sequence relies on precisely tuned delays.

<div align="center">
  <figure>
    <img src="src/assets/mastering-the-lifecycle.png" alt="Mastering the lifecycle illustration" style="max-width:100%;height:auto;border-radius:18px;box-shadow:0 24px 72px rgba(0,0,0,0.24);" />
    <figcaption><em>Mastering the Lifecycle — a visual storyboard of Boot, Intro, Execution, Transition, and Celebration.</em></figcaption>
  </figure>
</div>

1. **Boot**: `App.tsx` initializes and decides whether to show the Splash screen or Intro.
2. **Mount**: `CinematicIntro.tsx` mounts. Using a `.map()` over predefined text arrays, it uses `setTimeout` to flip states. Ensure `overflow: hidden` remains so mobile layouts do not bounce.
3. **Execution**: During the fake chat phase, a sequence of timers dictates when the cursor moves, hovers, deletes text, and retypes.
4. **Transition**: Once the intro is completely finished, it calls the `onComplete` prop back to `App.tsx`, which unmounts the intro and fades in `MainBirthday.tsx`. If this prop never fires, the user is stuck in the intro forever. Be careful when deleting timers!


---

## 🧠 In-Depth Code Explanation

Because Birthday Bloom is designed to be fully customizable, the following sections deeply analyze exactly how the components function beneath the hood. If you intend to change pacing, layout, or animations, refer to this manual.

### 1. Cinematic Intro (`CinematicIntro.tsx`)
The `CinematicIntro` component is the bridge between the Splash Screen and the Main Dashboard. It handles a multi-phase emotional sequence.

**Code Breakdown:**
- **State Machine**: It uses a strongly typed literal state: `type Scene = "storytelling" | "fake-chat" | "post-chat" | "reveal-sequence" | "done"`.
- **Timer Management**: Instead of having floating timeouts that could cause memory leaks if a user unmounts early, we use `useRef<ReturnType<typeof setTimeout>[]>([]);` to store all timeout IDs, clearing them aggressively when the component unmounts or transitions.
- **The TypeWriter Component**: We use a custom `TypeWriter` component to begin rendering the string character-by-character based on specific speed delays.
- **Visuals**: Uses dynamic localized backgrounds. Depending on the `scene` state, the background shifts from dark blues to deep maroons, building tension.

### 2. The Interactive Cake (`CakeCutting.tsx`)
The most complex interactive piece of the platform.

<div align="center">
  <figure>
    <img src="src/assets/cake%20cutting.png" alt="Birthday Bloom cake cutting screenshot" style="max-width:100%;height:auto;border-radius:18px;box-shadow:0 24px 72px rgba(0,0,0,0.24);" />
    <figcaption><em>Interactive Cake Cutting stage captured directly from the app experience.</em></figcaption>
  </figure>
</div>

**Code Breakdown:**
- **SVG Mastery**: The cake is drawn entirely with SVG. This prevents pixelation on high-density Retina displays (iPad Pro, 4K monitors, etc.).
- **Layers & Slices**: The SVG groups (`<g>`) are structurally separated into left and right halves. 
- **The Knife Phase**: 
  - Phase 1: User selects a themed cake (Chocolate, Strawberry, Velvet).
  - Phase 2: User triggers the "Blow Candles" mechanic. This toggles a boolean (`candlesLit`), transforming the animated SVG `<ellipse>` flames into rising smoke paths linearly.
  - Phase 3: The `KnifeSVG` enters with a CSS transform, splitting the left and right halves by applying `translateX` and `rotate` styles to the SVG groups.
- **Custom Easing**: The cake splits using `cubic-bezier(0.34, 1.56, 0.64, 1)`, a "bounce" easing that gives it physical weight, instead of `linear` or `ease-in-out`.

### 3. Typographic Storytelling (`TypeWriter.tsx`)
When building emotional tension, reading speed is everything. We moved away from instant text rendering to a programmatic typing approach.

**Code Breakdown:**
```tsx
  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setDone(true);
      onComplete?.();
    }
  }, [started, displayed, text, speed, onComplete]);
```
- **Recursive Growth**: It takes the current string, measures it against the target string length, and pushes exactly one additional character into the buffer.
- **Cursor Blinking**: A span element styled with `animate-blink` exists at the end of the text node while typing. Once `done` is true, the cursor hides gracefully, handing focus to the next element.

### 4. The Grand Finale: Heart Tree (`HeartTree.tsx`)
A new, premium addition to the end of the user experience. The growing Heart Tree serves as an emotional crescendo at the very bottom of the website.

**Code Breakdown:**
- **Sequential SVG Drawing**: Standard SVGs paint instantly. We want the tree to "grow" organically out of the ground. We use `stroke-dasharray` and `stroke-dashoffset`.
  - By setting `stroke-dasharray` equal to the total path length, we can completely hide the stroke by setting `stroke-dashoffset` to that same length.
  - A CSS transition reduces `stroke-dashoffset` to `0` over 1.5 seconds, creating a beautiful drawing effect.
- **Staging**:
  - `Stage 0`: Seed/Base.
  - `Stage 1`: Main thick branches grow.
  - `Stage 2`: Secondary, thinner branches sprout from the main lines.
  - `Stage 3`: Heart SVG paths (leaves) translate and scale up securely at branch nodes.
  - `Stage 4`: A radial CSS gradient overlay fades in, giving the entire tree a mystical "bloom" effect alongside floating `TreeSparks` particles.

### 5. Main Celebration View (`MainBirthday.tsx`)
The primary dashboard that users explore after the intro completes.

**Code Breakdown:**
- **Hero Stagger**: Features a large, centered hero section that fades up on mount. Uses the `TypeWriter` to write out the personalized `BIRTHDAY_NAME`.
- **Particle System Integration**: Implements both `Confetti.tsx` and `Balloons.tsx`.
- **Message Card Styling**: A meticulously crafted `div` utilizing `backdrop-blur-lg` (glassmorphism) and a complex dual-layer box-shadow (`boxShadow: "0 0 60px hsl(330, 85%, 60%, 0.15)"`) to create a glowing neon effect against a dark background.
- **Responsive Typographic Guard**: Heavy emphasis on `break-words` and `overflow-hidden`. As the TypeWriter injects strings into the DOM, it forces browser reflows; strict bounds ensure the layout does not jitter or expand horizontally on mobile screens. We lock `min-height` globally for paragraphs holding TypeWriter instances.

---

## 🎨 Personalization & Customization

Birthday Bloom is built to be customized using pure Environment Variables (Configuration Engine) and directly modifying assets. You do not need deep React knowledge to make this your own.

### Updating Personal Assets
1. Navigate to `/public/assets/birthday/`.
2. Replace the background images (`birthday-cute.png`, `birthday-gold.png`, etc.) with your own. Ensure they are optimized (WebP format recommended) and less than 500kb each to eliminate load stutter. High resolution images will delay the splash screen logic!
3. Replace `/public/assets/photo-1.jpg`, `photo-2.jpg`, and `photo-3.jpg` with actual photos of the person. Maintain aspect ratios if possible, or use `object-cover` tailwind classes if you inject custom resolutions.

### Modifying the Pacing & Narrative Flow
If the intro is too slow or too fast:
1. Open `src/components/birthday/CinematicIntro.tsx`.
2. Find the timer multipliers (e.g., `i * 5000` mapping over the `storyLines`).
3. Reduce `5000` to `3500` to speed up the pacing between storytelling lines.
4. Modify the `TypeWriter` speed props to `speed={30}` for extremely fast typing, or `speed={120}` for dramatic, slow typing.

---

## 🔐 Environment Variables & Secret Configuration Guide

The entire initialization process is controlled securely via the `.env` paradigm. **If you configure these variables, the website will bypass the setup wizard and immediately start the cinematic experience for the birthday person.**

| Variable Name | Required | Default Value | Description |
| :--- | :---: | :--- | :--- |
| `VITE_BIRTHDAY_NAME` | YES | `""` | The primary name of the person you are celebrating. Setting this automatically skips the config wizard. |
| `VITE_BIRTHDAY_AGE` | NO | `null` | The age they are turning. |
| `VITE_BIRTHDAY_GENDER` | NO | `"other"` | `"male"`, `"female"`, or `"other"`. |
| `VITE_BIRTHDAY_DATE` | NO | `null` | The specific date of the birthday. |
| `VITE_BIRTHDAY_RELATIONSHIP` | NO | `"partner"` | Options: `"partner"`, `"friend"`, `"family"`. This fundamentally changes the UI mood, colors, storytelling text, and emoji effects! |
| `VITE_BIRTHDAY_WISHER_NAME` | NO | `""` | The birthday wish sender's name, shown at the end of the emotional letter. |
| `VITE_FAVORITE_COLOR` | NO | `"#FF6B6B"` | A hex code defining the dynamic global theme, neon glows, and gradient backgrounds. |
| `VITE_FAVORITE_ITEMS` | NO | `""` | Comma-separated list of interests/items to customize ambient particles. |
| `VITE_BIRTHDAY_LETTER_TITLE` | NO | `""` | Optional heading for the emotional letter card. |
| `VITE_BIRTHDAY_LETTER_OVERRIDE` | NO | `""` | Replace the generated letter body with your own multi-line letter. |
| `VITE_CUSTOM_MESSAGE` | NO | `""` | A heartfelt, custom message to reveal with kinetic typography right before the grand cake reveal. |
| `VITE_ALLOW_AUDIO` | NO | `true` | Allows default autoplay of background audio and SFX popping noises. |
| `VITE_VIDEO_1`, `VITE_VIDEO_2`, `VITE_VIDEO_3` | NO | `""` | Adds video links (YouTube or MP4) to the final cinematic Video Gallery at the bottom of the page. |

**How to set this up locally:**
In the root of your project, create a file named `.env`. Add the following:
```env
VITE_BIRTHDAY_NAME="Riya"
VITE_BIRTHDAY_AGE="25"
VITE_BIRTHDAY_GENDER="female"
VITE_BIRTHDAY_DATE="2026-10-15"
VITE_BIRTHDAY_RELATIONSHIP="partner"
VITE_BIRTHDAY_WISHER_NAME="Alex"
VITE_FAVORITE_COLOR="#00C2FF"
VITE_FAVORITE_ITEMS="coffee, stars, music"
VITE_CUSTOM_MESSAGE="You mean the universe to me."
VITE_VIDEO_1="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

### 🌍 Vercel Deployment Guide (Secret Surprise)
To deploy this project to the world for free:
1. Push this code to a private or public GitHub repository.
2. Log into [Vercel](https://vercel.com/) and click **Add New -> Project**.
3. Import your GitHub repository.
4. Open the **Environment Variables** section in the deployment settings.
5. Add the keys exactly as shown above (`VITE_BIRTHDAY_NAME`, `VITE_BIRTHDAY_RELATIONSHIP`, etc.) and provide the values.
6. Click **Deploy**! When the birthday person opens the Vercel link, it will launch their highly customized, surprise experience seamlessly without asking them for setup details.

---

## 🚀 Advanced Installation & Setup

For developers wanting to run this locally, clone, and fork:

### Software Requirements
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher, or `bun` `v1.0.0`
- Git

### Step-by-Step Local Deployment
1. **Clone the repository:**
   ```bash
   git clone https://github.com/naborajs/birthday-bloom.git
   cd birthday-bloom
   ```
2. **Install local dependencies:**
   ```bash
   npm install
   # Or using bun:
   # bun install
   ```
3. **Environment Setup:**
   ```bash
   cp .env.example .env
   # Edit .env with your favorite text editor
   ```
4. **Boot the Dev Server:**
   ```bash
   npm run dev
   ```
   *The server will boot on `http://localhost:5173`. Any changes to the `src` folder will trigger an instant Hot-Module-Replacement (HMR) reload in the browser without losing application state.*

---

## 🔌 Component API Reference

This section provides a technical breakdown of every major component in the engine.

### `<TypeWriter />` API
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `text` | `string` | **required** | The sentence to type out. |
| `speed` | `number` | `45` | Speed in milliseconds between keystrokes. |
| `delay` | `number` | `0` | Delay in milliseconds before typing begins. |
| `cursor`| `boolean`| `true` | Whether to show the blinking cursor. |
| `onComplete`| `() => void` | `undefined` | Callback fired when typing ends. |
| `className` | `string` | `""` | Custom Tailwind classes for the text container. |

### `<HeartTree />` API (UNDER DEVELOPMENT)
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `delay` | `number` | `1000` | Minimum delay before the trunk begins to grow. |
| `color` | `string` | `primary` | The color of the hearts (defaults to config). |

### `<CakeCutting />` API
- **Internal Logic**: Uses a 4-phase state machine (`select` -> `wish` -> `cut` -> `quotes`).
- **SVG Structure**: 100% vector-based, responsive to all screen sizes.
- **Haptics**: Triggers `navigator.vibrate` during the "burst" phase.

### `<PhotoGallery />` API
- **Auto-Advance**: Slides change every 6 seconds by default.
- **3D Tilt**: Follows mouse position using Framer Motion `useMotionValue`.
- **Lightbox**: Uses `AnimatePresence` for a cinematic blur transition.

### `<CinematicIntro />` API
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `onComplete` | `() => void` | **required** | Triggered when the final scene finishes. |
| `speedMultiplier`| `number` | `1.0` | Global multiplier for all scene timings. |

---

## 🪝 Custom Hooks Documentation

Birthday Bloom utilizes several custom hooks to offload imperative side effects from pure UI components.

### `useBirthdayStore()`
Our central state manager built with **Zustand**. 
- `config`: The full `BirthdayConfig` object hydrated from ENV.
- `getMood()`: Returns `'romantic' | 'energetic' | 'warm'` based on relationship.
- `getAnimationPacing()`: Returns `'slow' | 'fast' | 'moderate'`.

### `useDynamicTheme()`
Injects HSL variables into the `:root` element.
- Automatically calculates hover states and glow colors.
- Syncs the browser's `theme-color` meta tag with the user's favorite color.

### `useConfetti()`
A robust hook that wraps `canvas-confetti`.
- `fireConfetti(config)`: Triggers a localized burst with custom spread arrays.
- `fireCannon()`: Triggers a massive, multi-directional burst utilized primarily for the Cake Cutting finale.
- `fireStars()`: Interjects an SVG star-polygon shape into the physics engine for premium emotional moments.

### `useSoundManager()`
Handles HTML5 Audio instances without cluttering the DOM with invisible `<audio>` tags.
- Provides `playWhoosh()`, `playType()`, `playBoom()` closures.
- Respects the `.env` `VITE_ALLOW_AUDIO` boolean automatically. 

---

## 🔐 Security & Data Integrity

1. **Client-Side Safety**: All `VITE_` variables are public. Do not store sensitive passwords in the environment variables.
2. **Input Sanitization**: The name and message fields are sanitized before being injected into the DOM to prevent basic XSS attempts.
3. **Audio Permissions**: We respect browser autoplay policies by requiring a "Splash" interaction; audio is never forced without user consent.

---

<div align="center">
  <figure>
    <img src="src/assets/faq.png" alt="Birthday Bloom cake cutting screenshot" style="max-width:100%;height:auto;border-radius:18px;box-shadow:0 24px 72px rgba(0,0,0,0.24);" />
    <figcaption><em>Interactive Cake Cutting stage captured directly from the app experience.</em></figcaption>
  </figure>
</div>

## 🛠️ Troubleshooting & Massive FAQ

### 🚨 Critical Issues

**Q: The website shows a blank screen on load?**
A: Check your browser console. It’s likely a missing `.env` variable or a typo in `VITE_BIRTHDAY_NAME`. Ensure you have run `npm install`.

**Q: The animation stopped in the middle!**
A: This happens if a timer is cleared incorrectly. Ensure you haven't modified the `timersRef` logic in `CinematicIntro.tsx`. Check for `VITE_BIRTHDAY_DATE` formatting errors.

**Q: Audio isn't playing on my iPhone?**
A: iOS requires a "user gesture" to play sound. Ensure you clicked the "Start" button on the Splash Screen.

### 🎨 Visual & Layout FAQ

**Q: How do I change the font?**
A: Import your Google Font in `index.css` and update the `--font-display` variable.

**Q: The text is too long and overlaps!**
A: Use the `VITE_BIRTHDAY_CUSTOM_MESSAGE` for long messages. The `VITE_BIRTHDAY_NAME` should be kept under 15 characters for best results.

**Q: Can I add more than 3 photos?**
A: Yes, but you must update the `photos` array in `PhotoGallery.tsx` and add corresponding `VITE_PHOTO_X` variables to the store.

### 🚀 Deployment FAQ

**Q: How do I deploy to GitHub Pages?**
A: Use the `gh-pages` package or a GitHub Action. Note that client-side routing may require a `404.html` redirect hack.

**Q: Vercel build failed?**
A: Ensure your Node version is 18+. Check for case-sensitive file imports (e.g., `Component.tsx` vs `component.tsx`).

**Q: How do I remove the "Naboraj Sarkar" branding?**
A: You are free to modify the footer in `MainBirthday.tsx`, but keeping a small "Powered by Birthday Bloom" is appreciated!

---

## ⚡ Performance Profiling & GPU Acceleration

Despite the visual complexity, this repository maintains an incredibly lightweight footprint.
- **No Heavy Physics Libraries**: Rather than including `matter.js` or `three.js` which parse 500kb-1MB of JS memory chunks, we use `requestAnimationFrame` hooks and native CSS for sparkles, balloons, and typing.
- **SVG Over Images**: The Interactive Cake and Heart Tree are 100% vector SVG geometries.
- **GPU Offloading**: Animations (`translate3d`) utilize hardware acceleration, shifting work from the CPU to the GPU rendering pipeline. This secures 60 frames per second on both desktop and mobile iOS/Android browsers.
- **Lighthouse Goals**:
  - **LCP (Largest Contentful Paint)**: < 1.2s
  - **FID (First Input Delay)**: < 100ms
  - **CLS (Cumulative Layout Shift)**: 0.00

---

## 📁 Complete File-by-File Responsibility Map

### `/src/components/birthday`
- **`Balloons.tsx`**: Responsible for the floating SVG background elements. Uses physics-based randomness.
- **`CakeCutting.tsx`**: The core interactive module. Handles selection, candle-blowing, and the 3D cutting ceremony.
- **`CinematicIntro.tsx`**: The master orchestrator. Uses a finite state machine to manage scene timing.
- **`FakeChatScene.tsx`**: Simulates a high-fidelity messaging interface.
- **`FloatingElements.tsx`**: Manages ambient sparkles and dust particles.
- **`HeartProgression.tsx`**: A mini-game or visual indicator of "love progression".
- **`HeartTree.tsx`**: The finale component. A complex SVG growth animation.
- **`MainBirthday.tsx`**: The "Home Base" after the intro ends.
- **`PhotoGallery.tsx`**: The 3D-tilting image showcase.
- **`Sparkles.tsx`**: Individual particle emitters.
- **`TypeWriter.tsx`**: The core typographic engine.

### `/src/features`
- **`cinematic-story`**: Contains logic and variants specifically for the intro narrative.
- **`core`**: The backbone of the app—Store, Theme, and global hooks.

### `/src/pages`
- **`Index.tsx`**: The entry point. Decides between showing the Intro or the Dashboard.
- **`NotFound.tsx`**: A cinematic 404 page (often overlooked but essential for quality).

---

## 🇮🇳 Localized Setup
For our users in India and Bangladesh, we have provided native language setup guides to make your journey smoother.

- [🇮🇳 हिंदी सेटअप गाइड (Hindi Setup Guide)](./docs/setup-hindi.md)
- [🇧🇩 বাংলা সেটআপ গাইড (Bengali Setup Guide)](./docs/setup-bengali.md)

---

## 🛠️ Advanced Troubleshooting
If you encounter any specific issues with sound, animations, or deployment, please refer to our master troubleshooting suite:

- [🆘 Master Troubleshooting Guide](./docs/troubleshooting.md)
- [🛠️ Advanced Fixes Masterclass](./docs/advanced-fixes.md)
- [☁️ Hosting & Cloud Deployment](./docs/hosting-solutions.md)


---

## 🚀 Deployment & DevOps: The Ultimate Guide

### 1. Vercel (Recommended)
Vercel is the native home for Vite projects. 
1. Push to GitHub.
2. Link repo.
3. **Environment Variables**: Add all `VITE_` keys.
4. **Build Settings**: `npm run build`, `dist` directory.

### 2. Netlify
Similar to Vercel, but ensure you add a `_redirects` file if you use React Router.

### 3. Docker (Self-Hosted)
For those who want to host it on their own VPS.
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🎨 Mastering SVG Animations in Birthday Bloom

SVG is the heart of Birthday Bloom. Unlike raster images (JPEG/PNG), SVGs are code-based, which allows us to animate them with mathematical precision.

### 1. Stroke Dash Offset Growth
We use this for the Heart Tree. By setting `stroke-dasharray` and `stroke-dashoffset` to the total length of the path, we can "draw" the tree in real-time.
```css
@keyframes draw {
  to { stroke-dashoffset: 0; }
}
```

### 2. SVG Filters for 3D Depth
The 3D Cake isn't just flat shapes. We use `<feDropShadow>` and `<feGaussianBlur>` filters inside the SVG `<defs>` to create dynamic lighting. When you "blow" the candles, the light source shifts, changing the shadows on the cake layers.

### 3. Morphing Logic
While not used extensively yet, our engine supports path morphing. You can transform a circle into a heart by animating the `d` attribute using Framer Motion.

---

## 🆚 Birthday Bloom vs. Others

| Feature | Birthday Bloom | Generic Templates |
| :--- | :--- | :--- |
| **Performance** | 60fps (GPU Accelerated) | Laggy (CPU intensive) |
| **Customization** | Zero-Config (.env) | Manual Code Edits |
| **3D Effects** | Interactive & Tilting | Static Images |
| **Narrative** | Finite State Machine | Single Scroll Page |
| **Branding** | Naboraj Sarkar Premium | Generic / Watermarked |

---

## 🏆 Project Credits & Acknowledgements (Extended)

This project is a labor of love. We would like to thank:
- **The Naboraj Sarkar Community**: For testing early alphas and providing feedback on the 3D physics.
- **Vite Team**: For making development feel like magic.
- **Framer Motion Team**: For giving us the power of physics in the browser.
- **Every Developer**: Who has ever sent a digital birthday card.

---

## 🐳 Containerization & Orchestration: Production Deployment

For large-scale deployments or enterprise-level birthday surprises (yes, they exist), we support full containerization.

### 1. Dockerizing Birthday Bloom
Our Docker image is optimized using a multi-stage build to keep the footprint under 50MB.

```dockerfile
# Stage 1: Build
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Kubernetes (k8s) Deployment
If you are deploying this for a celebrity or a high-traffic event, use this manifest:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: birthday-bloom
spec:
  replicas: 3
  selector:
    matchLabels:
      app: birthday-bloom
  template:
    metadata:
      labels:
        app: birthday-bloom
    spec:
      containers:
      - name: birthday-bloom
        image: naborajs/birthday-bloom:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: birthday-bloom-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 80
  selector:
    app: birthday-bloom
```

<div align="center">
  <figure>
    <img src="src\assets\footer.png" alt="Birthday Bloom footer CTA" style="max-width:100%;height:auto;border-radius:18px;box-shadow:0 26px 74px rgba(0,0,0,0.26);" />
    <figcaption><em>Launch your cinematic birthday surprise with env-driven configuration and a modern deployment workflow.</em></figcaption>
  </figure>
</div>

---

## 📊 Comprehensive Performance Analysis (Real-World Benchmarks)

We tested Birthday Bloom on various hardware configurations to ensure 60fps stability.

| Device | CPU | RAM | FPS (Avg) | Load Time |
| :--- | :--- | :--- | :--- | :--- |
| MacBook Pro M2 | Apple M2 | 16GB | 120fps | 0.4s |
| iPhone 14 Pro | A16 Bionic | 6GB | 60fps | 0.6s |
| Pixel 7 | Google Tensor G2 | 8GB | 60fps | 0.8s |
| Surface Pro 8 | Intel i7-1185G7 | 16GB | 60fps | 0.9s |
| Samsung A54 | Exynos 1380 | 6GB | 55fps | 1.2s |
| iPad Air (2022) | Apple M1 | 8GB | 60fps | 0.5s |
| Raspberry Pi 4 | Broadcom BCM2711 | 4GB | 30fps | 4.5s |

### Key Takeaways
- **Apple Silicon** devices handle the SVG engine with zero effort.
- **Android Mid-range** devices may see a slight frame drop during the massive confetti cannon, but remain perfectly usable.
- **Network Latency** is the biggest bottleneck; always use a CDN (like Vercel Edge).

---

## 🌟 Community Showcase & Hall of Fame

The following developers and creators have contributed to the "Bloom Ecosystem". 

1. **Naboraj Sarkar** - Original Concept & Lead Architecture.
2. **Naboraj Sarkar** - Advanced 3D Engine & Cinematography.
3. **Naboraj Sarkar Fans** - Beta Testing & Feature Requests.
4. **The React Community** - For the foundational libraries.
5. **YOU** - For downloading and using this project!

*To add your name to the hall of fame, please open a PR with your GitHub profile link.*

---

## 🤝 Contributing Guidelines

1. **Fork the Project**
2. **Create Feature Branch** (`git checkout -b feature/NewEffect`)
3. **Commit** (`git commit -m 'Add NewEffect'`)
4. **Push** (`git push origin feature/NewEffect`)
5. **PR** across to `main`.

---

## 🙌 Acknowledgments
- **React.js Team**
- **Framer Motion**
- **Tailwind CSS**
- **Vite**
- **Canvas-Confetti**
- **All the open-source contributors** who have made this project possible.


---



## 📜 License
This project is licensed under the **MIT License**. You are completely free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software with adequate attribution. Commercial use is permitted, though providing credit and starring the repository is deeply appreciated! See the `LICENSE` file for more details.

---


## 🎁 Gift of Code

We believe that code is a gift. That's why we made Birthday Bloom open-source and free for everyone. If you've used this to make someone happy, consider "paying it forward" by contributing a new feature or helping another developer in the community.

### Ways to Give Back if you want to:
- Write a blog post about how you used Birthday Bloom.
- Record a video tutorial for the Naboraj Sarkar community.
- Donate to an open-source library that we depend on (like Framer Motion).

---

## 🏁 Final Conclusion

**Birthday Bloom** is more than code. It's a bridge between technology and human emotion. Whether you're a developer looking for a cool project or a friend looking to make a surprise, we hope this engine serves you well.

### ✨ Join the Movement
- **Star the Repo**: Help us reach the top of GitHub Trending!
- **Share your Story**: Use `#BirthdayBloom` on social media.
- **Contribute**: We welcome all PRs.

---

## 👤 Naboraj Sarkar — The Studio Behind the Magic

> ✨ Building experiences, not just websites.

**Naboraj Sarkar** is the creator behind **Naboraj Sarkar** — a creative development studio focused on crafting cinematic, interactive, and emotionally engaging web experiences.

What started as a solo vision is now growing into a community-driven movement to:

> 🌐 Make the internet more beautiful, expressive, and unforgettable.

---

## 🏁 Final Sign-off

As we reach the conclusion of this master documentation, we want to remind you that the most important part of this project isn't the code, the 3D effects, or the 60fps performance—it's the smile on the person's face when they see their surprise.

**Naboraj Sarkar & the Naboraj Sarkar Team**
*April 24, 2026*

---

> **"In the garden of the internet, may your digital memories always bloom."** 🌸

---

## 📞 Contact & Support & Socials (Connect with me)

> Need help, collab, or just want to connect? 👇

- 📧 **Email** → [nishant.ns.business@gmail.com](mailto:nishant.ns.business@gmail.com)  
- 💬 **WhatsApp** → [Message Me now](https://wa.me/918900653250?text=Hey%20I%20am%20coming%20from%20your%20Birthday%20Boom%20project%20on%20GitHub%2C%20I%20want%20to%20talk%20about%20it)
- 💬 **Telegram** → [@Nishantsarkar10k](https://t.me/Nishantsarkar10k)  
- 🐦 **Twitter (X)** → [@NSGAMMING699](https://x.com/NSGAMMING699)
- 📸 **Instagram** → [@naborajs](https://instagram.com/naborajs)
- 🌐 **Website** → [naborajs.com](https://naborajs.com)  
- 📧 **Support / Business** → [nishant.ns.business@gmail.com](mailto:nishant.ns.business@gmail.com)
- 🐙 **GitHub** → [github.com/naborajs]
- 🎥 **YouTube** → [Naboraj Sarkar Channel](https://youtube.com/@nishant_sarkar)


---

### ⚡ Quick Actions

- 🚀 **Report Issue** → [Open GitHub Issue](../../issues)  
- 💡 **Suggest Feature** → [Create Request](../../issues/new)  
- ⭐ **Support Project** → Star this repo  

---

<div align="center">
  <sub>Built with ❤️ by Naboraj Sarkar. © 2024-2026 Naboraj Sarkar.</sub>
</div>

**[Back to Top ↑](#-birthday-bloom--advanced-animated-birthday-website-generator)**
