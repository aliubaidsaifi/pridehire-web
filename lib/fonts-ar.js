import { IBM_Plex_Sans_Arabic } from 'next/font/google';

// Arabic UI font. Imported ONLY by the Arabic root layout (app/sa/ar/layout.js), so its CSS and files are never
// referenced by — and never grow — the English bundle. The 'latin' subset covers brand names/numerals inside Arabic text.
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
});
