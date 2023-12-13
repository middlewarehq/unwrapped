import React, { useState } from 'react';
import { GiPaperClip, GiShare } from 'react-icons/gi';
import {} from 'react-icons';
import { FaTwitter, FaDownload } from 'react-icons/fa';
import { track } from '@/constants/events';
import toast from 'react-hot-toast';
import { logException } from '@/utils/logger';

type ShareButtonProps = {
  imageUrl?: string;
  callBack?: (e?: any) => void;
  className?: string;
  userName?: string;
  imageName?: string;
};

const defaultText =
  "Here's a sneak peek of my 2023 in code! https://unwrapped.dev #MyUnwrappedIsBetterThanYours #UnwrappedByMiddleware";

export const ShareButton: React.FC<ShareButtonProps> = ({
  callBack,
  imageUrl,
  className
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tweetText, setTweetText] = useState(defaultText);

  const domain = window.location.origin;

  const completeUrl = `${domain}${imageUrl}`;
  const shareToTwitter = () => {
    const encodedText = encodeURIComponent(tweetText || defaultText);
    const encodedImageUrl = encodeURIComponent(completeUrl);

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
      <div className="relative">
        <GiShare
          size={28}
          fill="rgb(20, 24, 59)"
          className="cursor-pointer"
          onClick={toggleMenu}
        />
        <CopyPaperClip textToCopy={completeUrl} />
      </div>
      {isMenuOpen && (
        <div className="absolute md:w-96 w-72 md:right-12 right-4 top-12 bg-[#11142e] rounded-md shadow-lg p-4">
          <textarea
            placeholder={defaultText}
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

const CopyPaperClip: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    track('SINGLE_IMAGE_PUBLIC_LINK_COPIED');
  };

  return (
    <div
      onClick={() => {
        copyToClipboard(textToCopy, onCopy);
      }}
      className="absolute flex items-center justify-center rounded-full -top-[6px] -left-14 w-10 h-10 bg-white"
    >
      <GiPaperClip
        size={24}
        fill="rgb(20, 24, 59)"
        style={{
          opacity: isCopied ? 0.5 : 1
        }}
      />
      {isCopied && (
        <div className="absolute text-sm top-12 -left-4 text-black bg-white rounded-md px-2 py-1">
          Copied!
        </div>
      )}
    </div>
  );
};

export const copyToClipboard = async (
  textToCopy: string,
  onCopy?: (e: any) => void,
  onFailure?: (e: any) => void
) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    toast.success('Copied to clipboard');
    onCopy && onCopy(textToCopy);
  } catch (err) {
    toast.error('Error copying to clipboard');
    logException(`Error copying to clipboard: ${textToCopy}`, {
      originalException: err
    });
    onFailure && onFailure(err);
  }
};
