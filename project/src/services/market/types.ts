export interface MarketStats {
  volume24h: number;
  marketCap: number;
  btcDominance: number;
  changePercent24h: number;
}

export interface Ticker24h {
  symbol: string;
  volume: string;
  lastPrice: string;
  priceChangePercent: string;
}