import Listing from "../models/listing.model.js";
import Review from "../models/review.model.js";
import SavedListing from "../models/savedListing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    if (req.user) {
      // if user is logged in
      const userId = req.user.id;
      const savedListings = await SavedListing.find({
        user: userId,
        listing: req.params.id,
        isSaved: true,
      });
      const updatedList = listing.toObject();
      if (savedListings.length > 0) {
        updatedList.isSaved = true;
      }
      res.status(200).json(updatedList);
    } else {
      res.status(200).json(listing);
    }
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTermWithCommas = req.query.searchTerm || "";
    
    // Remove commas from the search term
    const searchTerm = searchTermWithCommas.replace(/,/g, '');

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const searchTermsArray = searchTerm.split(/\s+/).filter(Boolean);
    const regexSearchTerms = searchTermsArray.map(term => new RegExp(`\\b${term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}\\b`, "i"));

    const listings = await Listing.find({
      $or: [
        { name: { $in: regexSearchTerms } },
        { address: { $in: regexSearchTerms } },
        { postcode: { $in: regexSearchTerms } },
      ],
      offer,
      furnished,
      parking,
      type,
      approved: true,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    if (req.user) {
      // if the user is logged in
      const userId = req.user.id;
      const listingIds = listings.map((listing) => listing._id);
      const savedListings = await SavedListing.find({
        user: userId,
        listing: { $in: listingIds },
        isSaved: true,
      });
      const updatedListings = listings.map((listing) => ({
        ...listing.toObject(), // Convert Mongoose document to a plain JavaScript object
        isSaved: savedListings.some((savedListing) =>
          savedListing.listing.equals(listing._id)
        ),
      }));
      return res.status(200).json(updatedListings);
    } else {
      return res.status(200).json(listings);
    }
  } catch (error) {
    next(error);
  }
};




export const raiting = async (req, res, next) => {
  const { _id } = req.user;
  const { star, listingId } = req.body;
  try {
    const listing = await Listing.findById(listingId);
    let alreadyRated = Listing.raiting.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRaiting = await listing.updateOne(
        {
          raiting: { $elemMatch: alreadyRated },
        },
        {
          $set: { "raiting.$.star": star },
        },
        {
          new: true,
        }
      );
      res.json(updateRaiting);
    } else {
      const rateListing = await listing.findByIdAndUpdate(
        listingId,
        {
          $push: {
            raiting: {
              star: star,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
      res.json(rateListing);
    }
  } catch (error) {
    next(error);
  }
};

export const wishlist = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  try {
    const updatedListing = await SavedListing.updateOne(
      {
        user: req.user.id,
        listing: req.params.id,
      },
      {
        $set: { isSaved: req.body.isSaved },
      },
      {
        upsert: true,
      }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
// review controller/handler

export const getReviewed = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return res.status(404).json({ msg: "listing Not Found" });
    const reviewed = await Review.aggregate([
      {
        $match: { listing: listing._id },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
    ]);

    res.json(reviewed);
  } catch (error) {
    next(error);
  }
};

export const getSaved = async (req, res, next) => {
  try {
    const savedListings = await SavedListing.find({
      isSaved: true,
      user: req.user.id,
    }).populate({
      path: "listing",
      model: "Listing",
    });
    if (!savedListings) {
      return next(errorHandler(404, "Saved Listings not found!"));
    }
    const modifiedListings = savedListings.map((savedListing) => ({
      ...savedListing.listing.toObject(),
      isSaved: true,
    }));

    res.status(200).json(modifiedListings);
  } catch (error) {
    next(error);
  }
};
export const replyReview = async (req, res, next) => {
  try {
    const parentReview = await Review.findOne(req.params.id);
    const { star, comment } = req.body;
    if (!parentReview) return res.status(404).json({ msg: "review not found" });
    const res = await Review.create({
      star,
      comment,
      parentId: parentReview.id,
    });

    res.status(201).json(res);
  } catch (error) {
    next(error);
  }
};

export const manageListings = async (req, res, next) => {
  try {
    let listing = await Listing.find();
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
export const addReview = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return res.status(404).json({ msg: "Listing not found" });
    const star = req.body.star;
    const comment = req.body.comment;

    const review = await Review.create({
      star,
      comment,
      user: req.user.id,
      listing: listing.id,
    });
    res.status(201).json({ msg: "success add review", review });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(errorHandler(404, "review not found!"));
  }

  // if (req.user.id !== review.user) {
  //   return next(errorHandler(401, "You can only delete your own listings!"));
  // }

  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json("Review has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const approve = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  try {
    listing.approved = req.body.approved;
    await listing.save();
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getSimilarListings = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    const similarListings = await Listing.find({
      postcode: listing.postcode,
      _id: { $ne: listing._id }, // Exclude the current listing from the results
      approved: true,
    }).limit(4); // Adjust the limit as needed

    return res.status(200).json(similarListings);
  } catch (error) {
    next(error);
  }
};
