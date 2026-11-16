import { Inter } from 'next/font/google';

// Latin UI font used by every LTR locale. (next/font must be called at module scope.)
export const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-body' });
