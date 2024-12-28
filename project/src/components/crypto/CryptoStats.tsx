import React from 'react';
import { CryptoDetailData } from '../../types/crypto';
import { formatCryptoPrice, formatCOPPrice } from '../../utils/number';

interface CryptoStatsProps {
  data: CryptoDetailData;
}

export const CryptoStats: React.FC<CryptoStatsProps> = ({ data }) => {
  const stats = [
    {
      label: 'Máximo 24h',
      value: `$${formatCryptoPrice(data.high24h, data.symbol)}`,
    },
    {
      label: 'Mínimo 24h',
      value: `$${formatCryptoPrice(data.low24h, data.symbol)}`,
    },
    {
      label: 'Volumen 24h',
      value: formatCOPPrice(data.volume24h),
    },
    {
      label: 'Cap. de mercado',
      value: formatCOPPrice(data.marketCap),
    },
    {
      label: 'Suministro circulante',
      value: `${formatCryptoPrice(data.circulatingSupply, data.symbol)} ${data.symbol.replace('USDT', '')}`,
    },
    {
      label: 'Suministro total',
      value: `${formatCryptoPrice(data.totalSupply, data.symbol)} ${data.symbol.replace('USDT', '')}`,
    },
  ];

  return (
    <div className="bg-white dark:bg-dark-light p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Estadísticas</h2>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
          >
            <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
            <span className="font-medium text-gray-900 dark:text-white">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};