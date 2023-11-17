import express from "express";
import { test, updateUser } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

// buat router dari express
const user = express.Router();

// memanggil dari route path /test yang isinya dari user.controller.js (best practicenya controller jangan langsung digabung dengan route)
user.get("/test", test);
user.post("/update/:id", verifyToken, updateUser);

// export dan gunakan di index.js agar bisa digunakan
export default user;
