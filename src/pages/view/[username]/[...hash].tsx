import { useEffect, useState } from 'react';
import { handleRequest } from '@/utils/axios';
import { LoaderWithFacts } from '@/components/LoaderWithFacts';
import SwiperCarousel from '@/components/SwiperCarousel';
import { useImageDownloader } from '@/hooks/useImageDownloader';
import Confetti from 'react-confetti';
import toast from 'react-hot-toast';
import { UpdatedImageFile } from '@/types/images';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

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
          const imageData: UpdatedImageFile[] = res.data.map((image) => ({
            url: `${window.location.origin}${image.url}`,
            fileName: image.fileName,
            data: image.data
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

  const Header = () => (
    <>
      <NextSeo
        title={`${userName}'s Unwrapped 2023`}
        description={`${userName}'s 2023 on GitHub Unwrapped, by Middleware. It's like Spotify Wrapped, but for developers. You'll love it.`}
        openGraph={{
          type: 'website',
          url: `${process.env.NEXT_PUBLIC_APP_URL}/view/${userName}/${hash}`,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_APP_URL}/api/get_cover/${userName}/${hash}`
            }
          ]
        }}
        twitter={{
          cardType: 'summary_large_card',
          site: `${process.env.NEXT_PUBLIC_APP_URL}/view/${userName}/${hash}`,
          handle: 'middlewarehq'
        }}
      />
    </>
  );

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="h-screen flex flex-col items-center justify-between p-10">
          <LoaderWithFacts />
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
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
              hideEmailInput
              hideShareButtons
              userName={userName}
              images={images}
              singleImageSharingCallback={downloadImage}
            />
          </div>
        )}
      </div>
    </>
  );
}
