import React from "react";
import { useSwiper } from "swiper/react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

export const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="swiper-nav-btns text-right py-8 px-1">
      <div className="flex gap-4 justify-end">
        <button
          className="text-black bg-transparent py-4 px-4 outline outline-black outline-2 rounded hover:shadow-lg hover:bg-lightblue hover:outline-lightblue hover:text-white"
          onClick={() => swiper.slidePrev()}
        >
          <div>
            <FaArrowLeftLong />
          </div>
        </button>
        <button
          className="text-black bg-transparent py-4 px-4 outline outline-black outline-2 rounded hover:shadow-lg hover:bg-lightblue hover:outline-lightblue hover:text-white"
          onClick={() => swiper.slideNext()}
        >
          <div>
            <FaArrowRightLong />
          </div>
        </button>
      </div>
    </div>
  );
};
