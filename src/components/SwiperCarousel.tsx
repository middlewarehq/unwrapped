import React, { useCallback, useRef } from 'react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { FaCircleArrowRight, FaCircleArrowLeft } from 'react-icons/fa6';
import { GiShare } from 'react-icons/gi';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';

interface SwiperCarouselProps {
  images: string[];
}

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({ images }) => {
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
        initialSlide={images.length / 2}
        pagination={{
          clickable: true
        }}
        breakpoints={{
          400: {
            slidesPerView: 1.5
          },
          560: {
            slidesPerView: 1.5
          },
          768: {
            slidesPerView: 2.5
          },
          1024: {
            slidesPerView: images.length > 3 ? images.length - 1 : images.length
          }
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide-img">
            <GiShare
              size={28}
              fill="rgb(20, 24, 59)"
              className="share-active-image"
            />
            {index !== 0 && (
              <FaCircleArrowLeft
                size={36}
                className="prev-arrow"
                onClick={handlePrev}
              />
            )}
            <Image src={image} alt={`Slide ${index + 1}`} />
            {index !== images.length - 1 && (
              <FaCircleArrowRight
                size={36}
                className="next-arrow"
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
