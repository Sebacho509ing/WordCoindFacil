import React from 'react';
import { cryptoOptions } from '../../constants/cryptoOptions';
import { CryptoSymbol } from '../../types/crypto';

interface CryptoIconProps {
  symbol: CryptoSymbol;
  className?: string;
}

export const CryptoIcon: React.FC<CryptoIconProps> = ({ symbol, className = '' }) => {
  const crypto = cryptoOptions.find((c) => c.symbol === symbol);
  if (!crypto) return null;

  return (
    <div className={className}>
      {crypto.icon}
    </div>
  );
};