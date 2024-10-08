import React, { useState } from 'react';
import { CiLinkedin, CiTwitter } from 'react-icons/ci';
import { MdShare } from 'react-icons/md';
import { GoCopy, GoDownload, GoX } from 'react-icons/go';
import { track } from '@/constants/events';
import toast from 'react-hot-toast';
import { logException } from '@/utils/logger';
import { Tooltip } from 'react-tooltip';

type ShareButtonProps = {
  imageUrl?: string;
  callBack?: (e?: any) => void;
  className?: string;
  userName?: string;
  imageName?: string;
  shareAllUrl?: string;
  zipDownload?: () => void;
};

const defaultText = (text: string) =>
  `Here's a sneak peek of my 2023 in code! ${text} #MyUnwrappedIsBetterThanYours #UnwrappedByMiddleware`;

export const ShareButton: React.FC<ShareButtonProps> = ({
  callBack,
  imageUrl,
  className,
  shareAllUrl = '',
  zipDownload
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tweetText, setTweetText] = useState(defaultText(shareAllUrl));

  const shareToTwitter = (type: ShareType) => {
    if (!imageUrl) return;

    const encodedText = encodeURIComponent(
      tweetText ||
        defaultText(type === ShareType.SINGLE ? imageUrl : shareAllUrl)
    );
    const encodedImageUrl = encodeURIComponent(
      type === ShareType.SINGLE ? imageUrl : shareAllUrl
    );
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedImageUrl}`;
    window.open(twitterShareUrl, '_blank');
    closeMenu();
  };

  const setTweetTextForShareType = (type: ShareType) => {
    setTweetText(
      type === ShareType.SINGLE
        ? defaultText(imageUrl || '')
        : defaultText(shareAllUrl)
    );
  };

  const handleClick = ({
    url,
    title,
    summary,
    source
  }: {
    url: string;
    title: string;
    summary: string;
    source: string;
  }) => {
    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
      summary
    )}&source=${encodeURIComponent(source)}`;

    return linkedInShareUrl;
  };

  function shareOnLinkedIn(type: ShareType = ShareType.ALL) {
    const options = {
      url: type === ShareType.SINGLE ? imageUrl || '' : shareAllUrl,
      title: 'Checkout my Unwrapped 2023',
      summary: tweetText || defaultText(imageUrl || ''),
      source: 'Unwrapped by Middleware'
    };
    const linkedInShareUrl = handleClick(options);
    window.open(linkedInShareUrl, '_blank');
    closeMenu();
  }

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
        <MdShare
          size={28}
          fill="rgb(20, 24, 59)"
          className="cursor-pointer"
          onClick={toggleMenu}
        />
        <CopyPaperClip
          textToCopy={shareAllUrl}
          onClick={() => setIsMenuOpen(false)}
        />
      </div>
      {isMenuOpen && (
        <ShareMenu2
          callBack={callBack}
          completeUrl={imageUrl || ''}
          toggleMenu={toggleMenu}
          tweetText={tweetText}
          setTweetText={setTweetText}
          shareOnLinkedIn={shareOnLinkedIn}
          shareToTwitter={shareToTwitter}
          setTweetTextForShareType={setTweetTextForShareType}
          zipDownload={zipDownload}
          shareAllUrl={shareAllUrl}
        />
      )}
    </div>
  );
};

const CopyPaperClip: React.FC<{
  textToCopy: string;
  onClick?: () => void;
}> = ({ textToCopy, onClick }) => {
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
        if (onClick) onClick();
        copyToClipboard(textToCopy, onCopy);
      }}
      className="absolute flex items-center justify-center rounded-full -top-[6px] -left-14 w-10 h-10 bg-white"
    >
      <GoCopy
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

const Button = ({
  children,
  onClick,
  isSelected
}: {
  children: React.ReactNode;
  onClick?: (e?: any) => void;
  isSelected?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        filter: isSelected ? 'brightness(2)' : 'brightness(1)'
      }}
      className="bg-[#2d3479] text-white px-3 py-2 rounded-lg hover:bg-[#424db1] focus:outline-none focus:ring focus:border-blue-300"
    >
      {children}
    </button>
  );
};

