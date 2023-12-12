import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AppStateProvider } from '@/contexts/AppContext';
import { AppLoadingStateWrapper } from '@/components/AppLoadingStateWrapper';
import { Toaster } from 'react-hot-toast';
import '@/styles/swiper.css';
import { inter } from '@/styles/fonts';
import Head from 'next/head';
import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';
import { useEffect } from 'react';
import { track, ALLOW_TRACKING_KEY } from '@/constants/events';
import { useLocalStorage } from 'usehooks-ts';

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  const router = useRouter();

  const [trackingAllowed] = useLocalStorage<Boolean | null>(
    ALLOW_TRACKING_KEY,
    null
  );

  useEffect(() => {
    const isDev = process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development';

    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL, {
      debug: isDev,
      api_host: '/api/tunnel/mixpanel',
      secure_cookie: true
    });

    if (!trackingAllowed) return;

    const handleRouteChange = (url: string) => {
      mixpanel.track(router.pathname, {
        url,
        pathPattern: router.asPath,
        environment: process.env.NEXT_PUBLIC_APP_ENVIRONMENT
      });
    };

    if (router.isReady) handleRouteChange(router.asPath);

    const onFocus = () => track('WINDOW_FOCUS');
    const onBlur = () => track('WINDOW_BLUR');
    const onUnload = () => track('WINDOW_UNLOAD');

    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    window.addEventListener('beforeunload', onUnload);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('beforeunload', onUnload);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [
    router.asPath,
    router.events,
    router.isReady,
    router.pathname,
    trackingAllowed
  ]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <main className={`${inter} text-white`}>
        <SessionProvider session={session}>
          <AppStateProvider>
            <AppLoadingStateWrapper>
              <Toaster />
              <Component {...pageProps} />
            </AppLoadingStateWrapper>
          </AppStateProvider>
        </SessionProvider>
      </main>
    </>
  );
}
