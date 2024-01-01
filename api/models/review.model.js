import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    star: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "listing",
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
