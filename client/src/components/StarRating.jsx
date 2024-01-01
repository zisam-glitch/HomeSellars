import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ onRate, rate }) => {
  const [rating, setRating] = useState(rate);

  const handleClick = (value) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div className='flex flex-row items-center'>
      {[1, 2, 3, 4, 5].map((value) => (
        <FaStar
          key={value}
          fill={value <= rating ? "gold" : "gray"}
          className={`cursor-pointer text-2xl`}
          onClick={() => handleClick(value)}
        />
      ))}
    </div>
  );
};

export default StarRating;
