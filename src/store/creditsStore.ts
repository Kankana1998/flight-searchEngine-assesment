import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CreditsState {
  userCredits: Record<string, number>; 
  initializeUserCredits: (userId: string) => void;
  addCredits: (userId: string, amount: number) => void;
  deductCredits: (userId: string, amount: number) => boolean;
  getCredits: (userId: string) => number;
}

export const useCreditsStore = create<CreditsState>()(
  persist(
    (set, get) => ({
      userCredits: {},

      initializeUserCredits: (userId: string) => {
        const state = get();
        if (!state.userCredits[userId]) {
          set((state) => ({
            userCredits: {
              ...state.userCredits,
              [userId]: 1000, 
            },
          }));
        }
      },

      addCredits: (userId: string, amount: number) => {
        const state = get();
        const currentCredits = state.userCredits[userId] || 0;
        set({
          userCredits: {
            ...state.userCredits,
            [userId]: currentCredits + amount,
          },
        });
      },

      deductCredits: (userId: string, amount: number) => {
        const state = get();
        const currentCredits = state.userCredits[userId] || 0;
        if (currentCredits >= amount) {
          set({
            userCredits: {
              ...state.userCredits,
              [userId]: currentCredits - amount,
            },
          });
          return true;
        }
        return false;
      },

      getCredits: (userId: string) => {
        const state = get();
        return state.userCredits[userId] || 0;
      },
    }),
    {
      name: 'credits-storage',
    }
  )
);
