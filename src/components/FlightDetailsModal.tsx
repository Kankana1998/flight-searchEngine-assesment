import { useState } from 'react';
import type { Flight } from '../types';
import {
  formatTime,
  formatDate,
  getStopsLabel,
  getAirlineName,
  getTotalStops,
} from '../utils/flightUtils';
import { useAuthStore } from '../store/authStore';
import { useCurrencyStore } from '../store/currencyStore';
import { useBookingStore } from '../store/bookingStore';
import { useFlightStore } from '../store/flightStore';
import { useCreditsStore } from '../store/creditsStore';
import { AuthModal } from './AuthModal';
import { BookingConfirmationDialog } from './BookingConfirmationDialog';
import { AddCreditsModal } from './AddCreditsModal';
import { Button } from './ui/button';

interface FlightDetailsModalProps {
  flight: Flight | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FlightDetailsModal = ({ flight, isOpen, onClose }: FlightDetailsModalProps) => {
  const { user } = useAuthStore();
  const { convertPrice, formatPrice: formatCurrencyPrice } = useCurrencyStore();
  const { addBooking } = useBookingStore();
  const { searchParams } = useFlightStore();
  const { deductCredits, getCredits } = useCreditsStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddCreditsModal, setShowAddCreditsModal] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  if (!isOpen || !flight) return null;

  const segments = flight.itineraries[0]?.segments || [];
  const stops = getTotalStops(flight);
  const convertedPrice = convertPrice(parseFloat(flight.price.total), flight.price.currency);
  const formattedPrice = formatCurrencyPrice(convertedPrice);
  
  const userId = user?.uid || '';
  const userCredits = user ? getCredits(userId) : 0;
  const priceInCredits = Math.ceil(convertedPrice); // Convert price to credits (1 credit = 1 unit of currency)
  const hasEnoughCredits = userCredits >= priceInCredits;

  const handleBookFlight = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (isBooking) return; // Prevent multiple clicks

    setBookingError(null);
    setIsBooking(true);

    try {
      // Check if user has enough credits
      if (!hasEnoughCredits) {
        setBookingError(`Insufficient credits. You need ${priceInCredits} credits but only have ${userCredits}.`);
        setIsBooking(false);
        return;
      }

      // Deduct credits
      const creditsDeducted = deductCredits(userId, priceInCredits);
      
      if (!creditsDeducted) {
        setBookingError('Failed to deduct credits. Please try again.');
        setIsBooking(false);
        return;
      }

      // Simulate booking delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Add booking
      addBooking({
        flight,
        passengerCount: searchParams?.adults || 1,
        status: 'confirmed',
        userId: user.email || user.uid || '',
      });

      // Show confirmation dialog
      setShowConfirmation(true);
      setIsBooking(false);
    } catch (error) {
      setBookingError('An error occurred while booking. Please try again.');
      setIsBooking(false);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Flight Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Price Header */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
              <div>
                <div className="text-3xl font-bold text-primary-600">
                  {formattedPrice}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {getStopsLabel(stops)} • {flight.itineraries[0]?.duration || 'N/A'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Available Seats</div>
                <div className="text-lg font-semibold">{flight.numberOfBookableSeats}</div>
              </div>
            </div>

            {/* Flight Segments */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Flight Itinerary</h3>
              
              {segments.map((segment, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">
                          {segment.carrierCode}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {getAirlineName(segment.carrierCode)} {segment.carrierCode}
                          {segment.number}
                        </div>
                        <div className="text-sm text-gray-600">
                          {segment.aircraft?.code || 'N/A'} • {segment.duration}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {getStopsLabel(segment.numberOfStops)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Departure</div>
                      <div className="font-semibold text-lg">
                        {formatTime(segment.departure.at)}
                      </div>
                      <div className="text-sm text-gray-700">
                        {segment.departure.iataCode}
                        {segment.departure.terminal && ` Terminal ${segment.departure.terminal}`}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(segment.departure.at)}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 mb-1">Arrival</div>
                      <div className="font-semibold text-lg">
                        {formatTime(segment.arrival.at)}
                      </div>
                      <div className="text-sm text-gray-700">
                        {segment.arrival.iataCode}
                        {segment.arrival.terminal && ` Terminal ${segment.arrival.terminal}`}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(segment.arrival.at)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600 mb-1">Validating Airline</div>
                  <div className="font-medium">
                    {flight.validatingAirlineCodes.map(code => getAirlineName(code)).join(', ')}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Last Ticketing Date</div>
                  <div className="font-medium">
                    {flight.lastTicketingDate
                      ? formatDate(flight.lastTicketingDate)
                      : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Error */}
          {bookingError && (
            <div className="px-6 py-3 bg-red-50 border-l-4 border-red-500 text-red-700">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{bookingError}</span>
                {!hasEnoughCredits && user && (
                  <Button
                    onClick={() => {
                      setShowAddCreditsModal(true);
                      setBookingError(null);
                    }}
                    variant="default"
                    size="sm"
                    className="ml-4"
                  >
                    Add Credits
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
            {user && (
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-gray-600">Your Credits:</span>
                <span className="font-semibold text-gray-900">
                  {userCredits.toLocaleString()} credits
                </span>
              </div>
            )}
            <div className="flex items-center justify-end gap-3">
              <Button
                onClick={onClose}
                variant="outline"
                disabled={isBooking}
              >
                Close
              </Button>
              <Button
                onClick={handleBookFlight}
                variant="default"
                isLoading={isBooking}
                disabled={isBooking || !!(user && !hasEnoughCredits)}
                className="min-w-[140px]"
              >
                {!user
                  ? 'Sign In to Book'
                  : !hasEnoughCredits
                  ? `Need ${priceInCredits} Credits`
                  : isBooking
                  ? 'Booking...'
                  : `Book for ${priceInCredits} Credits`}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          // After successful login, automatically proceed with booking
          handleBookFlight();
        }}
      />

      {/* Booking Confirmation Dialog */}
      <BookingConfirmationDialog
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        email={user?.email || ''}
        flightId={flight.id}
        price={formattedPrice}
      />

      {/* Add Credits Modal */}
      {user && (
        <AddCreditsModal
          isOpen={showAddCreditsModal}
          onClose={() => {
            setShowAddCreditsModal(false);
            setBookingError(null);
          }}
        />
      )}
    </>
  );
};
