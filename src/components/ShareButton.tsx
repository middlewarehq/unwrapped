import React, { useState } from 'react';
import { GiShare } from 'react-icons/gi';
import {} from 'react-icons';
import { FaTwitter, FaDownload } from 'react-icons/fa';

type ShareButtonProps = {
  imageUrl?: string;
  callBack?: (e?: any) => void;
  className?: string;
};

export const ShareButton: React.FC<ShareButtonProps> = ({
  imageUrl = 'https://picsum.photos/200',
  callBack,
  className
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tweetText, setTweetText] = useState('');

  const shareToTwitter = () => {
    const encodedText = encodeURIComponent(
      tweetText || 'Check out my GitHub journey of 2023!'
    );
    const encodedImageUrl = encodeURIComponent(imageUrl);

    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedImageUrl}`;

    window.open(twitterShareUrl, '_blank');
    closeMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setTweetText('');
  };

  return (
    <div className={'relative inline-block ' + className}>
      <GiShare
        size={28}
        fill="rgb(20, 24, 59)"
        className="cursor-pointer"
        onClick={toggleMenu}
      />

      {isMenuOpen && (
        <div className="absolute md:w-96 w-72 md:right-12 right-4 top-12 bg-white rounded-md shadow-lg p-4">
          <textarea
            placeholder="Check out my GitHub journey of 2023!"
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            className="w-full border text-black border-gray-300 rounded-md p-2 mb-2"
          />

          <div className="w-full flex justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={shareToTwitter}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                <FaTwitter size={20} />
              </button>
              <button
                type="button"
                onClick={callBack}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                <FaDownload size={18} />
              </button>
            </div>
            <button
              type="button"
              onClick={toggleMenu}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
