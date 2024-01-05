// import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import About from "./pages/About"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import CreateListing from "./pages/CreateListing"
import ShowListing from "./pages/ShowListings"
import UpdateListing from "./pages/UpdateListing"
import Listing from "./pages/Listing"
import Search from "./pages/Search"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/create-listing" element={<CreateListing />}></Route>
          <Route path="/show-listing" element={<ShowListing />}></Route>
          <Route path="/update-listing/:listingId" element={<UpdateListing />}></Route>
        </Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/listing/:listingId" element={<Listing />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
