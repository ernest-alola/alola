export interface Activity {
    uuid: string;
    title: string;
    description: string;
    highlights: string;
    additionalInfo: string;
    priceExcludes: string;
    latitude: number;
    longitude: number;
    address: string;
    minPax: number;
    maxPax: number;
    basePrice: number;
    currency: { code: string; symbol: string };
    typeName: string;
    photoUrls: string[];
    businessHoursFrom: string;
    businessHoursTo: string;
    averageDelivery: string;
    hotelPickup: boolean;
    airportPickup: boolean;
}
