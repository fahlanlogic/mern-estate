import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
	try {
		const listing = await Listing.create(req.body);
		res.status(201).json(listing);
	} catch (error) {
		next(error.message);
	}
};

export const deleteListing = async (req, res, next) => {
	const listing = await Listing.findById(req.params.id);
	if (req.user.id !== listing.userRef) {
		return next(
			errorHandler(401, "You can only delete your own account!")
		);
	}
	if (!listing) {
		return next(errorHandler(404, "Listing not found!"));
	}

	try {
		await Listing.findByIdAndDelete(req.params.id);
		res.status(200).json("Listing has been deleted!");
	} catch (error) {
		next(error);
	}
};
