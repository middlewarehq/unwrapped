import React, { useState, useEffect } from 'react';
import { ScatterBoxLoader } from 'react-awesome-loaders';

const openSourceStats = [
  "Did you know: Rust has been the consistently most loved language in the last 3 years of StackOverflow's dev survey",
  'Did you know: The JS ecosystem has more than 4x the number of packages than the next one (Python)',
  'Did you know: There are more lines of code written, than number of stars in the milky way galaxy'
];

export const LoaderWithFacts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState(openSourceStats[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIndex = (currentIndex + 1) % openSourceStats.length;
      setCurrentIndex(newIndex);
      setCurrentText(openSourceStats[newIndex]);
    }, 6000);

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
