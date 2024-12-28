import React, { useState } from 'react';
import { TrendingUp, Info, CheckCircle } from 'lucide-react';
import { cryptoOptions } from '../../constants/cryptoOptions';
import { useCryptoConversion } from '../../hooks/useCryptoConversion';
import { formatCryptoPrice } from '../../utils/number';

export const AddCryptoSection: React.FC = () => {
  const [enabledCryptos, setEnabledCryptos] = useState<string[]>([]);
  const { prices } = useCryptoConversion();

  const handleToggleCrypto = (symbol: string) => {
    setEnabledCryptos(prev => 
      prev.includes(symbol)
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  return (
    <div className="bg-white dark:bg-dark-light p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Agregar Criptomonedas</h2>
      
      <div className="grid gap-4">
        {cryptoOptions.map((crypto) => {
          const isEnabled = enabledCryptos.includes(crypto.symbol);
          const price = prices[crypto.symbol] || 0;

          return (
            <div
              key={crypto.symbol}
              className={`p-4 border rounded-lg transition-colors ${
                isEnabled
                  ? 'border-primary bg-primary/5 dark:bg-primary/10'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-gray-900 dark:text-white">
                    {crypto.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{crypto.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{crypto.symbol}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ${formatCryptoPrice(price, crypto.symbol)}
                    </p>
                    <p className="text-sm text-green-500">+2.5%</p>
                  </div>
                  <button
                    onClick={() => handleToggleCrypto(crypto.symbol)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isEnabled
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
                  >
                    {isEnabled ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Habilitado
                      </span>
                    ) : (
                      'Habilitar'
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Info className="w-4 h-4" />
                <p>Cap. de mercado: $800B</p>
                <TrendingUp className="w-4 h-4 ml-2" />
                <p>Vol. 24h: $25B</p>
              </div>

              {isEnabled && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    ¡Listo! Ya puedes empezar a operar con {crypto.name}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};