import { useMemo } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useFlightStore } from '../store/flightStore';
import { generatePriceDataPoints } from '../utils/flightUtils';

export const PriceGraph = () => {
  const { filteredFlights } = useFlightStore();

  const priceData = useMemo(() => {
    return generatePriceDataPoints(filteredFlights);
  }, [filteredFlights]);

  if (filteredFlights.length === 0) {
    return (
      <div className="card mb-6">
        <h2 className="text-lg font-semibold mb-4">Price Trends</h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No flight data available. Search for flights to see price trends.
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-6">
      <h2 className="text-lg font-semibold mb-4">Price Trends</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={priceData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => `$${value}`}
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis
              tickFormatter={(value) => `$${value}`}
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip
              formatter={(value: number) => [`$${value}`, 'Avg Price']}
              labelFormatter={(label) => `Price: $${label}`}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                      <p className="font-semibold text-gray-900">${data.date}</p>
                      <p className="text-sm text-gray-600">Avg Price: ${data.price}</p>
                      <p className="text-sm text-gray-600">Flights: {data.count}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="price" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Showing price distribution for {filteredFlights.length} flight{filteredFlights.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
};
