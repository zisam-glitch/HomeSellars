import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubLight } from "react-icons/pi";
import { PiArmchairLight } from "react-icons/pi";

import HeartIcon from "./HeartIcon"; // Make sure the path is correct

export default function ListingItem({ listing }) {
  return (
    <>
      <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full">
        <Link to={`/listing/${listing._id}`}>
          <div className="flex md:flex-row flex-col gap-6">
            <img
              src={
                listing.imageUrls[0] ||
                "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
              }
              alt="listing cover"
              className="md:w-[55%] w-full md:h-[320px] h-[250px] object-cover "
            />
            <div className="flex items-center">
              <div className="md:py-10 px-4 pb-4 flex flex-col gap-4 w-full">
                <p className="text-black mt-2 text-[28px] font-semibold ">
                  £
                  {listing.offer
                    ? listing.discountPrice.toLocaleString("GBP")
                    : listing.regularPrice.toLocaleString("GBP")}
                  {listing.type === "rent" && " / month"}
                </p>
                <div className="text-slate-700 flex gap-3">
                  <div className=" flex gap-2 items-center font-normal text-lg">
                    <IoBedOutline />
                    {listing.bedrooms > 1
                      ? `${listing.bedrooms} beds `
                      : `${listing.bedrooms} bed `}
                  </div>
                  <div className=" flex gap-2 items-center font-normal text-lg">
                    <PiBathtubLight />
                    {listing.bathrooms > 1
                      ? `${listing.bathrooms} baths `
                      : `${listing.bathrooms} bath `}
                  </div>
                  <div>
                    {listing.reception > 0 ? (
                      <div className=" flex gap-2 items-center font-normal text-lg">
                        <PiArmchairLight /> {listing.reception} reception
                      </div>
                    ) : (
                      ``
                    )}
                  </div>
                </div>
                <p className="pr-12 text-2xl font-semibold text-slate-700">
                  {listing.address}
                </p>
                <div className="flex items-center gap-1">
                  <MdLocationOn className="h-4 w-4 text-green-700" />
                  <p className="text-base text-gray-600 truncate w-full">
                    {listing.name}
                  </p>
                </div>
                <p className="text-base pr-12 mb-2 text-gray-600 line-clamp-4">
                  <div
                    dangerouslySetInnerHTML={{ __html: listing.description }}
                  />
                </p>
              </div>
            </div>
          </div>
        </Link>

        {/* <HeartIcon itemId={listing._id} isSaved={listing.isSaved} /> */}
      </div>
    </>
  );
}
