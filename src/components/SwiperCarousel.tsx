import React, { useCallback, useRef } from 'react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle
} from 'react-icons/io';
import { UserEmailInputCard } from '@/components/UserEmailInputCard';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ShareButton } from './ShareButton';
import { ImageJson } from '@/types/images';
import { CardTypes, sequence } from '@/types/cards';
import { track } from '@/constants/events';
import { extractFilenameWithoutExtension } from '@/utils/stringHelpers';

interface SwiperCarouselProps {
  images: ImageJson[];
  userName: string;
  singleImageSharingCallback: ({ images }: { images: ImageJson }) => void;
  hideShareButtons?: boolean;
  hideEmailInput?: boolean;
  shareAllUrl?: string;
  zipDownload?: () => void;
}

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({
  singleImageSharingCallback,
  userName,
  images,
  hideShareButtons = false,
  hideEmailInput,
  shareAllUrl,
  zipDownload
}) => {
  const sliderRef = useRef<SwiperRef | null>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current?.swiper.slidePrev();
    track('PREV_IMAGE_CLICKED');
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current?.swiper.slideNext();
    track('NEXT_IMAGE_CLICKED');
  }, []);

  return (
    <div className="swiper-container">
      <Swiper
        ref={sliderRef}
        modules={[EffectCoverflow, Pagination, Navigation]}
        centeredSlides
        grabCursor
        slideToClickedSlide
        coverflowEffect={{
          rotate: 1,
          modifier: 2,
          stretch: 7,
          slideShadows: true
        }}
        effect="coverflow"
        initialSlide={0}
        pagination={{
          clickable: true
        }}
        breakpoints={{
          0: {
            slidesPerView: 1
          },
          450: {
            slidesPerView: 1.2
          },
          560: {
            slidesPerView: 1.4
          },
          650: {
            slidesPerView: 1.8
          },
          750: {
            slidesPerView: 2.1
          },
          920: {
            slidesPerView: 2.5
          },
          1000: {
            slidesPerView: 3
          },
          1400: {
            slidesPerView: 4
          },
          1800: {
            slidesPerView: 5
          }
        }}
      >
        {images.toSorted(sortImageCards).map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide-img">
            {!hideShareButtons && (
              <ShareButton
                shareAllUrl={shareAllUrl}
                userName={userName}
                imageName={extractFilenameWithoutExtension(image.fileName)}
                imageUrl={image.url}
                className="share-active-image cursor-pointer"
                callBack={() => {
                  singleImageSharingCallback({ images: image });
                  track('SINGLE_IMAGE_SHARE_CLICKED');
                }}
                zipDownload={zipDownload}
              />
            )}
            {index !== 0 && (
              <IoIosArrowDropleftCircle
                size={36}
                className="prev-arrow right-[90%] sm:right-[102%] hidden md:block"
                onClick={handlePrev}
              />
            )}
            <img src={image.data} alt={`Slide ${index + 1}`} />
            {(index !== images.length - 1 || !hideEmailInput) && (
              <IoIosArrowDroprightCircle
                size={36}
                className="next-arrow left-[90%] sm:left-[102%] hidden md:block"
                onClick={handleNext}
              />
            )}
          </SwiperSlide>
        ))}
        {!hideEmailInput && (
          <SwiperSlide className="swiper-slide-img email-input-card flex flex-col w-full h-full bg-no-repeat bg-cover bg-center bg-fixed">
            <IoIosArrowDropleftCircle
              size={36}
              className="prev-arrow right-[90%] sm:right-[102%] hidden md:block"
              onClick={handlePrev}
            />
            <UserEmailInputCard />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;

const sortImageCards = (imageA: ImageJson, imageB: ImageJson) => {
  const indexOfA = sequence.indexOf(
    extractFilenameWithoutExtension(imageA.fileName).toUpperCase() as CardTypes
  );

  const indexOfB = sequence.indexOf(
    extractFilenameWithoutExtension(imageB.fileName).toUpperCase() as CardTypes
  );

  return indexOfA - indexOfB;
};
