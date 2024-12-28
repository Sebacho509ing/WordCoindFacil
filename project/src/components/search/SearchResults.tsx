import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useCryptoConversion } from '../../hooks/useCryptoConversion';
import { cryptoOptions } from '../../constants/cryptoOptions';
import { formatCryptoPrice } from '../../utils/number';

interface SearchResultsProps {
  searchTerm: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm }) => {
  const { prices } = useCryptoConversion();
  
  const filteredCoins = cryptoOptions.filter(coin => 
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredCoins.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        No se encontraron resultados para "{searchTerm}"
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {filteredCoins.map(coin => {
        const price = prices[coin.symbol] || 0;
        const change24h = (Math.random() * 10 - 5).toFixed(2); // Simulado
        const isPositive = parseFloat(change24h) >= 0;

        return (
          <div
            key={coin.symbol}
            className="p-4 hover:bg-gray-50 dark:hover:bg-dark transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {coin.icon}
                <div>
                  <h3 className="font-medium">{coin.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {coin.symbol.replace('USDT', '')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  ${formatCryptoPrice(price, coin.symbol)}
                </p>
                <p
                  className={`text-sm flex items-center gap-1 ${
                    isPositive ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {isPositive ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {Math.abs(parseFloat(change24h))}%
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};