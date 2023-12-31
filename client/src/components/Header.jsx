/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

export default function Header() {
  const { currentUser } = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState("");  // state penampung input search
  const navigate = useNavigate();

  const handleSubmit = (e) => {  
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);  // menggunakan constructor dari react yaitu URLSearchParams 
    urlParams.set("searchTerm", searchTerm);  // mengatur constructor tadi dengan key dan nilai
    const searchQuery = urlParams.toString();  // mengubah input searchTerm menjadi string agar dapat dinavigate
    navigate(`/search?${searchQuery}`);  // menavigasi sesuai inputan search
  }

  useEffect(() => {  // me-render tampilan saat user memberi inputan di kolom url bukan search agar kolom search interaktif mengikuti
    const urlParams = new URLSearchParams(location.search);  // sama seperti tadi 
    const searchTermFromUrl = urlParams.get("searchTerm");  // mengambil nilai dari key
    if (searchTermFromUrl) {  // jika key terisi/true
      setSearchTerm(searchTermFromUrl);  // atur nilai state sesuai pencarian di kolom url agar tampil di kolom search
    }
  }, [location.search])  // berhenti render ketika kolom search terpenuhi
  return (
    <header className="sticky top-0 z-50">
      <div className="flex justify-between items-center px-3 py-2 bg-white shadow-lg md:px-10 lg:px-16">
        <h1>
          <Link to="/">
            <div className="flex gap-1 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-pink-500 -rotate-90 xl:w-9 xl:h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              <span className="font-bold text-pink-500 xl:text-xl">airbnb</span>
            </div>
          </Link>
        </h1>
        {/* search */}
        <form onSubmit={handleSubmit} className="flex items-center p-0.5 xl:p-1.5 border rounded-full">
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search..." className="px-2 bg-transparent focus:outline-none placeholder:text-sm w-40 sm:w-64 xl:w-96"/>
          <button>
            <div className="bg-pink-500 rounded-full p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
          </button>
        </form>
        <ul className="flex sm:gap-5 items-center">
          <Link to="/">
          <li className="hidden sm:inline hover:font-bold">Home</li>
          </Link>
          <Link to="/about">
          <li className="hidden sm:inline hover:font-bold">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img src={currentUser.avatar} alt="profile" className="w-7 h-7 rounded-full object-cover xl:w-8 xl:h-8" />
            ) : (
            <div className="bg-pink-500 rounded-full border border-pink-500 overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white relative top-1 xl:w-8 xl:h-8">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>
            )}
          {/* <li className="hover:font-bold">Sign In</li> */}
          </Link>
        </ul>
      </div>
    </header>
  )
}
