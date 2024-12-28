import { binanceClient } from '../api/binance-client';
import { MarketStats, Ticker24h } from './types';

export const getMarketStats = async (): Promise<MarketStats> => {
  try {
    const [globalStats, btcTicker] = await Promise.all([
      binanceClient.get<{ total_market_cap_usd: string }>('/v1/ticker/24hr'),
      binanceClient.get<Ticker24h>('/api/v3/ticker/24hr', { symbol: 'BTCUSDT' })
    ]);

    const volume24h = parseFloat(btcTicker.volume);
    const btcPrice = parseFloat(btcTicker.lastPrice);
    const marketCap = btcPrice * 19000000; // Circulación aproximada de BTC
    const changePercent24h = parseFloat(btcTicker.priceChangePercent);

    // Calcular dominancia de BTC
    const btcDominance = (marketCap / parseFloat(globalStats.total_market_cap_usd)) * 100;

    return {
      volume24h,
      marketCap,
      btcDominance,
      changePercent24h
    };
  } catch (error) {
    console.error('Error fetching market stats:', error);
    throw error;
  }
};