import type { Flight, PriceDataPoint } from '../types';

export const formatPrice = (price: string, currency: string = 'USD'): string => {
  const numPrice = parseFloat(price);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
};

export const formatDuration = (duration: string): string => {
  return duration;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

export const getStopsLabel = (stops: number): string => {
  if (stops === 0) return 'Non-stop';
  if (stops === 1) return '1 stop';
  return `${stops} stops`;
};

export const getTotalStops = (flight: Flight): number => {
  const segments = flight.itineraries[0]?.segments || [];

  return Math.max(0, segments.length - 1);
};

export const getAirlineName = (code: string): string => {
  const airlineNames: Record<string, string> = {
    AA: 'American Airlines',
    UA: 'United Airlines',
    DL: 'Delta Air Lines',
    BA: 'British Airways',
    LH: 'Lufthansa',
    AF: 'Air France',
    KL: 'KLM',
    VS: 'Virgin Atlantic',
    WN: 'Southwest Airlines',
    AS: 'Alaska Airlines',
    B6: 'JetBlue Airways',
    AI: 'Air India',
    SG: 'SpiceJet',
    IX: 'Air India Express',
    HR: 'Hahn Air',
  };
  return airlineNames[code] || code;
};

export const generatePriceDataPoints = (flights: Flight[]): PriceDataPoint[] => {
  const priceMap = new Map<string, { total: number; count: number }>();

  flights.forEach((flight) => {
    const price = parseFloat(flight.price.total);
    const roundedPrice = Math.round(price / 50) * 50; 
    const key = roundedPrice.toString();

    if (priceMap.has(key)) {
      const existing = priceMap.get(key)!;
      existing.total += price;
      existing.count += 1;
    } else {
      priceMap.set(key, { total: price, count: 1 });
    }
  });

  return Array.from(priceMap.entries())
    .map(([price, data]) => ({
      date: price,
      price: Math.round(data.total / data.count),
      count: data.count,
    }))
    .sort((a, b) => parseFloat(a.date) - parseFloat(b.date));
};

export const getUniqueAirlines = (flights: Flight[]): string[] => {
  const airlines = new Set<string>();
  flights.forEach((flight) => {
    flight.validatingAirlineCodes.forEach((code) => airlines.add(code));
  });
  return Array.from(airlines).sort();
};

export const getMinMaxPrice = (flights: Flight[]): { min: number; max: number } => {
  if (flights.length === 0) return { min: 0, max: 1000 };
  
  const prices = flights.map((f) => parseFloat(f.price.total));
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};
