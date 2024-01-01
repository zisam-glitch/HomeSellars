import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="md:px-10 px-6">
        <div className="flex flex-col gap-6 md:gap-0 md:flex-row md:items-center items-start">
          <div className="md:w-1/3 w-full">
            <h1 className="  font-semibold text-3xl">
              Discover towns and cities
            </h1>
          </div>
          <div className="md:w-1/3 w-full">
            <ul
              className="flex md:justify-center justify-start mb-0 list-none flex-wrap flex-row"
              role="tablist"
            >
              <li className="-mb-px flex text-center">
                <a
                  className={
                    "text-base px-3 py-3 mr-2 rounded-md	" +
                    (openTab === 1
                      ? " text-white  bg-lightblue"
                      : " text-slate-700 font-medium")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  For sale
                </a>
              </li>
              <li className="-mb-px   flex text-center">
                <a
                  className={
                    "text-base  px-5 py-3 rounded-md " +
                    (openTab === 2
                      ? " text-white  bg-lightblue "
                      : " text-slate-700 font-medium")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  To rent
                </a>
              </li>
            </ul>
          </div>
          <div className="md:w-1/3 w-full md:flex hidden  justify-end">
            <a
              className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
              href="/search?searchTerm=Uk&type=sale"
            >
              Explore more towns & cities
            </a>
          </div>
        </div>

        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
          <div className="flex flex-col md:flex-row py-14 border-b-[1px] border-bord">
            <div className="md:w-1/3 w-full pb-6 md:pb-0 flex items-start gap-4">
              <img
                className="w-[80px]"
                src="https://res.cloudinary.com/db1i46uiv/image/upload/v1702061838/phone-booth-svgrepo-com_xfqkyv.svg"
                alt=""
              />
              <div>
                <h2 className="font-semibold text-[27px]">In the city</h2>
                <p className="text-lg">Live among the hustle and bustle</p>
              </div>
            </div>
            <div className="md:w-1/3 w-full ">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=London&type=sale"
                >
                  London properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Leeds&type=sale"
                >
                  Leeds properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Edinburgh&type=sale"
                >
                  Edinburgh properties for sale
                </a>
              </div>
            </div>
            <div className="md:w-1/3 w-full">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Manchester&type=sale"
                >
                  Manchester properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Liverpool&type=sale"
                >
                  Liverpool properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Cardiff&type=sale"
                >
                  Cardiff properties for sale{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row py-14 border-b-[1px] border-bord">
            <div className="md:w-1/3 w-full flex pb-6 md:pb-0 items-start gap-4">
              <img
                className="w-[80px]"
                src="https://res.cloudinary.com/db1i46uiv/image/upload/v1702061838/lighthouse-on-svgrepo-com_clhfdz.svg"
                alt=""
              />
              <div>
                <h2 className="font-semibold text-[27px]">On the coast</h2>
                <p className="text-lg">Wake up to fresh air and sea views</p>
              </div>
            </div>
            <div className="md:w-1/3 w-full ">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Swanse&type=sale"
                >
                  Swansea properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Bristol&type=sale"
                >
                  Bristol properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Hull&type=sale"
                >
                  Hull properties for sale
                </a>
              </div>
            </div>
            <div className="md:w-1/3 w-full">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Southampton&type=sale"
                >
                  Southampton properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Plymouth&type=sale"
                >
                  Plymouth properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Dundee&type=sale"
                >
                  Dundee properties for sale{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row py-14 border-b-[1px] border-bord">
            <div className="md:w-1/3 w-full flex pb-6 md:pb-0 items-start gap-4">
              <img
                className="w-[80px]"
                src="https://res.cloudinary.com/db1i46uiv/image/upload/v1702061838/sydney-opera-house-side-view-svgrepo-com_vrdull.svg"
                alt=""
              />
              <div>
                <h2 className="font-semibold text-[27px]">
                  Rural and countryside
                </h2>
                <p className="text-lg">Enjoy living close to nature</p>
              </div>
            </div>
            <div className="md:w-1/3 w-full ">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Leicester&type=sale"
                >
                  Leicester properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Northampton&type=sale"
                >
                  Northampton properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Kent&type=sale"
                >
                  Kent properties for sale
                </a>
              </div>
            </div>
            <div className="md:w-1/3 w-full">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Cornwall&type=sale"
                >
                  Cornwall properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Essex&type=sale"
                >
                  Essex properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Devon&type=sale"
                >
                  Devon properties for sale{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row py-14 md:border-b-[1px] border-0 border-bord">
            <div className="md:w-1/3 w-full flex pb-6 md:pb-0 items-start gap-4">
              <img
                className="w-[80px]"
                src="https://res.cloudinary.com/db1i46uiv/image/upload/v1702061838/big-ben-svgrepo-com_z7jmkf.svg"
                alt=""
              />
              <div>
                <h2 className="font-semibold text-[27px]">Popular locations</h2>
                <p className="text-lg">Move to a property hotspot</p>
              </div>
            </div>
            <div className="md:w-1/3 w-full ">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Glasgow&type=sale"
                >
                  Glasgow properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Birmingham&type=sale"
                >
                  Birmingham properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Nottingham&type=sale"
                >
                  Nottingham properties for sale
                </a>
              </div>
            </div>
            <div className="md:w-1/3 w-full">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Sheffield&type=sale"
                >
                  Sheffield properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Coventry&type=sale"
                >
                  Coventry properties for sale
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Stoke-on-Trent&type=sale"
                >
                  Stoke-on-Trent properties for sale{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
          <div className="flex flex-col md:flex-row py-14 border-b-[1px] border-bord">
            <div className="md:w-1/3 w-full flex items-start gap-4">
              <img
                className="w-[80px]"
                src="https://res.cloudinary.com/db1i46uiv/image/upload/v1702061838/phone-booth-svgrepo-com_xfqkyv.svg"
                alt=""
              />
              <div>
                <h2 className="font-semibold text-[27px]">In the city</h2>
                <p className="text-lg">Live among the hustle and bustle</p>
              </div>
            </div>
            <div className="md:w-1/3 w-full ">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=London&type=rent"
                >
                  London properties for rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Aberdeen&type=rent"
                >
                  Aberdeen properties to rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Edinburgh&type=rent"
                >
                  Edinburgh properties for rent
                </a>
              </div>
            </div>
            <div className="md:w-1/3 w-full">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Manchester&type=rent"
                >
                  Manchester properties for rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Liverpool&type=rent"
                >
                  Liverpool properties for rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Cardiff&type=rent"
                >
                  Cardiff properties for rent{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row py-14 border-b-[1px] border-bord">
            <div className="md:w-1/3 w-full flex items-start gap-4">
              <img
                className="w-[80px]"
                src="https://res.cloudinary.com/db1i46uiv/image/upload/v1702061838/lighthouse-on-svgrepo-com_clhfdz.svg"
                alt=""
              />
              <div>
                <h2 className="font-semibold text-[27px]">On the coast</h2>
                <p className="text-lg">Wake up to fresh air and sea views</p>
              </div>
            </div>
            <div className="md:w-1/3 w-full ">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Swanse&type=rent"
                >
                  Swansea properties for rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Bristol&type=rent"
                >
                  Bristol properties for rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Hull&type=rent"
                >
                  Hull properties for rent
                </a>
              </div>
            </div>
            <div className="md:w-1/3 w-full">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Southampton&type=rent"
                >
                  Southampton properties for rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Plymouth&type=rent"
                >
                  Plymouth properties for rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Dundee&type=rent"
                >
                  Dundee properties for rent{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row py-14 border-b-[1px] border-bord">
            <div className="md:w-1/3 w-full flex items-start gap-4">
              <img
                className="w-[80px]"
                src="https://res.cloudinary.com/db1i46uiv/image/upload/v1702061838/sydney-opera-house-side-view-svgrepo-com_vrdull.svg"
                alt=""
              />
              <div>
                <h2 className="font-semibold text-[27px]">
                  Rural and countryside
                </h2>
                <p className="text-lg">Enjoy living close to nature</p>
              </div>
            </div>
            <div className="md:w-1/3 w-full ">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Leicester&type=rent"
                >
                  Leicester properties for rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Northampton&type=rent"
                >
                  Northampton properties for rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Kent&type=rent"
                >
                  Kent properties for rent
                </a>
              </div>
            </div>
            <div className="md:w-1/3 w-full">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Cornwall&type=rent"
                >
                  Cornwall properties for rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Essex&type=rent"
                >
                  Essex properties for rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Devon&type=rent"
                >
                  Devon properties for rent{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row py-14 border-b-[1px] border-bord">
            <div className="md:w-1/3 w-full flex items-start gap-4">
              <img
                className="w-[80px]"
                src="https://res.cloudinary.com/db1i46uiv/image/upload/v1702061838/big-ben-svgrepo-com_z7jmkf.svg"
                alt=""
              />
              <div>
                <h2 className="font-semibold text-[27px]">Popular locations</h2>
                <p className="text-lg">Move to a property hotspot</p>
              </div>
            </div>
            <div className="md:w-1/3 w-full ">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Glasgow&type=rent"
                >
                  Glasgow properties for rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Birmingham&type=rent"
                >
                  Birmingham properties for rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Nottingham&type=rent"
                >
                  Nottingham properties for rent
                </a>
              </div>
            </div>
            <div className="md:w-1/3 w-full">
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Sheffield&type=rent"
                >
                  Sheffield properties for rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Coventry&type=rent"
                >
                  Coventry properties for rent
                </a>
              </div>
              <div className="py-4 flex gap-2 items-center">
                <FaArrowRightLong className="text-lighttext" />
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="/search?searchTerm=Stoke+on+Trent&type=rent"
                >
                  Stoke-on-Trent properties for rent{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/3 w-full md:hidden flex  justify-center">
            <a
              className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
              href="/search?searchTerm=Uk&type=sale"
            >
              Explore more towns & cities
            </a>
          </div>
      </div>
    </>
  );
};

export default Tabs;
