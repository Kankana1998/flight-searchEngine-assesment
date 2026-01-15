import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '../config/firebase';

const googleProvider = new GoogleAuthProvider();

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      isInitialized: false,

      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await signInWithEmailAndPassword(auth, email, password);
          // User will be set by onAuthStateChanged
        } catch (error: any) {
          set({ error: error.message || 'Failed to sign in' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      signup: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          // User will be set by onAuthStateChanged
        } catch (error: any) {
          set({ error: error.message || 'Failed to create account' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
          await signInWithPopup(auth, googleProvider);
          // User will be set by onAuthStateChanged
        } catch (error: any) {
          set({ error: error.message || 'Failed to sign in with Google' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await signOut(auth);
          set({ user: null });
        } catch (error: any) {
          set({ error: error.message || 'Failed to sign out' });
        } finally {
          set({ isLoading: false });
        }
      },

      initialize: () => {
        if (useAuthStore.getState().isInitialized) return;
        
        set({ isInitialized: true });
        onAuthStateChanged(auth, (user) => {
          set({ user });
        });
      },
    }),
    {
      name: 'auth-storage',
      // Don't persist user object - Firebase handles persistence via onAuthStateChanged
      partialize: () => ({}),
    }
  )
);
