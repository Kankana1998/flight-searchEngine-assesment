import { SearchForm } from './components/SearchForm';
import { Filters } from './components/Filters';
import { PriceGraph } from './components/PriceGraph';
import { FlightList } from './components/FlightList';
import { useFlightStore } from './store/flightStore';

function App() {
  const { error } = useFlightStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Flight Search Engine</h1>
          <p className="text-sm text-gray-600 mt-1">Find the best flights for your next trip</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        {/* Search Form */}
        <SearchForm />

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Filters />
            </div>
          </div>

          {/* Main Results */}
          <div className="lg:col-span-3">
            <PriceGraph />
            <FlightList />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Flight Search Engine - Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
