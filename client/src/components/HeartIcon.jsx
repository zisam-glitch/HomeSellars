// HeartIcon.js

import { useState } from "react";
import { useSelector } from "react-redux";
import { IoBookmark } from "react-icons/io5";
import { MdBookmarkBorder } from "react-icons/md";
import { Link } from "react-router-dom";

const HeartIcon = ({ itemId, isSaved }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isFavorited, setIsFavorited] = useState(isSaved || false);

  const handleFavorite = async () => {
    try {
      // Make a request to your Express.js server to add the item to the favorites list
      const response = await fetch("/api/listing/wishlist/" + itemId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, isSaved: !isFavorited }),
      });

      if (response.ok) {
        // Update the state to reflect that the item is now favorited
        setIsFavorited(!isFavorited);
      } else {
        console.error("Failed to favorite item:", response.statusText);
      }
    } catch (error) {
      console.error("Error favoriting item:", error);
    }
  };

  return (
    <div>
      {currentUser ? (
        <span onClick={handleFavorite} style={{ cursor: "pointer" }}>
          {isFavorited ? (
            <>
              <div className="flex gap-2 items-center text-lightblue ">
                <IoBookmark className="md:text-xl " />
                <span className="  md:text-lg">Saved</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2 items-center">
                <MdBookmarkBorder className="md:text-xl" />
                <span className="md:text-lg">Save</span>
              </div>
            </>
          )}
        </span>
      ) : (
        <Link to="/sign-in">
        <div className="flex gap-1 items-center">
          <MdBookmarkBorder className="text-xl" />
          <span className="text-lg">Save</span>
        </div>
        </Link>
      )}
    </div>
  );
};

export default HeartIcon;
