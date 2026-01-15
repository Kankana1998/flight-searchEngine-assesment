import { UserMenu } from '../UserMenu';
import logo from '../../assets/Image.png';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Aura Travel" 
              className="h-12 w-auto object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Aura Travel</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Your Journey, Our Passion</p>
            </div>
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
