import { useState } from 'react';
import { useFlightStore } from '../store/flightStore';
import { useCurrencyStore } from '../store/currencyStore';
import {
  formatTime,
  formatDate,
  getStopsLabel,
  getAirlineName,
  getTotalStops,
} from '../utils/flightUtils';
import { FlightDetailsModal } from './FlightDetailsModal';
import { Button } from './ui/button';
import type { Flight } from '../types';

export const FlightList = () => {
  const { filteredFlights, isLoading } = useFlightStore();
  const { convertPrice, formatPrice: formatCurrencyPrice } = useCurrencyStore();
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Searching flights...</span>
        </div>
      </div>
    );
  }

  if (filteredFlights.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No flights found</p>
          <p className="text-gray-500 text-sm mt-2">
            Try adjusting your search criteria or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {filteredFlights.length} Flight{filteredFlights.length !== 1 ? 's' : ''} Found
        </h2>
      </div>

      {filteredFlights.map((flight) => {
        const segments = flight.itineraries[0]?.segments || [];
        const firstSegment = segments[0];
        const lastSegment = segments[segments.length - 1];
        const stops = getTotalStops(flight);
        const airline = flight.validatingAirlineCodes[0] || 'N/A';

        return (
          <div
            key={flight.id}
            className="card hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Flight Info */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-2xl font-bold text-primary-600">
                    {formatCurrencyPrice(
                      convertPrice(parseFloat(flight.price.total), flight.price.currency)
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {getAirlineName(airline)} {firstSegment?.carrierCode}
                    {firstSegment?.number}
                    {segments.length > 1 && ` + ${segments.length - 1} more`}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 text-xs mb-1">Departure</div>
                    <div className="font-medium">
                      {formatTime(firstSegment?.departure.at || '')}
                    </div>
                    <div className="text-gray-600 text-xs">
                      {firstSegment?.departure.iataCode}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {formatDate(firstSegment?.departure.at || '')}
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-xs mb-1">Arrival</div>
                    <div className="font-medium">
                      {formatTime(lastSegment?.arrival.at || '')}
                    </div>
                    <div className="text-gray-600 text-xs">
                      {lastSegment?.arrival.iataCode}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {formatDate(lastSegment?.arrival.at || '')}
                    </div>
                    {segments.length > 1 && (
                      <div className="text-gray-400 text-xs mt-1">
                        via {segments.slice(0, -1).map(s => s.arrival.iataCode).join(', ')}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-gray-500 text-xs mb-1">Duration</div>
                    <div className="font-medium">
                      {flight.itineraries[0]?.duration || 'N/A'}
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-xs mb-1">Stops</div>
                    <div className="font-medium">{getStopsLabel(stops)}</div>
                    {flight.numberOfBookableSeats > 0 && (
                      <div className="text-gray-500 text-xs mt-1">
                        {flight.numberOfBookableSeats} seat
                        {flight.numberOfBookableSeats !== 1 ? 's' : ''} available
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Select Button */}
              <div className="md:ml-4">
                <Button
                  onClick={() => {
                    setSelectedFlight(flight);
                    setIsModalOpen(true);
                  }}
                  variant="default"
                  className="w-full md:w-auto whitespace-nowrap"
                >
                  Select
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Flight Details Modal */}
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
