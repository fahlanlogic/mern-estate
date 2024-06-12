/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ShowListing() {
	const [userListings, setUserListings] = useState([]);
	const [showListingsError, setShowListingsError] = useState(false);
	const { currentUser } = useSelector(state => state.user);
	const [emptyListings, setEmptyListings] = useState(false);

	// merender tampilan yg mengambil data dari function fetchListings
	useEffect(() => {
		fetchListings();
	}, []);

	// function untuk menyimpan data listings yang diambil dari route /api/user/listings untuk disimpankan ke state setUserListings
	const fetchListings = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_API}/api/user/listing/${
          currentUser._id
        }`
      );
      const data = await res.json();
      if (data.length === 0) {
        setEmptyListings(true);
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  // function menghapus listing
  const handleDeleteListing = async listingId => {
    // mentry ke API untuk menghapus listing dengan method DELETE, tidak perlu mengembalikan respon data
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_API}/api/listing/delete/${listingId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.succes === false) {
        console.log(data.message);
      }
      // mem filter array artinya memasukan semua array ke dalam array baru terkecuali yang listing._id nya sesuai parameter listingId
      setUserListings(prev =>
        prev.filter(listing => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
	return (
		<div className="mx-auto flex items-center px-4 mt-20 md:w-5/6 md:mt-32 lg:max-w-2xl">
			<div className="w-full">
				<p>
					{showListingsError
						? "Error showing listings"
						: " "}
				</p>
				<p className="text-center text-xl">
					{emptyListings
						? "No listings found, please create your listing"
						: " "}
				</p>
				{userListings && userListings.length > 0 && (
					<div className="flex flex-col gap-3">
						<h1 className="pb-12 text-center font-bold text-4xl">
							Your Listings
						</h1>
						{userListings.map(listing => (
							<div
								key={listing._id}
								className="flex gap-3 justify-between items-center border rounded-xl p-3">
								<Link
									to={`/listing/${listing._id}`}>
									<img
										src={
											listing
												.imageUrls[0]
										}
										alt="listing image cover"
										className="w-32 rounded-lg object-contain"
									/>
								</Link>
								<Link
									className="font-semibold hover:underline flex-1 truncate"
									to={`/listing/${listing._id}`}>
									<p className="cursor-pointer">
										{listing.name}
									</p>
								</Link>
								<div className="flex flex-col gap-3">
									<Link
										to={`/update-listing/${listing._id}`}>
										<button className="edit rounded-full bg-green-600 hover:bg-green-700 transition duration-300 p-1.5">
											<xml version="1.0" />
											<svg
												width="16"
												height="16"
												viewBox="0 0 48 48"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M5.32497 43.4996L13.81 43.4998L44.9227 12.3871L36.4374 3.90186L5.32471 35.0146L5.32497 43.4996Z"
													fill="#ffffff"
													stroke="#ffffff"
													strokeWidth="4"
													strokeLinejoin="round"
												/>
												<path
													d="M27.9521 12.3872L36.4374 20.8725"
													stroke="#ffffff"
													strokeWidth="4"
													strokeLinecap="square"
													strokeLinejoin="round"
												/>
											</svg>
										</button>
									</Link>
									<button
										onClick={() =>
											handleDeleteListing(
												listing._id
											)
										}
										className="delete rounded-full bg-red-600 hover:bg-red-700 transition duration-300 p-1.5">
										<xml version="1.0" />
										<svg
											width="16"
											height="16"
											viewBox="0 0 48 48"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M9 10V44H39V10H9Z"
												fill="#ffffff"
												stroke="#ffffff"
												strokeWidth="4"
												strokeLinejoin="round"
											/>
											<path
												d="M20 20V33"
												stroke="#b91c1c"
												strokeWidth="4"
												strokeLinecap="square"
												strokeLinejoin="round"
											/>
											<path
												d="M28 20V33"
												stroke="#b91c1c"
												strokeWidth="4"
												strokeLinecap="square"
												strokeLinejoin="round"
											/>
											<path
												d="M4 10H44"
												stroke="#ffffff"
												strokeWidth="4"
												strokeLinecap="square"
												strokeLinejoin="round"
											/>
											<path
												d="M16 10L19.289 4H28.7771L32 10H16Z"
												fill="#ffffff"
												stroke="#ffffff"
												strokeWidth="4"
												strokeLinejoin="round"
											/>
										</svg>
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
