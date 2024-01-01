import { Dropdown, DropdownItem } from "flowbite-react";
import TownsAnsCities from "../components/TownsAndCities";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TiHeartFullOutline } from "react-icons/ti";
import ListingItem from "../components/ListingItem";
import SaveListingItem from "../components/SaveListingItem";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { IoBookmark } from "react-icons/io5";

import "swiper/css/bundle";

export default function Search() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/saved`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setError(false);
        if (data.length > 0) {
          setListing(data);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search );
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <>
      <Header />

      <div className="flex flex-col">
      <div className="md:px-10 px-6 md:py-7 py-4 md:hidden block  border-b-2">
          <form onSubmit={handleSubmit} className="flex flex-row gap-[3%]">
            <div className="flex flex-col gap-2 w-[72%]">
             
              <input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className="outline-sec rounded-lg w-full"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>
          
            <div className=" flex flex-col gap-2 w-[25%]">
             
              <button className="w-full bg-lightblue text-white p-3 rounded-[2px] hover:opacity-95">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="px-10 py-7 hidden md:block  border-b-2">
          <form onSubmit={handleSubmit} className="flex flex-row gap-[3%]">
            <div className="flex flex-col gap-2 w-[25%]">
              <label className=" text-lg pl-1 whitespace-nowrap font-semibold">
                Enter a location
              </label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className="outline-sec rounded-lg w-full"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-[17.5%]">
              <label className=" text-lg pl-1 whitespace-nowrap font-semibold">
                Property type
              </label>
              <Dropdown className="moe" label="Show all" dismissOnClick={false}>
                <DropdownItem>
                  {" "}
                  <div className="flex gap-10 flex-wrap items-center p-4 ">
                    <div className="grid gap-4">
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          id="all"
                          className="w-5"
                          onChange={handleChange}
                          checked={sidebardata.type === "all"}
                        />
                        <span>Rent & Sale</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          id="rent"
                          className="w-5"
                          onChange={handleChange}
                          checked={sidebardata.type === "rent"}
                        />
                        <span>Rent</span>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          id="sale"
                          className="w-5"
                          onChange={handleChange}
                          checked={sidebardata.type === "sale"}
                        />
                        <span>Sale</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          id="offer"
                          className="w-5"
                          onChange={handleChange}
                          checked={sidebardata.offer}
                        />
                        <span>Offer</span>
                      </div>
                    </div>
                  </div>
                </DropdownItem>
              </Dropdown>
            </div>
            <div className="flex flex-col gap-2  w-[17.5%]">
              <label className=" text-lg pl-1 whitespace-nowrap font-semibold">
                Amenities
              </label>
              <Dropdown className="moe" label="Show all" dismissOnClick={false}>
                <DropdownItem>
                  {" "}
                  <div className="flex gap-10 flex-wrap items-center p-4 ">
                    <div className="grid gap-4">
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          id="parking"
                          className="w-5"
                          onChange={handleChange}
                          checked={sidebardata.parking}
                        />
                        <span>Parking</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          id="furnished"
                          className="w-5"
                          onChange={handleChange}
                          checked={sidebardata.furnished}
                        />
                        <span>Furnished</span>
                      </div>
                    </div>
                  </div>
                </DropdownItem>
              </Dropdown>
            </div>

            {/* <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Type:</label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === "all"}
                />
                <span>Rent & Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === "sale"}
                />
                <span>Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.offer}
                />
                <span>Offer</span>
              </div>
            </div> */}
            {/* <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Amenities:</label>
              
            </div> */}
            <div className="flex flex-col gap-2 w-[17.5%]">
              <label className=" text-lg pl-1 whitespace-nowrap font-semibold">
                Sort
              </label>
              <select
                onChange={handleChange}
                defaultValue={"created_at_desc"}
                id="sort_order"
                className=" sort rounded-[2px] paddomg"
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to hight</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <div className=" flex flex-col gap-2 w-[10.5%]">
              <label className=" text-lg pl-1 whitespace-nowrap font-semibold">
                .
              </label>
              <button className="w-full bg-lightblue text-white p-3 rounded-[2px] hover:opacity-95">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className=" bg-background flex-1">
          <main>
            {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
            {error && ""}
            {!loading && listing == null && ""}
            {listing && listing.length > 0 && (
              <div className="mx-10 hidden md:flex rounded-xl bg-white p-8  flex-col gap-2 mt-10">
                <div className="">
                  <h2 className=" flex justify-between text-lightblue">
                    <div className="  px-4 rounded-[8px] flex gap-1 items-center">
                      <span>
                        <IoBookmark />
                      </span>
                      <span className="text-lg font-semibold">Saved</span>
                    </div>
                    <Link to="/listing/saved">
                      <h4 className="text-lg underline font-semibold pr-2 text-black">
                        Show all
                      </h4>
                    </Link>
                  </h2>
                </div>
                <div className="flex gap-[2%]">
                  {listing.slice(0, 4).map((listing) => (
                    <SaveListingItem
                      listing={listing}
                      key={listing._id}
                      isSaved={true}
                    />
                  ))}
                </div>
              </div>
            )}
          </main>
          <div className="md:flex md:px-10 px-6 md:py-20 py-10 block gap-[5%]">
            <div className=" md:w-[70%] w-full  flex flex-col gap-12">
              {!loading && listings.length === 0 && (
                <div className="w-full flex-col gap-4 flex justify-center p-20 items-center">
                  <p className="  text-xl text-slate-700">
                    We have found no results for '{sidebardata.searchTerm}'!
                  </p>
                  <p className="">
                    Please select one of the locations below or start search
                    again.
                  </p>
                </div>
              )}
              {loading && (
                <p className="text-xl text-slate-700 text-center w-full">
                  Loading...
                </p>
              )}

              {!loading &&
                listings &&
                listings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}

              {showMore && (
                <button
                  onClick={onShowMoreClick}
                  className="text-green-700 hover:underline p-7 text-center w-full"
                >
                  Show more
                </button>
              )}
            </div>
            <div className="w-[25%] hidden md:block ">
              <div className="mx-5 rounded-xl mb-8 p-8 bg-white">
                <div className=" ">
                  <div>
                    <h5 className="font-bold text-xl pb-2 ">In the city</h5>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=London "
                    >
                      London properties{" "}
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Liverpool "
                    >
                      Liverpool properties{" "}
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Cardiff "
                    >
                      Cardiff properties{" "}
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Leeds "
                    >
                      Leeds properties{" "}
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Edinburgh "
                    >
                      Edinburgh properties{" "}
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Manchester "
                    >
                      Manchester properties{" "}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mx-5 rounded-xl mb-8 p-8 bg-white">
                <div className=" ">
                  <div>
                    <h5 className="font-bold text-xl pb-2 ">On the coast</h5>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Swansea "
                    >
                      Swansea properties
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Bristol "
                    >
                      Bristol properties
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Hull "
                    >
                      Hull properties
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Southampton "
                    >
                      Southampton properties
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Plymouth "
                    >
                      Plymouth properties
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Dundee "
                    >
                      Dundee properties{" "}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mx-5 rounded-xl mb-8 p-8 bg-white">
                <div className=" ">
                  <div>
                    <h5 className="font-bold text-xl pb-2 ">
                      Rural and countryside
                    </h5>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Leicester"
                    >
                      Leicester properties
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Northampton "
                    >
                      Northampton properties
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Kent "
                    >
                      Kent properties
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Cornwall "
                    >
                      Cornwall properties
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Essex "
                    >
                      Essex properties
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Devon "
                    >
                      Devon properties{" "}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mx-5 rounded-xl mb-8 p-8 bg-white">
                <div className=" ">
                  <div>
                    <h5 className="font-bold text-xl pb-2 ">
                      Popular locations
                    </h5>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Glasgow"
                    >
                      Glasgow properties
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Birmingham "
                    >
                      Birmingham properties
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Nottingham "
                    >
                      Nottingham properties
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Sheffield "
                    >
                      Sheffield properties
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Coventry "
                    >
                      Coventry properties
                    </a>
                  </div>
                  <div className="py-4 flex gap-2 items-center">
                    <a
                      className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                      href="/search?searchTerm=Stoke+on+Trent "
                    >
                      Stoke-on-Trent{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <TownsAnsCities />
      </div>
      <Footer />
    </>
  );
}
