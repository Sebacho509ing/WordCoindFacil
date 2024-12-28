import React, { useState } from 'react';
import { CryptoSelector } from './crypto/CryptoSelector';
import { CryptoSymbol } from '../types/crypto';
import { useCryptoConversion } from '../hooks/useCryptoConversion';
import { formatCOPPrice, formatCryptoPrice } from '../utils/number';

export const Converter: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoSymbol>('WLDUSDT');
  const [cryptoAmount, setCryptoAmount] = useState<string>('');
  const { prices, convertToCOP, loading, error } = useCryptoConversion();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCryptoAmount(value);
    }
  };

  const calculateCOP = (): string => {
    if (loading) return '0';
    if (error) return 'Error';
    
    const amount = parseFloat(cryptoAmount) || 0;
    const copValue = convertToCOP(amount, selectedCrypto);
    return formatCOPPrice(copValue);
  };

  const calculateUSD = (): string => {
    const amount = parseFloat(cryptoAmount) || 0;
    const price = prices[selectedCrypto] || 0;
    return formatCryptoPrice(amount * price, selectedCrypto);
  };

  return (
    <div className="space-y-4">      
      <CryptoSelector
        selectedSymbol={selectedCrypto}
        onSelect={setSelectedCrypto}
        price={prices[selectedCrypto]}
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Cantidad de {selectedCrypto.replace('USDT', '')}
        </label>
        <input
          type="text"
          value={cryptoAmount}
          onChange={handleAmountChange}
          className="w-full bg-white dark:bg-dark text-gray-900 dark:text-white rounded-md p-2 border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="0.00"
        />
        {cryptoAmount && (
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ≈ ${calculateUSD()} USD
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ≈ {calculateCOP()} COP
            </p>
          </div>
        )}
      </div>
    </div>
  );
};