import { useState, useEffect, useCallback } from 'react';
import { getPriceData, getHistoricalData, CryptoSymbol } from '../services/price.service';
import { TimeFrame } from '../types/chart';

export const usePriceData = (symbol: CryptoSymbol = 'WLDUSDT', timeFrame: TimeFrame = '24H') => {
  const [price, setPrice] = useState<number>(0);
  const [chartData, setChartData] = useState<Array<{ time: string; price: number }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPriceOnly = useCallback(async () => {
    try {
      const priceData = await getPriceData(symbol);
      setPrice(parseFloat(priceData.price));
    } catch (err) {
      console.error('Error actualizando precio:', err);
    }
  }, [symbol]);

  const fetchAllData = useCallback(async () => {
    try {
      setError(null);
      const [priceData, historicalData] = await Promise.all([
        getPriceData(symbol),
        getHistoricalData(symbol, timeFrame),
      ]);
      
      setPrice(parseFloat(priceData.price));
      setChartData(historicalData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener datos');
    } finally {
      setLoading(false);
    }
  }, [symbol, timeFrame]);

  useEffect(() => {
    fetchAllData();
    const priceInterval = setInterval(fetchPriceOnly, 10000);
    const chartInterval = setInterval(fetchAllData, 300000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(chartInterval);
    };
  }, [fetchAllData, fetchPriceOnly]);

  return { price, chartData, error, loading };
};