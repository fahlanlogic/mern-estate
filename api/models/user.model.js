import mongoose from "mongoose";

// membuat schema untuk database mongoose dengan beberapa object dan ketentuannya untuk user
const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
		},
	},
	{ timestamps: true } // inisialisasi timestamp agar riwayat penambahan user oleh client tercatat, mempermudah dalam proses sort kedepannya
);

// inisialisasi model dari schema yg sudah dibuat
const User = mongoose.model("User", userSchema);

export default User;
