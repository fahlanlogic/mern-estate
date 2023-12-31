import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user", // untuk digunakan pada useSelector nanti
	initialState: {
		// object wajib yang berisi state
		currentUser: null, // wadah untuk action.payload
		loading: false,
		error: null,
	},
	reducers: {
		// berisi setState
		signInStart: state => {
			state.loading = true;
		},
		signInSucces: (state, action) => {
			state.currentUser = action.payload;
			state.loading = false;
			state.error = null;
		},
		signInFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		updateUserStart: state => {
			state.loading = true;
		},
		updateUserSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.loading = false;
			state.error = null;
		},
		updateUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		deleteUserStart: state => {
			state.loading = true;
		},
		deleteUserSuccess: state => {
			state.currentUser = null;
			state.loading = false;
			state.error = null;
		},
		deleteUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		signOutStart: state => {
			state.loading = true;
		},
		signOutSuccess: state => {
			state.currentUser = null;
			state.loading = false;
			state.error = null;
		},
		signOutFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

// gak paham
export const {
	signInStart,
	signInSucces,
	signInFailure,
	updateUserFailure,
	updateUserStart,
	updateUserSuccess,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
	signOutStart,
	signOutSuccess,
	signOutFailure,
} = userSlice.actions;
export default userSlice.reducer; // untuk dipakai di store.js
