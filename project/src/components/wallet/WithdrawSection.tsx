import React, { useState } from 'react';
import { CryptoSelector } from '../crypto/CryptoSelector';
import { CryptoSymbol } from '../../types/crypto';
import { useCryptoConversion } from '../../hooks/useCryptoConversion';
import { formatCOPPrice } from '../../utils/number';
import { ArrowRight, AlertCircle } from 'lucide-react';

export const WithdrawSection: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoSymbol>('WLDUSDT');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { prices, convertToCOP } = useCryptoConversion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simular proceso de retiro
    setTimeout(() => {
      setLoading(false);
      setAmount('');
    }, 2000);
  };

  const calculateCOP = () => {
    const numAmount = parseFloat(amount) || 0;
    return convertToCOP(numAmount, selectedCrypto);
  };

  return (
    <div className="bg-white dark:bg-dark-light p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Retiros</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Seleccionar Criptomoneda
          </label>
          <CryptoSelector
            selectedSymbol={selectedCrypto}
            onSelect={setSelectedCrypto}
            price={prices[selectedCrypto]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Cantidad de {selectedCrypto.replace('USDT', '')} a retirar
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-gray-900 dark:text-white"
            placeholder="0.00"
            required
          />
          {amount && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Valor aproximado: {formatCOPPrice(calculateCOP())}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              Confirmar Retiro
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};