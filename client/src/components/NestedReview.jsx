import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaHeart, FaMinus, FaReply, FaStar } from "react-icons/fa";
import StarRating from "./StarRating";

const NestedReview = ({ review, handleReply, replies, handleDelete }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [rating, setRating] = useState(5);
  const [showInputReply, setShowInputReply] = useState(false);
  const [text, setText] = useState("");
  const [fade, setFade] = useState(false);
  const [hidden, setHidden] = useState(false);

  const stars = Array(review.star).fill(0);

  const date = new Date(review.createdAt);

  // Menggunakan metode toLocaleString() untuk mengubah format date menjadi waktu yang lebih manusiawi
  const time = date.toLocaleString("en-EN", {
    // Mengatur opsi format
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }); // Misalnya, "Jumat, 1 Desember 2023 pukul 23.15.18"

  const deleteReview = (id) => {
    handleDelete(id);
    setFade(true);
    setTimeout(() => {
      setHidden(true);
    }, 1000);
  };
  return (
    <div
      className={`flex flex-col pl-4 mt-2 transition-all animate-fadeOut ${
        fade ? "opacity-0 translate-x-10" : "opacity-100"
      } ${hidden ? "hidden" : "block"}`}
    >
      <figure className='flex felx-row pb-2'>
        <img
          src={review.author?.avatar}
          alt=''
          className='rounded-full w-12 mr-4'
        />
        <div className='flex flex-row justify-between w-full'>
          <div className='flex flex-row gap-4'>
            <span>@{review.author?.username}</span>
            <span>{time}</span>
          </div>
          <span className='flex flex-row'>
            {stars.map((star, index) => (
              // Menampilkan bintang yang terisi
              <span key={index}>
                {" "}
                <FaStar fill='gold' />
              </span>
            ))}
            {stars.length < 5 &&
              // Menampilkan bintang yang kosong
              Array(5 - review.star)
                .fill(0)
                .map((star, index) => (
                  <span key={index + stars.length} className='star'></span>
                ))}
          </span>
        </div>
      </figure>
      <nav className='text-black border-b border-black px-16 -mt-8'>
        <h1 className='text-xl '>
          {review.comment === "" ? "Nothing" : review.comment}
        </h1>
        <div className=' flex gap-4 mt-2 pb-2'>
          <button onClick={() => setShowInputReply(!showInputReply)}>
            <small>
              <FaReply />
            </small>
          </button>
          <button>
            <small>
              <FaHeart />
            </small>
          </button>
          <button onClick={() => deleteReview(review._id)}>
            <small>
              <FaMinus />
            </small>
          </button>
        </div>
        {/* {showInputReply ? ( */}
        <div
          className={`border-t border-black mt-2 pt-2  transition-all  ${
            showInputReply
              ? "block translate-y-0 delay-300"
              : "hidden translate-y-10 "
          }`}
        >
          <figure className='flex gap-4'>
            <img
              src={currentUser?.avatar}
              alt=''
              className='rounded-full w-8'
            />
            <span>@{currentUser.username}</span>
          </figure>
          <div className='pb-2'>
            <label className='flex gap-4 mt-2'>
              Rating: <StarRating onRate={setRating} rate={rating} />
            </label>
            <input
              type='text'
              className='p-2 rounded-md w-full mb-4 border border-slate-700 mt-2'
              placeholder='Reply...'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className='flex gap-4 justify-end'>
              <button
                onClick={() =>
                  handleReply({
                    parentId: review._id,
                    star: rating,
                    comment: text,
                  })
                }
                className='bg-green border border-slate-400 text-white rounded-lg px-4 py-2 hover:opacity-75'
              >
                Add Reply
              </button>
              <span
                className='border rounded-lg px-4 py-2 cursor-pointer'
                role='button'
                onClick={() => setShowInputReply(false)}
              >
                Cancel
              </span>
            </div>
          </div>
        </div>
        {/* ) : (
            ""
          )} */}
      </nav>
      {replies?.length > 0 && (
        <div>
          {replies.map((reply) => (
            <NestedReview
              review={reply}
              reply={[]}
              handleReply={handleReply}
              key={reply._id}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NestedReview;
