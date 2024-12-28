import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { CryptoDetailHeader } from '../components/crypto/CryptoDetailHeader';
import { CryptoChart } from '../components/crypto/CryptoChart';
import { CryptoStats } from '../components/crypto/CryptoStats';
import { CryptoMarkets } from '../components/crypto/CryptoMarkets';
import { ThemeToggle } from '../components/ThemeToggle';
import { useCryptoDetail } from '../hooks/useCryptoDetail';

export const CryptoDetail: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const { data, loading, error } = useCryptoDetail(symbol as string);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-dark">
        <Header />
        <div className="container mx-auto p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-dark">
        <Header />
        <div className="container mx-auto p-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <p className="text-red-600 dark:text-red-400">
              Error al cargar los datos de la criptomoneda
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark">
      <Header />
      <main className="container mx-auto p-4 space-y-6">
        <CryptoDetailHeader data={data} />
        <CryptoChart symbol={symbol as string} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CryptoMarkets symbol={symbol as string} />
          </div>
          <div>
            <CryptoStats data={data} />
          </div>
        </div>
      </main>
      <ThemeToggle />
    </div>
  );
};