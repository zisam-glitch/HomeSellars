import mongoose from "mongoose";

const savedListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    savelist: [{ type: mongoose.Schema.Types.ObjectId, ref: "SavedList" }],
  },
  { timestamps: true }
);

const SavedList = mongoose.model("SavedList", savedListSchema);

export default SavedList;
