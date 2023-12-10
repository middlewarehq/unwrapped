import React, { useState, useEffect } from 'react';
import { ScatterBoxLoader } from 'react-awesome-loaders';

const openSourceStats = [
  '🌐 Join a global community of over 94 million developers actively contributing and leveraging open source software.',
  '🚀 Explore 420 million projects on GitHub, witnessing a remarkable 35% growth from the previous year.',
  '🔧 Boost your productivity with GitHub Actions, experiencing a phenomenal 400% increase in usage and streamlined workflows.',
  '🤖 Embrace innovation! Over 60% of developers now harness AI-powered code completion tools like GitHub Copilot.',
  '💡 Powering the world! Open source software is the backbone of critical infrastructure across diverse industries.',
  '🎨 Unleash creativity! GitHub hosts over 4 million user-created Pages, showcasing its versatility beyond traditional code.',
  '💸 Invest in open source excellence! GitHub Sponsors has garnered over $40 million in pledges, highlighting substantial developer support.',
  '👥 Join forces! The most active repository, with over 20,000 contributors, demonstrates the incredible collaborative power of open source.',
  '💬 Engage deeply! Witness a single pull request receiving over 1,000 comments, showcasing profound discussion and collaboration.'
];

export const LoaderWithFacts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState(openSourceStats[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIndex = (currentIndex + 1) % openSourceStats.length;
      setCurrentIndex(newIndex);
      setCurrentText(openSourceStats[newIndex]);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  return (
    <div className="h-full flex flex-col items-center justify-around text-violet-200">
      <div>
        <h1>{currentText}</h1>
      </div>
      <ScatterBoxLoader background="#14183B" />
    </div>
  );
};
