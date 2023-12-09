import React, { useState, useEffect } from 'react';
import { ScatterBoxLoader } from 'react-awesome-loaders';

const textList = [
  `🌐 Sit tight, and let's make this GitHub Unwrapped experience extraordinary`,
  '🚀 Fetching the latest insights and stats for your year in review.'
];

export const LoaderWithFacts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState(textList[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIndex = (currentIndex + 1) % textList.length;
      setCurrentIndex(newIndex);
      setCurrentText(textList[newIndex]);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <div>
        <h1>{currentText}</h1>
      </div>
      <ScatterBoxLoader background="#14183B" />
    </div>
  );
};
