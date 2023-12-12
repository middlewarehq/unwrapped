export const TrustNotice = () => (
  <div className="flex flex-col gap-2">
    <span className="text-3xl font-medium mb-3">
      Trust us? You don&apos;t have to!
    </span>
    <span>
      We could say &quot;your privacy is important to us&quot; and all that...
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
      {'->'} We do store <span className="font-bold">anonymized</span> general
      product usage stats, but with your consent.
    </span>
  </div>
);
