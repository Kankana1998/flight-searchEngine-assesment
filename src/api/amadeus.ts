import axios, { AxiosInstance } from 'axios';
import type { FlightSearchParams, Flight } from '../types';

class AmadeusAPI {
  private client: AxiosInstance;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://test.api.amadeus.com',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private async getAccessToken(): Promise<string> {
    // Check if token is still valid (with 5 minute buffer)
    if (this.accessToken && Date.now() < this.tokenExpiry - 300000) {
      return this.accessToken;
    }

    const apiKey = import.meta.env.VITE_AMADEUS_API_KEY;
    const apiSecret = import.meta.env.VITE_AMADEUS_API_SECRET;

    if (!apiKey || !apiSecret) {
      throw new Error('Amadeus API credentials not configured. Please set VITE_AMADEUS_API_KEY and VITE_AMADEUS_API_SECRET in your .env file');
    }

    try {
      const response = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: apiKey,
          client_secret: apiSecret,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const token: string = response.data.access_token;
      this.accessToken = token;
      this.tokenExpiry = Date.now() + response.data.expires_in * 1000;
      return token;
    } catch (error) {
      console.error('Failed to get Amadeus access token:', error);
      throw new Error('Failed to authenticate with Amadeus API');
    }
  }

  async searchFlights(params: FlightSearchParams): Promise<Flight[]> {
    try {
      const token = await this.getAccessToken();

      const searchParams = {
        originLocationCode: params.originLocationCode,
        destinationLocationCode: params.destinationLocationCode,
        departureDate: params.departureDate,
        adults: params.adults,
        ...(params.returnDate && { returnDate: params.returnDate }),
        ...(params.children && { children: params.children }),
        ...(params.infants && { infants: params.infants }),
        ...(params.travelClass && { travelClass: params.travelClass }),
        ...(params.nonStop !== undefined && { nonStop: params.nonStop }),
        max: 50, // Limit results for better performance
      };

      const response = await this.client.get('/v2/shopping/flight-offers', {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data || [];
    } catch (error: any) {
      console.error('Flight search error:', error);

      throw new Error(error.response?.data?.errors?.[0]?.detail || 'Failed to search flights');
    }
  }

  async getAirportSuggestions(query: string): Promise<any[]> {
    try {
      const token = await this.getAccessToken();

      const response = await this.client.get('/v1/reference-data/locations', {
        params: {
          subType: 'AIRPORT',
          keyword: query,
          'page[limit]': 10,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data || [];
    } catch (error) {
      console.error('Airport search error:', error);
      return [];
    }
  }
}

export const amadeusAPI = new AmadeusAPI();
