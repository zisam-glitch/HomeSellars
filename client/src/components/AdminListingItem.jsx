import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import ApproveListing from "./ApproveListing"; // Make sure the path is correct

export default function AdminListingItem({ listing }) {
  return (
    <div className="px-5 shadow-sm py-4 w-full ">
      <div className="flex flex-row gap-4 md:gap-8 w-full items-center justify-center ">
        <div className="md:w-[20%] w-[30%] ">
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

        <div className=" flex flex-col gap-2 md:w-full w-1/2">
          <Link className="flex flex-col gap-2 w-full" to={`/listing/${listing._id}`}>
            <p className="truncate text-lg font-semibold hover:underline capitalize">
              {listing.address}
            </p>
            <div className="flex items-center gap-1">
              <p className="capitalize truncate w-full">{listing.name}</p>
            </div>
            <p className="text-base pr-12 mb-2 text-gray-600 line-clamp-1">
              <div dangerouslySetInnerHTML={{ __html: listing.description }} />
            </p>
          </Link>
        </div>
        <ApproveListing itemId={listing._id} approved={listing.approved} />
      </div>
    </div>
  );
}
