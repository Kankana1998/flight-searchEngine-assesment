# Flight Search Engine

A modern, responsive flight search engine built with React, TypeScript, and Tailwind CSS. This application allows users to search for flights, filter results, and visualize price trends in real-time.

## Features

- ✈️ **Flight Search**: Search flights by origin, destination, and dates
- 📊 **Live Price Graph**: Real-time price trend visualization using Recharts
- 🔍 **Advanced Filtering**: Filter by price, stops, airlines with instant updates
- 📱 **Responsive Design**: Fully functional on both mobile and desktop devices
- ⚡ **Real-time Updates**: Filters update both flight list and price graph instantly

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Recharts** - Charting library for price visualization
- **Axios** - HTTP client
- **Amadeus API** - Flight data (with mock fallback)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd flight-searchEngine-assesment
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Amadeus API credentials:
```
VITE_AMADEUS_API_KEY=your_api_key_here
VITE_AMADEUS_API_SECRET=your_api_secret_here
```

> **Note**: If you don't have Amadeus API credentials, the app will use mock data for development.

### Running the Application

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── api/              # API service layer (Amadeus integration)
├── components/       # React components
│   ├── SearchForm.tsx
│   ├── Filters.tsx
│   ├── PriceGraph.tsx
│   └── FlightList.tsx
├── hooks/            # Custom React hooks
├── store/            # State management (Zustand)
├── styles/           # Global styles
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── App.tsx           # Main app component
└── main.tsx          # Application entry point
```

## Features in Detail

### Search Form
- Origin and destination inputs (IATA codes)
- Date pickers for departure and return dates
- Trip type selection (one-way or round-trip)
- Passenger count selection

### Filters
- **Price Range**: Filter flights by minimum and maximum price
- **Stops**: Filter by number of stops (non-stop, 1 stop, 2+ stops)
- **Airlines**: Filter by specific airlines
- All filters work simultaneously and update results instantly

### Price Graph
- Bar chart showing price distribution
- Updates in real-time as filters are applied
- Shows average price and flight count per price range

### Flight Results
- Displays flight details including:
  - Price
  - Airline and flight number
  - Departure and arrival times
  - Duration
  - Number of stops
  - Available seats

## API Integration

The application uses the Amadeus Self-Service API (Test environment) for flight data. If API credentials are not provided or the API fails, the app automatically falls back to mock data for development purposes.

### Getting Amadeus API Credentials

1. Visit [Amadeus for Developers](https://developers.amadeus.com/)
2. Create a free account
3. Create a new app to get your API key and secret
4. Add them to your `.env` file

## Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface elements
- Optimized layouts for all screen sizes

## Performance Optimizations

- React.memo for component optimization
- useMemo for expensive calculations
- Efficient state management with Zustand
- Lazy loading where applicable

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is built as an assessment submission.

## Deployment

The application can be deployed to:
- **Vercel**: `vercel deploy`
- **Netlify**: Connect your GitHub repository
- **Any static hosting**: Upload the `dist` folder after building

Make sure to set environment variables in your hosting platform's dashboard.
