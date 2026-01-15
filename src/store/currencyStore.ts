import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Exchange rates (in a real app, these would come from an API)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.0,
  JPY: 149.0,
  AUD: 1.52,
  CAD: 1.36,
  CHF: 0.88,
  CNY: 7.24,
  AED: 3.67,
  SGD: 1.34,
  THB: 35.5,
  MYR: 4.68,
  IDR: 15650,
  PHP: 55.5,
  VND: 24350,
};

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
];

interface CurrencyState {
  selectedCurrency: string;
  setCurrency: (currency: string) => void;
  convertPrice: (price: number, fromCurrency: string, toCurrency?: string) => number;
  formatPrice: (price: number, currency?: string) => string;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      selectedCurrency: 'USD',

      setCurrency: (currency) => {
        set({ selectedCurrency: currency });
      },

      convertPrice: (price, fromCurrency, toCurrency) => {
        const targetCurrency = toCurrency || get().selectedCurrency;
        if (fromCurrency === targetCurrency) return price;

        const fromRate = EXCHANGE_RATES[fromCurrency] || 1;
        const toRate = EXCHANGE_RATES[targetCurrency] || 1;

        // Convert to USD first, then to target currency
        const usdPrice = price / fromRate;
        return usdPrice * toRate;
      },

      formatPrice: (price, currency) => {
        const targetCurrency = currency || get().selectedCurrency;
        const currencyInfo = CURRENCIES.find((c) => c.code === targetCurrency);
        const symbol = currencyInfo?.symbol || '$';

        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: targetCurrency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(price);
      },
    }),
    {
      name: 'currency-storage',
    }
  )
);
