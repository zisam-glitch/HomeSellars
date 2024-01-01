// SimilarListings.jsx
import React, { useEffect, useState } from "react";
import SimilarListingsItem from "./SimilarListingItem";

const SimilarListings = ({ listingId }) => {
  const [similarListings, setSimilarListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSimilarListings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/postcode/${listingId}`);
        const data = await res.json();
        setSimilarListings(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching similar listings:", error);
        setLoading(false);
      }
    };

    if (listingId) {
      fetchSimilarListings();
    }
  }, [listingId]);

  return (
  <div>
      {loading && <p className="text-white">Loading...</p>}
      {!loading && similarListings.length === 0 && (
      ''
      )}
      {!loading && similarListings.length > 0 && (
        <>
        <div className=" rounded-xl bg-footer py-14 md:px-10 px-6 flex flex-col gap-2 my-10">
          <h2 className="text-2xl font font-semibold pb-4">Similar Properties</h2>
          <div className="flex md:flex-row flex-col justify-between gap-6 md:gap-[2%]">
            {similarListings.slice(0, 4).map((listing) => (
              <SimilarListingsItem key={listing._id} listing={listing} />
            ))}
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SimilarListings;
