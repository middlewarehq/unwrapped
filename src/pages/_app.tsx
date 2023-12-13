import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AppStateProvider } from '@/contexts/AppContext';
import { AppLoadingStateWrapper } from '@/components/AppLoadingStateWrapper';
import { Toaster } from 'react-hot-toast';
import { inter } from '@/styles/fonts';
import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';
import { useEffect } from 'react';
import { track, ALLOW_TRACKING_KEY } from '@/constants/events';
import { useLocalStorage } from 'usehooks-ts';
import Script from 'next/script';
import '@/styles/swiper.css';
import 'react-tooltip/dist/react-tooltip.css';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

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
      <DefaultSeo
        title="Unwrapped by Middleware"
        description="A yearly recap of your GitHub, like Spotify Wrapped. If you are a developer, you will love it! ❤️"
        openGraph={{
          type: 'website',
          url: process.env.NEXT_PUBLIC_APP_URL,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/og-image.png`
            }
          ]
        }}
        twitter={{
          cardType: 'summary_large_card',
          site: process.env.NEXT_PUBLIC_APP_URL,
          handle: 'middlewarehq'
        }}
      />
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="keywords"
          content="developer,unwrap,app,recap,yearly,review,annual,github,spotify,wrapped,year-in-review,year in review,middleware,software,engineering,annual review,appraisal,december,github unwrapped,githubunwrapped,github-unwrapped,software engineers,jayant bhawal,eshaan yadav,samad yar khan,shivam singh,dhruv agarwal,varun narula,adnan hashmi,cadence,management,dora metrics,open source,open-source,contributions,bottlenecks"
        />
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

        {Boolean(process.env.NEXT_PUBLIC_GA) && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
            />
            <Script id="google-analytics">
              {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.NEXT_PUBLIC_GA}');
        `}
            </Script>
          </>
        )}
      </main>
    </>
  );
}
