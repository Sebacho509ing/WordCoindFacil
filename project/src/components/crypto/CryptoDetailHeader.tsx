import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { CryptoIcon } from './CryptoIcon';
import { formatCryptoPrice, formatCOPPrice, formatPercentage } from '../../utils/number';
import { CryptoDetailData } from '../../types/crypto';

interface CryptoDetailHeaderProps {
  data: CryptoDetailData;
}

export const CryptoDetailHeader: React.FC<CryptoDetailHeaderProps> = ({ data }) => {
  const isPositive = data.priceChangePercent >= 0;

  return (
    <div className="bg-white dark:bg-dark-light p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CryptoIcon symbol={data.symbol} className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              {data.name}
              <span className="text-gray-500 dark:text-gray-400">
                {data.symbol.replace('USDT', '')}
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Rank #{data.rank}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            ${formatCryptoPrice(data.price, data.symbol)}
          </div>
          <div className={`flex items-center gap-1 ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}>
            {isPositive ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
            {formatPercentage(data.priceChangePercent)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {formatCOPPrice(data.priceCOP)}
          </div>
        </div>
      </div>
    </div>
  );
};