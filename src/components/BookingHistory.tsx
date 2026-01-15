import { useAuthStore } from '../store/authStore';
import { useBookingStore } from '../store/bookingStore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plane, Calendar, MapPin, Clock, X } from 'lucide-react';
import { formatPrice, formatDate, formatTime, getAirlineName, getTotalStops, getStopsLabel } from '../utils/flightUtils';
import { useCurrencyStore } from '../store/currencyStore';
import { FlightDetailsModal } from './FlightDetailsModal';
import { useState } from 'react';
import type { Flight } from '../types';

export const BookingHistory = () => {
  const { user } = useAuthStore();
  const { getBookingsByUser, cancelBooking } = useBookingStore();
  const { convertPrice, formatPrice: formatCurrencyPrice } = useCurrencyStore();
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">Please sign in to view your booking history</p>
        </CardContent>
      </Card>
    );
  }

  const bookings = getBookingsByUser(user.email || user.uid || '');

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Plane className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Bookings Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start exploring and book your first flight with Aura Travel!
          </p>
          <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Search Flights
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">My Bookings</h2>
          <p className="text-muted-foreground">Manage your flight reservations</p>
        </div>
        <Badge variant="secondary">{bookings.length} Active Booking{bookings.length !== 1 ? 's' : ''}</Badge>
      </div>

      <div className="grid gap-6">
        {bookings.map((booking) => {
          const flight = booking.flight;
          const segments = flight.itineraries[0]?.segments || [];
          const firstSegment = segments[0];
          const lastSegment = segments[segments.length - 1];
          const stops = getTotalStops(flight);
          const airline = flight.validatingAirlineCodes[0] || 'N/A';

          const convertedPrice = convertPrice(
            parseFloat(flight.price.total),
            flight.price.currency
          );
          const formattedPrice = formatCurrencyPrice(convertedPrice);

          return (
            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Flight Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-2xl font-bold text-primary">{formattedPrice}</div>
                      <Badge
                        variant={
                          booking.status === 'confirmed'
                            ? 'default'
                            : booking.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Departure</div>
                        <div className="font-medium">{formatTime(firstSegment?.departure.at || '')}</div>
                        <div className="text-sm text-muted-foreground">{firstSegment?.departure.iataCode}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(firstSegment?.departure.at || '')}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Arrival</div>
                        <div className="font-medium">{formatTime(lastSegment?.arrival.at || '')}</div>
                        <div className="text-sm text-muted-foreground">{lastSegment?.arrival.iataCode}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(lastSegment?.arrival.at || '')}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Airline</div>
                        <div className="font-medium">{getAirlineName(airline)}</div>
                        <div className="text-sm text-muted-foreground">{getStopsLabel(stops)}</div>
                      </div>

                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Passengers</div>
                        <div className="font-medium">{booking.passengerCount}</div>
                        <div className="text-xs text-muted-foreground">
                          Booked {formatDate(booking.bookingDate)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedFlight(flight);
                        setIsModalOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                    {booking.status === 'confirmed' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          if (confirm('Are you sure you want to cancel this booking?')) {
                            cancelBooking(booking.id);
                          }
                        }}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <FlightDetailsModal
        flight={selectedFlight}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFlight(null);
        }}
      />
    </div>
  );
};
