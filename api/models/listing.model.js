import mongoose from "mongoose";

// membuat schema untuk database mongoose dengan beberapa object dan ketentuannya untuk user
const listingSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		regularPrice: {
			type: Number,
			required: true,
		},
		discountPrice: {
			type: Number,
			required: true,
		},
		bathrooms: {
			type: Number,
			required: true,
		},
		bedrooms: {
			type: Number,
			required: true,
		},
		furnished: {
			type: Boolean,
			required: true,
		},
		parking: {
			type: Boolean,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		offer: {
			type: Boolean,
			required: true,
		},
		imageUrls: {
			type: Array,
			required: true,
		},
		userRef: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true } // inisialisasi timestamp agar riwayat penambahan user oleh client tercatat, mempermudah dalam proses sort kedepannya
);

// inisialisasi model dari schema yg sudah dibuat
const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
