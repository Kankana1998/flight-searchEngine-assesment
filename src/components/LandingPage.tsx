import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plane, TrendingUp, MapPin, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useSearchFlights } from '../hooks/useSearchFlights';
import { useFlightStore } from '../store/flightStore';
import { useCurrencyStore, CURRENCIES } from '../store/currencyStore';
import { format } from 'date-fns';

interface PopularRoute {
  origin: string;
  destination: string;
  originCity: string;
  destCity: string;
  avgPrice: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  image: string;
}

const POPULAR_ROUTES: PopularRoute[] = [
  {
    origin: 'JFK',
    destination: 'LAX',
    originCity: 'New York',
    destCity: 'Los Angeles',
    avgPrice: 350,
    trend: 'down',
    changePercent: -12,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
  },
  {
    origin: 'LHR',
    destination: 'CDG',
    originCity: 'London',
    destCity: 'Paris',
    avgPrice: 180,
    trend: 'stable',
    changePercent: 2,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
  },
  {
    origin: 'DXB',
    destination: 'BKK',
    originCity: 'Dubai',
    destCity: 'Bangkok',
    avgPrice: 420,
    trend: 'up',
    changePercent: 8,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
  },
  {
    origin: 'SIN',
    destination: 'NRT',
    originCity: 'Singapore',
    destCity: 'Tokyo',
    avgPrice: 580,
    trend: 'down',
    changePercent: -5,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
  },
  {
    origin: 'SYD',
    destination: 'MEL',
    originCity: 'Sydney',
    destCity: 'Melbourne',
    avgPrice: 120,
    trend: 'stable',
    changePercent: 0,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  },
  {
    origin: 'DEL',
    destination: 'BOM',
    originCity: 'Delhi',
    destCity: 'Mumbai',
    avgPrice: 85,
    trend: 'down',
    changePercent: -15,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
  },
];

const PRICE_TREND_DATA = [
  { month: 'Jan', price: 320 },
  { month: 'Feb', price: 310 },
  { month: 'Mar', price: 340 },
  { month: 'Apr', price: 360 },
  { month: 'May', price: 380 },
  { month: 'Jun', price: 420 },
  { month: 'Jul', price: 450 },
  { month: 'Aug', price: 440 },
  { month: 'Sep', price: 400 },
  { month: 'Oct', price: 370 },
  { month: 'Nov', price: 350 },
  { month: 'Dec', price: 330 },
];

const DESTINATION_STATS = [
  { destination: 'Europe', bookings: 12500, growth: 12 },
  { destination: 'Asia', bookings: 18900, growth: 18 },
  { destination: 'Americas', bookings: 15200, growth: 8 },
  { destination: 'Middle East', bookings: 9800, growth: 25 },
  { destination: 'Africa', bookings: 4200, growth: 15 },
];

export const LandingPage = () => {
  const { formatPrice, convertPrice } = useCurrencyStore();
  const { searchFlights } = useSearchFlights();
  const { setSearchParams } = useFlightStore();
  const [selectedRoute, setSelectedRoute] = useState<PopularRoute | null>(null);

  const handleRouteClick = async (route: PopularRoute) => {
    setSelectedRoute(route);
    const tomorrow = format(new Date(Date.now() + 86400000), 'yyyy-MM-dd');
    const params = {
      originLocationCode: route.origin,
      destinationLocationCode: route.destination,
      departureDate: tomorrow,
      adults: 1,
    };
    setSearchParams(params);
    await searchFlights(params);
    // Scroll to search form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12">
      {/* Stats Section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
                  <p className="text-3xl font-bold">2.5M+</p>
                  <p className="text-xs text-green-600 mt-1">↑ 12% this month</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Plane className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg. Savings</p>
                  <p className="text-3xl font-bold">28%</p>
                  <p className="text-xs text-green-600 mt-1">vs. direct booking</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Destinations</p>
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-xs text-muted-foreground mt-1">Worldwide</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg. Response</p>
                  <p className="text-3xl font-bold">&lt;2min</p>
                  <p className="text-xs text-muted-foreground mt-1">Support time</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Routes */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Popular Flight Routes</h2>
            <p className="text-muted-foreground">Top destinations trending right now</p>
          </div>
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_ROUTES.map((route, index) => {
            const convertedPrice = convertPrice(route.avgPrice, 'USD');
            const formattedPrice = formatPrice(convertedPrice);
            const isSelected = selectedRoute?.origin === route.origin && selectedRoute?.destination === route.destination;

            return (
              <Card
                key={index}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleRouteClick(route)}
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={route.image}
                    alt={`${route.originCity} to ${route.destCity}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white">
                      <Plane className="w-4 h-4" />
                      <span className="font-semibold">{route.origin}</span>
                      <ArrowRight className="w-4 h-4" />
                      <span className="font-semibold">{route.destination}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-lg">{route.originCity}</p>
                      <p className="text-sm text-muted-foreground">{route.destCity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-primary">{formattedPrice}</p>
                      <p className="text-xs text-muted-foreground">avg. price</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        route.trend === 'down'
                          ? 'bg-green-100 text-green-700'
                          : route.trend === 'up'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {route.trend === 'down' ? '↓' : route.trend === 'up' ? '↑' : '→'}{' '}
                      {Math.abs(route.changePercent)}%
                    </span>
                    <Button size="sm" variant="outline" className="ml-auto">
                      View Flights
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Charts Section */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Price Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Price Trends (Last 12 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={PRICE_TREND_DATA}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Destination Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Destinations</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={DESTINATION_STATS}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="destination" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Stats */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Why Choose Aura Travel?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Best Price Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  We compare prices from 500+ airlines to find you the best deals
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Our travel experts are available round the clock to assist you
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plane className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Flexible Booking</h3>
                <p className="text-sm text-muted-foreground">
                  Easy cancellation and modification options for your peace of mind
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
