import { useState, useEffect } from 'react';
import { getCOPRate } from '../services/api';
import { getMultiplePrices } from '../services/price.service';
import { CryptoSymbol } from '../types/crypto';
import { cryptoOptions } from '../constants/cryptoOptions';

export const useCryptoConversion = () => {
  const [prices, setPrices] = useState<Record<CryptoSymbol, number>>({} as Record<CryptoSymbol, number>);
  const [copRate, setCopRate] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setError(null);
        const [{ rate }, cryptoPrices] = await Promise.all([
          getCOPRate(),
          getMultiplePrices(cryptoOptions.map(option => option.symbol))
        ]);
        
        setCopRate(rate);
        setPrices(cryptoPrices);
      } catch (err) {
        console.error('Error fetching rates:', err);
        setError('Error al obtener las tasas de conversión');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const convertToCOP = (amount: number, symbol: CryptoSymbol): number => {
    const price = prices[symbol];
    if (!price || !copRate) return 0;
    return amount * price * copRate;
  };

  return {
    prices,
    copRate,
    loading,
    error,
    convertToCOP
  };
};