import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Services() {
  return (
    <>

      <Header />
      <div className=" flex flex-col md:flex-row bg-purple">
        <div className="md:w-1/2 w-full h-80 md:h-auto bg-cover bg-center bg-[url(https://images.ctfassets.net/02vwvgr6spsr/1CUg99fiaZjIQdJ2WAZz4b/9fca892c843cff3a62bbf35881e98f5c/just-ask-zoopla-estate-agent.jpg?fm=avif&w=768&q=50)]"></div>
        <div className="md:w-1/2 w-full px-6 py-10 md:p-16">
          <h2 className="font-semibold md:text-[34px] text-3xl md:py-5 pt-0 pb-2">
            Premium Property Sales
          </h2>
          <p className="text-lg text-black pb-5">
            Discover a world of elegance with Demi Sellars Realty's Premium
            Property Sales service. We take pride in showcasing the finest homes
            in sought-after locations across the UK. Our team of seasoned real
            estate professionals is dedicated to curating a portfolio of homes
            that epitomize luxury, style, and unparalleled craftsmanship.
            Whether you're searching for a contemporary urban residence or a
            tranquil countryside estate, our extensive collection ensures that
            your dream home is just a step away. Trust us to guide you through a
            seamless buying experience, where every transaction reflects our
            commitment to excellence.
          </p>
        </div>
      </div>
      <div className=" flex flex-col-reverse md:flex-row gap-10 md:mx-10 mx-6 md:my-24 my-20 rounded-xl">
        <div className="md:w-1/2 w-full  md:py-10 md:pr-10 p-0">
          <h1 className="font-semibold text-3xl pb-4">
            Bespoke Renting Solutions:
          </h1>
          <p className="text-lg text-black md:pr-8 p-0">
            At Demi Sellars Realty, we understand that your lifestyle is unique,
            and so should be your residence. Our Bespoke Renting Solutions offer
            a range of rental options tailored to suit your individual
            preferences. From luxurious apartments in the heart of the city to
            charming country homes that offer a retreat from the bustling urban
            life, we have a diverse selection of rental properties to cater to
            every taste. Let us assist you in finding the perfect rental home
            that aligns with your lifestyle and aspirations, ensuring your
            living experience is nothing short of extraordinary.
          </p>
        </div>
        <div className="md:w-1/2 w-full h-80 md:h-auto rounded-xl bg-cover bg-center bg-[url(https://www.trainerbubble.com/wp-content/uploads/edd/2018/11/shutterstock_547753810.jpg.webp)]"></div>
      </div>
      <div className=" flex flex-col md:flex-row gap-10 md:mx-10 mx-6 md:my-24 my-20 rounded-xl">
        <div className="md:w-1/2 w-full h-80 md:h-auto rounded-xl bg-cover bg-center bg-[url(https://images.pexels.com/photos/3625734/pexels-photo-3625734.jpeg?auto=compress&cs=tinysrgb&w=400)]"></div>
        <div className="md:w-1/2 w-full md:p-10 p-0">
          <h1 className="font-semibold text-3xl pb-4">Market Analysis:</h1>
          <p className="text-lg text-black md:pr-8 pr-0">
            Stay ahead of the curve with Demi Sellars Realty's Market Analysis
            service. Our team provides up-to-date insights on market trends and
            property values, empowering you with the knowledge needed to make
            strategic real estate decisions. Whether you are buying, selling, or
            investing, our comprehensive market analysis ensures that you are
            well-informed every step of the way. Trust us to provide the
            intelligence you need to navigate the dynamic real estate landscape
            successfully. <br /> <br />
            At Demi Sellars Realty, our services extend beyond transactions; we
            are dedicated to building lasting relationships and ensuring that
            your property journey is not only successful but also a testament to
            our core values of integrity, innovation, and in-depth market
            knowledge.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 md:mx-10 mx-6 bg-yellow md:mt-20 rounded-xl">
        <div className="md:w-1/2 w-full">
          <div className="p-6">
            <h1 className="font-semibold text-3xl pb-4 pt-5">
              Investment Opportunities:
            </h1>
            <p className="text-lg text-black pb-5 ">
              Unlock the potential of your financial portfolio with Demi Sellars
              Realty's Investment Opportunities service. Our team of experts
              provides insightful advice on property investments to maximize
              returns. Whether you are a seasoned investor or a first-time buyer
              looking to explore the world of real estate investment, we offer
              personalized guidance to help you make informed decisions. From
              identifying lucrative opportunities to navigating the complexities
              of the market, our commitment is to see your investments thrive.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 w-full">
          <img
            src="https://res.cloudinary.com/db1i46uiv/image/upload/v1702473524/Artboard_1_qoej7u.png"
            alt=""
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
