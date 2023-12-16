import express from "express";
import {
	deleteUser,
	getUserListings,
	test,
	updateUser,
} from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

// buat router dari express
const router = express.Router();

// memanggil dari route path /test yang isinya dari user.controller.js (best practicenya controller jangan langsung digabung dengan route)
router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listing/:id", verifyToken, getUserListings);

// export dan gunakan di index.js agar bisa digunakan
export default router;
