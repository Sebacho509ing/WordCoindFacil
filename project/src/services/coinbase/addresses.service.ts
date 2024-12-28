import { coinbaseClient } from './client';
import { CoinbaseAddress } from './types';

export const getAddresses = async (accountId: string): Promise<CoinbaseAddress[]> => {
  try {
    const response = await coinbaseClient.get(`/accounts/${accountId}/addresses`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    throw error;
  }
};

export const createAddress = async (accountId: string): Promise<CoinbaseAddress> => {
  try {
    const response = await coinbaseClient.post(`/accounts/${accountId}/addresses`);
    return response.data.data;
  } catch (error) {
    console.error('Error creating address:', error);
    throw error;
  }
};