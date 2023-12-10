import { Inter, Major_Mono_Display } from 'next/font/google';

const interFont = Inter({ subsets: ['latin'] });
const majorFont = Major_Mono_Display({ subsets: ['latin'], weight: '400' });

export const inter = interFont.className;

export const major = majorFont.className;
