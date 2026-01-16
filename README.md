# Aura Travel - Flight Search Engine

A modern, production-ready flight search engine built with React, TypeScript, and Tailwind CSS. This application provides a complete flight booking experience with user authentication, booking management, currency conversion, and real-time flight search capabilities.

## ✨ Features

### Core Features
- ✈️ **Flight Search**: Search flights by origin, destination, and dates with real-time results
- 📊 **Live Price Graph**: Real-time price trend visualization using Recharts
- 🔍 **Advanced Filtering**: Filter by price, stops, airlines with instant updates
- 📱 **Responsive Design**: Fully functional on both mobile and desktop devices
- ⚡ **Real-time Updates**: Filters update both flight list and price graph instantly

### User Features
- 🔐 **Authentication**: Email/Password and Google Sign-in via Firebase Auth
- 💳 **Booking Management**: Save and manage flight bookings with booking history
- 💰 **Credits System**: User credits displayed in navbar for rewards/loyalty
- 💱 **Currency Conversion**: Support for 16+ currencies with real-time conversion
- 📋 **Booking History**: View and manage past bookings with cancellation support

### UI/UX Features
- 🎨 **Modern Design**: Built with shadcn/ui components for a polished interface
- 🏠 **Landing Page**: Eye-catching landing page with popular routes and data visualizations
- 📈 **Data Visualization**: Charts showing price trends and destination statistics
- 🎯 **Smart Routing**: Conditional rendering based on user state and booking history
- ✨ **Smooth Animations**: Beautiful transitions and animations throughout

## 🛠 Tech Stack

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management with persistence

### UI Components
- **shadcn/ui** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library
- **class-variance-authority** - Component variants
- **tailwind-merge** - Tailwind class merging

### Data & APIs
- **Amadeus API** - Flight data (Test environment)
- **Firebase Auth** - User authentication
- **Recharts** - Charting library for data visualization
- **Axios** - HTTP client
- **date-fns** - Date formatting utilities

### Additional
- **React Query** - Server state management
- **React Router** - Routing (configured)

## 🚀 Getting Started

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

Create a `.env` file in the root directory:

