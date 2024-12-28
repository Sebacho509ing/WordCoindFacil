import React from 'react';
import { Header } from '../components/Header';
import { MarketOverview } from '../components/dashboard/MarketOverview';
import { WLDPriceChart } from '../components/dashboard/WLDPriceChart';
import { CryptoList } from '../components/dashboard/CryptoList';
import { ThemeToggle } from '../components/ThemeToggle';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark text-black dark:text-white">
      <Header />
      
      <main className="container mx-auto p-4 space-y-6">
        <MarketOverview />
        <WLDPriceChart />
        <CryptoList />
      </main>

      <ThemeToggle />
    </div>
  );
};