/* eslint-disable no-unused-vars */
// import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({}); // buat state untuk inputan data
  const [error, setError] = useState(null); // buat state untuk menampilkan pesan error
  const [loading, setLoading] = useState(false); // buat state untuk disabled button saat loading
  const navigate = useNavigate();
  // function yang digunakan untuk mengubah state, seterusnya kita akan menggunakan tehnik ini
  const handleChange = (e) => {
    setFormData ({
      ...formData,
      [e.target.id] : e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); // disable button
    // lakukan try catch untuk antisipasi kemungkinan error
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      console.log(data)
      if (data.succes === false) {
        setError(data.message)
        alert("Username or email already exist");
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null)
      navigate("/sign-in");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  console.log(formData);

  return (
    <main className="absolute top-0 left-1/2 -translate-x-1/2 max-w-sm w-full px-3 md:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
      <div className="top-0 h-screen flex items-center justify-center">
        <div className='w-full'>
          <h1 className="text-3xl font-bold mb-2 text-slate-700 md:text-4xl 2xl:text-5xl">Selamat datang di Airbnb</h1>
          <h1 className="text-md mb-12 text-slate-700">Mendaftar atau masuk?</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input type="text" id="username" placeholder="Username" className="border px-3 py-2 rounded-full" onChange={handleChange}/>
            <input type="email" id="email" placeholder="Email" className="border px-3 py-2 rounded-full" onChange={handleChange}/>
            <input type="password" id="password" placeholder="Password" className="border p-2 mb-5 px-3 py-2 rounded-full" onChange={handleChange}/>
            <button disabled={loading} className="bg-pink-500 text-white shadow-lg rounded-full p-2 font-semibold hover:bg-pink-300 duration-300 disabled:bg-pink-300">{loading ? "Loading..." : "Sign Up"}</button>
            <OAuth />
          </form>
          <div className='flex gap-2 justify-center mt-6'>
            <p className='text-slate-700'>Already have an account?</p>
            <Link to={"/sign-in"}><span className='text-blue-600'>Sign In</span></Link>
          </div>
        </div>
      </div>
    </main>
  )
}
