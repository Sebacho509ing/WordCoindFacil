import React from 'react';
import { CryptoIcon } from '../crypto/CryptoIcon';
import { formatCryptoPrice, formatCOPPrice } from '../../utils/number';
import { CryptoSymbol } from '../../types/crypto';
import { cryptoOptions } from '../../constants/cryptoOptions';

interface CryptoAssetProps {
  symbol: CryptoSymbol;
  amount: number;
  price: number;
  convertToCOP: (amount: number, symbol: CryptoSymbol) => number;
}

export const CryptoAsset: React.FC<CryptoAssetProps> = ({
  symbol,
  amount,
  price,
  convertToCOP,
}) => {
  const crypto = cryptoOptions.find((c) => c.symbol === symbol);
  const valueUSD = amount * price;
  const valueCOP = convertToCOP(amount, symbol);

  return (
    <div className="bg-white dark:bg-dark p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CryptoIcon symbol={symbol} className="w-8 h-8 text-primary" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{crypto?.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {amount} {symbol.replace('USDT', '')}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900 dark:text-white">${formatCryptoPrice(valueUSD, symbol)}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatCOPPrice(valueCOP)}
          </p>
        </div>
      </div>
    </div>
  );
};