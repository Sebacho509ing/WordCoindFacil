export type CryptoSymbol = 
  | 'WLDUSDT' 
  | 'BTCUSDT' 
  | 'ETHUSDT' 
  | 'POLUSDT' 
  | 'BNBUSDT' 
  | 'TWTUSDT'
  | 'SOLUSDT'
  | 'ADAUSDT'
  | 'DOGEUSDT'
  | 'DOTUSDT'
  | 'LINKUSDT'
  | 'AVAXUSDT'
  | 'ATOMUSDT'
  | 'LTCUSDT'
  | 'XRPUSDT';

export interface CryptoOption {
  symbol: CryptoSymbol;
  name: string;
  icon: React.ReactNode;
}

export interface CryptoSelectorProps {
  selectedSymbol: CryptoSymbol;
  onSelect: (symbol: CryptoSymbol) => void;
  price: number;
}