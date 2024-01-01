import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import BlogSlider from "../components/BlogSlider";
import TownsAnsCities from "../components/TownsAndCities";
import Search from "../components/Search";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <>
      <Header />
      <div>
        {/* top */}
        <div className="md:bg-center bg-top bg-contain md:bg-cover bg-no-repeat	bg-[url(https://images.pexels.com/photos/813362/pexels-photo-813362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] ">
          <div className="bg-overley  flex flex-col gap-4 md:py-28 md:px-3 pt-48 p-0 max-w-full mx-auto">
            <div className="bg-white md:bg-transparent rounded-xl shadow-lg flex flex-col gap-4 ">
              <h1 className="md:text-white text-black font-semibold pt-6 px-6 md:p-0 md:font-bold text-3xl md:text-4xl md:text-center">
                Demi Sellars: Leading UK Estate Agent
              </h1>
              <div className="md:text-white text-black font-normal md:font-semibold text-start md:text-center px-6 md:p-0 text-lg md:text-lg">
                Find homes to buy or rent and check house prices
              </div>

              <Search />
            </div>
          </div>
        </div>
        {currentUser ? (
          <></>
        ) : (
          <div className="flex md:flex-row flex-col items-center gap-6 md:gap-2 mx-6 md:mx-10 bg-purple mt-20 rounded-xl">
            <div className="md:w-1/2 w-full">
              <div className="p-6">
                <h1 className="font-semibold text-3xl pb-4">
                  Sign in to save your faves
                </h1>
                <p className="text-lg text-black pb-5 ">
                  Access house price estimates, save properties and searches,
                  and get instant alerts for new listings and price reductions.
                </p>
                <button className="text-black flex gap-2 justify-center items-center bg-transparent py-2 px-5 outline outline-black outline-2 rounded hover:shadow-lg hover:bg-lightblue hover:outline-lightblue hover:text-white">
                  <span className="font-medium text-lg">
                    Sign in or register
                  </span>
                </button>
              </div>
            </div>
            <div className="md:w-1/2 w-full ">
              <img
                src="https://res.cloudinary.com/db1i46uiv/image/upload/v1701812620/Asset_3-svg_p5zdjb.svg"
                alt=""
              />
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center md:gap-2 gap-6 md:px-10 px-6 py-20">
          <div className="md:w-1/2 w-full">
            <h1 className="font-semibold text-3xl pb-4">
              Welcome to Demi Sellars Realty
            </h1>
            <p className="text-lg text-black pb-5 pr-0 md:pr-8">
              Demi Sellars, where your property dreams become reality. As the
              UK's leading estate agent, Demi Sellars has redefined property
              buying, selling, and renting with an innovative, client-focused
              approach. Discover a world of exclusive properties and bespoke
              services tailored to your needs.
            </p>
            <button className="text-black flex gap-2 justify-center items-center bg-white py-2 px-5 outline outline-black outline-2 rounded hover:shadow-lg hover:bg-lightblue hover:outline-lightblue hover:text-white">
              <span className="font-medium text-lg">Learm more about us</span>
            </button>
          </div>
          <div className="md:w-1/2 w-full ">
            <img
              className="rounded-xl"
              src="https://res.cloudinary.com/db1i46uiv/image/upload/v1701814032/pexels-andrea-piacquadio-3768146_bzd1kf.jpg"
              alt=""
            />
          </div>
        </div>
        <BlogSlider />
        <div className="flex flex-col md:flex-row items-center gap-2 md:mx-10 mx-6 bg-yellow mt-20 rounded-xl">
          <div className="md:w-1/2 w-full">
            <div className="p-6">
              <h1 className="font-semibold text-3xl pb-4">
                Thinking of selling?
              </h1>
              <p className="text-lg text-black pb-5 ">
                Get the ball rolling with an in-person valuation of your home.
                It’s free and there’s no obligation to sell if you change your
                mind.
              </p>
              <button className="text-black flex gap-2 justify-center items-center bg-transparent py-2 px-5 outline outline-black outline-2 rounded hover:shadow-lg hover:bg-lightblue hover:outline-lightblue hover:text-white">
                <span className="font-medium text-lg">
                  Get a free agent valuation
                </span>
              </button>
            </div>
          </div>
          <div className="md:w-1/2 w-full ">
            <img
              src="https://res.cloudinary.com/db1i46uiv/image/upload/v1701900629/Asset_1-svg_upk5bt.svg"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:gap-2 gap-6 md:px-10 px-6 py-20">
          <div className="md:w-1/2 w-full">
            <h1 className="font-semibold text-3xl pb-4">
              Explore our area guides
            </h1>
            <p className="text-lg text-black pb-5 pr-8">
              Ready to up sticks to somewhere new? Allow our area guides to
              help. With all the latest info on local schools, transport,
              popular places to live and of course, house prices, we've got
              everything you need to begin your relocation adventure.
            </p>
            <button className="text-black flex gap-2 justify-center items-center bg-white py-2 px-5 outline outline-black outline-2 rounded hover:shadow-lg hover:bg-lightblue hover:outline-lightblue hover:text-white">
              <span className="font-medium text-lg">Explore area guides</span>
            </button>
          </div>
          <div className="md:w-1/2 w-full ">
            <img
              className="rounded-xl"
              src="https://images.ctfassets.net/02vwvgr6spsr/4TTxkncNLLK14frkqvDzXL/c380b1fe8ebac142ef0c7128c3ec3c66/Activity-bicycle-women.png?q=50&w=768&fm=avif"
              alt=""
            />
          </div>
        </div>
        <TownsAnsCities />

        <Footer />
        {/* swiper */}

        {/* <Swiper navigation>
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[500px]"
                  key={listing._id}
                ></div>
              </SwiperSlide>
            ))}
        </Swiper> */}

        {/* <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          {offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent offers
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}
                >
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for rent
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?type=rent"}
                >
                  Show more places for rent
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for sale
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?type=sale"}
                >
                  Show more places for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div> */}
      </div>
    </>
  );
}
