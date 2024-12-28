import React from 'react';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useCryptoConversion } from '../../hooks/useCryptoConversion';
import { formatCOPPrice } from '../../utils/number';

export const WalletOverview: React.FC = () => {
  const { convertToCOP } = useCryptoConversion();
  
  // Mock data - In a real app, this would come from your backend
  const walletStats = {
    totalBalance: 15000000,
    change24h: 250000,
    changePercentage: 1.7,
    isPositive: true
  };

  return (
    <div className="bg-gray-100 dark:bg-dark-light rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Wallet className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Balance Total</h2>
      </div>
      
      <div className="grid gap-4">
        <div className="bg-white dark:bg-dark p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Balance Total en COP
            </p>
            <div className={`flex items-center ${walletStats.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {walletStats.isPositive ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {walletStats.changePercentage}%
              </span>
            </div>
          </div>
          <p className="text-4xl font-bold text-primary mb-2">
            {formatCOPPrice(walletStats.totalBalance)}
          </p>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>24h: {formatCOPPrice(walletStats.change24h)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};