import { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/layout/Hero';
import { MainContent } from './components/layout/MainContent';
import { Footer } from './components/layout/Footer';
import { useAuthStore } from './store/authStore';

function App() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
