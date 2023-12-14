import { useCallback, useEffect, useState } from 'react';
import { handleRequest } from '@/utils/axios';
import { LoaderWithFacts } from '@/components/LoaderWithFacts';
import SwiperCarousel from '@/components/SwiperCarousel';
import { FaDownload } from 'react-icons/fa';
import { FaFilePdf, FaShare } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { useImageDownloader } from '@/hooks/useImageDownloader';
import { useImageDownloaderAsPdf } from '@/hooks/useImageDownloaderAsPdfHook';
import Confetti from 'react-confetti';
import Link from 'next/link';
import { ImageAPIResponse, UpdatedImageFile } from '@/types/images';
import { track } from '@/constants/events';
import { GithubUser } from '@/api-helpers/exapi-sdk/types';
import { copyToClipboard } from '@/components/ShareButton';
import { Tooltip } from 'react-tooltip';
import { AxiosError } from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { usePrebuiltToasts } from '@/hooks/usePrebuiltToasts';

const LINKEDIN_URL = 'https://www.linkedin.com/sharing/share-offsite/?url=';

export default function StatsUnwrapped() {
  const { status } = useSession();
  const { somethingWentWrongToast, unauthenticatedToast } = usePrebuiltToasts();
  const [isLoading, setIsLoading] = useState(false);
  const downloadImage = useImageDownloader();
  const downloadImagesAsPdf = useImageDownloaderAsPdf();
  const [images, setUnwrappedImages] = useState<UpdatedImageFile[] | null>(
    null
  );
  const [userName, setUserName] = useState('');
  const [shareUrl, setShareUrl] = useState('');

  const handleErr = useCallback(
    (err: AxiosError) => {
      if (err.status === 403) {
        unauthenticatedToast();
        return signOut({ redirect: false });
      }
      somethingWentWrongToast();
    },
    [somethingWentWrongToast, unauthenticatedToast]
  );

  const fetchImages = useCallback(() => {
    setIsLoading(true);
    handleRequest<ImageAPIResponse>('/api/download')
      .then((res) => {
        setUnwrappedImages(res.data);
        setShareUrl(res.shareAllUrl);
      })
      .catch(handleErr)
      .finally(() => setIsLoading(false));
  }, [handleErr]);

  const fetchUserName = useCallback(() => {
    handleRequest<{ user: GithubUser }>('/api/github/user')
      .then((r) => {
        setUserName(r.user.login);
      })
      .catch(handleErr);
  }, [handleErr]);

  useEffect(() => {
    if (status === 'loading') return;
    fetchImages();
  }, [fetchImages, status]);

  useEffect(() => {
    if (status === 'loading') return;
    fetchUserName();
  }, [fetchUserName, status]);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-between p-10">
        <LoaderWithFacts />
      </div>
    );
  }

  return (
    <div className="items-center justify-center p-4 min-h-screen w-full flex flex-col gap-10 text-center">
      <div>
        <h2 className="text-2xl">
          🚀 Let&apos;s unwrap your GitHub journey of 2023! 🎉
        </h2>
      </div>
      {images?.length && <Confetti numberOfPieces={400} recycle={false} />}
      {images?.length && (
        <div className="flex flex-col items-center gap-4 w-full ">
          <SwiperCarousel
            userName={userName}
            images={images}
            singleImageSharingCallback={downloadImage}
          />

          <div className="flex gap-4  p-3 rounded-lg bg-indigo-900 bg-opacity-60 cursor-pointer">
            <FaDownload
              size={36}
              onClick={() => {
                downloadImage({ images });
                track('ZIP_DOWNLOAD_CLICKED');
              }}
              data-tooltip-id="carousel-action-menu"
              data-tooltip-content="Download as zip"
            />
            <Link
              href={`${LINKEDIN_URL}${encodeURIComponent(
                window.location.origin + shareUrl
              )}`}
              target="_blank"
            >
              <FaLinkedin
                size={36}
                onClick={() => {
                  track('LINKEDIN_SHARE_CLICKED');
                }}
                data-tooltip-id="carousel-action-menu"
                data-tooltip-content="Share on LinkedIn"
              />
            </Link>

            <FaFilePdf
              size={36}
              onClick={async () => {
                downloadImagesAsPdf({ images });
                track('PDF_DOWNLOAD_CLICKED');
              }}
              data-tooltip-id="carousel-action-menu"
              data-tooltip-content="Download as PDF"
            />
            {shareUrl && (
              <FaShare
                size={36}
                onClick={() => {
                  copyToClipboard(window.location.origin + shareUrl);
                }}
              />
            )}
          </div>
          <Tooltip id="carousel-action-menu" />
        </div>
      )}
    </div>
  );
}
