# Migration Guide

This guide maps older Birthday Bloom structures to the v3 env-first and family-template system.

Repo: [naborajs/birthday-bloom](https://github.com/naborajs/birthday-bloom)

## Old To New Env Mapping

| Old / Alias | New Preferred Variable |
| --- | --- |
| `VITE_FAVORITE_COLOR` | `VITE_BIRTHDAY_COLOR` |
| `VITE_CUSTOM_MESSAGE` | `VITE_BIRTHDAY_CUSTOM_MESSAGE` |
| `VITE_WISHER_NAME` | `VITE_BIRTHDAY_WISHER_NAME` |
| `VITE_FAVORITE_ITEMS` | `VITE_BIRTHDAY_INTERESTS` |
| `VITE_BGM_URL` | `VITE_SOUND_URL` |
| Individual photo edits in code | `VITE_PHOTOS` or `VITE_PHOTO_1..6` |
| Manual section removal in code | `VITE_SHOW_*_SECTION=false` |

Aliases still work where practical, but new docs use the preferred names.

## Old Family Shape

Older family objects looked like:

```ts
{
  id: 'member-1',
  type: 'extended',
  name: 'Relative',
  dateOfBirth: new Date(),
  profileData: {}
}
```

New profiles use `FamilyMemberProfile` from `familyTemplates.ts`.

Use:

```ts
import { migrateLegacyFamilyMember } from '@/features/core/models/familyTemplates';

const migrated = migrateLegacyFamilyMember(oldMember);
```

Known `brother` and `sister` legacy types migrate to dedicated profiles. Unknown types migrate to `custom`.

## Recommended Upgrade Steps

1. Copy `.env.example` to `.env.local`.
2. Move all names, colors, media, and messages into env.
3. Replace code-edited photos with `VITE_PHOTOS` or `VITE_PHOTO_1..6`.
4. Replace hardcoded section edits with `VITE_SHOW_*` toggles.
5. Create family profiles with `VITE_FAMILY_MEMBER_TYPE` or `VITE_FAMILY_PROFILE_JSON`.
6. Run `npm.cmd run test` and `npm.cmd run build`.

## Backward Compatibility

The project keeps these older APIs:

- `createDefaultBrotherProfile()`
- `createDefaultSisterProfile()`
- `VITE_FAVORITE_COLOR`
- `VITE_CUSTOM_MESSAGE`
- `VITE_WISHER_NAME`
- `VITE_FAVORITE_ITEMS`
- `VITE_BGM_URL`

Prefer the new names in fresh projects.
