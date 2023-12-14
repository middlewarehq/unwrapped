import { useCallback, useEffect, useState } from 'react';
import { handleRequest } from '@/utils/axios';
import { LoaderWithFacts } from '@/components/LoaderWithFacts';
import SwiperCarousel from '@/components/SwiperCarousel';
import { GoShare, GoDownload } from 'react-icons/go';
import { useImageDownloader } from '@/hooks/useImageDownloader';
import Confetti from 'react-confetti';
import { ImageAPIResponse, UpdatedImageFile } from '@/types/images';
import { track } from '@/constants/events';
import { GithubUser } from '@/api-helpers/exapi-sdk/types';
import { AxiosError } from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { usePrebuiltToasts } from '@/hooks/usePrebuiltToasts';
import { Tooltip } from 'react-tooltip';
import { copyToClipboard } from '@/components/ShareButton';

export default function StatsUnwrapped() {
  const { status } = useSession();
  const { somethingWentWrongToast, unauthenticatedToast } = usePrebuiltToasts();
  const [isLoading, setIsLoading] = useState(true);
  const downloadImage = useImageDownloader();
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
        setUnwrappedImages(
          res.data.map((image) => ({
            ...image,
            url: process.env.NEXT_PUBLIC_APP_URL + image.url
          }))
        );
        setShareUrl(process.env.NEXT_PUBLIC_APP_URL + res.shareAllUrl);
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

  const zipDownload = () => {
    if (images) downloadImage({ images });
    track('ZIP_DOWNLOAD_CLICKED');
  };

  return (
    <div className="items-center justify-center p-4 min-h-screen w-full flex flex-col gap-8 text-center">
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
            shareAllUrl={shareUrl}
            zipDownload={zipDownload}
          />
          <div className="flex gap-2">
            <div className="flex gap-4  p-3 rounded-lg bg-indigo-900 bg-opacity-60 cursor-pointer">
              <GoDownload
                size={23}
                onClick={zipDownload}
                data-tooltip-id="carousel-action-menu"
                data-tooltip-content="Download as zip"
              />
            </div>
            <div className="flex gap-4  p-3 rounded-lg bg-indigo-900 bg-opacity-60 cursor-pointer">
              {shareUrl && (
                <GoShare
                  size={23}
                  onClick={() => {
                    copyToClipboard(shareUrl);
                  }}
                  data-tooltip-id="carousel-action-menu"
                  data-tooltip-content="Share link"
                />
              )}
            </div>
            <Tooltip id="carousel-action-menu" />
          </div>
        </div>
      )}
      <a
        href="https://www.producthunt.com/posts/unwrapped-by-middleware?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-unwrapped&#0045;by&#0045;middleware"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=428918&theme=light"
          alt="Unwrapped&#0032;by&#0032;Middleware - Your&#0032;Dev&#0032;year&#0032;2023&#0032;unwrapped | Product Hunt"
          style={{ width: '250px', height: '54px' }}
          width="250"
          height="54"
        />
      </a>
    </div>
  );
}
