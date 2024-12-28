export interface CryptoInfo {
  symbol: string;
  name: string;
  price: string;
  priceChangePercent: string;
  volume: string;
  marketCap?: string;
  circulatingSupply?: string;
}

export interface CryptoListResponse {
  symbols: CryptoInfo[];
  lastUpdate: number;
}