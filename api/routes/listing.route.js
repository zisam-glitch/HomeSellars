import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
  raiting,
  addReview,
  wishlist,
  getSaved,
  manageListings,
  approve,
  getReviewed,
  replyReview,
  deleteReview,
  getSimilarListings
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { conditionalVerifyUser } from "../utils/conditionalVerifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/saved", verifyToken, getSaved);
router.get("/postcode/:id", conditionalVerifyUser, getSimilarListings);
router.get("/get/:id", conditionalVerifyUser, getListing);
router.get("/get", conditionalVerifyUser, getListings);
router.put("/raiting", verifyToken, raiting);
router.get("/requests", verifyToken, manageListings);
router.post("/wishlist/:id", verifyToken, wishlist);
router.post("/approve/:id", verifyToken, approve);

// review listing
router.post("/add-review/:id", verifyToken, addReview);
router.post("/reply-review/:id", verifyToken, replyReview);
router.get("/get-review/:id", getReviewed);
router.delete("/delete/review/:id", verifyToken, deleteReview);
export default router;
