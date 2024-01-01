import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubLight } from "react-icons/pi";
import { PiArmchairLight } from "react-icons/pi";
import ApproveListing from "./ApproveListing"; // Make sure the path is correct

export default function AdminListingItem({ listing }) {
  return (
    <div className="px-5 shadow-sm py-4 w-full ">
      <div className="flex flex-row md:gap-8 gap-[4%] w-full items-center justify-center ">
        <div className="w-[20%]">
          <Link to={`/listing/${listing._id}`}>
            <img
              src={
                listing.imageUrls[0] ||
                "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
              }
              alt="listing cover"
              className="h-24 w-full object-cover"
            />{" "}
          </Link>
        </div>

        <div className="w-[76%] flex flex-col gap-2 md:w-full">
          <Link className="flex flex-col gap-2 w-full" to={`/listing/${listing._id}`}>
            <p className="truncate text-lg font-semibold hover:underline capitalize">
              {listing.address} <span className="text-lightblue "> (saved)</span>
            </p>
            <div className="text-slate-700 flex md:gap-6 gap-3">
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
            <div className="flex items-center gap-1"><MdLocationOn/>
              <p className="capitalize truncate w-full"> {listing.name}</p>
            </div>
            
          </Link>
        </div>
        
      </div>
    </div>
  );
}
