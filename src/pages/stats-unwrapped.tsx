import { useEffect, useState } from 'react';
import { handleRequest } from '@/utils/axios';
import { LoaderWithFacts } from '@/components/LoaderWithFacts';
import SwiperCarousel from '@/components/SwiperCarousel';
import { FaDownload } from 'react-icons/fa';
import { FaFilePdf } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { useImageDownloader } from '@/hooks/useImageDownloader';
import { useImageDownloaderAsPdf } from '@/hooks/useImageDownloaderAsPdfHook';
import Confetti from 'react-confetti';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { UpdatedImageFile } from '@/types/images';
import { track } from '@/constants/events';
import { GithubUser } from '@/api-helpers/exapi-sdk/types';

const LINKEDIN_URL = 'https://www.linkedin.com/';

export default function StatsUnwrapped() {
  const [isLoading, setIsLoading] = useState(false);
  const downloadImage = useImageDownloader();
  const downloadImagesAsPdf = useImageDownloaderAsPdf();
  const [images, setUnwrappedImages] = useState<UpdatedImageFile[] | null>(
    null
  );
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setIsLoading(true);
    handleRequest<UpdatedImageFile[]>('/api/download')
      .then((res) => {
        setUnwrappedImages(res);
      })
      .catch((_) => {
        toast.error('Something went wrong', {
          position: 'top-right'
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
    handleRequest<{ user: GithubUser }>('/api/github/user')
      .then((r) => {
        setUserName(r.user.login);
      })
      .catch((_) => {
        toast.error('Something went wrong', {
          position: 'top-right'
        });
      });
  }, [setUnwrappedImages]);

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
            />
            <Link href={LINKEDIN_URL} target="_blank">
              <FaLinkedin
                size={36}
                onClick={() => {
                  downloadImagesAsPdf({ images });
                  track('LINKEDIN_SHARE_CLICKED');
                }}
              />
            </Link>

            <FaFilePdf
              size={36}
              onClick={() => {
                downloadImagesAsPdf({ images });
                track('PDF_DOWNLOAD_CLICKED');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
