import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CreditsState {
  credits: number;
  addCredits: (amount: number) => void;
  deductCredits: (amount: number) => boolean;
  getCredits: () => number;
}

export const useCreditsStore = create<CreditsState>()(
  persist(
    (set, get) => ({
      credits: 1000, // Starting credits

      addCredits: (amount) => {
        set((state) => ({
          credits: state.credits + amount,
        }));
      },

      deductCredits: (amount) => {
        const current = get().credits;
        if (current >= amount) {
          set({ credits: current - amount });
          return true;
        }
        return false;
      },

      getCredits: () => {
        return get().credits;
      },
    }),
    {
      name: 'credits-storage',
    }
  )
);
