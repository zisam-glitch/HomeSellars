import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperNavButtons } from "./SwiperNavButton";

export default function BlogSlider() {
  return (
    <>
      <div>
        <div className="mx-6 md:mx-10 pb-6">
          <h1 className="text-3xl font-semibold pb-4">
            Looking for facts, figures or property advice?
          </h1>
          <p className="text-lg text-black">Just ask DemiSellars.</p>
        </div>
        <div>
          <Swiper spaceBetween={30} slidesPerView="3" className="mx-10 hidden md:block">
            <SwiperSlide>
              <div className="cursor-pointer">
                <div className="rounded-xl h-[248px] w-full bg-cover bg-no-repeat bg-center bg-[url(https://images.ctfassets.net/02vwvgr6spsr/3E7pu3IrZRTedLuInWpSIk/719432b3dc158ecc789a603fcbe8ab65/5._Buckingham_exterior.jpg?fm=avif&w=768&q=50)]"></div>
                <h2 className="pt-6 text-2xl font-semibold pb-2 text-black">
                  Top 8 most affordable coastal towns in England
                </h2>
                <p className="text-lg text-text pb-3">04 December 2023</p>
                <p className="text-lg text-black">
                  Hold onto your (beach) hat because we’ve got news. That slower
                  life by the sea might not be{" "}
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="cursor-pointer">
                <div className="rounded-xl h-[248px] w-full bg-cover bg-no-repeat bg-center bg-[url(https://images.ctfassets.net/02vwvgr6spsr/532dcM4GokDAVuFIFGkX95/3c54e804a605cd81624e89f64c1405f2/shutterstock_2014801118.jpg?fm=avif&w=768&q=50)]"></div>
                <h2 className="pt-6 text-2xl font-semibold pb-2 text-black">
                  Top 8 most affordable coastal towns in England
                </h2>
                <p className="text-lg text-text pb-3">04 December 2023</p>
                <p className="text-lg text-black">
                  Hold onto your (beach) hat because we’ve got news. That slower
                  life by the sea might not be{" "}
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="cursor-pointer">
                <div className="rounded-xl h-[248px] w-full bg-cover bg-no-repeat bg-center bg-[url(https://images.ctfassets.net/02vwvgr6spsr/2iSWSFJ4lzLfCcY1PnavjY/f1715eec3b86f84c5a4336d87e5f0488/GettyImages-691865491.jpg?fm=avif&w=768&q=50)]"></div>
                <h2 className="pt-6 text-2xl font-semibold pb-2 text-black">
                  Top 8 most affordable coastal towns in England
                </h2>
                <p className="text-lg text-text pb-3">04 December 2023</p>
                <p className="text-lg text-black">
                  Hold onto your (beach) hat because we’ve got news. That slower
                  life by the sea might not be{" "}
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="cursor-pointer">
                <div className="rounded-xl h-[248px] w-full bg-cover bg-no-repeat bg-center bg-[url(https://images.ctfassets.net/02vwvgr6spsr/7lXk68YYrd1OZ2lU7c20kW/b364d7545cb23ecbb5ca25ada123d305/6._Norfolk_interior.jpg?fm=avif&w=768&q=50)]"></div>
                <h2 className="pt-6 text-2xl font-semibold pb-2 text-black">
                  Top 8 most affordable coastal towns in England
                </h2>
                <p className="text-lg text-text pb-3">04 December 2023</p>
                <p className="text-lg text-black">
                  Hold onto your (beach) hat because we’ve got news. That slower
                  life by the sea might not be{" "}
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="cursor-pointer">
                <div className="rounded-xl h-[248px] w-full bg-cover bg-no-repeat bg-center bg-[url(https://images.ctfassets.net/02vwvgr6spsr/2M9CGFJm7jMpILIq9UYzpv/51633714c5cf11a8f4c91d1d3ca15422/will-there-be-a-house-price-crash.jpg?fm=avif&w=768&q=50)]"></div>
                <h2 className="pt-6 text-2xl font-semibold pb-2 text-black">
                  Top 8 most affordable coastal towns in England
                </h2>
                <p className="text-lg text-text pb-3">04 December 2023</p>
                <p className="text-lg text-black">
                  Hold onto your (beach) hat because we’ve got news. That slower
                  life by the sea might not be{" "}
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="cursor-pointer">
                <div className="rounded-xl h-[248px] w-full bg-cover bg-no-repeat bg-center bg-[url(https://images.ctfassets.net/02vwvgr6spsr/532dcM4GokDAVuFIFGkX95/3c54e804a605cd81624e89f64c1405f2/shutterstock_2014801118.jpg?fm=avif&w=768&q=50)]"></div>
                <h2 className="pt-6 text-2xl font-semibold pb-2 text-black">
                  Top 8 most affordable coastal towns in England
                </h2>
                <p className="text-lg text-text pb-3">04 December 2023</p>
                <p className="text-lg text-black">
                  Hold onto your (beach) hat because we’ve got news. That slower
                  life by the sea might not be{" "}
                </p>
              </div>
            </SwiperSlide>
            <SwiperNavButtons />
          </Swiper>
        </div>
        <div>
          <Swiper spaceBetween={30} slidesPerView="1" className="mx-6 md:hidden block">
            <SwiperSlide>
              <div className="cursor-pointer">
                <div className="rounded-xl h-[248px] w-full bg-cover bg-no-repeat bg-center bg-[url(https://images.ctfassets.net/02vwvgr6spsr/3E7pu3IrZRTedLuInWpSIk/719432b3dc158ecc789a603fcbe8ab65/5._Buckingham_exterior.jpg?fm=avif&w=768&q=50)]"></div>
                <h2 className="pt-6 text-2xl font-semibold pb-2 text-black">
                  Top 8 most affordable coastal towns in England
                </h2>
                <p className="text-lg text-text pb-3">04 December 2023</p>
                <p className="text-lg text-black">
                  Hold onto your (beach) hat because we’ve got news. That slower
                  life by the sea might not be{" "}
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="cursor-pointer">
                <div className="rounded-xl h-[248px] w-full bg-cover bg-no-repeat bg-center bg-[url(https://images.ctfassets.net/02vwvgr6spsr/532dcM4GokDAVuFIFGkX95/3c54e804a605cd81624e89f64c1405f2/shutterstock_2014801118.jpg?fm=avif&w=768&q=50)]"></div>
                <h2 className="pt-6 text-2xl font-semibold pb-2 text-black">
                  Top 8 most affordable coastal towns in England
                </h2>
                <p className="text-lg text-text pb-3">04 December 2023</p>
                <p className="text-lg text-black">
                  Hold onto your (beach) hat because we’ve got news. That slower
                  life by the sea might not be{" "}
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="cursor-pointer">
                <div className="rounded-xl h-[248px] w-full bg-cover bg-no-repeat bg-center bg-[url(https://images.ctfassets.net/02vwvgr6spsr/2iSWSFJ4lzLfCcY1PnavjY/f1715eec3b86f84c5a4336d87e5f0488/GettyImages-691865491.jpg?fm=avif&w=768&q=50)]"></div>
                <h2 className="pt-6 text-2xl font-semibold pb-2 text-black">
                  Top 8 most affordable coastal towns in England
                </h2>
                <p className="text-lg text-text pb-3">04 December 2023</p>
                <p className="text-lg text-black">
                  Hold onto your (beach) hat because we’ve got news. That slower
                  life by the sea might not be{" "}
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="cursor-pointer">
                <div className="rounded-xl h-[248px] w-full bg-cover bg-no-repeat bg-center bg-[url(https://images.ctfassets.net/02vwvgr6spsr/7lXk68YYrd1OZ2lU7c20kW/b364d7545cb23ecbb5ca25ada123d305/6._Norfolk_interior.jpg?fm=avif&w=768&q=50)]"></div>
                <h2 className="pt-6 text-2xl font-semibold pb-2 text-black">
                  Top 8 most affordable coastal towns in England
                </h2>
                <p className="text-lg text-text pb-3">04 December 2023</p>
                <p className="text-lg text-black">
                  Hold onto your (beach) hat because we’ve got news. That slower
                  life by the sea might not be{" "}
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="cursor-pointer">
                <div className="rounded-xl h-[248px] w-full bg-cover bg-no-repeat bg-center bg-[url(https://images.ctfassets.net/02vwvgr6spsr/2M9CGFJm7jMpILIq9UYzpv/51633714c5cf11a8f4c91d1d3ca15422/will-there-be-a-house-price-crash.jpg?fm=avif&w=768&q=50)]"></div>
                <h2 className="pt-6 text-2xl font-semibold pb-2 text-black">
                  Top 8 most affordable coastal towns in England
                </h2>
                <p className="text-lg text-text pb-3">04 December 2023</p>
                <p className="text-lg text-black">
                  Hold onto your (beach) hat because we’ve got news. That slower
                  life by the sea might not be{" "}
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="cursor-pointer">
                <div className="rounded-xl h-[248px] w-full bg-cover bg-no-repeat bg-center bg-[url(https://images.ctfassets.net/02vwvgr6spsr/532dcM4GokDAVuFIFGkX95/3c54e804a605cd81624e89f64c1405f2/shutterstock_2014801118.jpg?fm=avif&w=768&q=50)]"></div>
                <h2 className="pt-6 text-2xl font-semibold pb-2 text-black">
                  Top 8 most affordable coastal towns in England
                </h2>
                <p className="text-lg text-text pb-3">04 December 2023</p>
                <p className="text-lg text-black">
                  Hold onto your (beach) hat because we’ve got news. That slower
                  life by the sea might not be{" "}
                </p>
              </div>
            </SwiperSlide>
            <SwiperNavButtons />
          </Swiper>
        </div>
      </div>
    </>
  );
}
