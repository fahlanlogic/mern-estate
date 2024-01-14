/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useEffect, useState } from "react";
import ListingItem from "../components/ListingItem";
export default function Home() {
	SwiperCore.use([Navigation]);
	const [offerListing, setOfferListing] = useState([]);
	const [saleListing, setSaleListing] = useState([]);
	const [rentListing, setRentListing] = useState([]);
	console.log(offerListing);

	useEffect(() => {
		const fetchOfferListing = async () => {
			try {
				const res = await fetch(
					"api/listing/get?offer=true&limit=4"
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
					"api/listing/get?type=rent&limit=4"
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
					"api/listing/get?type=sale&limit=4"
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
			<div className="font-quikcsand pt-32 pb-16 px-3 lg:pt-40 lg:pb-20 xl:pt-48 xl:pb-32 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
				<h1 className="font-semibold text-5xl lg:text-7xl xl:text-8xl mb-7">
					Find your next{" "}
					<b className="text-pink-600">perfect place </b>
					with ease
				</h1>
				<h4 className="text-sm mb-7 lg:text-base xl:text-lg">
					Airbnb will help you find your home fast, easy and
					comfortable. Our expert support are always
					available.
				</h4>
				<Link>
					<button className="bg-gradient-to-b from-pink-500 to-pink-600 px-3 py-1 rounded-full text-white text-sm lg:text-base xl:text-lg font-semibold hover:shadow-lg transition-all duration-300">
						Let&apos;s Start now
					</button>
				</Link>
			</div>

			{/* swiper */}
			<Swiper navigation>
				{offerListing &&
					offerListing.length > 0 &&
					offerListing.map(listing => (
						<SwiperSlide>
							<div
								style={{
									background: `url(${listing.imageUrls[0]}) center no-repeat`,
									backgroundSize: "cover",
								}}
								className="h-96 lg:h-[30rem] xl:h-[36rem]"
								key={listing._id}></div>
						</SwiperSlide>
					))}
			</Swiper>

			{/* listing */}
			{/* offer listing */}
			{offerListing && offerListing.length > 0 && (
				<div className="px-3 mx-auto mt-16 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl border-b-2 border-gray-200 pb-8">
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
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
						{offerListing.map(listing => (
							<ListingItem
								listing={listing}
								key={listing._id}></ListingItem>
						))}
					</div>
				</div>
			)}
			{saleListing && saleListing.length > 0 && (
				<div className="px-3 mt-8 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto border-b-2 border-gray-200 pb-8">
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
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
						{saleListing.map(listing => (
							<ListingItem
								listing={listing}
								key={listing._id}></ListingItem>
						))}
					</div>
				</div>
			)}
			{rentListing && rentListing.length > 0 && (
				<div className="px-3 mt-8 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto pb-8">
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
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
						{rentListing.map(listing => (
							<ListingItem
								listing={listing}
								key={listing._id}></ListingItem>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
