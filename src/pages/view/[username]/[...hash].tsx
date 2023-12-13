import { useEffect, useState } from 'react';
import { handleRequest } from '@/utils/axios';
import { LoaderWithFacts } from '@/components/LoaderWithFacts';
import SwiperCarousel from '@/components/SwiperCarousel';
import { useImageDownloader } from '@/hooks/useImageDownloader';
import Confetti from 'react-confetti';
import toast from 'react-hot-toast';
import { UpdatedImageFile } from '@/types/images';
import { useRouter } from 'next/router';
import Head from 'next/head';

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

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-between p-10">
        <LoaderWithFacts />
      </div>
    );
  }
  return (
    <>
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        <title>{userName}&apos;s Unwrapped 2023</title>

        {/* Open Graph meta tags */}
        <link
          rel={`${process.env.NEXT_PUBLIC_APP_URL}/api/get_cover/${userName}/${hash}`}
        />

        <meta property="og:title" content={`${userName}'s Unwrapped 2023`} />
        <meta
          property="og:description"
          content={`${userName}'s 2023 on GitHub Unwrapped, by Middleware. It's like Spotify Wrapped, but for developers. You'll love it.`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/api/get_cover/${userName}/${hash}`}
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL} />
        <meta property="og:type" content="website" />

        {/* Other meta tags */}
        <meta
          name="description"
          content={`${userName}'s 2023 on GitHub Unwrapped, by Middleware. It's like Spotify Wrapped, but for developers. You'll love it.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Unwrapped by Middleware" />
        <meta
          name="twitter:description"
          content={`${userName}'s 2023 on GitHub Unwrapped, by Middleware. It's like Spotify Wrapped, but for developers. You'll love it.`}
        />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/api/get_cover/${userName}/${hash}`}
        />
      </Head>
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
