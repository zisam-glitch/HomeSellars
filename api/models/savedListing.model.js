import mongoose from "mongoose";

const SavedListingSchema = new mongoose.Schema({
  isSaved: {
    type: Boolean,
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
  }
},
{ timestamps: true }
);

const SavedListing = mongoose.model("SavedListing", SavedListingSchema);

export default SavedListing;
