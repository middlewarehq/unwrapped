import { useEffect, useState } from 'react';
import { fetchDataFromApi } from '@/utils/axios';
import { LoaderWithFacts } from '@/components/LoaderWithFacts';
import SwiperCarousel from '@/components/SwiperCarousel';
import { FaDownload } from 'react-icons/fa';
import { FaFilePdf } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { useImageDownloader } from '@/hooks/useImageDownloader';
import { useImageDownloaderAsPdf } from '@/hooks/useImageDownloaderAsPdfHook';
import Confetti from 'react-confetti';
import Link from 'next/link';

interface UnwrappedApiResponse {
  images: string[];
}

const LINKEDIN_URL = 'https://www.linkedin.com/';

export default function StatsUnwrapped() {
  const [isLoading, setIsLoading] = useState(false);
  const downloadImage = useImageDownloader();
  const downloadImagesAsPdf = useImageDownloaderAsPdf();
  const [images, setUnwrappedImages] = useState<string[] | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi<string[]>('/api/download')
      .then((res) => {
        setUnwrappedImages(res);
      })
      .finally(() => {
        setIsLoading(false);
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
            images={images}
            singleImageSharingCallback={downloadImage}
          />
          <div className="flex gap-4  p-3 rounded-lg bg-indigo-900 bg-opacity-60 cursor-pointer">
            <FaDownload size={36} onClick={() => downloadImage({ images })} />
            <Link href={LINKEDIN_URL} target="_blank">
              <FaLinkedin
                size={36}
                onClick={() => downloadImagesAsPdf({ images })}
              />
            </Link>

            <FaFilePdf
              size={36}
              onClick={() => downloadImagesAsPdf({ images })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
