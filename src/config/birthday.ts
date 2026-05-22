import { config } from "../config";

/**
 * Customization Controller
 * Priority: 
 * 1. Environment Variable (VITE_BIRTHDAY_NAME)
 * 2. Static Config Fallback (config.birthdayName)
 */

// Strict ENV Parser to reject Vercel glitches like "undefined" or "null" strings
const parseEnvStr = (val: unknown): string | null => {
    if (!val) return null;
    const str = String(val).trim();
    if (str === "" || str === "null" || str === "undefined") return null;
    return str;
};

const envName = parseEnvStr(import.meta.env.VITE_BIRTHDAY_NAME);
const envPhoto1 = parseEnvStr(import.meta.env.VITE_PHOTO_1);
const envPhoto2 = parseEnvStr(import.meta.env.VITE_PHOTO_2);
const envPhoto3 = parseEnvStr(import.meta.env.VITE_PHOTO_3);
const envBgm = parseEnvStr(import.meta.env.VITE_BGM_URL) || parseEnvStr(import.meta.env.VITE_SOUND_URL);

export const BIRTHDAY_NAME = envName ? envName : (config.birthdayName || "YOU");

export const PHOTO_ASSETS = {
    photo1: envPhoto1,
    photo2: envPhoto2,
    photo3: envPhoto3,
};

export const AUDIO_ASSETS = {
    bgmUrl: envBgm,
};
