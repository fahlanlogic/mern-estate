// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "mern-estate-f1ec5.firebaseapp.com",
	projectId: "mern-estate-f1ec5",
	storageBucket: "mern-estate-f1ec5.appspot.com",
	messagingSenderId: "178903699820",
	appId: "1:178903699820:web:34e4da27c265a08055e349",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
