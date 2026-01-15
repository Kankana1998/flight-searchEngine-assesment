import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Flight } from '../types';

export interface Booking {
  id: string;
  flight: Flight;
  bookingDate: string;
  passengerCount: number;
  status: 'confirmed' | 'cancelled' | 'pending';
  userId: string;
}

interface BookingState {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'bookingDate'>) => void;
  cancelBooking: (bookingId: string) => void;
  getBookingsByUser: (userId: string) => Booking[];
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: [],

      addBooking: (booking) => {
        const newBooking: Booking = {
          ...booking,
          id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          bookingDate: new Date().toISOString(),
        };
        set((state) => ({
          bookings: [...state.bookings, newBooking],
        }));
      },

      cancelBooking: (bookingId) => {
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
          ),
        }));
      },

      getBookingsByUser: (userId) => {
        return get().bookings.filter(
          (b) => b.userId === userId && b.status !== 'cancelled'
        );
      },
    }),
    {
      name: 'booking-storage',
    }
  )
);
