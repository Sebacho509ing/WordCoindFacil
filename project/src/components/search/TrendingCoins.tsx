import React from 'react';
import { Flame } from 'lucide-react';
import { cryptoOptions } from '../../constants/cryptoOptions';
import { useCryptoConversion } from '../../hooks/useCryptoConversion';
import { formatCryptoPrice } from '../../utils/number';

export const TrendingCoins: React.FC = () => {
  const { prices } = useCryptoConversion();

  // Simulamos las monedas más populares tomando las primeras 5
  const trendingCoins = cryptoOptions.slice(0, 5);

  return (
    <div className="p-4">
      <h2 className="flex items-center gap-2 text-lg font-medium mb-4 text-gray-900 dark:text-white">
        <Flame className="text-primary" />
        Criptomonedas más populares
      </h2>
      
      <div className="grid gap-4">
        {trendingCoins.map(coin => {
          const price = prices[coin.symbol] || 0;
          const volume = Math.random() * 1000000;
          const marketCap = Math.random() * 1000000000;

          return (
            <div
              key={coin.symbol}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="text-gray-900 dark:text-white">
                  {coin.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{coin.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {coin.symbol.replace('USDT', '')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-white">
                  ${formatCryptoPrice(price, coin.symbol)}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <p>Cap.M: ${(marketCap / 1e6).toFixed(1)}M</p>
                  <p>Vol. (24h): ${(volume / 1e6).toFixed(1)}M</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};