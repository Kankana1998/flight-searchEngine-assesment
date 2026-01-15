export interface Flight {
  id: string;
  price: {
    total: string;
    currency: string;
  };
  itineraries: Itinerary[];
  numberOfBookableSeats: number;
  validatingAirlineCodes: string[];
  lastTicketingDate?: string;
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface Segment {
  departure: {
    iataCode: string;
    at: string;
    terminal?: string;
  };
  arrival: {
    iataCode: string;
    at: string;
    terminal?: string;
  };
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  duration: string;
  numberOfStops: number;
}

export interface FlightSearchParams {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass?: string;
  nonStop?: boolean;
}

export interface FlightFilters {
  maxPrice?: number;
  minPrice?: number;
  airlines: string[];
  stops: number[]; // 0 = non-stop, 1 = one stop, etc.
  duration?: {
    min?: number;
    max?: number;
  };
}

export interface PriceDataPoint {
  date: string;
  price: number;
  count: number;
}

export interface Airport {
  iataCode: string;
  name: string;
  cityName: string;
}
