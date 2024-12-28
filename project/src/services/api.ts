import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.binance.com/api/v3',
});

export default api;

// Get current COP rate from a simulated API
export const getCOPRate = async () => {
  // In a production environment, this should come from a real forex API
  return { rate: 3900 }; // Fixed rate USD to COP for demonstration
};

// Get current prices for all supported cryptocurrencies
export const getAllCryptoPrices = async (symbols: string[]) => {
  try {
    const response = await api.get('/ticker/price', {
      params: {
        symbols: JSON.stringify(symbols)
      }
    });
    return response.data.reduce((acc: Record<string, number>, curr: any) => {
      acc[curr.symbol] = parseFloat(curr.price);
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};