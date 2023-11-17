import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; // package untuk encryption password di database agar tidak mudah diretas
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// agar tidak buffer lama kita harus menggunakan async await untuk mengabaikan proses buffer
export const signup = async (req, res, next) => {
	const { username, email, password } = req.body; // destructuring variable untuk menerima request body
	const hashedPassword = bcryptjs.hashSync(password, 10); // encryption password

	// variable untuk menampung user baru menggunakan model dari user.model.js yang sudah dibuat
	const newUser = new User({ username, email, password: hashedPassword });
	try {
		await newUser.save(); // menyimpan ke database
		res.status(201).json("User created succesfully!"); // memberi response pada postman
	} catch (error) {
		next(error);
	}
};

export const signin = async (req, res, next) => {
	const { email, password } = req.body; // menerima permintaan dari body
	// try catch untuk menangkap kemungkinan terjadinya error
	try {
		const validUser = await User.findOne({ email }); // mencocokan email antara inputan dengan di database menggunakan model User dan function mongoose findOne
		if (!validUser) return next(errorHandler(404, "User not found!")); // apabila email tidak tepat
		const validPassword = await bcryptjs.compareSync(
			// membandingkan password innputan dengan di database menggunakan library bcryptjs dengan functionnya compareSync
			password,
			validUser.password
		);
		// apabila password tidak tepat
		if (!validPassword)
			return next(errorHandler(401, "Wrong credential!"));
		// membuat token dengan library jwt dengan menggunakan functionnya sign dan juga harus disertai ID user sesuai di database, lalu enkripsi password di JWT_SECRET
		const token = jwt.sign(
			{ id: validUser._id },
			process.env.JWT_SECRET
		);
		// mengembalikan response tanpa menampilkan password
		const { password: pass, ...rest } = validUser._doc;
		// mengembalikan response pada postman
		res.cookie("access_token", token, { httpOnly: true })
			.status(200)
			.json(rest);
	} catch (error) {
		// menangkap error
		next(error);
	}
};

export const google = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			const token = jwt.sign(
				{ id: user._id },
				process.env.JWT_SECRET
			);
			const { password: pass, ...rest } = user._doc;
			res.cookie("access_token", token, { httpOnly: true })
				.status(200)
				.json(rest);
		} else {
			const generatedPassword =
				Math.random().toString(36).slice(-8) +
				Math.random().toString(36).slice(-8);
			const hashedPassword = bcryptjs.hashSync(
				generatedPassword,
				10
			);
			const newUser = new User({
				username:
					req.body.name.split(" ").join("").toLowerCase() +
					Math.random().toString(36).slice(-4),
				email: req.body.email,
				password: hashedPassword,
				avatar: req.body.photo,
			});
			await newUser.save();
			const token = jwt.sign(
				{ id: newUser._id },
				process.env.JWT_SECRET
			);
			const { password: pass, ...rest } = newUser._doc;
			res.cookie("access_token", token, { httpOnly: true })
				.status(200)
				.json(rest);
		}
	} catch (error) {
		next(error);
	}
};