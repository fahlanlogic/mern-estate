import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const server = express();
mongoose
	.connect(process.env.MONGO)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch(err => {
		console.log(err);
	});

server.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});