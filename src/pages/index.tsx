import { major } from '@/styles/fonts';
import { signIn, signOut, useSession } from 'next-auth/react';
import { MouseScrollAnim } from '@/components/MouseScrollAnim/MouseScrollAnim';
import { useState } from 'react';

import LogoSvg from '@/assets/unwrapped-logo.svg';
import { useRouter } from 'next/router';

/**
 * DISABLE_PUBLIC_ONLY_CONTRIBUTIONS
 * Because this isn't implemented yet
 */
const DISABLE_PUBLIC_ONLY_CONTRIBUTIONS = true;

export default function Home() {
  const [showPrivate, setShowPrivate] = useState(true);
  const { status } = useSession();
  const router = useRouter();
  const currentUrl = new URL(window.location.href);

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
      <div className="relative flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen">
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
          <span className="text-lg mb-12">
            <a
              href="https://middlewarehq.com"
              className="text-purple-400 border-b-2 border-dotted border-b-purple-400"
            >
              By Middleware {'->'} launching soon
            </a>
          </span>
          <div className="w-fit flex flex-col gap-2">
            {status === 'authenticated' ? (
              <div className="w-fit flex flex-col gap-1">
                <button
                  className="bg-indigo-800 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    const url = new URL(currentUrl);
                    url.pathname = '/stats-unwrapped';
                    router.replace(url);
                  }}
                >
                  Unwrap your year, lets go! {'->'}
                </button>
                <button
                  className="bg-gray-400 bg-opacity-10 text-white px-4 py-1 rounded-md text-xs"
                  onClick={() => {
                    signOut({ redirect: false });
                  }}
                >
                  Sign out
                </button>
              </div>
            ) : showPrivate ? (
              <button
                className="bg-indigo-800 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  const url = new URL(currentUrl);
                  url.pathname = '/stats-unwrapped';
                  signIn('github', { callbackUrl: url.href });
                }}
              >
                Login with Github to start {'->'}
              </button>
            ) : (
              <div className="w-fit">
                <form
                  className="flex gap-1"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight text-center focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="GH Username"
                  />
                  <button
                    className="bg-indigo-800 text-white px-4 py-2 rounded-md shrink-0"
                    onClick={() => {
                      console.log('public');
                    }}
                  >
                    {'->'}
                  </button>
                </form>
              </div>
            )}
            {!DISABLE_PUBLIC_ONLY_CONTRIBUTIONS && (
              <div>
                <div className="flex items-center">
                  <input
                    id="private-contribs"
                    type="checkbox"
                    checked={showPrivate}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => setShowPrivate(!showPrivate)}
                    disabled={DISABLE_PUBLIC_ONLY_CONTRIBUTIONS}
                  />
                  <label
                    htmlFor="private-contribs"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Include my private contributions?
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <MouseScrollAnim fontSize="1.4em" />
          <div className="text-xs text-gray-400 mt-4">
            How do I trust you with my data?{' '}
            <span className="text-purple-400">Scroll down...</span>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen gap-2">
        <span className="text-3xl font-medium mb-3">
          Trust us? You don&apos;t have to!
        </span>
        <span>
          We could say &quot;your privacy is important to us&quot; and all
          that...
        </span>
        <span>But you won&apos;t believe that, and neither should you.</span>
        <span>
          We think the best way to show that, is to simply point you to the
          <br />
          <a
            href="https://github.com/middlewarehq/unwrapped"
            target="_parent"
            rel="noreferrer nofollow noopener"
            className="text-purple-400 border-b-2 border-dotted border-b-purple-400"
          >
            unwrapped repo {'->'}
          </a>
        </span>
        <span className="font-semibold mt-8">Things to spot:</span>
        <span>
          {'->'} We&apos;re not sending your data anywhere without your consent.
        </span>
        <span>
          {'->'} We do store <span className="font-bold">anonymized</span>{' '}
          general product usage stats, but with your consent.
        </span>
      </div>
    </div>
  );
}
