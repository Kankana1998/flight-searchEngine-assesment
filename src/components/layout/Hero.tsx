import { SearchForm } from '../SearchForm';
import { useFlightStore } from '../../store/flightStore';
import heroImage from '../../assets/flight-imgs/hero-img2.jpg';

export const Hero = () => {
  const { flights } = useFlightStore();
  const hasResults = flights.length > 0;

  return (
    <section 
      className="relative pt-20 min-h-[500px] md:min-h-[550px] lg:min-h-[600px] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Gradient overlay from left to right for better form visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 md:py-8">
        <div className="flex justify-end">
          <div className="w-full lg:w-[60%] xl:w-[55%] 2xl:w-[50%] max-w-4xl">
            {!hasResults && (
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                  Discover Your Next Destination
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-white/90 leading-relaxed">
                  Find the best flight deals and explore the world with Aura Travel
                </p>
              </div>
            )}
            <div className="w-full">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
