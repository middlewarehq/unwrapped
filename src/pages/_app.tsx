import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AppStateProvider } from '@/contexts/AppContext';
import { AppLoadingStateWrapper } from '@/components/AppLoadingStateWrapper';

import '@/styles/swiper.css';
import { inter } from '@/styles/fonts';

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <main className={`${inter} text-white`}>
      <SessionProvider session={session}>
        <AppStateProvider>
          <AppLoadingStateWrapper>
            <Component {...pageProps} />
          </AppLoadingStateWrapper>
        </AppStateProvider>
      </SessionProvider>
    </main>
  );
}
