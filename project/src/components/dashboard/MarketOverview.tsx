import React, { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { getMarketStats, MarketStats } from '../../services/market.service';
import { formatCryptoPrice } from '../../utils/number';

export const MarketOverview: React.FC = () => {
  const [marketStats, setMarketStats] = useState<MarketStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getMarketStats();
        setMarketStats(stats);
      } catch (err) {
        setError('Error al cargar datos del mercado');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Actualizar cada minuto
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-dark-light p-6 rounded-lg shadow-lg mb-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !marketStats) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg shadow-lg mb-6">
        <p className="text-red-600 dark:text-red-400">{error || 'Error al cargar datos'}</p>
      </div>
    );
  }

  const stats = [
    {
      title: 'Volumen 24h',
      value: `$${formatCryptoPrice(marketStats.volume24h, 'BTCUSDT')}`,
      change: `${marketStats.changePercent24h.toFixed(2)}%`,
      isPositive: marketStats.changePercent24h > 0
    },
    {
      title: 'Capitalización',
      value: `$${formatCryptoPrice(marketStats.marketCap, 'BTCUSDT')}`,
      change: `${marketStats.changePercent24h.toFixed(2)}%`,
      isPositive: marketStats.changePercent24h > 0
    },
    {
      title: 'Dominancia BTC',
      value: `${marketStats.btcDominance.toFixed(2)}%`,
      change: `${(marketStats.changePercent24h / 2).toFixed(2)}%`,
      isPositive: marketStats.changePercent24h > 0
    }
  ];

  return (
    <div className="bg-gray-100 dark:bg-dark-light p-6 rounded-lg shadow-lg mb-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-primary w-6 h-6" />
        <h2 className="text-xl font-bold">Resumen del Mercado</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-dark p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-2xl font-bold">{stat.value}</p>
              <div className={`flex items-center ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};