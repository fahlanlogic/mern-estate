// import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className="max-w-xl mx-auto p-3">
      <h1 className="text-3xl font-bold text-center p-3 mb-6">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input type="text" id="username" placeholder="Username" className="border p-2 rounded-xl" />
        <input type="email" id="email" placeholder="Email" className="border p-2 rounded-xl" />
        <input type="password" id="password" placeholder="Password" className="border p-2 rounded-xl" />
        <button className="bg-black text-white shadow-lg rounded-xl p-2 font-semibold hover:bg-white hover:text-black duration-300 disabled:bg-slate-600">Sign Up</button>
      </form>
      <div className='flex gap-2 justify-center mt-6'>
        <p>Already have an account?</p>
        <Link to={"/sign-in"}><span className='text-blue-600'>Sign In</span></Link>
      </div>
    </div>
  )
}
