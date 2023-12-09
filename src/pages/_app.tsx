import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { AppStateProvider } from '@/contexts/AppContext';
import { AppLoadingStateWrapper } from '@/components/AppLoadingStateWrapper';

import '@/styles/swiper.css';
const inter = Inter({ subsets: ['latin'] });

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <main className={inter.className}>
      <AppStateProvider>
        <SessionProvider session={session}>
          <AppLoadingStateWrapper>
            <Component {...pageProps} />
          </AppLoadingStateWrapper>
        </SessionProvider>
      </AppStateProvider>
    </main>
  );
}
