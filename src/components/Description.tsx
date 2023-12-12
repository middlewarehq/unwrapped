import { Typewriter } from 'react-simple-typewriter';

export const Description = () => (
  <div className="flex flex-col mb-12 mt-2 h-[120px]">
    <span className="text-lg">
      <span>A yearly recap of your GitHub, like </span>
      <Typewriter
        words={[
          'Spotify Wrapped',
          'Instagram Recap',
          'Facebook Year In Review',
          "Youtube Rewind (that doesn't suck)"
        ].map((line) => line + '...')}
        loop
        cursor
        cursorStyle="|"
        cursorBlinking
      />
    </span>
    <span className="text-lg">If you&apos;re a dev, you&apos;ll ❤️ it</span>
    <span className="text-lg ">
      <a
        href="https://middlewarehq.com"
        className="text-purple-400 border-b-2 border-dotted border-b-purple-400"
      >
        by Middleware {'->'}
      </a>
    </span>
  </div>
);
