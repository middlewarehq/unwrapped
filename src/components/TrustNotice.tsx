import { useState } from 'react';

export const TrustNotice = () => {
  const [expanded, toggle] = useState(false);
  return (
    <div className="flex flex-col gap-2 -mt-6 pt-6" id="trust-notice">
      <span className="text-3xl font-medium mb-3">
        Trust us? You don&apos;t have to!
      </span>
      <span
        className="text-purple-400 border-purple-400 cursor-pointer border-b-2 border-dotted w-fit mb-2"
        onClick={() => toggle(!expanded)}
      >
        {expanded ? 'Alright, gotcha (collapse)' : 'Click to know why'}
      </span>
      {expanded ? (
        <>
          <div className="border rounded-md border-slate-400 p-4 max-w-xl w-full flex gap-1 flex-col mb-8">
            <span className="font-semibold">Core tenets:</span>
            <span>
              {'->'} We&apos;re not sending your data anywhere without your
              consent.
            </span>
            <span>
              {'->'} We do store <span className="font-bold">anonymized</span>{' '}
              product usage stats, with your consent.
            </span>
          </div>
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
        </>
      ) : null}
    </div>
  );
};
