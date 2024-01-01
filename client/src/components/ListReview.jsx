import React, { useCallback, useEffect, useMemo, useState } from "react";
import NestedReview from "./NestedReview";

const ListReview = ({ listingId }) => {
  const [review, setReview] = useState(null);

  const rootReview = useMemo(() => {
    return review
      ?.filter((item) => item.parentId === null)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }, [review]); // hanya menghitung ulang jika review berubah

  useEffect(() => {
    getReviewed(listingId);
  }, []);

  const getReviewed = async (id) => {
    try {
      const res = await fetch(`/api/listing/get-review/${id}`);
      const data = await res.json();
      console.log(data);
      setReview(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReplies = useCallback(
    (parentId) => {
      return rootReview?.filter((r) => r._id === parentId);
    },
    [rootReview]
  ); // hanya bergantung pada rootReview

  const handleReply = async (datas) => {
    const formData = {
      star: datas.star,
      comment: datas.comment,
    };
    try {
      const res = await fetch(`/api/listing/reply-review/${data.parentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      getReviewed(data.listing);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    console.log(`/api/listing/delete/review/${id}`);
    try {
      const res = await fetch(`/api/listing/delete/review/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      const newReview = review.filter((r) => r._id !== data._id);
      setReview(newReview);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col gap-4 px-2'>
      {review?.map((item) => (
        <NestedReview
          review={item}
          key={item._id}
          replies={getReplies(item._id)}
          handleReply={handleReply}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ListReview;
