import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useFlightStore } from '../store/flightStore';
import { useSearchFlights } from '../hooks/useSearchFlights';
import { useCurrencyStore, CURRENCIES } from '../store/currencyStore';
import type { FlightSearchParams } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Plane, Calendar, Users, Search, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SearchForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');

  const { flights, isLoading, setSearchParams } = useFlightStore();
  const hasResults = flights.length > 0;

  // Set default departure date to tomorrow
  useEffect(() => {
    if (!departureDate) {
      const tomorrow = format(new Date(Date.now() + 86400000), 'yyyy-MM-dd');
      setDepartureDate(tomorrow);
    }
  }, [departureDate]);

  const { searchFlights } = useSearchFlights();
  const { selectedCurrency, setCurrency } = useCurrencyStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!origin || !destination || !departureDate) {
      alert('Please fill in all required fields');
      return;
    }

    const params: FlightSearchParams = {
      originLocationCode: origin.toUpperCase(),
      destinationLocationCode: destination.toUpperCase(),
      departureDate: format(new Date(departureDate), 'yyyy-MM-dd'),
      adults,
      ...(tripType === 'round-trip' && returnDate && {
        returnDate: format(new Date(returnDate), 'yyyy-MM-dd'),
      }),
    };

    setSearchParams(params);
    await searchFlights(params);
  };

  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <Card className={cn(
      "shadow-2xl border-0 rounded-xl",
      hasResults ? "bg-white/95 backdrop-blur-sm" : "bg-white"
    )}>
      <CardContent className="p-5 md:p-6 lg:p-7">
        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          {/* Trip Type Toggle */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant={tripType === 'one-way' ? 'default' : 'outline'}
              onClick={() => setTripType('one-way')}
              className={cn(
                "flex-1 h-12 text-base font-semibold",
                tripType === 'one-way' ? 'bg-primary hover:bg-primary/90' : ''
              )}
            >
              One-way
            </Button>
            <Button
              type="button"
              variant={tripType === 'round-trip' ? 'default' : 'outline'}
              onClick={() => setTripType('round-trip')}
              className={cn(
                "flex-1 h-12 text-base font-semibold",
                tripType === 'round-trip' ? 'bg-primary hover:bg-primary/90' : ''
              )}
            >
              Round-trip
            </Button>
          </div>

          {/* Main Fields Grid - More Flexible Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Origin */}
            <div className="space-y-2">
              <Label htmlFor="origin" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Plane className="w-4 h-4 text-primary" />
                From
              </Label>
              <Input
                id="origin"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                placeholder="e.g., JFK"
                required
                maxLength={3}
                className="h-12 text-base font-medium"
              />
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Plane className="w-4 h-4 text-primary rotate-90" />
                To
              </Label>
              <Input
                id="destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value.toUpperCase())}
                placeholder="e.g., LAX"
                required
                maxLength={3}
                className="h-12 text-base font-medium"
              />
            </div>

            {/* Departure Date */}
            <div className="space-y-2">
              <Label htmlFor="departure" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 text-primary" />
                Departure
              </Label>
              <Input
                id="departure"
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                min={today}
                required
                className="h-12 text-base"
              />
            </div>

            {/* Return Date or Passengers */}
            {tripType === 'round-trip' ? (
              <div className="space-y-2">
                <Label htmlFor="return" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar className="w-4 h-4 text-primary" />
                  Return
                </Label>
                <Input
                  id="return"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={departureDate || today}
                  required={tripType === 'round-trip'}
                  className="h-12 text-base"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="adults" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Users className="w-4 h-4 text-primary" />
                  Passengers
                </Label>
                <Input
                  id="adults"
                  type="number"
                  value={adults}
                  onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                  min={1}
                  max={9}
                  required
                  className="h-12 text-base"
                />
              </div>
            )}
          </div>

          {/* Passengers for round-trip */}
          {tripType === 'round-trip' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="adults-round" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Users className="w-4 h-4 text-primary" />
                  Passengers
                </Label>
                <Input
                  id="adults-round"
                  type="number"
                  value={adults}
                  onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                  min={1}
                  max={9}
                  required
                  className="h-12 text-base"
                />
              </div>
            </div>
          )}

          {/* Currency Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 sm:col-span-1">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <DollarSign className="w-4 h-4 text-primary" />
                Currency
              </Label>
              <Select value={selectedCurrency} onValueChange={setCurrency}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full h-12 md:h-14 text-base font-semibold bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Search Flights
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
