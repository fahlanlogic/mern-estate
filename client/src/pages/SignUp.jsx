/* eslint-disable no-unused-vars */
// import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

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
    <div className="max-w-xl mx-auto p-3">
      <h1 className="text-3xl font-bold text-center p-3 mb-6">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="text" id="username" placeholder="Username" className="border p-2 rounded-xl" onChange={handleChange}/>
        <input type="email" id="email" placeholder="Email" className="border p-2 rounded-xl" onChange={handleChange}/>
        <input type="password" id="password" placeholder="Password" className="border p-2 rounded-xl" onChange={handleChange}/>
        <button disabled={loading} className="bg-black text-white shadow-lg rounded-xl p-2 font-semibold hover:bg-white hover:text-black duration-300 disabled:bg-slate-600">{loading ? "Loading..." : "Sign Up"}</button>
      </form>
      <div className='flex gap-2 justify-center mt-6'>
        <p>Already have an account?</p>
        <Link to={"/sign-in"}><span className='text-blue-600'>Sign In</span></Link>
      </div>
    </div>
  )
}
