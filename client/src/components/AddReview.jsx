import React, { useState } from "react";
import { useSelector } from "react-redux";
import StarRating from "./StarRating";

const AddReview = ({ addReview }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      addReview({ star: rating, comment });

      setRating(5);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleAddReview} className="my-6 flex flex-col gap-8">
      <figure className="flex flex-row gap-4 ">
        <img
          src={currentUser?.avatar}
          alt=""
          className="rounded-full border border-black w-32 "
        />
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Review</h2>
          <div className="flex items-center mb-4 gap-1">
            <label className="mr-2">
              Your Rating:
              <StarRating onRate={setRating} rate={rating} />
            </label>
          </div>
        </div>
      </figure>
      <div className="mb-4">
        <label className="mr-2">
          Your Review:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="border p-2 rounded-md w-full mb-4"
          ></textarea>
        </label>
        <button className="bg-green border border-slate-400 text-white rounded-lg px-4 py-2 hover:opacity-75">
          Add Review
        </button>
      </div>
    </form>
  );
};

export default AddReview;
