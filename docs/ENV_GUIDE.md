# Complete Env Customization Guide

Birthday Bloom is env-first. You should be able to change names, relationship type, messages, colors, media, sections, animation behavior, accessibility, and family-template metadata from `.env.local` without editing component code.

Repo: [naborajs/birthday-bloom](https://github.com/naborajs/birthday-bloom)

## What "Env" Means Here

In this project, "env" means environment variables.

Locally, those values usually live in:

```text
.env.local
```

On hosting platforms, they usually live in the provider dashboard:

- Vercel: Project Settings -> Environment Variables
- Netlify: Site configuration -> Environment variables
- AWS Amplify: App settings -> Environment variables

Some users were changing the full codebase just to rename the birthday person, replace photos, hide sections, or switch Brother to Sister/Father/Mother. That is not needed for normal customization. Birthday Bloom is designed so those changes happen through env values first.

Use code edits only when you are adding new behavior that does not already exist.

## Instruction For AI Coding Agents

If a user asks an AI coding agent to customize this project, the agent should first check whether the request can be solved with env values.

Recommended agent response before editing code:

> Birthday Bloom is already ready for this customization. You can update the environment variables instead of changing the app code. I will first map your requested changes to `.env.local` keys using `.env.example` and `docs/ENV_GUIDE.md`. I will edit source code only if the requested behavior is not supported by env.

Examples:

| User Request | First Action |
| --- | --- |
| "Change the name to Priya" | Set `VITE_BIRTHDAY_NAME=Priya` |
| "Make this for my sister" | Set `VITE_BIRTHDAY_RELATIONSHIP=sister` and `VITE_FAMILY_MEMBER_TYPE=sister` |
| "Use my own photos" | Set `VITE_PHOTOS` or `VITE_PHOTO_1..6` |
| "Hide the quiz" | Set `VITE_SHOW_QUIZ_SECTION=false` |
| "Make it calmer for grandma" | Set `VITE_REDUCED_MOTION=true`, `VITE_TEXT_SIZE=large`, `VITE_PARTICLE_COUNT=8` |
| "Add a brand-new section type" | Code change may be needed |

Start here:

- [Quick start](../QUICK_START.md)
- [Family system](./family-system.md)
- [Template architecture](./template-architecture.md)
- [Developer guide](./developer-guide.md)
- [Migration guide](./migration-guide.md)
- [Troubleshooting](./troubleshooting.md)

## How Env Works

Vite exposes browser-safe variables that start with `VITE_`.

Priority order:

1. `.env.local` values
2. Deployed host environment variables
3. `src/config.ts` fallback values
4. Built-in defaults

After changing `.env.local`, restart the dev server.

```bash
npm run dev
```

PowerShell users can run:

```bash
npm.cmd run dev
```

## Core Identity

| Variable | Type | Example | Purpose |
| --- | --- | --- | --- |
| `VITE_BIRTHDAY_NAME` | string | `Riya` | Main displayed name. Setting it personalizes the whole app. |
| `VITE_BIRTHDAY_AGE` | number | `25` | Shows `Happy 25th Birthday` and helps docs/examples choose age tone. |
| `VITE_BIRTHDAY_GENDER` | enum | `female` | Supports `male`, `female`, `other`. |
| `VITE_BIRTHDAY_DATE` | date | `2026-10-15T00:00:00` | Birthday date in ISO format. |
| `VITE_BIRTHDAY_RELATIONSHIP` | enum/string | `sister` | Drives mood and relationship-aware content. |
| `VITE_BIRTHDAY_WISHER_NAME` | string | `Alex` | Adds the sender name to the letter signoff. |

Supported relationship values:

`partner`, `friend`, `family`, `sibling`, `brother`, `sister`, `father`, `mother`, `grandfather`, `grandmother`, `uncle`, `aunt`, `cousin`, `son`, `daughter`, `guardian`, `colleague`, `mentor`.

## Message And Theme

| Variable | Type | Example | Purpose |
| --- | --- | --- | --- |
| `VITE_BIRTHDAY_CUSTOM_MESSAGE` | string | `You mean the world to me.` | Main message in the letter card. |
| `VITE_BIRTHDAY_LETTER_TITLE` | string | `A Letter For You` | Letter section heading. |
| `VITE_BIRTHDAY_LETTER_OVERRIDE` | escaped string | `Dear Riya,\n\nHappy birthday...` | Full custom letter body. Use `\n` for new lines. |
| `VITE_BIRTHDAY_COLOR` | hex | `#FF69B4` | Primary accent color for buttons, glows, and cards. |
| `VITE_THEME` | enum | `romantic` | Theme hint for examples and config. |
| `VITE_BIRTHDAY_INTERESTS` | CSV/list | `music,coding,travel` | Drives icons, quiz content, gift code, and emoji choices. |
| `VITE_FAVORITE_EMOJIS` | CSV/list | `party,sparkle,star` | Adds custom burst emojis when the user taps interactive elements. |

Theme values:

`romantic`, `fun`, `energetic`, `elegant`, `playful`, `nostalgic`.

## Photos

Use `VITE_PHOTOS` for unlimited photo URLs:

```env
VITE_PHOTOS=https://example.com/one.jpg|https://example.com/two.jpg|https://example.com/three.jpg
VITE_PHOTO_CAPTIONS=First memory|Favorite trip|Best smile
```

For simple setups, use numbered variables:

```env
VITE_PHOTO_1=https://example.com/one.jpg
VITE_PHOTO_2=https://example.com/two.jpg
VITE_PHOTO_3=https://example.com/three.jpg
VITE_PHOTO_CAPTIONS=First memory|Favorite trip|Best smile
```

`VITE_PHOTOS` wins when it is set. Numbered photos are easier for Vercel and Netlify dashboards.

## Videos And Audio

| Variable | Type | Purpose |
| --- | --- | --- |
| `VITE_VIDEO_1`, `VITE_VIDEO_2`, `VITE_VIDEO_3` | URL | Adds memory videos to the video gallery. YouTube, MP4, and WebM are supported. |
| `VITE_FINAL_VIDEO_URL` | URL | Adds a closing video in the final surprise. |
| `VITE_SOUND_URL` | URL | Background music URL. |
| `VITE_BGM_URL` | URL | Backward-compatible background music alias. |
| `VITE_SONG_URL` | URL | Optional audio-system song URL. |
| `VITE_VOICE_MESSAGE_URL` | URL | Optional voice message URL. |
| `VITE_SOUND_EFFECTS` | boolean | Enables or disables sound effects. |

## Sections

Every major rendered section has an env switch.

| Variable | Default | Controls |
| --- | --- | --- |
| `VITE_SHOW_PHOTO_SECTION` | `true` | Photo gallery |
| `VITE_SHOW_QUIZ_SECTION` | `true` | Birthday quiz |
| `VITE_SHOW_GIFT_SECTION` | `true` | Hidden gift code |
| `VITE_SHOW_HEART_TREE_SECTION` | `true` | Heart tree |
| `VITE_SHOW_VIDEO_SECTION` | `true` | Video gallery |
| `VITE_SHOW_CAKE_SECTION` | `true` | Cake cutting |
| `VITE_SHOW_FINAL_SURPRISE` | `true` | Final message/video |
| `VITE_SHOW_SKIP_BUTTON` | `true` | Intro skip button |

Boolean values can be `true`, `false`, `1`, `0`, `yes`, `no`, `on`, or `off`.

## Animation And Accessibility

| Variable | Values | Recommended Use |
| --- | --- | --- |
| `VITE_ANIMATION_SPEED` | `slow`, `moderate`, `fast` | Slow for romantic/family, fast for energetic friends. |
| `VITE_ANIMATION_INTENSITY` | `low`, `medium`, `high` | Lower this for older phones. |
| `VITE_PARTICLE_COUNT` | number | Use `8-15` on mobile, `25-60` for desktop. |
| `VITE_REDUCED_MOTION` | boolean | Use `true` for motion-sensitive users. |
| `VITE_TEXT_SIZE` | `small`, `normal`, `large` | Use `large` for parents/grandparents. |
| `VITE_HIGH_CONTRAST` | boolean | Use `true` when readability matters more than subtle styling. |

## Special Memories

Format:

```env
VITE_SPECIAL_MEMORIES=First celebration;https://example.com/one.jpg|Favorite trip;https://example.com/two.jpg
```

Each item is `text;imageUrl`. Separate multiple memories with `|`.

## Family Template Env

The family system can be bootstrapped from env.

| Variable | Example | Purpose |
| --- | --- | --- |
| `VITE_FAMILY_MEMBER_TYPE` | `sister` | Selects a family template. |
| `VITE_FAMILY_PREFERRED_NAME` | `Pri` | Preferred display name. |
| `VITE_FAMILY_NICKNAMES` | `Pri,Star` | Comma-separated nicknames. |
| `VITE_FAMILY_RELATIONSHIP_LABEL` | `Younger Sister` | Human label for the relationship. |
| `VITE_FAMILY_CLOSENESS` | `9` | Closeness from 1 to 10. |
| `VITE_FAMILY_YEARS_KNOWN` | `24` | Years of shared history. |
| `VITE_FAMILY_SIDE` | `maternal` | `maternal`, `paternal`, `both`, `chosen`, `unknown`. |
| `VITE_FAMILY_PRIVACY` | `family` | `public`, `family`, or `private`. |
| `VITE_FAMILY_ALLOW_EXPORT` | `true` | Allows future export flows. |

For full control, paste a complete JSON profile:

```env
VITE_FAMILY_PROFILE_JSON={"schemaVersion":"3.0.0","id":"sister-1","memberType":"sister","basicInfo":{"fullName":"Priya","nicknames":["Pri"],"gender":"female","ageGroup":"young-adult"}}
```

Use JSON only when you need every field. For normal projects, use the simpler family variables.

## Cinematic Password Unlock (v3.1)

You can protect the birthday surprise using a cinematic frosted-glass password lock.

| Variable | Type | Default | Purpose |
| --- | --- | --- | --- |
| `VITE_PASSWORD_REQUIRED` | boolean | `false` | Force enables the password lock page. |
| `VITE_PASSWORD` | string | `""` | Set a manual password override (e.g. `love` or `1234`). |
| `VITE_PASSWORD_HINT` | string | `""` | Customized emotional hint displayed if the user gets stuck. |
| `VITE_PASSWORD_FORMAT` | enum | `MMDD` | Format to auto-generate password from `VITE_BIRTHDAY_DATE` if `VITE_PASSWORD` is not set. |

Supported `VITE_PASSWORD_FORMAT` values:
- `MMDD` (default, e.g. `0424` for April 24th)
- `DDMM` (e.g. `2404` for April 24th)
- `YYYYMMDD` (e.g. `20010424`)
- `YYYY-MM-DD` (e.g. `2001-04-24`)
- `MM-DD` (e.g. `04-24`)
- `DD-MM` (e.g. `24-04`)
- `YYYY` (e.g. `2001`)

## Situation Recipes

### Romantic Partner

```env
VITE_BIRTHDAY_NAME=Riya
VITE_BIRTHDAY_AGE=25
VITE_BIRTHDAY_GENDER=female
VITE_BIRTHDAY_RELATIONSHIP=partner
VITE_BIRTHDAY_COLOR=#FF4F8B
VITE_THEME=romantic
VITE_ANIMATION_SPEED=slow
VITE_BIRTHDAY_INTERESTS=music,coffee,travel
VITE_BIRTHDAY_CUSTOM_MESSAGE=You make ordinary days feel like magic.
```

### Best Friend

```env
VITE_BIRTHDAY_NAME=Alex
VITE_BIRTHDAY_RELATIONSHIP=friend
VITE_BIRTHDAY_COLOR=#00C2FF
VITE_THEME=fun
VITE_ANIMATION_SPEED=fast
VITE_PARTICLE_COUNT=40
VITE_BIRTHDAY_INTERESTS=gaming,music,food
VITE_FAVORITE_EMOJIS=party,fire,star
```

### Sister

```env
VITE_BIRTHDAY_NAME=Priya
VITE_BIRTHDAY_RELATIONSHIP=sister
VITE_FAMILY_MEMBER_TYPE=sister
VITE_FAMILY_PREFERRED_NAME=Pri
VITE_FAMILY_RELATIONSHIP_LABEL=Younger Sister
VITE_FAMILY_CLOSENESS=10
VITE_BIRTHDAY_COLOR=#FF69B4
VITE_THEME=playful
```

### Father Or Mother

```env
VITE_BIRTHDAY_NAME=Dad
VITE_BIRTHDAY_RELATIONSHIP=father
VITE_FAMILY_MEMBER_TYPE=father
VITE_FAMILY_RELATIONSHIP_LABEL=Father
VITE_BIRTHDAY_COLOR=#4A90E2
VITE_THEME=elegant
VITE_TEXT_SIZE=large
VITE_ANIMATION_INTENSITY=medium
```

### Grandparent Or Low Motion

```env
VITE_BIRTHDAY_NAME=Grandma
VITE_BIRTHDAY_RELATIONSHIP=grandmother
VITE_FAMILY_MEMBER_TYPE=grandmother
VITE_BIRTHDAY_COLOR=#D4AF37
VITE_THEME=elegant
VITE_TEXT_SIZE=large
VITE_REDUCED_MOTION=true
VITE_ANIMATION_INTENSITY=low
VITE_PARTICLE_COUNT=8
```

### Media-Heavy Celebration

```env
VITE_PHOTOS=https://example.com/1.jpg|https://example.com/2.jpg|https://example.com/3.jpg|https://example.com/4.jpg
VITE_PHOTO_CAPTIONS=School days|The trip|Family dinner|Favorite smile
VITE_VIDEO_1=https://www.youtube.com/watch?v=example
VITE_FINAL_VIDEO_URL=https://example.com/finale.mp4
VITE_SHOW_VIDEO_SECTION=true
VITE_SHOW_FINAL_SURPRISE=true
```

### Minimal Private Link

```env
VITE_BIRTHDAY_NAME=Sam
VITE_BIRTHDAY_RELATIONSHIP=friend
VITE_SHOW_QUIZ_SECTION=false
VITE_SHOW_GIFT_SECTION=false
VITE_SHOW_VIDEO_SECTION=false
VITE_SHOW_FINAL_SURPRISE=false
VITE_FAMILY_PRIVACY=private
```

## Deployment Notes

Vercel:

1. Open the project settings.
2. Go to Environment Variables.
3. Add every required `VITE_` key.
4. Redeploy after changing values.

Netlify:

1. Open Site configuration.
2. Go to Environment variables.
3. Add the same keys from `.env.local`.
4. Trigger a fresh deploy.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Name did not change | Check spelling: `VITE_BIRTHDAY_NAME`, then restart dev server or redeploy. |
| Env works locally but not hosted | Add variables in the hosting dashboard and rebuild. |
| Photos do not load | Use direct image URLs ending in `.jpg`, `.png`, `.webp`, or an image CDN URL. |
| Too much motion | Set `VITE_REDUCED_MOTION=true`, `VITE_ANIMATION_INTENSITY=low`, and `VITE_PARTICLE_COUNT=8`. |
| Relationship mood looks wrong | Use a supported relationship value or set `VITE_THEME` explicitly. |
| JSON family profile fails | Validate JSON with quotes around every key and string. |

## Safety

All `VITE_` values are public because they ship to the browser. Keep passwords, tokens, private API keys, and personal secrets out of env values.
