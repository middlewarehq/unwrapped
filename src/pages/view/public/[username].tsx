import { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { handleRequest } from '@/utils/axios';
import { LoaderWithFacts } from '@/components/LoaderWithFacts';
import SwiperCarousel from '@/components/SwiperCarousel';
import { useImageDownloader } from '@/hooks/useImageDownloader';
import Confetti from 'react-confetti';
import { ImageFile } from '@/types/images';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { track } from '@/constants/events';
import { usePrebuiltToasts } from '@/hooks/usePrebuiltToasts';

export default function StatsUnwrapped() {
  const router = useRouter();
  const { noImagesToast, invalidUrlToast } = usePrebuiltToasts();
  const [isLoading, setIsLoading] = useState(true);
  const downloadImage = useImageDownloader();

  const userName = router.query.username as string;
  const [images, setImages] = useState<ImageFile[] | null>(null);
  const [shareAll, setShareAll] = useState('');

  useEffect(() => {
    if (!userName) return;
    setIsLoading(true);
    handleRequest<{
      shareAllUrl: string;
      data: ImageFile[];
    }>('/api/download', {
      method: 'GET',
      params: {
        username: userName,
        ispublic: true
      }
    })
      .then((res) => {
        if (!res.data.length) {
          router.replace('/');
          return noImagesToast();
        }
        const imageData: ImageFile[] = res.data.map((image) => ({
          url: `${process.env.NEXT_PUBLIC_APP_URL}${image.url}`,
          fileName: image.fileName,
          data: image.data
        }));
        setImages(imageData);
        setShareAll(process.env.NEXT_PUBLIC_APP_URL + res.shareAllUrl);
      })
      .catch((_) => {
        router.replace('/');
        return invalidUrlToast();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userName, router, noImagesToast, invalidUrlToast]);

  const Header = () => (
    <>
      <NextSeo
        title={`${userName}'s Unwrapped 2023`}
        description={`${userName}'s 2023 on GitHub Unwrapped, by Middleware. It's like Spotify Wrapped, but for developers. You'll love it.`}
        openGraph={{
          type: 'website',
          url: `${process.env.NEXT_PUBLIC_APP_URL}/view/public/${userName}`,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_APP_URL}/api/get_cover/public/${userName}`
            }
          ]
        }}
        twitter={{
          cardType: 'summary_large_card',
          site: `${process.env.NEXT_PUBLIC_APP_URL}/view/public/${userName}`,
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
              userName={userName}
              images={images}
              singleImageSharingCallback={downloadImage}
              shareAllUrl={shareAll}
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
