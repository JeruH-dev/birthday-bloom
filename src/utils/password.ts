/**
 * 🔐 Birthday Bloom - Password Verification & Generation Engine
 * -------------------------------------------------------------
 * Authored by: NABORAJ SARKAR (https://github.com/naborajs)
 * 
 * Provides robust date parsing and dynamic password generation from environment values.
 */

interface ParsedDate {
  year: string;
  month: string;
  day: string;
}

/**
 * Parses raw birthday date strings from env into month, day, and year.
 * Handles full ISO strings (e.g. 2026-04-24T00:00:00) and partial dates (e.g. 04-24).
 */
export const parseRawBirthdayDate = (rawDate: string | null | undefined): ParsedDate | null => {
  if (!rawDate) return null;
  const clean = rawDate.trim().replace('TH', 'T');
  if (!clean) return null;

  // Try standard Date object parsing (works for valid full formats)
  const dateObj = new Date(clean);
  if (!isNaN(dateObj.getTime())) {
    const year = String(dateObj.getFullYear());
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return { year, month, day };
  }

  // Regular expression for YYYY-MM-DD
  const ymdMatch = clean.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (ymdMatch) {
    return {
      year: ymdMatch[1],
      month: ymdMatch[2].padStart(2, '0'),
      day: ymdMatch[3].padStart(2, '0'),
    };
  }

  // Regular expression for MM-DD or DD-MM (e.g. "04-24" or "24-04")
  const mdMatch = clean.match(/^(\d{1,2})[-/](\d{1,2})/);
  if (mdMatch) {
    const val1 = parseInt(mdMatch[1], 10);
    const val2 = parseInt(mdMatch[2], 10);
    const currentYear = String(new Date().getFullYear());

    // Guess month vs day. If first value > 12, it must be the day.
    if (val1 > 12) {
      return {
        year: currentYear,
        month: String(val2).padStart(2, '0'),
        day: String(val1).padStart(2, '0'),
      };
    } else {
      return {
        year: currentYear,
        month: String(val1).padStart(2, '0'),
        day: String(val2).padStart(2, '0'),
      };
    }
  }

  return null;
};

/**
 * Generates password string from a raw date string based on the given format.
 */
export const generatePasswordFromDate = (
  rawDate: string | null | undefined,
  format: string = 'MMDD'
): string => {
  const parsed = parseRawBirthdayDate(rawDate);
  if (!parsed) return '';

  const { year, month, day } = parsed;
  const fmt = format.toUpperCase().trim();

  switch (fmt) {
    case 'DDMM':
      return `${day}${month}`;
    case 'YYYYMMDD':
      return `${year}${month}${day}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'MM-DD':
      return `${month}-${day}`;
    case 'DD-MM':
      return `${day}-${month}`;
    case 'YYYY':
      return year;
    case 'MMDD':
    default:
      return `${month}${day}`;
  }
};

/**
 * Resolves the expected password for unlock:
 * 1. Checks VITE_PASSWORD
 * 2. Generates from VITE_BIRTHDAY_DATE if present
 * 3. Falls back to empty string
 */
export const getEffectivePassword = (config: {
  password?: string;
  birthdayDate?: Date | string | null;
  passwordFormat?: string;
}): string => {
  if (config.password && config.password.trim().length > 0) {
    return config.password.trim();
  }

  // Generate from VITE_BIRTHDAY_DATE
  if (config.birthdayDate) {
    if (config.birthdayDate instanceof Date) {
      const year = String(config.birthdayDate.getFullYear());
      const month = String(config.birthdayDate.getMonth() + 1).padStart(2, '0');
      const day = String(config.birthdayDate.getDate()).padStart(2, '0');
      const fmt = (config.passwordFormat || 'MMDD').toUpperCase().trim();

      switch (fmt) {
        case 'DDMM': return `${day}${month}`;
        case 'YYYYMMDD': return `${year}${month}${day}`;
        case 'YYYY-MM-DD': return `${year}-${month}-${day}`;
        case 'MM-DD': return `${month}-${day}`;
        case 'DD-MM': return `${day}-${month}`;
        case 'YYYY': return year;
        case 'MMDD':
        default: return `${month}${day}`;
      }
    } else {
      return generatePasswordFromDate(config.birthdayDate, config.passwordFormat);
    }
  }

  // Fallback to checking the process.env raw variable directly if state was not populated
  const rawEnvDate = import.meta.env.VITE_BIRTHDAY_DATE;
  if (rawEnvDate) {
    return generatePasswordFromDate(rawEnvDate, config.passwordFormat);
  }

  return '';
};

/**
 * Determines whether the password screen is required to unlock the application.
 */
export const isPasswordRequired = (config: {
  password?: string;
  passwordRequired?: boolean;
}): boolean => {
  if (config.passwordRequired !== undefined) {
    return config.passwordRequired;
  }
  // Default: Require unlock only if a custom password string is explicitly configured
  return !!config.password && config.password.trim().length > 0;
};
