# Aura Travel - Flight Search Engine

A modern flight search engine with real-time filtering, price visualization, and user authentication. Built with React, TypeScript, and Firebase.

## ✨ Features

- **Flight Search**: Search by origin, destination, dates with real-time results from Amadeus API
- **Live Price Graph**: Real-time price trends using Recharts that update with filters
- **Advanced Filtering**: Simultaneous filters (Price, Stops, Airlines) updating both list and graph instantly
- **User Authentication**: Email/Password and Google Sign-in via Firebase Auth
- **Booking Management**: Save bookings, view history, and cancel with confirmation dialogs
- **Credits System**: User credits displayed in navbar (1000 credits on signup)
- **Currency Conversion**: 16+ currencies with real-time conversion
- **Responsive Design**: Fully functional on mobile and desktop

## 🛠 Tech Stack

### Core
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** - Styling
- **Zustand** - State management with persistence
- **Firebase** - Authentication (Email/Password, Google Sign-in)

### UI & Data
- **shadcn/ui** + **Radix UI** - Component library
- **Recharts** - Price visualization
- **Amadeus API** - Flight data
- **Lucide React** - Icons

## 🚀 Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**

Create a `.env` file:
```env
# Amadeus API
VITE_AMADEUS_API_KEY=your_api_key
VITE_AMADEUS_API_SECRET=your_api_secret

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. **Run development server:**
```bash
npm run dev
```

4. **Build for production:**
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── api/              # Amadeus API integration
├── components/       # React components
│   ├── layout/      # Header, Hero, Footer, MainContent
│   ├── ui/          # shadcn/ui components
│   └── ...          # SearchForm, FlightList, Filters, etc.
├── config/          # Firebase configuration
├── store/           # Zustand stores (auth, flights, bookings, credits, currency)
├── hooks/           # Custom hooks
└── utils/           # Utility functions
```

## 🔧 Key Features

### Real-Time Filtering
- Filters (Price, Stops, Airlines) update both flight list and price graph instantly
- Uses Zustand store with reactive updates

### Price Graph
- Bar chart using Recharts
- Updates automatically when filters change
- Shows price distribution and flight counts

### Authentication & Bookings
- Firebase Auth with Email/Password and Google Sign-in
- Booking management with history
- Credits system (1000 credits on registration)
- Currency conversion for 16+ currencies

## 🚀 Deployment

### Vercel
1. Add environment variables in Vercel Dashboard → Settings → Environment Variables
2. Add your Vercel domain to Firebase Authorized Domains
3. Deploy automatically via Git or manually

### Required Environment Variables
- All `VITE_AMADEUS_*` variables
- All `VITE_FIREBASE_*` variables

## 📝 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Design

- **Primary Color**: `#03045e` (Dark Blue)
- **Responsive**: Mobile-first with Tailwind breakpoints
- **Components**: shadcn/ui for accessible, customizable components

