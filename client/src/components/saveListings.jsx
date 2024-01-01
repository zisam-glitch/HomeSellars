import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

import Header from "../components/Header";
import ListingItem from "../components/SavedListingItem";
import { Link } from "react-router-dom";

export default function SavedListings() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
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

  return (
    <>
      {" "}
      <main>
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {error && (
          <p className="text-center my-7 text-2xl">Something went wrong!</p>
        )}
        {!loading && listing == null && (
          <p className="text-center my-7 text-2xl">No Saved Listing</p>
        )}
        {listing && listing.length > 0 && (
            <div className="">
              
              <div className="flex flex-wrap gap-4">
                {listing.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} isSaved={true} />
                ))}
              </div>
            </div>
          )}
      </main>
    </>
  );
}