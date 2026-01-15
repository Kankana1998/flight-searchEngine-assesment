import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCreditsStore } from '../store/creditsStore';
import { AuthModal } from './AuthModal';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { LogOut, User, Coins } from 'lucide-react';

export const UserMenu = () => {
  const { user, logout } = useAuthStore();
  const { credits } = useCreditsStore();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex items-center gap-4">
      {user && (
        <Badge variant="secondary" className="gap-2 px-3 py-1.5">
          <Coins className="w-4 h-4 text-primary" />
          <span className="font-semibold">{credits.toLocaleString()}</span>
          <span className="text-muted-foreground">Credits</span>
        </Badge>
      )}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden md:block text-sm font-medium">
                {user.email}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user.email}</p>
                <p className="text-xs text-muted-foreground">Signed in</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button
            onClick={() => setShowAuthModal(true)}
            variant="default"
          >
            Sign In
          </Button>
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        </>
      )}
    </div>
  );
};
