import React, { useCallback, useRef } from 'react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { GiShare } from 'react-icons/gi';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle
} from 'react-icons/io';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface SwiperCarouselProps {
  images: string[];
  singleImageSharingCallback: ({ images }: { images: string }) => void;
}

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({
  singleImageSharingCallback,
  images
}) => {
  const sliderRef = useRef<SwiperRef | null>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current?.swiper.slideNext();
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
        {images.map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide-img">
            <GiShare
              size={28}
              fill="rgb(20, 24, 59)"
              className="share-active-image cursor-pointer"
              onClick={() => singleImageSharingCallback({ images: image })}
            />
            {index !== 0 && (
              <IoIosArrowDropleftCircle
                size={36}
                className="prev-arrow right-[90%] sm:right-[102%]"
                onClick={handlePrev}
              />
            )}
            <img src={image} alt={`Slide ${index + 1}`} />
            {index !== images.length - 1 && (
              <IoIosArrowDroprightCircle
                size={36}
                className="next-arrow left-[90%] sm:left-[102%]"
                onClick={handleNext}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
