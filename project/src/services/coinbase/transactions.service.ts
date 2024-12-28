import { coinbaseClient } from './client';
import { CoinbaseTransaction } from './types';

export const getTransactions = async (accountId: string): Promise<CoinbaseTransaction[]> => {
  try {
    const response = await coinbaseClient.get(`/accounts/${accountId}/transactions`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const sendTransaction = async (
  accountId: string,
  to: string,
  amount: string,
  currency: string
): Promise<CoinbaseTransaction> => {
  try {
    const response = await coinbaseClient.post(`/accounts/${accountId}/transactions`, {
      type: 'send',
      to,
      amount,
      currency
    });
    return response.data.data;
  } catch (error) {
    console.error('Error sending transaction:', error);
    throw error;
  }
};