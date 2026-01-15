import { useFlightStore } from '../store/flightStore';
import { amadeusAPI } from '../api/amadeus';
import type { FlightSearchParams } from '../types';

export const useSearchFlights = () => {
  const { setFlights, setLoading, setError } = useFlightStore();

  const searchFlights = async (params: FlightSearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const flights = await amadeusAPI.searchFlights(params);
      setFlights(flights);
    } catch (error: any) {
      setError(error.message || 'Failed to search flights');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { searchFlights };
};
