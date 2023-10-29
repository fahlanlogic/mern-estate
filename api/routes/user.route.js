import express from "express";
import { test } from "../controller/user.controller.js";

// buat router dari express
const user = express.Router();

// memanggil dari route path /test yang isinya dari user.controller.js (best practicenya controller jangan langsung digabung dengan route)
user.get("/test", test);

// export dan gunakan di index.js agar bisa digunakan
export default user;
