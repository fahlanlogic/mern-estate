export default function Search() {
  return (
    <div className="p-5 flex flex-col lg:flex-row">
      <form className="flex flex-col border-b-2 mb-7 pb-7 gap-7 lg:border-r-2 lg:border-b-0 lg:pr-10 lg:min-h-screen">
        <div className="flex items-center gap-3">
          <label className="font-semibold w-20">Search </label>
          <span className="font-semibold">: </span>
          <input type="text" id="searchTerm" className="border-2 rounded-xl px-2 py-0.5 w-52" placeholder="Search.."/>
        </div>
        <div className="flex gap-3">
          <label className="font-semibold min-w-[80px]">Type </label>
          <span className="font-semibold">:</span>
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-4"/>
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-4"/>
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-4"/>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-4"/>
              <span>Offer</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <label className="font-semibold w-20">Amenities </label>
          <span className="font-semibold">:</span>
          <div className="flex gap-2">
            <input type="checkbox" id="parking" className="w-4"/>
            <span>Parking</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="furnished" className="w-4"/>
            <span>Furnished</span>
          </div>
        </div>
        <div className="flex gap-3">
          <label className="font-semibold w-20">Sort</label>
          <span>:</span>
          <select id="sort_order" className="border-2 rounded-lg">
            <option>Price high to low</option>
            <option>Price low to high</option>
            <option>Latest</option>
            <option>Oldest</option>
          </select>
        </div>
        <button className="w-full bg-gradient-to-b from-pink-600 to-pink-700 border-pink-700 shadow-lg text-white rounded-xl p-2 font-semibold hover:opacity-80">Search</button>
      </form>
      <div className="w-full lg:pl-10">
        <h1 className="font-semibold w-full text-xl lg:border-b-2 lg:pb-3 lg:text-xl">Listing Result: </h1>
      </div>
    </div>
  )
}
