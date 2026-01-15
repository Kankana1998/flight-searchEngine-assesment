import { create } from 'zustand';
import type { Flight, FlightFilters, FlightSearchParams } from '../types';
import { getTotalStops } from '../utils/flightUtils';

interface FlightState {
  flights: Flight[];
  filteredFlights: Flight[];
  searchParams: FlightSearchParams | null;
  filters: FlightFilters;
  isLoading: boolean;
  error: string | null;
  
  setFlights: (flights: Flight[]) => void;
  setSearchParams: (params: FlightSearchParams) => void;
  setFilters: (filters: Partial<FlightFilters>) => void;
  applyFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const defaultFilters: FlightFilters = {
  airlines: [],
  stops: [],
};

export const useFlightStore = create<FlightState>((set, get) => ({
  flights: [],
  filteredFlights: [],
  searchParams: null,
  filters: defaultFilters,
  isLoading: false,
  error: null,

  setFlights: (flights) => {
    set({ flights, filteredFlights: flights });
    get().applyFilters();
  },

  setSearchParams: (params) => {
    set({ searchParams: params });
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    get().applyFilters();
  },

  applyFilters: () => {
    const { flights, filters } = get();
    
    let filtered = [...flights];

    // Filter by price range
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(
        (f) => parseFloat(f.price.total) >= filters.minPrice!
      );
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(
        (f) => parseFloat(f.price.total) <= filters.maxPrice!
      );
    }

    // Filter by airlines
    if (filters.airlines.length > 0) {
      filtered = filtered.filter((f) =>
        f.validatingAirlineCodes.some((code) =>
          filters.airlines.includes(code)
        )
      );
    }

    // Filter by stops
    if (filters.stops.length > 0) {
      filtered = filtered.filter((f) => {
        const stops = getTotalStops(f);
        return filters.stops.includes(stops);
      });
    }

    // Filter by duration
    if (filters.duration) {
      filtered = filtered.filter((f) => {
        const durationStr = f.itineraries[0]?.duration || '';
        const hours = parseInt(durationStr.match(/(\d+)h/)?.[1] || '0');
        const minutes = parseInt(durationStr.match(/(\d+)m/)?.[1] || '0');
        const totalMinutes = hours * 60 + minutes;

        if (filters.duration!.min !== undefined && totalMinutes < filters.duration!.min) {
          return false;
        }
        if (filters.duration!.max !== undefined && totalMinutes > filters.duration!.max) {
          return false;
        }
        return true;
      });
    }

    set({ filteredFlights: filtered });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },

  reset: () => {
    set({
      flights: [],
      filteredFlights: [],
      searchParams: null,
      filters: defaultFilters,
      isLoading: false,
      error: null,
    });
  },
}));
