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
	const { email, password } = req.body;
	try {
		const validUser = await User.findOne({ email });
		if (!validUser) return next(errorHandler(404, "User not found!"));
		const validPassword = await bcryptjs.compareSync(
			password,
			validUser.password
		);
		if (!validPassword)
			return next(errorHandler(401, "Wrong credential!"));
		const token = jwt.sign(
			{ id: validUser._id },
			process.env.JWT_SECRET
		);
		const { password: pass, ...rest } = validUser._doc;
		res.cookie("acces_token", token, { httpOnly: true })
			.status(200)
			.json(rest);
	} catch (error) {
		next(error);
	}
};