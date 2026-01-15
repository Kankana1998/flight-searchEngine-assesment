import { Filters } from '../Filters';
import { PriceGraph } from '../PriceGraph';
import { FlightList } from '../FlightList';
import { LandingPage } from '../LandingPage';
import { BookingHistory } from '../BookingHistory';
import { useFlightStore } from '../../store/flightStore';
import { useAuthStore } from '../../store/authStore';
import { useBookingStore } from '../../store/bookingStore';

export const MainContent = () => {
  const { error, flights } = useFlightStore();
  const { user } = useAuthStore();
  const { getBookingsByUser } = useBookingStore();
  const hasResults = flights.length > 0;
  const hasBookings = user ? getBookingsByUser(user.email || user.uid || '').length > 0 : false;
  const showLandingPage = !hasResults && (!user || !hasBookings);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
     
      {error && (
        <div className="mb-6 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      {/* Results Section */}
      {hasResults && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Filters />
            </div>
          </div>

          {/* Main Results */}
          <div className="lg:col-span-3">
            <PriceGraph />
            <FlightList />
          </div>
        </div>
      )}
      {showLandingPage && <LandingPage />}
      {!hasResults && user && hasBookings && <BookingHistory />}
    </main>
  );
};
