import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaBath, FaBed, FaChair, FaLocationDot, FaShare, FaSquareParking } from "react-icons/fa6";
import Contact from "./Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    } 
    fetchListing();
  }, [params.listingId]);
  
  return (
    <main>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-96 lg:h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="px-3 mx-auto sm:px-0 sm:max-w-lg lg:max-w-2xl xl:max-w-4xl">
            <h1 className="mt-4 mb-4 text-3xl font-black text-slate-700 lg:mt-8 xl:text-4xl">{listing.name}</h1>
            <p className="flex gap-1 items-center text-sm mb-2 text-slate-500 xl:text-base">
              <FaLocationDot className=""/>
              {/* <img className="w-4 text-slate-700" src="https://img.icons8.com/ios-filled/50/region-code.png" alt="region-code"/> */}
              <span className="text-sm xl:text-base">{listing.address}</span>
            </p>
            <div className="flex gap-3 w-full flex-wrap mb-8 items-center xl:text-lg">
              {/* price */}
              <div className="px-2 py-1 rounded-lg text-white bg-pink-700 w-56 text-center shadow-md xl:w-72">
                <span className="line-through pr-2">${listing.regularPrice}</span>
                <span className="font-bold">${+listing.regularPrice - +listing.discountedPrice} / mo</span>
              </div>
              {/* discount percentage */}
              <p className="px-3 py-1 bg-pink-700 rounded-lg w-24 text-center text-white font-black shadow-md xl:w-36">{Math.round(+listing.discountedPrice / +listing.regularPrice * 100)}% OFF</p>
              {/* type */}
              <p className="px-2 py-1 text-white bg-slate-700 rounded-lg w-24 text-center font-bold shadow-md xl:w-32">{listing.type === "rent" ? "For Rent" : "For Sale"}</p>
              {/* share */}
              <div className="rounded-full bg-slate-700 p-2">
                <FaShare className="text-white cursor-pointer" onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }} />
              </div>
              {copied && <p className="text-slate-500">copied</p>}
            </div>
            <p className="text-slate-700 mb-8 xl:text-lg"><b>Description - </b>{listing.description}</p>
            <ul className="text-white flex gap-3 font-semibold flex-wrap mb-5 xl:text-lg">
              <li className="flex gap-1 items-center bg-pink-700 rounded-lg shadow-md px-2 py-1">
                <FaBed />
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
              </li>
              <li className="flex gap-1 items-center bg-pink-700 rounded-lg shadow-md px-2 py-1">
                <FaBath />
                {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
              </li>
              <li className="flex gap-1 items-center bg-pink-700 rounded-lg shadow-md px-2 py-1">
                <FaSquareParking />
                {listing.parking ? "parking spot" : "no parking"}
              </li>
              <li className="flex gap-1 items-center bg-pink-700 rounded-lg shadow-md px-2 py-1">
                <FaChair />
                {listing.furnished ? "furnished" : "not furnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button onClick={() => setContact(true)} className="bg-slate-700 rounded-lg w-full shadow-md text-white font-semibold py-2 my-8 hover:opacity-80 transition duration-500 text-base xl:text-lg">Contact Landlord</button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  )
}