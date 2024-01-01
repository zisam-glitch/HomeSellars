import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Header from "../components/Header";
import AdminListingItem from "../components/AdminListingItem";
import { Link } from "react-router-dom";

export default function ManageListings() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/requests`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
  
        // If there is a createdAt property, sort by it in descending order
        const sortedListings = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
  
        console.log(sortedListings[0].regularPrice.toLocaleString("en-US"));
        setListing(sortedListings);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
  
    fetchListing();
  }, [params.listingId]);

  return (
    <>
      <main>
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {error && (
          <p className="text-center my-7 text-2xl">Something went wrong!</p>
        )}
        {!loading && !listing && (
          <p className="text-center my-7 text-2xl">No Listing</p>
        )}
        {listing && listing.length > 0 && (
          <div className=" gap-8">
            
            <div className="flex flex-wrap gap-4">
              {listing.map((listing) => (
                <AdminListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
