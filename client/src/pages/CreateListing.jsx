import { useRef } from "react"

export default function CreateListing() {
  const fileRef = useRef(null);
  return (
    <main className="text-slate-700 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mt-16 mb-10">Create a Listing</h1>
      <form className="mx-5 flex flex-col gap-8 sm:flex-row">
        <div className="flex flex-col flex-1 gap-4">
          <input type="text" id="name" required maxLength='50' minLength='5' placeholder="Name" className="border w-full px-3 py-2 rounded-xl"/>
          <textarea type="text" required id="description" placeholder="Description" className="border w-full px-3 py-2 rounded-xl"/>
          <input type="text" required id="address" placeholder="Address" className="border w-full px-3 py-2 rounded-xl"/>
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="sale" className="w-5 h-5"/>
              <span>Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="rent" className="w-5 h-5"/>
              <span>Rent</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="parking" className="w-5 h-5"/>
              <span>Parking spot</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="furnished" className="w-5 h-5"/>
              <span>Furnished</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="offer" className="w-5 h-5"/>
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input type="number" id="bedrooms" min='1' max='10' required className="border px-2 py-1 w-16 rounded-xl" />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="bathrooms" min='1' max='10' required className="border px-2 py-1 w-16 rounded-xl" />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="regularPrice" min='1' max='100' required className="border px-2 py-1 w-28 rounded-xl" />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs text-slate-500">$ / month</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="discountPrice" min='1' max='100' className="border px-2 py-1 w-28 rounded-xl" />
              <div className="flex flex-col items-center">
                <p className="font-bold">Discount</p>
                <span className="text-xs text-slate-500">$ / month</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Images: 
            <span className="font-normal ml-1">The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-3">
            <input type="file" ref={fileRef} hidden id="images" className="border p-2 rounded-xl" accept="image/*" multiple required/>
            <div onClick={() => fileRef.current.click()} className="w-full border rounded-xl flex gap-1 justify-center items-center cursor-pointer" >
              <svg viewBox="0 0 512 512" className="h-10" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 512 512"><path d="M398.1 233.2c0-1.2.2-2.4.2-3.6 0-65-51.8-117.6-115.7-117.6-46.1 0-85.7 27.4-104.3 67-8.1-4.1-17.2-6.5-26.8-6.5-29.5 0-54.1 21.9-58.8 50.5C57.3 235.2 32 269.1 32 309c0 50.2 40.1 91 89.5 91H224v-80h-48.2l80.2-83.7 80.2 83.6H288v80h110.3c45.2 0 81.7-37.5 81.7-83.4 0-45.9-36.7-83.2-81.9-83.3z" fill="#334155" className="fill-000000"></path></svg>
              <span>Choose image</span>
            </div>
            <button className="bg-slate-700 text-white px-3 py-2 rounded-xl hover:bg-slate-900 disabled:opacity-80 uppercase font-semibold">Upload</button>
          </div>
          <button className="bg-pink-500 text-white px-3 py-2 rounded-xl hover:bg-pink-700 disabled:opacity-80 uppercase font-semibold">Create Listing</button>
        </div>
      </form>
    </main>
  )
}
