import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

/* eslint-disable react/prop-types */
export default function ListingItem({ listing }) {
  return (
    <div className="rounded-lg w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <Link
        to={`/listing/${listing._id}`}
        className="h-full flex flex-col justify-between">
        <img
          src={listing.imageUrls}
          className="w-full object-cover h-60 hover:scale-110 transition-all duration-300"
          alt="image cover"
        />
        <div className="body flex flex-1 flex-col justify-between gap-2 p-3">
          <div>
            <p className="mt-2 font-bold text-lg">{listing.name}</p>
            <div className="flex items-center gap-1 text-xs text-slate-600">
              <MdLocationOn />
              <span className="line-clamp-1">{listing.address}</span>
            </div>
          </div>
          <p className="line-clamp-2 text-slate-600 text-sm">
            {listing.description}
          </p>
          <div>
            <div className="flex gap-4 my-2">
              <p className="font-semibold">
                ${listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" ? " / mo" : ""}
              </p>
              <span className="bg-gradient-to-b from-pink-600 to-pink-700 text-sm text-white rounded-md flex items-center px-1 font-semibold">
                {Math.round(
                  (+listing.discountedPrice / +listing.regularPrice) * 100
                )}
                % OFF
              </span>
            </div>
            <div className="flex gap-3 w-full text-xs font-semibold text-slate-600">
              <p>
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </p>
              <p>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bedrooms} bath`}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
