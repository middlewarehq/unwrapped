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
        <div className="absolute md:w-96 w-72 md:right-12 right-4 top-12 bg-[#11142e] rounded-md shadow-lg p-4">
          <textarea
            placeholder="Check out my GitHub journey of 2023!"
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            className="w-full border text-white outline-none rounded-md p-2 mb-2 bg-[#1c2045] border-[#2d3479]"
          />

          <div className="w-full flex justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={shareToTwitter}
                className="bg-[#2d3479] text-[#fff] px-2 py-1 rounded hover:bg-[#424db1] focus:outline-none focus:ring focus:border-blue-300"
              >
                <FaTwitter size={20} />
              </button>
              <button
                type="button"
                onClick={callBack}
                className="bg-[#2d3479] text-white px-2 py-1 rounded hover:bg-[#424db1] focus:outline-none focus:ring focus:border-blue-300"
              >
                <FaDownload size={18} />
              </button>
            </div>
            <button
              type="button"
              onClick={toggleMenu}
              className="bg-[#a23333] text-white px-2 py-1 rounded hover:bg-[#cd4a4a] focus:outline-none focus:ring focus:border-red-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
