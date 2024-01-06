/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "created_at",
    order: "desc"
  })
  console.log(listings);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const offerFromUrl = urlParams.get("offer");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      urlParams ||
      searchTermFromUrl ||
      typeFromUrl ||
      offerFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        offer: offerFromUrl === "true" ? true : false,
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListing = async () => {
      setLoading(true)
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setLoading(false)
    }

    fetchListing()
  }, [location.search]);
  const handleChange = (e) => {
    if (e.target.id === "all" || e.target.id === "rent" || e.target.id === "sale") {
      setSidebardata({ ...sidebardata, type: e.target.id })
    }
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value })
    }
    if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
      setSidebardata({ ...sidebardata, [e.target.id]: e.target.checked || e.target.checked === "true" ? true : false })
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at"
      const order = e.target.value.split("_")[1] || "desc"
      setSidebardata({ ...sidebardata, sort, order })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }

  return (
    <div className="p-5 flex flex-col lg:flex-row">
      <form onSubmit={handleSubmit} className="flex flex-col border-b-2 mb-7 pb-7 gap-7 lg:border-r-2 lg:border-b-0 lg:pr-10 lg:min-h-screen">
        <div className="flex items-center gap-3">
          <label className="font-semibold w-20">Search </label>
          <span className="font-semibold">: </span>
          <input onChange={handleChange} value={sidebardata.searchTerm} type="text" id="searchTerm" className="border-2 rounded-xl px-2 py-0.5 w-52" placeholder="Search.."/>
        </div>
        <div className="flex gap-3">
          <label className="font-semibold min-w-[80px]">Type </label>
          <span className="font-semibold">:</span>
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2">
              <input onChange={handleChange} checked={sidebardata.type === "all"} type="checkbox" id="all" className="w-4"/>
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input onChange={handleChange} checked={sidebardata.type === "sale"} type="checkbox" id="sale" className="w-4"/>
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input onChange={handleChange} checked={sidebardata.type === "rent"} type="checkbox" id="rent" className="w-4"/>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input onChange={handleChange} checked={sidebardata.offer} type="checkbox" id="offer" className="w-4"/>
              <span>Offer</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <label className="font-semibold w-20">Amenities </label>
          <span className="font-semibold">:</span>
          <div className="flex gap-2">
            <input onChange={handleChange} checked={sidebardata.parking} type="checkbox" id="parking" className="w-4"/>
            <span>Parking</span>
          </div>
          <div className="flex gap-2">
            <input onChange={handleChange} checked={sidebardata.furnished} type="checkbox" id="furnished" className="w-4"/>
            <span>Furnished</span>
          </div>
        </div>
        <div className="flex gap-3">
          <label className="font-semibold w-20">Sort</label>
          <span>:</span>
          <select onChange={handleChange} defaultValue={"created_at_desc"} id="sort_order" className="border-2 rounded-lg">
            <option value="regularPrice_desc">Price high to low</option>
            <option value="regularPrice_asc">Price low to high</option>
            <option value="createdAt_desc">Latest</option>
            <option value="createdAt_asc">Oldest</option>
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
