import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; // package untuk encryption password di database agar tidak mudah diretas

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
