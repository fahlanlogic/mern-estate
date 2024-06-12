/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import { useEffect, useState } from "react";
import ListingItem from "../components/ListingItem";
import { IoIosArrowDown } from "react-icons/io";
import Footer from "../components/Footer";

export default function Home() {
	SwiperCore.use([Autoplay, Navigation, Pagination]);
	const [offerListing, setOfferListing] = useState([]);
	const [saleListing, setSaleListing] = useState([]);
	const [rentListing, setRentListing] = useState([]);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BASE_URL_API
          }/api/listing/get?offer=true&limit=4`
        );
        const data = await res.json();
        setOfferListing(data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListing = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BASE_URL_API
          }/api/listing/get?type=rent&limit=4`
        );
        const data = await res.json();
        setRentListing(data);
        fetchSaleListing();
      } catch (error) {
        console.log;
      }
    };

    const fetchSaleListing = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BASE_URL_API
          }/api/listing/get?type=sale&limit=4`
        );
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        console.log;
      }
    };
    fetchOfferListing();
  }, [setOfferListing]);
	return (
    <div>
      {/* header */}
      <div className="px-4 h-screen relative flex items-center mx-auto md:w-5/6">
        <div className="text-center font-nunito">
          <h1 className="font-bold leading-snug text-6xl md:leading-snug md:text-7xl 2xl:text-8xl lg:leading-snug xl:leading-snug mb-10 md:mb-16">
            Find your next{" "}
            <b className="text-pink-600 font-extrabold">perfect place </b>
            with ease
          </h1>
          <h4 className="text-sm mb-7 md:text-base xl:text-xl">
            Airbnb will help you find your home fast, easy and comfortable. Our
            expert support are always available.
          </h4>
          {/* <Link>
						<button className="bg-gradient-to-b from-pink-500 to-pink-600 px-3 py-1 rounded-full text-white text-sm md:text-base xl:text-xl font-semibold hover:opacity-70 transition-all duration-500">
						Let&apos;s Start now
						</button>
					</Link> */}
        </div>
        <a href="#offer_listing">
          <IoIosArrowDown className="text-3xl animate-bounce right-0 left-0 bottom-10 absolute mx-auto"></IoIosArrowDown>
        </a>
      </div>

      {/* swiper */}
      <Swiper
        // autoplay={true}
        navigation={true}>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map(listing => (
            <SwiperSlide>
              <Link to={`/listing/${listing._id}`}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[480px] md:h-[93vh]"
                  key={listing._id}></div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing */}
      {/* offer listing */}
      {offerListing && offerListing.length > 0 && (
        <div
          id="offer_listing"
          className="px-4 pt-24 mx-auto font-nunito md:w-5/6">
          <div className="flex justify-between items-center mb-4 xl:mb-8">
            <h2 className="font-bold text-xl lg:text-2xl xl:text-3xl">
              Recent Offer
            </h2>
            <Link
              to={`/search?offer=true`}
              className="text-xs text-white bg-gradient-to-b from-pink-600 to-pink-700 rounded-full px-2.5 py-1 lg:text-sm xl:text-base hover:opacity-80 hover:shadow-md transition-all duration-300 ">
              Show more
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 border-b-2 border-gray-200 pb-16">
            {offerListing.map(listing => (
              <ListingItem
                listing={listing}
                key={listing._id}></ListingItem>
            ))}
          </div>
        </div>
      )}
      {saleListing && saleListing.length > 0 && (
        <div className="px-4 pt-16 font-nunito mx-auto md:w-5/6">
          <div className="flex justify-between items-center mb-4 xl:mb-8">
            <h2 className="font-bold text-xl lg:text-2xl xl:text-3xl">
              Recent Place for Sale
            </h2>
            <Link
              to={`/search?type=sale`}
              className="text-xs text-white bg-gradient-to-b from-pink-600 to-pink-700 rounded-full px-2.5 py-1 lg:text-sm xl:text-base hover:opacity-80 hover:shadow-md transition-all duration-300 ">
              Show more
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 border-b-2 border-gray-200 pb-16">
            {saleListing.map(listing => (
              <ListingItem
                listing={listing}
                key={listing._id}></ListingItem>
            ))}
          </div>
        </div>
      )}
      {rentListing && rentListing.length > 0 && (
        <div className="px-4 pt-16 font-nunito mx-auto md:w-5/6">
          <div className="flex justify-between items-center mb-4 xl:mb-8">
            <h2 className="font-bold text-xl lg:text-2xl xl:text-3xl">
              Recent Place for Rent
            </h2>
            <Link
              to={`/search?type=rent`}
              className="text-xs text-white bg-gradient-to-b from-pink-600 to-pink-700 rounded-full px-2.5 py-1 lg:text-sm xl:text-base hover:opacity-80 hover:shadow-md transition-all duration-300 ">
              Show more
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 border-b-2 border-gray-200 pb-16">
            {rentListing.map(listing => (
              <ListingItem
                listing={listing}
                key={listing._id}></ListingItem>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
