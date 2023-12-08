import React, { useCallback, useRef } from 'react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
          <div className="share-active-image">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              fill="none"
            >
              <g filter="url(#a)">
                <circle cx="40" cy="31" r="22" fill="#fff" />
              </g>
              <path
                fill="#14183B"
                d="M45 35.08c-.76 0-1.44.3-1.96.77l-7.13-4.15c.05-.23.09-.46.09-.7 0-.24-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7l-7.05 4.11c-.54-.5-1.25-.81-2.04-.81-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92 0-1.61-1.31-2.92-2.92-2.92Z"
              />
              <defs>
                <filter
                  id="a"
                  width="80"
                  height="80"
                  x="0"
                  y="0"
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="9" />
                  <feGaussianBlur stdDeviation="9" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                  <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_2327_9417"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_2327_9417"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          {index !== 0 && (
            <div className="prev-arrow" onClick={handlePrev}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="83"
                height="84"
                fill="none"
              >
                <g filter="url(#a)">
                  <rect
                    width="48"
                    height="47"
                    x="18"
                    y="57"
                    fill="#14183B"
                    rx="23.5"
                    transform="rotate(-90 18 57)"
                  />
                  <path
                    fill="#fff"
                    d="M57.167 33c0 8.82-7.03 16-15.667 16-8.636 0-15.666-7.18-15.666-16s7.03-16 15.666-16c8.637 0 15.667 7.18 15.667 16Zm3.917 0c0-11.04-8.774-20-19.584-20s-19.583 8.96-19.583 20S30.69 53 41.5 53c10.81 0 19.584-8.96 19.584-20ZM41.5 35h5.875c1.077 0 1.959-.9 1.959-2s-.882-2-1.959-2H41.5v-3.58c0-.9-1.057-1.34-1.664-.7l-5.464 5.58c-.392.4-.392 1.02 0 1.42l5.464 5.58c.607.62 1.664.18 1.664-.72V35Z"
                  />
                </g>
                <defs>
                  <filter
                    id="a"
                    width="83"
                    height="84"
                    x="0"
                    y="0"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="9" />
                    <feGaussianBlur stdDeviation="9" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                    <feBlend
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2327_9399"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2327_9399"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          )}

          <img src={image} alt={`Slide ${index + 1}`} />
          {index !== images.length - 1 && (
            <div className="next-arrow" onClick={handleNext}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="85"
                height="84"
                fill="none"
              >
                <g filter="url(#a)">
                  <rect
                    width="48"
                    height="49"
                    x="67"
                    y="9"
                    fill="#14183B"
                    rx="24"
                    transform="rotate(90 67 9)"
                  />
                  <path
                    fill="#fff"
                    d="M26.167 33c0-8.82 7.33-16 16.333-16 9.004 0 16.334 7.18 16.334 16S51.504 49 42.5 49c-9.003 0-16.333-7.18-16.333-16Zm-4.083 0c0 11.04 9.146 20 20.416 20s20.417-8.96 20.417-20S53.77 13 42.5 13c-11.27 0-20.416 8.96-20.416 20ZM42.5 31h-6.125c-1.123 0-2.041.9-2.041 2s.918 2 2.041 2H42.5v3.58c0 .9 1.103 1.34 1.736.7l5.696-5.58a.976.976 0 0 0 0-1.42l-5.696-5.58c-.633-.62-1.736-.18-1.736.72V31Z"
                  />
                </g>
                <defs>
                  <filter
                    id="a"
                    width="85"
                    height="84"
                    x="0"
                    y="0"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="9" />
                    <feGaussianBlur stdDeviation="9" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                    <feBlend
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2327_9397"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2327_9397"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCarousel;
