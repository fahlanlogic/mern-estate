/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			poppins: "Poppins",
			quikcsand: "Quicksand",
		},
	},
	plugins: [
		require("@tailwindcss/line-clamp"),
		// ...
	],
};
