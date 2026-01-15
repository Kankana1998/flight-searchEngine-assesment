import { useFlightStore } from '../store/flightStore';
import { getUniqueAirlines, getMinMaxPrice, getTotalStops } from '../utils/flightUtils';
import { getStopsLabel, getAirlineName } from '../utils/flightUtils';

export const Filters = () => {
  const { flights, filteredFlights, filters, setFilters } = useFlightStore();
  const airlines = getUniqueAirlines(flights);
  const { min, max } = getMinMaxPrice(flights);

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value ? parseFloat(value) : undefined;
    setFilters({
      [type === 'min' ? 'minPrice' : 'maxPrice']: numValue,
    });
  };

  const handleAirlineToggle = (airline: string) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter((a) => a !== airline)
      : [...filters.airlines, airline];
    setFilters({ airlines: newAirlines });
  };

  const handleStopsToggle = (stops: number) => {
    const newStops = filters.stops.includes(stops)
      ? filters.stops.filter((s) => s !== stops)
      : [...filters.stops, stops];
    setFilters({ stops: newStops });
  };

  const clearFilters = () => {
    setFilters({
      airlines: [],
      stops: [],
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  const hasActiveFilters =
    filters.airlines.length > 0 ||
    filters.stops.length > 0 ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined;

  return (
    <div className="card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Min ($)</label>
              <input
                type="number"
                value={filters.minPrice || ''}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                placeholder={min.toFixed(0)}
                min={min}
                max={max}
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Max ($)</label>
              <input
                type="number"
                value={filters.maxPrice || ''}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                placeholder={max.toFixed(0)}
                min={min}
                max={max}
                className="input-field text-sm"
              />
            </div>
          </div>
        </div>

        {/* Stops */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Stops</h3>
          <div className="space-y-2">
            {[0, 1, 2].map((stops) => {
              const count = filteredFlights.filter(
                (f) => getTotalStops(f) === stops
              ).length;

              if (count === 0) return null;

              return (
                <label
                  key={stops}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={filters.stops.includes(stops)}
                    onChange={() => handleStopsToggle(stops)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 flex-1">
                    {getStopsLabel(stops)}
                  </span>
                  <span className="text-xs text-gray-500">({count})</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Airlines */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Airlines</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {airlines.map((airline) => {
              const count = filteredFlights.filter((f) =>
                f.validatingAirlineCodes.includes(airline)
              ).length;

              return (
                <label
                  key={airline}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={filters.airlines.includes(airline)}
                    onChange={() => handleAirlineToggle(airline)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 flex-1">
                    {getAirlineName(airline)}
                  </span>
                  <span className="text-xs text-gray-500">({count})</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