const ShareMenu2 = ({
  completeUrl,
  callBack,
  toggleMenu,
  tweetText,
  setTweetText,
  shareOnLinkedIn,
  shareToTwitter,
  setTweetTextForShareType,
  zipDownload,
  shareAllUrl
}: {
  completeUrl: string;
  callBack?: () => void;
  toggleMenu: () => void;
  tweetText: string;
  setTweetText: (text: string) => void;
  shareOnLinkedIn: (e: ShareType) => void;
  shareToTwitter: (e: ShareType) => void;
  setTweetTextForShareType: (e: ShareType) => void;
  zipDownload?: () => void;
  shareAllUrl: string;
}) => {
  const [optionSelected, setOptionSelected] = useState<ShareOption>(
    ShareOption.COPY
  );
  const [shareType, setShareType] = useState<ShareType>(ShareType.ALL);

  const share = () => {
    if (optionSelected === ShareOption.TWEET) {
      shareToTwitter(shareType);
    } else if (optionSelected === ShareOption.LINKEDIN) {
      shareOnLinkedIn(shareType);
    } else if (optionSelected === ShareOption.DOWNLOAD) {
      if (shareType === ShareType.SINGLE) {
        callBack?.();
      } else {
        zipDownload?.();
      }
    } else if (optionSelected === ShareOption.COPY) {
      if (shareType === ShareType.SINGLE) {
        copyToClipboard(completeUrl);
      } else copyToClipboard(shareAllUrl);
    }
  };

  const selectTweet = () => {
    setOptionSelected(ShareOption.TWEET);
  };

  const selectLinkedIn = () => {
    setOptionSelected(ShareOption.LINKEDIN);
  };

  const selectDownload = () => {
    setOptionSelected(ShareOption.DOWNLOAD);
  };

  const selectCopy = () => {
    setOptionSelected(ShareOption.COPY);
  };

  const selectPage = (e: ShareType) => {
    setShareType(e);
    setTweetTextForShareType(e);
  };

  return (
    <div className="absolute md:w-96 w-72 md:right-12 right-4 top-12 bg-[#11142e] rounded-lg shadow-lg p-4">
      <div className="w-full flex justify-between">
        <div className="flex gap-2">
          <Button
            isSelected={optionSelected === ShareOption.COPY}
            onClick={selectCopy}
          >
            <Tooltip id="go-copy" />
            <GoCopy
              data-tooltip-id="go-copy"
              data-tooltip-content="Copy"
              size={20}
            />
          </Button>

          <Button
            isSelected={optionSelected === ShareOption.TWEET}
            onClick={selectTweet}
          >
            <Tooltip id="ci-twitter" />
            <CiTwitter
              data-tooltip-id="ci-twitter"
              data-tooltip-content="Share on X"
              size={20}
            />
          </Button>

          <Button
            isSelected={optionSelected === ShareOption.LINKEDIN}
            onClick={selectLinkedIn}
          >
            <Tooltip id="ci-linkedIn" />
            <CiLinkedin
              data-tooltip-id="ci-linkedIn"
              data-tooltip-content="Share on LinkedIn"
              size={18}
            />
          </Button>

          <Button
            isSelected={optionSelected === ShareOption.DOWNLOAD}
            onClick={selectDownload}
          >
            <Tooltip id="go-download" />
            <GoDownload
              data-tooltip-id="go-download"
              data-tooltip-content="Download Image"
              size={18}
            />
          </Button>

          <Button
            isSelected={optionSelected === ShareOption.COPY}
            onClick={selectCopy}
          >
            <GoCopy
              data-tooltip-id="go-copy"
              data-tooltip-content="Copy"
              size={18}
            />
          </Button>
        </div>
        <button
          type="button"
          onClick={toggleMenu}
          className="bg-[#a23333] text-white px-2 py-1 rounded hover:bg-[#cd4a4a] focus:outline-none focus:ring focus:border-red-300"
        >
          <GoX />
        </button>
      </div>
      <div
        className="overflow-hidden transform duration-200"
        style={{
          height:
            optionSelected === ShareOption.NONE
              ? '0px'
              : optionSelected === ShareOption.TWEET
                ? '194px'
                : '50px'
        }}
      >
        <Tabs
          options={[
            { value: ShareType.ALL, label: 'All Images' },
            { value: ShareType.SINGLE, label: 'Single Image' }
          ]}
          onSelect={selectPage}
          selectedTab={shareType}
        />
        {optionSelected === ShareOption.TWEET && (
          <textarea
            placeholder={defaultText(completeUrl)}
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            className="mt-4 w-full border text-white outline-none rounded-lg p-2 mb-1 bg-[#14183B] border-[#2d3479] h-32"
          />
        )}
      </div>
      {optionSelected !== ShareOption.NONE && (
        <div className="flex w-full justify-center mt-4">
          <Button onClick={share}>
            {optionSelected === ShareOption.TWEET ||
            optionSelected === ShareOption.LINKEDIN
              ? 'Share'
              : optionSelected === ShareOption.DOWNLOAD
                ? 'Download'
                : 'Copy'}
          </Button>
        </div>
      )}
    </div>
  );
};

interface TabProps {
  value: ShareType;
  label: string;
}

interface TabsProps {
  options: TabProps[];
  onSelect: (value: ShareType) => void;
  selectedTab: ShareType;
}

const Tabs: React.FC<TabsProps> = ({ options, onSelect, selectedTab }) => {
  const handleSelect = (value: ShareType) => {
    onSelect(value);
  };

  return (
    <div className="mt-4 flex relative border border-[#2d3479] justify-between center rounded-lg overflow-hidden">
      <div
        className="absolute w-[50%] top-0 bg-[#2d3479] flex h-full transform duration-200"
        style={{
          left: selectedTab === options[0].value ? '0%' : '50%'
        }}
      />
      {options.map((item) => (
        <div
          key={item.value}
          onClick={() => {
            handleSelect(item.value);
          }}
          className="p-1 flex-1 z-10"
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

enum ShareType {
  SINGLE = 'single',
  ALL = 'all'
}

enum ShareOption {
  TWEET = 'tweet',
  LINKEDIN = 'linkedin',
  DOWNLOAD = 'download',
  COPY = 'copy',
  NONE = 'none'
}
