import { major } from '@/styles/fonts';
import { MouseScrollAnim } from '@/components/MouseScrollAnim/MouseScrollAnim';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import LogoSvg from '@/assets/unwrapped-logo.svg';
import { useTrackingConsent } from '@/components/TrackingConsent';
import { IndexPageSection } from '@/components/IndexPageSection';
import { TrustNotice } from '@/components/TrustNotice';
import { ThrownCards } from '@/components/ThrownCards';
import { Description } from '@/components/Description';
import { AuthActions } from '@/components/AuthActions';
import Head from 'next/head';

const PopDevsMasonry = dynamic(() =>
  import('@/components/PopDevsMasonry').then((m) => m.PopDevsMasonry)
);

const TRACKING_CONSENT_BANNER_DELAY = 2000;

export default function Home() {
  const [showTrackingBanner, setShowTrackingBanner] = useState(false);
  const showTrackingConsent = useTrackingConsent();

  useEffect(() => {
    if (!showTrackingBanner) return;
    showTrackingConsent();
  }, [showTrackingBanner, showTrackingConsent]);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => setShowTrackingBanner(true),
      TRACKING_CONSENT_BANNER_DELAY
    );
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        <title>Unwrapped by Middleware</title>

        <meta
          name="keywords"
          content="developer,unwrap,app,recap,yearly,review,annual,github,spotify,wrapped,year-in-review,year in review,middleware,software,engineering,annual review,appraisal,new year,new year's eve,december,github unwrapped,githubunwrapped,github-unwrapped,software engineers,jayant bhawal,eshaan yadav,samad yar khan,shivam singh,dhruv agarwal,varun narula,adnan hashmi,cadence,management,dora metrics,open source,open-source,contributions,bottlenecks,pull requests,prs,issues,commits,lines of code,loc,languages,repositories,repos,stars,forks,github insights"
        />

        <meta property="og:title" content={`Unwrapped by Middleware`} />
        <meta
          property="og:description"
          content="A yearly recap of your GitHub, like Spotify Wrapped. If you are a developer, you will love it! ❤️"
        />
        <meta property="og:image" content="/assets/images/og-image.png" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL} />
        <meta property="og:type" content="website" />

        {/* Other meta tags */}
        <meta
          name="description"
          content="A yearly recap of your GitHub, like Spotify Wrapped. If you are a developer, you will love it! ❤️"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Unwrapped by Middleware" />
        <meta
          name="twitter:description"
          content="A yearly recap of your GitHub, like Spotify Wrapped. If you are a developer, you will love it! ❤️"
        />
        <meta name="twitter:image" content="/assets/images/og-image.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <div className="justify-center w-full flex flex-col gap-4 box-border overflow-hidden">
        <LogoSvg
          style={{
            position: 'fixed',
            right: '-150px',
            bottom: '-200px',
            opacity: 0.3
          }}
          className="scale-[2] md:scale-[3]"
        />
        <IndexPageSection>
          <ThrownCards />
          <div className="flex flex-col gap-4 justify-center grow">
            <span
              className={`${major} text-5xl md:text-7xl lg:text-9xl`}
              style={{ position: 'relative', left: '-0.08em' }}
            >
              UNWRAPPED
            </span>
            <span
              className={`${major} text-8xl md:text-[7em] lg:text-[9em] text-purple-400`}
              style={{ position: 'relative', left: '-0.15em' }}
            >
              2023
            </span>
            <Description />
            <AuthActions />
          </div>
          <div className="flex flex-col mt-8">
            <MouseScrollAnim fontSize="1.4em" />
          </div>
        </IndexPageSection>
        <IndexPageSection>
          <TrustNotice />
          <PopDevsMasonry />
        </IndexPageSection>
      </div>
    </>
  );
}
