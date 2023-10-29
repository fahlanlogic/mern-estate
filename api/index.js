import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

// inisialisasi dari package dotenv agar bisa dipakai
dotenv.config();

// inisialisasi express dengan variable
const app = express();

app.use(express.json());

// menghubungkan server dengan database mongoDB menggunakan perintah connect dan lakukan percobaan dengan then/catch
mongoose
	.connect(process.env.MONGO)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch(err => {
		console.log(err);
	});

// inisialisasi port untuk server
app.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});

// inisialisasi route untuk back end api/user
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);