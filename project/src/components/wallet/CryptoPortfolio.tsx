import React from 'react';
import { CryptoAsset } from './CryptoAsset';
import { Coins } from 'lucide-react';
import { useCryptoConversion } from '../../hooks/useCryptoConversion';
import { cryptoOptions } from '../../constants/cryptoOptions';

export const CryptoPortfolio: React.FC = () => {
  const { prices, convertToCOP } = useCryptoConversion();

  // Mock data - In a real app, this would come from your backend
  const mockPortfolio = [
    { symbol: 'WLDUSDT', amount: 150.5 },
    { symbol: 'BTCUSDT', amount: 0.05 },
    { symbol: 'ETHUSDT', amount: 1.2 },
    { symbol: 'POLUSDT', amount: 500 },
    { symbol: 'BNBUSDT', amount: 2.5 },
  ];

  return (
    <div className="bg-gray-100 dark:bg-dark-light rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Coins className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Criptomonedas</h2>
      </div>

      <div className="grid gap-4">
        {mockPortfolio.map((asset) => (
          <CryptoAsset
            key={asset.symbol}
            symbol={asset.symbol as any}
            amount={asset.amount}
            price={prices[asset.symbol as any] || 0}
            convertToCOP={convertToCOP}
          />
        ))}
      </div>
    </div>
  );
};