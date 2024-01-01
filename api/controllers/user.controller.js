import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";
import SavedList from "../models/savedList.model.js";

export const test = async (req, res) => {
  const user = await User.find();
  res.json({
    message: "Api route is working!",
    user,
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const addList = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ msg: "Listing Not Found" });
    }

    const savedList = await SavedList.findOne({
      listingId: listing._id,
      userId: req.user.id,
    });

    if (savedList) {
      await SavedList.findOneAndDelete({ _id: savedList._id });

      return res.json({ msg: "unsave" });
    }

    const saveList = await SavedList.create({
      listingId: listing._id,
      userId: req.user.id,
    });

    res.json({ msg: "Saved!", data: saveList });
  } catch (error) {
    next(error);
  }
};

export const getList = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const listingId = req.params.id;

    const savedList = await SavedList.findOne({ userId, listingId });

    if (!savedList) return res.status(401).json({ msg: "success", savedList }); // res : {msg: "success", null}

    res.status(201).json({ msg: "success", savedList });
  } catch (error) {
    next(error);
  }
};
