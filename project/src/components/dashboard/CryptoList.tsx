import React, { useState } from 'react';
import { Star, ArrowUp, ArrowDown, HelpCircle } from 'lucide-react';
import { useCryptoConversion } from '../../hooks/useCryptoConversion';
import { formatCryptoPrice } from '../../utils/number';
import { cryptoOptions } from '../../constants/cryptoOptions';

const TABS = ['Top', 'Trending', 'New', 'Gainers', 'Most Visited'] as const;
type Tab = typeof TABS[number];

export const CryptoList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Top');
  const { prices } = useCryptoConversion();

  // Simulated market data - In production, this would come from your API
  const marketData = cryptoOptions.map(crypto => ({
    ...crypto,
    price: prices[crypto.symbol] || 0,
    change1h: (Math.random() * 2 - 1).toFixed(2),
    change24h: (Math.random() * 4 - 2).toFixed(2),
    change7d: (Math.random() * 10 - 5).toFixed(2),
    marketCap: Math.random() * 1000000000000,
    volume24h: Math.random() * 10000000000,
    circulatingSupply: Math.random() * 1000000000
  }));

  return (
    <div className="bg-white dark:bg-dark-light rounded-lg shadow-lg p-6">
      {/* Tabs */}
      <div className="flex items-center gap-6 mb-6 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-3 py-2 rounded-md transition-colors ${
              activeTab === tab
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-500 dark:text-gray-400">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-right">Precio</th>
              <th className="px-4 py-2 text-right">1h %</th>
              <th className="px-4 py-2 text-right">24h %</th>
              <th className="px-4 py-2 text-right">7d %</th>
              <th className="px-4 py-2 text-right">
                <div className="flex items-center justify-end gap-1">
                  Cap. de mercado
                  <HelpCircle className="w-4 h-4" />
                </div>
              </th>
              <th className="px-4 py-2 text-right">
                <div className="flex items-center justify-end gap-1">
                  Volumen (24h)
                  <HelpCircle className="w-4 h-4" />
                </div>
              </th>
              <th className="px-4 py-2 text-right">
                <div className="flex items-center justify-end gap-1">
                  Suministro circulante
                  <HelpCircle className="w-4 h-4" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((crypto, index) => (
              <tr
                key={crypto.symbol}
                className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark"
              >
                <td className="px-4 py-4">
                  <button className="text-gray-400 hover:text-primary">
                    <Star className="w-4 h-4" />
                  </button>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    {crypto.icon}
                    <span className="font-medium">{crypto.name}</span>
                    <span className="text-gray-500 text-sm">
                      {crypto.symbol.replace('USDT', '')}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right font-medium">
                  ${formatCryptoPrice(crypto.price, crypto.symbol)}
                </td>
                {[crypto.change1h, crypto.change24h, crypto.change7d].map((change, i) => (
                  <td
                    key={i}
                    className={`px-4 py-4 text-right ${
                      parseFloat(change) >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    <div className="flex items-center justify-end gap-1">
                      {parseFloat(change) >= 0 ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )}
                      {Math.abs(parseFloat(change))}%
                    </div>
                  </td>
                ))}
                <td className="px-4 py-4 text-right">
                  ${(crypto.marketCap / 1e9).toFixed(2)}B
                </td>
                <td className="px-4 py-4 text-right">
                  ${(crypto.volume24h / 1e6).toFixed(2)}M
                </td>
                <td className="px-4 py-4 text-right">
                  {(crypto.circulatingSupply / 1e6).toFixed(2)}M{' '}
                  {crypto.symbol.replace('USDT', '')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};