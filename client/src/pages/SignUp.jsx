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
      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
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
    <main>
      <div className="hero min-h-screen px-4 md:w-5/6 max-w-2xl mx-auto flex items-center">
        <div className="w-full">
          <h1 className="text-sm font-bold mb-2 text-black md:text-4xl">
            Selamat datang di Airbnbbbb
          </h1>
          <h1 className="text-md mb-12 text-slate-700">
            Mendaftar atau masuk?
          </h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="border px-3 py-2 rounded-full"
              onChange={handleChange}
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="border px-3 py-2 rounded-full"
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="border p-2 mb-5 px-3 py-2 rounded-full"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className="bg-gradient-to-b from-pink-500 to-pink-600 text-white shadow-lg rounded-full p-2 font-semibold hover:opacity-90 duration-300 disabled:bg-pink-300">
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <OAuth />
          </form>
          <div className="flex gap-2 justify-center mt-6">
            <p className="text-slate-700">Already have an account?</p>
            <Link to={"/sign-in"}>
              <span className="text-blue-600">Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
