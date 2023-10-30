// import React from 'react'
import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header>
      <div className="flex justify-between items-center p-3 bg-slate-white shadow-lg">
        <h1>
          <Link to="/">
          <span className='text-black font-black'>Fahlan</span>
          <span className='text-slate-600 font-bold'>Estate</span>
          </Link>
        </h1>
        <form className="flex items-center p-2 border rounded-lg">
          <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-36 sm:w-64"/>
          <FaSearch />
        </form>
        <ul className="flex gap-3">
          <Link to="/">
          <li className="hidden sm:inline hover:font-bold">Home</li>
          </Link>
          <Link to="/about">
          <li className="hidden sm:inline hover:font-bold">About</li>
          </Link>
          <Link to="/sign-in">
          <li className="hover:font-bold">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  )
}
