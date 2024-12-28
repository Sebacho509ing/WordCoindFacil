import { useState, useEffect } from 'react';
import { getAccounts } from '../services/coinbase/accounts.service';
import { getTransactions } from '../services/coinbase/transactions.service';
import { getAddresses, createAddress } from '../services/coinbase/addresses.service';
import { CoinbaseAccount, CoinbaseTransaction, CoinbaseAddress } from '../services/coinbase/types';

export const useCoinbaseWallet = (accountId?: string) => {
  const [accounts, setAccounts] = useState<CoinbaseAccount[]>([]);
  const [transactions, setTransactions] = useState<CoinbaseTransaction[]>([]);
  const [addresses, setAddresses] = useState<CoinbaseAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setError(null);
        setLoading(true);

        const accountsData = await getAccounts();
        setAccounts(accountsData);

        if (accountId) {
          const [transactionsData, addressesData] = await Promise.all([
            getTransactions(accountId),
            getAddresses(accountId)
          ]);
          setTransactions(transactionsData);
          setAddresses(addressesData);
        }
      } catch (err) {
        setError('Error loading wallet data');
        console.error('Error in useCoinbaseWallet:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [accountId]);

  const generateNewAddress = async (selectedAccountId: string) => {
    try {
      const newAddress = await createAddress(selectedAccountId);
      setAddresses(prev => [...prev, newAddress]);
      return newAddress;
    } catch (err) {
      setError('Error generating new address');
      throw err;
    }
  };

  return {
    accounts,
    transactions,
    addresses,
    loading,
    error,
    generateNewAddress
  };
};