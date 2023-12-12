import { useEffect, useState } from 'react';
import { handleRequest } from '@/utils/axios';
import { LoaderWithFacts } from '@/components/LoaderWithFacts';
import SwiperCarousel from '@/components/SwiperCarousel';
import { useImageDownloader } from '@/hooks/useImageDownloader';
import Confetti from 'react-confetti';
import toast from 'react-hot-toast';
import { UpdatedImageFile } from '@/types/images';
import { useRouter } from 'next/router';

export default function StatsUnwrapped() {
  const [isLoading, setIsLoading] = useState(false);
  const downloadImage = useImageDownloader();

  const router = useRouter();
  const userName = router.query.username as string;
  const hash = (router.query.hash as string[])?.join('/');

  const [isUrlValid, setIsUrlValid] = useState(false);
  const [images, setImages] = useState<UpdatedImageFile[] | null>(null);

  useEffect(() => {
    if (!userName || !hash || isUrlValid) return;
    setIsLoading(true);
    handleRequest<{
      isValid: boolean;
      data: UpdatedImageFile[];
    }>('/api/get-all-images', {
      method: 'GET',
      params: {
        hash: hash,
        username: userName
      }
    })
      .then((res) => {
        setIsUrlValid(res.isValid);
        if (res.isValid) {
          const imageData: UpdatedImageFile[] = res.data.map((link) => ({
            url: `${window.location.origin}${link.url}`,
            fileName: link.fileName,
            data: link.data
          }));
          setImages(imageData);
        }
      })
      .catch((_) => {
        toast.error('Invalid URL', {
          position: 'top-right'
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userName, hash, isUrlValid]);

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
          Unwrap{' '}
          <span className="font-bold text-[#bc9aef]">{userName}&apos;s</span>{' '}
          GitHub journey of 2023! 🎉
        </h2>
      </div>
      {images?.length && <Confetti numberOfPieces={400} recycle={false} />}
      {images?.length && (
        <div className="flex flex-col items-center gap-4 w-full ">
          <SwiperCarousel
            useLinksToRenderImages
            hideShareButtons
            userName={userName}
            images={images}
            singleImageSharingCallback={downloadImage}
          />
        </div>
      )}
    </div>
  );
}
