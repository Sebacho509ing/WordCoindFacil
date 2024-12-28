import { coinbaseClient } from './client';
import { CoinbaseAccount } from './types';

export const getAccounts = async (): Promise<CoinbaseAccount[]> => {
  try {
    const response = await coinbaseClient.get('/accounts');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Coinbase accounts:', error);
    throw error;
  }
};

export const getAccount = async (accountId: string): Promise<CoinbaseAccount> => {
  try {
    const response = await coinbaseClient.get(`/accounts/${accountId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Coinbase account:', error);
    throw error;
  }
};

export const createAccount = async (currency: string): Promise<CoinbaseAccount> => {
  try {
    const response = await coinbaseClient.post('/accounts', { currency });
    return response.data.data;
  } catch (error) {
    console.error('Error creating Coinbase account:', error);
    throw error;
  }
};