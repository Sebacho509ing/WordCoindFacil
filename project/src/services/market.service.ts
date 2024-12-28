import api from './api';

export interface MarketStats {
  volume24h: number;
  marketCap: number;
  btcDominance: number;
  changePercent24h: number;
}

export const getMarketStats = async (): Promise<MarketStats> => {
  try {
    const [ticker24h, btcTicker] = await Promise.all([
      api.get('/ticker/24hr', { params: { symbol: 'BTCUSDT' } }),
      api.get('/ticker/24hr', { params: { symbol: 'BTCUSDT' } })
    ]);

    const volume24h = parseFloat(ticker24h.data.volume);
    const btcPrice = parseFloat(btcTicker.data.lastPrice);
    const marketCap = btcPrice * 19000000; // Approximate BTC circulation
    const btcDominance = 48.2; // This would need another API for accurate data
    const changePercent24h = parseFloat(ticker24h.data.priceChangePercent);

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