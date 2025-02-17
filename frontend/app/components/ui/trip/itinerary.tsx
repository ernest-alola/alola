import { useState } from "react";
import { Trash2 } from "lucide-react";
import Wrapper from "./components/wrapper";
import { useBasket } from "../chat/hooks/use-basket";

export default function Itinerary() {
  const { basket, removeFromBasket } = useBasket();

  // ✅ Extract itinerary activities from basket
  const itineraryActivities = basket?.activities ?? [];

  if (itineraryActivities.length === 0){
    return;
  }
  
  return (
    <Wrapper>
      <h2 className="text-xl font-bold mb-4">Itinerary</h2>
      <div className="space-y-4">
        {itineraryActivities.map((activity) => (
          <div key={activity.uuid} className="border rounded-lg p-4 bg-white shadow-md">
            {/* ✅ Activity Image */}
            {activity.photoUrls.length > 0 && (
              <img
                src={activity.photoUrls[0]}
                alt={activity.title}
                className="w-full h-40 object-cover rounded-lg"
              />
            )}

            {/* ✅ Activity Details */}
            <div className="mt-3">
              <h3 className="text-lg font-semibold">{activity.title}</h3>
              <p className="text-gray-600 text-sm">{activity.description}</p>
              <p className="text-blue-600 font-semibold mt-2">
                {activity.currency.symbol}{activity.basePrice}
              </p>
            </div>

            {/* ✅ Remove Activity Button */}
            <button
              onClick={() => removeFromBasket(activity.uuid)}
              className="mt-3 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 flex items-center justify-center"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Remove from Itinerary
            </button>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
