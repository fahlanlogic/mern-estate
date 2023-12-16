import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
	createListing,
	deleteListing,
	updateListing,
} from "../controller/listing.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);

export default router;
