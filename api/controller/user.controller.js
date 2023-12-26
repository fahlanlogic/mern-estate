import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

// membuat variable untuk mengembalikan respon
export const test = (req, res) => {
	res.json({
		message: "API is working",
	});
};

export const updateUser = async (req, res, next) => {
	if (req.user.id !== req.params.id)
		// user.id diambil dari user verifyUser.js untuk mengambil id dan dibandingkan dengan params
		return next(
			errorHandler(401, "You can only update your own account!")
		);

	try {
		// setelah id benar, maka ambil input password dan encryption seperti pada signup
		if (req.body.password) {
			req.body.password = bcryptjs.hashSync(req.body.password, 10);
		}

		// update user dengan id menggunakan method dari mongose yaitu findByIdAndUpdate
		// findByIdAndUpdate sendiri memepunyai 3 argument, yg pertama id, pengaturan dan konfirmasi
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

		// setelah password di encryption jangan lupa juga sembunyikan disisi back-end/server
		const { password, ...rest } = updatedUser._doc;
		res.status(200).json(rest);
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req, res, next) => {
	// user.id diambil dari user verifyUser.js untuk mengambil id dan dibandingkan dengan params
	if (req.user.id !== req.params.id)
		return next(
			errorHandler(401, "You can only delete your own account!")
		);

	try {
		// delete user menggunakan method mongose yaitu findByIdAndDelete diikuti params dg argument id
		await User.findByIdAndDelete(req.params.id);
		res.clearCookie("access_token"); // untuk menghapus cookie
		res.status(200).json("User has been deleted!");
	} catch (error) {
		next(error.message);
	}
};

export const getUserListings = async (req, res, next) => {
	if (req.user.id === req.params.id) {
		try {
			const listings = await Listing.find({
				userRef: req.params.id,
			});
			res.status(200).json(listings);
		} catch (error) {
			next(error);
		}
	} else {
		next(errorHandler(401, "You can only delete your own account!"));
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