```env
# Amadeus API Credentials
VITE_AMADEUS_API_KEY=your_api_key_here
VITE_AMADEUS_API_SECRET=your_api_secret_here

# Firebase Configuration (Optional - can be hardcoded in config)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Note**: If you don't have Amadeus API credentials, the app will show an error. Get free credentials from [Amadeus for Developers](https://developers.amadeus.com/).

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

## 📁 Project Structure

```
src/
├── api/                    # API service layer
│   └── amadeus.ts         # Amadeus API integration
├── components/            # React components
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # App header with logo and user menu
│   │   ├── Hero.tsx      # Hero section with search form
│   │   ├── MainContent.tsx # Main content area
│   │   └── Footer.tsx    # App footer
│   ├── ui/               # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── AuthModal.tsx     # Authentication modal
│   ├── BookingConfirmationDialog.tsx # Booking success dialog
│   ├── BookingHistory.tsx # User booking history
│   ├── Filters.tsx        # Flight filters sidebar
│   ├── FlightDetailsModal.tsx # Flight details and booking
│   ├── FlightList.tsx     # Flight results list
│   ├── LandingPage.tsx   # Landing page with stats and charts
│   ├── PriceGraph.tsx    # Price visualization
│   ├── SearchForm.tsx    # Flight search form
│   └── UserMenu.tsx      # User menu with credits
├── config/               # Configuration files
│   └── firebase.ts       # Firebase initialization
├── hooks/                # Custom React hooks
│   └── useSearchFlights.ts
├── lib/                  # Utility libraries
│   └── utils.ts         # cn() utility for class merging
├── store/                # Zustand state management
│   ├── authStore.ts     # Authentication state
│   ├── bookingStore.ts  # Booking management
│   ├── creditsStore.ts  # User credits
│   ├── currencyStore.ts # Currency conversion
│   └── flightStore.ts   # Flight search state
├── styles/               # Global styles
│   └── index.css        # Tailwind and custom styles
├── types/                # TypeScript type definitions
│   └── index.ts
├── utils/                # Utility functions
│   └── flightUtils.ts   # Flight formatting utilities
├── assets/               # Static assets
│   └── Image.png        # Logo
├── App.tsx               # Main app component
└── main.tsx             # Application entry point
```

## 🎯 Features in Detail

### Authentication
- **Email/Password**: Traditional sign-up and sign-in
- **Google Sign-in**: One-click authentication with Google
- **Session Persistence**: Automatic login state management
- **Protected Routes**: Booking requires authentication

### Flight Search
- **Origin/Destination**: IATA code inputs (e.g., JFK, LAX)
- **Date Selection**: Departure and return date pickers
- **Trip Types**: One-way and round-trip options
- **Passenger Count**: Select number of travelers
- **Currency Selection**: Choose from 16+ currencies

### Booking System
- **Book Flights**: Save bookings to user account
- **Booking History**: View all past bookings
- **Booking Status**: Track confirmed, pending, or cancelled bookings
- **Cancel Bookings**: Cancel bookings with confirmation

### Currency Conversion
- **16+ Currencies**: USD, EUR, GBP, INR, JPY, AUD, CAD, CHF, CNY, AED, SGD, THB, MYR, IDR, PHP, VND
- **Real-time Conversion**: Prices converted based on selected currency
- **Persistent Selection**: Currency preference saved

### Landing Page
- **Popular Routes**: Top flight routes with images and trends
- **Statistics Cards**: Total bookings, savings, destinations, support time
- **Price Trends**: 12-month price trend chart
- **Destination Stats**: Bar chart of popular destinations
- **Interactive Cards**: Click routes to search instantly

### Filters
- **Price Range**: Filter flights by minimum and maximum price
- **Stops**: Filter by number of stops (non-stop, 1 stop, 2+ stops)
- **Airlines**: Filter by specific airlines
- **Duration**: Filter by flight duration
- All filters work simultaneously and update results instantly

### Price Graph
- Bar chart showing price distribution
- Updates in real-time as filters are applied
- Shows average price and flight count per price range

### Flight Results
- Displays flight details including:
  - Price (in selected currency)
  - Airline and flight number
  - Departure and arrival times
  - Duration
  - Number of stops
  - Available seats
  - Connecting cities (for multi-segment flights)

## 🔧 API Integration

### Amadeus API

The application uses the Amadeus Self-Service API (Test environment) for flight data.

#### Getting Amadeus API Credentials

1. Visit [Amadeus for Developers](https://developers.amadeus.com/)
2. Create a free account
3. Create a new app to get your API key and secret
4. Enable the following APIs in your dashboard:
   - Flight Offers Search
   - Flight Inspiration Search (optional)
5. Add credentials to your `.env` file

### Firebase Authentication

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing
3. Enable Authentication:
   - Email/Password provider
   - Google Sign-in provider
4. Copy configuration to `src/config/firebase.ts` or use environment variables

## 🎨 Design System

### Colors
- **Primary**: `#03045e` (Coral/Orange)
- **Secondary**: `#f5f5f5` (Light Gray)
- Custom color scales for both

### Components
- Built with **shadcn/ui** for accessibility and consistency
- Fully customizable with Tailwind CSS
- Responsive and mobile-first

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface elements
- Optimized layouts for all screen sizes
- Sticky navigation and filters

## ⚡ Performance Optimizations

- React.memo for component optimization
- useMemo for expensive calculations
- Efficient state management with Zustand
- Lazy loading where applicable
- Optimized re-renders with proper state management

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🚀 Deployment

The application can be deployed to:

- **Vercel**: `vercel deploy`
- **Netlify**: Connect your GitHub repository
- **Firebase Hosting**: `firebase deploy`
- **Any static hosting**: Upload the `dist` folder after building

### Environment Variables

Make sure to set the following environment variables in your hosting platform's dashboard:

- `VITE_AMADEUS_API_KEY`
- `VITE_AMADEUS_API_SECRET`
- Firebase config variables (if using env vars)

## 🏗 Architecture

### State Management
- **Zustand**: Client-side state (flights, filters, auth, bookings, currency, credits)
- **React Query**: Server state and API calls (configured but using Zustand for simplicity)
- **Local Storage**: Persistent state for auth, bookings, currency, credits

### Component Architecture
- **Layout Components**: Header, Hero, MainContent, Footer
- **Feature Components**: Search, Filters, Results, Booking
- **UI Components**: Reusable shadcn/ui components
- **Modal Components**: Auth, Booking Confirmation, Flight Details

## 📄 License

This project is built as an assessment submission.

## 👨‍💻 Development Notes

- All components are TypeScript typed
- Follows React best practices
- Production-ready code quality
- Clean component structure
- Proper error handling
- Loading states throughout

## 🔮 Future Enhancements

Potential features for future development:
- Multi-city trip support
- Flight price alerts
- Saved searches
- Social login (Facebook, Twitter)
- Payment integration
- Email notifications
- Advanced analytics dashboard
- Flight comparison tool
