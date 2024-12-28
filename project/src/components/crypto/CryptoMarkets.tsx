import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useCryptoMarkets } from '../../hooks/useCryptoMarkets';
import { formatCryptoPrice, formatPercentage } from '../../utils/number';

interface CryptoMarketsProps {
  symbol: string;
}

export const CryptoMarkets: React.FC<CryptoMarketsProps> = ({ symbol }) => {
  const { markets, loading, error } = useCryptoMarkets(symbol);

  if (loading) {
    return (
      <div className="bg-white dark:bg-dark-light p-6 rounded-lg shadow-lg animate-pulse">
        <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <p className="text-red-600 dark:text-red-400">
          Error al cargar los mercados
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-light p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Mercados</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-500 dark:text-gray-400">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Exchange</th>
              <th className="px-4 py-2 text-right">Par</th>
              <th className="px-4 py-2 text-right">Precio</th>
              <th className="px-4 py-2 text-right">Volumen 24h</th>
              <th className="px-4 py-2 text-right">% Volumen</th>
              <th className="px-4 py-2 text-right">Confianza</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((market, index) => (
              <tr
                key={index}
                className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark"
              >
                <td className="px-4 py-4">{index + 1}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={market.exchangeLogo}
                      alt={market.exchange}
                      className="w-6 h-6 rounded-full"
                    />
                    {market.exchange}
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <a
                    href={market.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-end gap-1 text-primary hover:text-primary-dark"
                  >
                    {market.pair}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </td>
                <td className="px-4 py-4 text-right font-medium">
                  ${formatCryptoPrice(market.price, symbol)}
                </td>
                <td className="px-4 py-4 text-right">
                  ${formatCryptoPrice(market.volume24h, symbol)}
                </td>
                <td className="px-4 py-4 text-right">
                  {formatPercentage(market.volumePercentage)}
                </td>
                <td className="px-4 py-4 text-right">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    market.confidence === 'Alta'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {market.confidence}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};