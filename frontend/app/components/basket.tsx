import Accommodation from "./ui/trip/accommodation"
import Separator from "./ui/trip/components/separator"
import Country from "./ui/trip/country"
import Flight from "./ui/trip/flight"
import Itinerary from "./ui/trip/itinerary"

export default function Basket() {

  return (
    <div className="bg-background relative flex min-h-0 flex-1 flex-col space-y-6 p-4 shadow-xl rounded-xl w-full h-[400px]">
      <div className="flex flex-1 flex-col overflow-auto">
        {/* <Country 
          city="Tokyo"
          name="Japan" 
          description="A country known for its rich culture, cherry blossoms, and advanced technology." 
          imageUrl="/images/japan.jpg"
        />
        <Flight 
          flightCarrier="Delta Airlines"
          flightNumber="DL123"
          departureCity="New York"
          departureAirport="JFK"
          departureDate="March 15, 2025 10:00 AM"
          arrivalCity="Los Angeles"
          arrivalAirport="LAX"
          arrivalDate="March 15, 2025 1:30 PM"
          duration="6h 30m"
          stopover="None"
          imageUrl="/images/delta-logo.jpg"
          price={350} 
        />
        <Accommodation 
          name="Luxury Beach Resort"
          imageUrl="/images/resort.jpg"
          description="Enjoy a luxurious stay with stunning ocean views and top-notch amenities."
          rating={4}
          reviews={128}
          price={250}
          discountPrice={199}
          availability={true}
        /> */}
        <Itinerary />
      </div>
    </div>
  )
}