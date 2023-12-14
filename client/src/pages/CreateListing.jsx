/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateListing() {
  const {currentUser} = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);  // state untuk menampung file gambar
  const [formData, setFormData] = useState({  // state untuk menampung data 
    imageUrls: [],  // array gambar
    name: '',  // string
    description: '',  // string
    address: '',  // string
    type: 'rent',  // string
    parking: false,  // boolean
    furnished: false,  // boolean
    offer: false,  // boolean
    bedrooms: 1,  // number
    bathrooms: 1,  // number
    regularPrice: 50,  // number
    discountedPrice: 0,  // number
  });
  const [imageErrorUpload, setImageErrorUpload] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  console.log(formData);
  
  const handleImageSubmit = (e) => {  // function untuk mengupload gambar
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setImageUploading(true)
      const promises = [];  // array untuk menampung promise perulangan url gambar
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]))  // function storeImage yg menampung filename/url gambar di push ke promises
      }

      // mengambil semua url gambar dalam array promises untuk diproses dan ditampilkan
      Promise.all(promises).then((urls) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) })  // menyimpan url gambar ke state dengan object lain dibelakangnya
        setImageErrorUpload(false)
        setImageUploading(false)
      }).catch((error) => {
        setImageErrorUpload('Image failed upload (max 2 mb per image)')
        setImageUploading(false)
      })
    } else {
      setImageErrorUpload('You can only upload 6 images per listing')
      setImageUploading(false)
    }
  } 

  // function untuk menyimpan file yg di upload
  const storeImage = async (file) => {  // berisi parameter yg menyimpan nama file
    return new Promise((resolve, reject) => {  // buat janji untuk di wujudkan jika berhasil
      const storage = getStorage(app)  // mengambil storage dari firebase model app
      const fileName = new Date().getTime() + file.name  // memberi nama file dengan waktu agar unik
      const storageRef = ref(storage, fileName)  // membuat referensi storage
      const uploadTask = uploadBytesResumable(storageRef, file)  // upload file ke storage dengan fitur resumable (progres upload)
      uploadTask.on(  // event listener
        'state_changed',  // nama event
        (snapshot) => {  // menghitung progres upload
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;  // menghitung progres upload
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error)  // penolakan jika terjadi error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {  // fungsi getDownloadURL berasal dari firebase/storage untuk mengambil link download dari storage firebase untuk disimpan ke database mongoDB
            resolve(downloadURL)  // menyimpan link download ke state
          })
        }
      )
    })
  }

  const handleRemoveImage = (index) => {   // tombol delete
    setFormData({ ...formData, imageUrls: formData.imageUrls.filter((_, i) => i !== index) })  // logika delete, gak paham
  }

  // melakukan perubahan pada nilai masing-masing input
  const handleChange = (e) => {
    // dikategorikan seusai type inputnya masing-masing
    if (e.target.id === 'sale' || e.target.id === 'rent') {  // kondisi jika salah satu terpilih satu lainnya tidak
      setFormData({ ...formData, type: e.target.id })
    }
    if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
      setFormData({ ...formData, [e.target.id]: e.target.checked })
    }
    if (e.target.type === 'text' || e.target.type === 'number' || e.target.type === 'textarea') {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    }
  }

  // meng submit perubahan yang terjadi
  const handleSubmit = async (e) => {  // parameter e hanya digunakan agar halaman tidak di refresh
    e.preventDefault()
    try {
      // kondisi yang wajib terpenuhi sebelum submit
      if (formData.name.length < 10) return setError("Name must be at least 10 characters long")
      if (formData.regularPrice < formData.discountedPrice) return setError("Discounted price must be less than regular price")
      if (formData.imageUrls.length < 1) return setError("Please upload at least 1 image")
      setLoading(true)  // disable button & loading
      setError(false)  // tidak menjalankan error
      // mengirimkan data ke API untuk menambahkan data ke database
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData, userRef: currentUser._id}),  // menyimpan data dengan referensi user di isi dengan id user, ini wajib dilakukan karena property _id tidak tersimpan didalam model database maka kita harus menyimpan manual di userRef
      })
      const data = await res.json()
      setLoading(false)
      if (data.success === false) {
        setError(data.message)
      }
      navigate(`/listing/${data._id}`)  // mengarahkan ke halaman listing yang baru di submit
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <main className="text-slate-700 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mt-16 mb-10">Create a Listing</h1>
      <form onSubmit={handleSubmit} className="mx-5 flex flex-col gap-8 sm:flex-row">
        <div className="flex flex-col flex-1 gap-4">
          <input type="text" id="name" required maxLength='50' minLength='5' placeholder="Name" className="border w-full px-3 py-2 rounded-xl" onChange={handleChange} value={formData.name} />
          <textarea type="text" required id="description" placeholder="Description" className="border w-full px-3 py-2 rounded-xl" onChange={handleChange} value={formData.description} />
          <input type="text" required id="address" placeholder="Address" className="border w-full px-3 py-2 rounded-xl" onChange={handleChange} value={formData.address} />
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="sale" className="w-5 h-5" onChange={handleChange} checked={formData.type === 'sale'}/>
              <span>Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="rent" className="w-5 h-5" onChange={handleChange} checked={formData.type === 'rent'}/>
              <span>Rent</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="parking" className="w-5 h-5" onChange={handleChange} checked={formData.parking}/>
              <span>Parking spot</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="furnished" className="w-5 h-5" onChange={handleChange} checked={formData.furnished}/>
              <span>Furnished</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="offer" className="w-5 h-5" onChange={handleChange} checked={formData.offer}/>
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input type="number" id="bedrooms" min='1' max='10' required className="border px-2 py-1 w-16 rounded-xl" onChange={handleChange} value={formData.bedrooms}/>
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="bathrooms" min='1' max='10' required className="border px-2 py-1 w-16 rounded-xl" onChange={handleChange} value={formData.bathrooms}/>
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="regularPrice" min='1' max='1000000' required className="border px-2 py-1 w-28 rounded-xl" onChange={handleChange} value={formData.regularPrice}/>
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs text-slate-500">$ / month</span>
              </div>
            </div>
            { formData.offer && (
              <div className="flex items-center gap-2">
                <input type="number" id="discountedPrice" min='1' max='100000' className="border px-2 py-1 w-28 rounded-xl" onChange={handleChange} value={formData.discountedPrice}/>
                <div className="flex flex-col items-center">
                  <p className="font-bold">Discount</p>
                  <span className="text-xs text-slate-500">$ / month</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Images: 
            <span className="font-normal ml-1">The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-3">
            <input type="file" onChange={(e) => setFiles(e.target.files)} id="images" className="border p-2 w-full rounded-xl" accept="image/*" multiple required/>
            <button onClick={handleImageSubmit} className="border border-slate-700 px-3 rounded-xl hover:border-2 disabled:cursor-not-allowed disabled:opacity-80 uppercase font-semibold transition duration-300" disabled={imageUploading}>
              { imageUploading ? (
                // loading icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" disabled className="w-6 h-6 animate-spin">
                  <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                </svg>
              ) : (
                // upload icon
                <svg viewBox="0 0 512 512" className="h-10" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 512 512"><path d="M398.1 233.2c0-1.2.2-2.4.2-3.6 0-65-51.8-117.6-115.7-117.6-46.1 0-85.7 27.4-104.3 67-8.1-4.1-17.2-6.5-26.8-6.5-29.5 0-54.1 21.9-58.8 50.5C57.3 235.2 32 269.1 32 309c0 50.2 40.1 91 89.5 91H224v-80h-48.2l80.2-83.7 80.2 83.6H288v80h110.3c45.2 0 81.7-37.5 81.7-83.4 0-45.9-36.7-83.2-81.9-83.3z" fill="#334155" className="fill-334155"></path></svg>)}
            </button>
          </div>
          <p className="text-red-500 text-sm">{ imageErrorUpload && imageErrorUpload }</p>
          { 
            formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
              <div key={url} className="border rounded-xl items-center flex justify-between p-3">
                <img src={url} alt="listing-image" className="w-20 h-20 object-contain rounded-xl" />
                <button type="button" onClick={() => handleRemoveImage(index)} className="w-10 h-10">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="times-circle"><path fill="#dc2626" d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M15.7,14.3c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0L12,13.4l-2.3,2.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2.3-2.3L8.3,9.7c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l2.3,2.3l2.3-2.3c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L13.4,12L15.7,14.3z"></path></svg>
                </button>
              </div>
            )) 
          }
          <button disabled={loading || imageUploading} className="bg-pink-500 text-white px-3 py-2 rounded-xl hover:bg-pink-700 disabled:opacity-80 font-semibold transition duration-300">{ loading ? "Creating..." : "Create Listing"}</button>
          { error && <p className="text-red-500 text-sm">{ error }</p> }
        </div>
      </form>
    </main>
  )
}
