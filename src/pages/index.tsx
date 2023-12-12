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
    <div className="justify-center w-full flex flex-col gap-4 box-border">
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
            className={`${major} text-lg md:text-2xl lg:text-4xl -mb-4`}
            style={{ position: 'relative', left: '-0.08em' }}
          >
            Github
          </span>
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
          <div className="text-xs text-gray-400 mt-4">
            How do I trust you with my data?{' '}
            <span className="text-purple-400">Scroll down...</span>
          </div>
        </div>
      </IndexPageSection>
      <IndexPageSection>
        <TrustNotice />
        <PopDevsMasonry />
      </IndexPageSection>
    </div>
  );
}
