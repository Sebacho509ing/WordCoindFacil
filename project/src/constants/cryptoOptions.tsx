import React from 'react';
import { Bitcoin, Wallet, Coins } from 'lucide-react';
import { CryptoOption } from '../types/crypto';

// Custom icons for cryptocurrencies that don't have Lucide equivalents
const EthereumIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
  </svg>
);

const PolygonIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 5.25l2.25 3.75-2.25 3.75-2.25-3.75 2.25-3.75zM11.25 7.5L9 3.75 6.75 7.5 9 11.25l2.25-3.75zM6.75 16.5L9 20.25l2.25-3.75L9 12.75l-2.25 3.75z" />
  </svg>
);

const SolanaIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.16 10.87h-7.35l-2.46 2.45h7.35l2.46-2.45zM17.16 5.5h-7.35l-2.46 2.45h7.35l2.46-2.45zM9.81 13.83l-2.46 2.45h7.35l2.46-2.45H9.81z"/>
  </svg>
);

const ChainlinkIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 6v12l9 5 9-5V6l-9-5zM4.5 16.5v-9L12 12l7.5-4.5v9L12 21l-7.5-4.5z"/>
  </svg>
);

export const cryptoOptions: CryptoOption[] = [
  {
    symbol: 'WLDUSDT',
    name: 'Worldcoin',
    icon: <Wallet className="w-5 h-5" />,
  },
  {
    symbol: 'BTCUSDT',
    name: 'Bitcoin',
    icon: <Bitcoin className="w-5 h-5" />,
  },
  {
    symbol: 'ETHUSDT',
    name: 'Ethereum',
    icon: <EthereumIcon />,
  },
  {
    symbol: 'POLUSDT',
    name: 'Polygon',
    icon: <PolygonIcon />,
  },
  {
    symbol: 'BNBUSDT',
    name: 'BNB',
    icon: <Coins className="w-5 h-5" />,
  },
  {
    symbol: 'SOLUSDT',
    name: 'Solana',
    icon: <SolanaIcon />,
  },
  {
    symbol: 'ADAUSDT',
    name: 'Cardano',
    icon: <Coins className="w-5 h-5" />,
  },
  {
    symbol: 'DOGEUSDT',
    name: 'Dogecoin',
    icon: <Coins className="w-5 h-5" />,
  },
  {
    symbol: 'DOTUSDT',
    name: 'Polkadot',
    icon: <Coins className="w-5 h-5" />,
  },
  {
    symbol: 'LINKUSDT',
    name: 'Chainlink',
    icon: <ChainlinkIcon />,
  },
  {
    symbol: 'AVAXUSDT',
    name: 'Avalanche',
    icon: <Coins className="w-5 h-5" />,
  },
  {
    symbol: 'ATOMUSDT',
    name: 'Cosmos',
    icon: <Coins className="w-5 h-5" />,
  },
  {
    symbol: 'LTCUSDT',
    name: 'Litecoin',
    icon: <Coins className="w-5 h-5" />,
  },
  {
    symbol: 'XRPUSDT',
    name: 'XRP',
    icon: <Coins className="w-5 h-5" />,
  },
  {
    symbol: 'TWTUSDT',
    name: 'Trust Wallet',
    icon: <Wallet className="w-5 h-5" />,
  },
];