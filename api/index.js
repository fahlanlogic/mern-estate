import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// inisialisasi dari package dotenv agar bisa dipakai
dotenv.config();

// inisialisasi express dengan variable
const app = express();
const router = express.Router();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

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
router.get("/", (req, res) => {
  res.json({
    message: "API is working",
  });
});
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);


// membuat middleware jika ada kemungkinan error
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal server error";
	return res.status(statusCode).json({
		succes: false,
		statusCode,
		message,
	});
})