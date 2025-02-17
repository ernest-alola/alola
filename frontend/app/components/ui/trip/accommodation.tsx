import { Star, CheckCircle, XCircle } from "lucide-react";
import Wrapper from "./components/wrapper";

interface AccommodationProps {
  name: string;
  imageUrl: string;
  description: string;
  rating: number; // 0 - 5 scale
  reviews: number; // Number of reviews
  price: number; // Base price per night
  discountPrice?: number; // Optional discounted price
  availability: boolean; // true if available
}

export default function Accommodation({
  name,
  imageUrl,
  description,
  rating,
  reviews,
  price,
  discountPrice,
  availability,
}: AccommodationProps) {
  return (
    <Wrapper>
      <h2 className="text-xl font-bold py-4">Accommodation</h2>
      {/* Content */}
      <div className="space-y-2">
        {/* Image */}
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
        {/* Name */}
        <p className="text-md font-bold">{name}</p>
        {/* Rating & Reviews */}
        <div className="flex items-center space-x-2 text-yellow-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className={`h-5 w-5 ${index < rating ? "fill-current" : "text-gray-300"}`} />
          ))}
          <span className="text-gray-600 text-sm">({reviews} reviews)</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

        {/* Price Section */}
        <div className="flex items-center space-x-2">
          {discountPrice ? (
            <>
              <span className="text-sm font-bold text-red-500">${discountPrice} / night</span>
              <span className="text-sm text-gray-500 line-through">${price}</span>
            </>
          ) : (
            <span className="text-sm font-bold">${price} / night</span>
          )}
        </div>

        {/* Availability */}
        <div className={`flex items-center space-x-1 ${availability ? "text-green-600" : "text-red-500"}`}>
          {availability ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          <span className="text-sm">{availability ? "Available" : "Booked Out"}</span>
        </div>
      </div>
    </Wrapper>
  );
}
