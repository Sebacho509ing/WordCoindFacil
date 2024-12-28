import React from 'react';
import { ChevronDown, Bitcoin, Ethereum, Wallet, Coins } from 'lucide-react';
import { CryptoSymbol } from '../services/price.service';

interface CryptoOption {
  symbol: CryptoSymbol;
  name: string;
  icon: React.ReactNode;
}

const cryptoOptions: CryptoOption[] = [
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
    icon: <Ethereum className="w-5 h-5" />,
  },
  {
    symbol: 'POLUSDT',
    name: 'Polygon',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 5.25l2.25 3.75-2.25 3.75-2.25-3.75 2.25-3.75zM11.25 7.5L9 3.75 6.75 7.5 9 11.25l2.25-3.75zM6.75 16.5L9 20.25l2.25-3.75L9 12.75l-2.25 3.75z"/></svg>},
  {
    symbol: 'BNBUSDT',
    name: 'BNB',
    icon: <Coins className="w-5 h-5" />,
  },
  {
    symbol: 'TWTUSDT',
    name: 'Trust Wallet',
    icon: <Wallet className="w-5 h-5" />,
  },
];

interface CryptoSelectorProps {
  selectedSymbol: CryptoSymbol;
  onSelect: (symbol: CryptoSymbol) => void;
  price: number;
}

export const CryptoSelector: React.FC<CryptoSelectorProps> = ({
  selectedSymbol,
  onSelect,
  price,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedCrypto = cryptoOptions.find((crypto) => crypto.symbol === selectedSymbol);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white dark:bg-dark-light px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-dark transition-colors duration-200"
      >
        <div className="flex items-center gap-2">
          {selectedCrypto?.icon}
          <span className="font-medium">{selectedCrypto?.name}/USDT</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-dark-light rounded-lg shadow-lg z-20 py-1">
            {cryptoOptions.map((crypto) => (
              <button
                key={crypto.symbol}
                onClick={() => {
                  onSelect(crypto.symbol);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-dark transition-colors duration-200 ${
                  selectedSymbol === crypto.symbol ? 'bg-gray-100 dark:bg-dark' : ''
                }`}
              >
                {crypto.icon}
                <span>{crypto.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};