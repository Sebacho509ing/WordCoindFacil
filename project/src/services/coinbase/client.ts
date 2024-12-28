import axios from 'axios';

const COINBASE_API_URL = 'https://api.coinbase.com/v2';

export const coinbaseClient = axios.create({
  baseURL: COINBASE_API_URL,
  headers: {
    'CB-VERSION': '2024-01-01',
    'Content-Type': 'application/json'
  }
});

export const setCoinbaseAuth = (accessToken: string) => {
  coinbaseClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};