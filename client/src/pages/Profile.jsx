/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutFailure, signOutStart, signOutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice";

// firebase storage rules
// allow read;   // mengizinkan client membaca file
// allow write: if   // mengizinkan client menulis file apabila...
// request.resource.size < 2 * 1024 * 1024 &&   // ukuran dibawah 2 MB
// request.resource.contentType.matches('image/.*')   // format gambar

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => (state.user)); 
  const fileRef = useRef(null);   // digunakan karena tombol input file disembunyikan dan diumpan ke element img
  const [file, setFile] = useState(undefined);   // state untuk menampung file
  const [filePerc, setFilePerc] = useState(0);   // state progress upload dalam persen
  const [fileUploadError, setFileUploadError] = useState(false);   // state untuk menampung error
  const [formData, setFormData] = useState({});   // state untuk menampung data baru 
  const dispatch = useDispatch()
  console.log(filePerc);
  console.log(fileUploadError);
  console.log(formData);

  // untuk re-render avatar setelah file diupload
  useEffect(() => {
    if (file) {   // jika file terpenuhi
      handleFileUpload(file)   // jalankan fungsi handleFileUpload berisi parameter file yg terpenuhi
    }
  }, [file])   // array file bermaksud agar re-render berhenti ketika array file terpenuhi, jika tidak terpenuhi akan terus dijalankan

  const handleFileUpload = (file) => {
    const storage = getStorage(app);   // mengambil storage dari firebase
    const fileName = new Date().getTime() + file.name;   // memberi nama file dengan waktu agar unik
    const storageRef = ref(storage, fileName);   // membuat referensi storage
    const uploadTask = uploadBytesResumable(storageRef, file);    // upload file ke storage dengan fitur resumable (progres upload)
    
    // event listener untuk progres upload
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;   // menghitung persentase progress upload
      setFilePerc(Math.round(progress));   // membulatkan persentase dan menempatkannya pada state
    }, error => {
      setFileUploadError(true);   // mengaktifkan state jika terjadi error
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref)   // fungsi getDownloadURL berasal dari firebase/storage untuk mengambil link download dari storage firebase untuk disimpan ke database
      .then((downloadURL) =>   // jika kondisi terpenuhi
        setFormData({
          ...formData, avatar: downloadURL    // menyimpan link download ke state untuk diumpan ke database
        })
      )
    })
  }
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
    } catch (error) {
      updateUserFailure(error.message)
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())  // seperti biasa gunakan redux agar lebih dinamis
      // menautkan ke API untuk menghapus user sesuai id
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',  // cukup method saat melakukan delete, karena tidak perlu membalikan respon apapun
      })
      const data = res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart())
      const res =  await fetch('api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message))
        return
      }
      dispatch(signOutSuccess(data))
    } catch (error) {
      dispatch(signOutFailure(error.message))
    }
  }

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 max-w-sm w-full px-3 md:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
      <div className="h-screen flex items-center justify-center">
        <div className="w-full">
          <h1 className="text-4xl font-bold text-center text-slate-700">Profile</h1>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
            <input type="file" ref={fileRef} accept="image/*" hidden onChange={(e) => setFile(e.target.files[0])}/>
            <img src={formData.avatar || currentUser.avatar} onClick={() => fileRef.current.click()} alt="" className="cursor-pointer self-center mt-10 w-32 h-32 rounded-full object-cover"/>
            <p className="text-sm self-center mb-10">
              {fileUploadError ? (<span className="text-red-700">Something went wrong (must be less than 2MB)</span>)
              : filePerc > 0 && filePerc < 100 ? (<span>Uploading: {filePerc}%</span>)
              : filePerc === 100 ? (<span className="text-green-700">Uploaded</span>)
              : " "
              }
            </p>
            <input id="username" defaultValue={currentUser.username} onChange={handleChange} type="text" placeholder="Username" className="border rounded-full px-3 py-2" />
            <input id="email" defaultValue={currentUser.email} onChange={handleChange} type="email" placeholder="Email" className="border rounded-full px-3 py-2" />
            <input id="password" onChange={handleChange} type="password" placeholder="Password" className="border rounded-full px-3 py-2" />
            <button disabled={loading} className="bg-pink-500 text-white font-semibold duration-300 rounded-full px-3 py-2 hover:bg-pink-700 transition">{ loading ? 'Loading...' : 'Update' }</button>
            <Link to={"/create-listing"} className="bg-pink-500 text-white text-center font-semibold duration-300 rounded-full px-3 py-2 hover:bg-pink-700 transition">Create Listing</Link>
          </form>
          <div className="flex justify-between mt-4">
            <span onClick={handleDeleteUser} className="font-medium cursor-pointer text-slate-700 hover:text-red-700">Delete account?</span>
            <span onClick={handleSignOut} className="font-medium text-slate-700 cursor-pointer hover:text-red-700">Sign Out</span>
          </div>
          <div>
            <p>{ error ? error : ''}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
