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
import { UpdatedImageFile } from '@/types/images';
import { CardTypes, sequence } from '@/types/cards';
import { track } from '@/constants/events';

interface SwiperCarouselProps {
  images: UpdatedImageFile[];
  singleImageSharingCallback: ({
    images
  }: {
    images: UpdatedImageFile;
  }) => void;
}

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({
  singleImageSharingCallback,
  images
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
          400: {
            slidesPerView: 1.3
          },
          560: {
            slidesPerView: 1.5
          },
          768: {
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
            <ShareButton
              className="share-active-image cursor-pointer"
              callBack={() => {
                singleImageSharingCallback({ images: image });
                track('SINGLE_IMAGE_SHARE_CLICKED');
              }}
            />
            {index !== 0 && (
              <IoIosArrowDropleftCircle
                size={36}
                className="prev-arrow right-[90%] sm:right-[102%]"
                onClick={handlePrev}
              />
            )}
            <img src={image.data} alt={`Slide ${index + 1}`} />

            <IoIosArrowDroprightCircle
              size={36}
              className="next-arrow left-[90%] sm:left-[102%]"
              onClick={handleNext}
            />
          </SwiperSlide>
        ))}
        <SwiperSlide className="swiper-slide-img email-input-card flex flex-col w-full h-full bg-no-repeat bg-cover bg-center bg-fixed">
          <UserEmailInputCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;

const sortImageCards = (imageA: UpdatedImageFile, imageB: UpdatedImageFile) => {
  const indexOfA = sequence.indexOf(
    imageA?.fileName?.split('.')?.[0]?.toUpperCase() as CardTypes
  );
  const indexOfB = sequence.indexOf(
    imageB?.fileName?.split('.')?.[0]?.toUpperCase() as CardTypes
  );
  return indexOfA - indexOfB;
};
