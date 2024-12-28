import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CryptoSelectorProps } from '../../types/crypto';
import { cryptoOptions } from '../../constants/cryptoOptions';
import { formatCryptoPrice } from '../../utils/number';
import { useCryptoConversion } from '../../hooks/useCryptoConversion';

export const CryptoSelector: React.FC<CryptoSelectorProps> = ({
  selectedSymbol,
  onSelect,
  price,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCrypto = cryptoOptions.find((crypto) => crypto.symbol === selectedSymbol);
  const { prices } = useCryptoConversion();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white dark:bg-dark w-full px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-dark-light transition-colors duration-200"
      >
        <div className="flex items-center gap-2">
          <div className="text-gray-900 dark:text-white">
            {selectedCrypto?.icon}
          </div>
          <span className="font-medium text-gray-900 dark:text-white">
            {selectedCrypto?.name}/USDT
          </span>
          <span className="text-primary">
            ${formatCryptoPrice(price, selectedSymbol)}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-dark rounded-lg shadow-lg z-20 py-1">
            {cryptoOptions.map((crypto) => (
              <button
                key={crypto.symbol}
                onClick={() => {
                  onSelect(crypto.symbol);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-dark-light transition-colors duration-200 ${
                  selectedSymbol === crypto.symbol ? 'bg-gray-100 dark:bg-dark-light' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="text-gray-900 dark:text-white">
                    {crypto.icon}
                  </div>
                  <span className="text-gray-900 dark:text-white">{crypto.name}</span>
                </div>
                <span className="text-primary">
                  ${formatCryptoPrice(prices[crypto.symbol], crypto.symbol)}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};