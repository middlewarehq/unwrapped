import { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { handleRequest } from '@/utils/axios';
import { LoaderWithFacts } from '@/components/LoaderWithFacts';
import SwiperCarousel from '@/components/SwiperCarousel';
import { useImageDownloader } from '@/hooks/useImageDownloader';
import Confetti from 'react-confetti';
import { UpdatedImageFile } from '@/types/images';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { track } from '@/constants/events';
import { usePrebuiltToasts } from '@/hooks/usePrebuiltToasts';
import { useSession } from 'next-auth/react';

export default function StatsUnwrapped() {
  const router = useRouter();
  const { status } = useSession();
  const { noImagesToast, invalidUrlToast } = usePrebuiltToasts();
  const [isLoading, setIsLoading] = useState(true);
  const downloadImage = useImageDownloader();

  const userName = router.query.username as string;
  const hash = (router.query.hash as string[])?.join('/');
  const [images, setImages] = useState<UpdatedImageFile[] | null>(null);

  const zipDownload = () => {
    if (images) downloadImage({ images });
    track('ZIP_DOWNLOAD_CLICKED');
  };

  useEffect(() => {
    if (!userName || !hash || status === 'loading') return;
    setIsLoading(true);
    handleRequest<{
      isValid: boolean;
      data: UpdatedImageFile[];
    }>('/api/get-all-images', {
      method: 'GET',
      params: {
        hash: hash,
        username: userName,
        ispublic: false
      }
    })
      .then((res) => {
        if (res.isValid) {
          const imageData: UpdatedImageFile[] = res.data.map((image) => ({
            url: `${process.env.NEXT_PUBLIC_APP_URL}${image.url}`,
            fileName: image.fileName,
            data: image.data
          }));
          if (!imageData.length) {
            router.replace('/');
            return noImagesToast();
          }
          setImages(imageData);
        }
      })
      .catch((_) => {
        router.replace('/');
        return invalidUrlToast();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userName, hash, router, noImagesToast, invalidUrlToast, status]);

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
      <div className="items-center justify-center p-4 min-h-screen w-full flex flex-col gap-8 text-center">
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
              zipDownload={zipDownload}
            />
          </div>
        )}
        <Link href={'/'} target="_blank">
          <span
            className="font-semibold text-[#bc9aef] underline decoration-dashed"
            onClick={() => track('WISH_TO_CREATE_YOUR_OWN_CLICKED')}
          >
            Wish to create your own? Click here {'->'}
          </span>
        </Link>
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
    </>
  );
}

export const getServerSideProps = (async (_ctx) => {
  return { props: {} };
}) satisfies GetServerSideProps;
