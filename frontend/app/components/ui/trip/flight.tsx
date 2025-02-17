import Image from "next/image";
import Wrapper from "./components/wrapper";

interface FlightProps {
  flightCarrier: string;
  flightNumber: string;

  departureCity: string;
  departureAirport: string;
  departureDate: string;

  arrivalCity: string;
  arrivalAirport: string;
  arrivalDate: string;

  duration: string;
  stopover?: string;
  imageUrl: string;
  price: number;
}

export default function Flight({ 
    flightCarrier,
    flightNumber,
    departureCity,
    departureAirport,
    departureDate,
    arrivalCity,
    arrivalAirport,
    arrivalDate,
    duration,
    stopover,
    imageUrl,
    price
}: FlightProps) {
  return (
    <Wrapper>
      <h2 className="text-xl font-bold py-4">Flight</h2>
      <div className="flex flex-row space-y-4 w-full">
        {/* Flight Information */}
        <div className="space-y-2">
          <h2 className="text-md font-bold">{flightCarrier} - {flightNumber}</h2>
          <div className="text-sm text-gray-600">
            <p><strong>Departure:</strong> {departureCity} ({departureAirport})</p>
            <p><strong>Arrival:</strong> {arrivalCity} ({arrivalAirport})</p>
            <p><strong>Departure Date:</strong> {departureDate}</p>
            <p><strong>Arrival Date:</strong> {arrivalDate}</p>
            <p><strong>Duration:</strong> {duration}</p>
            <p><strong>Stopover:</strong> {stopover}</p>
          </div>
          {/* Price Section */}
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-green-600">${price}</span>
          </div>
        </div>
        {/* Flight Image */}
        <div>
          <img src={imageUrl} alt={flightCarrier} className="w-full h-32 object-cover rounded-lg" />
        </div>
      </div>
    </Wrapper>
  );
}
