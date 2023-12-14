import React, { useState, useEffect } from 'react';
import { WifiLoader } from 'react-awesome-loaders';
import { randInt } from '@/utils/number';
import { useIsClient } from 'usehooks-ts';

const openSourceStats = [
  "Did you know: Rust has been the consistently most loved language in the last 3 years of StackOverflow's dev survey",
  'Did you know: The JS ecosystem has more than 4x the number of packages than the next one (Python)',
  'Did you know: There are more lines of code written, than number of stars in the milky way galaxy',
  "Did you know: JavaScript is the most popular programming language for the ninth year in a row according to SO's dev survey",
  'Did you know: In 2023, women accounted for 23% of the annual dev workforce',
  'Did you know: In 2023, 65k new gen AI projects were created on GitHub'
];

export const LoaderWithFacts = () => {
  const [currentIndex, setCurrentIndex] = useState(
    randInt(openSourceStats.length - 1)
  );
  const [currentText, setCurrentText] = useState('');

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

  const isClient = useIsClient();

  useEffect(() => {
    setCurrentText(openSourceStats[currentIndex]);
  }, [currentIndex]);

  if (!isClient) return null;

  return (
    <div className="h-full flex flex-col items-center justify-around text-violet-200">
      <div>
        <h1>{currentText}</h1>
      </div>
      <WifiLoader
        duration={2.5}
        background={'transparent'}
        frontColor="#2DBA4B"
        text="Unwrapping your 2023 GitHub journey"
        className="h-1/2 !whitespace-nowrap "
        style={{ whiteSpace: 'nowrap' }}
      />
    </div>
  );
};
