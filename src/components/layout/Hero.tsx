import { SearchForm } from '../SearchForm';
import { useFlightStore } from '../../store/flightStore';

export const Hero = () => {
  const { flights } = useFlightStore();
  const hasResults = flights.length > 0;

  return (
    <section 
      className="relative pt-20 pb-16 md:pb-24 lg:pb-32 min-h-[600px] flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: hasResults ? 'scroll' : 'fixed',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
        {!hasResults ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Discover Your Next Adventure
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                Find the best flight deals and explore the world with Aura Travel
              </p>
            </div>
            <div className="max-w-5xl mx-auto">
              <SearchForm />
            </div>
          </>
        ) : (
          <div className="max-w-5xl mx-auto">
            <SearchForm />
          </div>
        )}
      </div>
    </section>
  );
};
