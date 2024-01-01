import mongoose from "mongoose";
import Review from "./review.model.js";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    remainingOnLease: {
      type: String,
      required: true,
    },
    groundRent: {
      type: String,
      required: true,
    },
    councilTax: {
      type: String,
      required: true,
    },
    serviceCharge: {
      type: String,
      required: true,
    },
    tenure: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    reception: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    totalraiting: {
      type: String,
      default: 0,
    },
    userRef: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      required: true,
      default: false
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
