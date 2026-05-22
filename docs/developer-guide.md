# Developer Guide

This guide explains how the project is wired so a new contributor can make changes confidently.

Repo: [naborajs/birthday-bloom](https://github.com/naborajs/birthday-bloom)

## Folder Structure

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | App shell and routes. |
| `src/pages/Index.tsx` | Top-level birthday experience orchestration. |
| `src/components/birthday` | Visual and interactive birthday sections. |
| `src/components/ui` | Shared shadcn/Radix UI primitives. |
| `src/features/core/store` | Zustand store and personalization logic. |
| `src/features/core/models` | TypeScript schemas, validators, and family templates. |
| `src/features/core/theme` | Dynamic theme token injection. |
| `src/config` | Runtime fallback config and emotional content templates. |
| `docs` | User, developer, deployment, env, and migration documentation. |

## Component Responsibilities

| Component | What It Does |
| --- | --- |
| `MainBirthday` | Renders the main experience, gates sections from env, and handles celebration interactions. |
| `PhotoGallery` | Reads env/store photos and captions, displays the gallery and lightbox. |
| `VideoGallery` | Renders video memories from `VITE_VIDEO_1..3`. |
| `CakeCutting` | Interactive cake section controlled by `VITE_SHOW_CAKE_SECTION`. |
| `BirthdayQuiz` | Relationship and interest-aware quiz section. |
| `HeartTree` | Final emotional visual section controlled by `VITE_SHOW_HEART_TREE_SECTION`. |
| `FinalSurprise` | Closing memory/video section controlled by `VITE_SHOW_FINAL_SURPRISE`. |

## State Flow

`useBirthdayStore.ts` parses env once at module load and exposes:

- `config`
- `isConfigured`
- `setConfig`
- `completeConfiguration`
- `getAnimationPacing`
- `getMood`

Components should read from the store instead of reading `import.meta.env` directly. This keeps env parsing in one place.

## Validation System

Use:

- `ConfigValidator.validate()` for app-level config checks.
- `ConfigValidator.sanitize()` to clean unsafe or malformed config.
- `validateFamilyMemberProfile()` for family profiles.

## Extension Rules

- Treat env as the first customization layer. Names, colors, media, section visibility, relationship choice, family metadata, animation, and accessibility should be changed in `.env.local` or hosting env secrets before editing source.
- Add new env variables in `useBirthdayStore.ts`.
- Add docs in [ENV_GUIDE.md](./ENV_GUIDE.md).
- If the value controls rendering, wire it through `config`.
- If the value is family-specific, prefer `familyTemplates.ts` over ad hoc objects.
- Keep old exports and env aliases when possible.

## AI Agent Rule

When an AI coding agent works on this repo, it should not immediately rewrite components for personalization requests. It should first map the request to env values using `.env.example` and [ENV_GUIDE.md](./ENV_GUIDE.md).

Good first answer:

```text
This project already supports that through env values. I will update the relevant `.env.local` keys first, and only edit source code if the requested behavior is not covered.
```

Code edits are appropriate for new features, new visual sections, new schema fields, or behavior that is not currently exposed through env.

## Testing

Run:

```bash
npm.cmd run test
npm.cmd run build
```

Use `npm run ...` on shells that allow npm scripts directly.
