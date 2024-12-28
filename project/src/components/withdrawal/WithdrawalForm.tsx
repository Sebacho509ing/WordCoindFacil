import React, { useState } from 'react';
import { DollarSign, ArrowRight } from 'lucide-react';
import { CryptoSelector } from '../crypto/CryptoSelector';
import { CryptoSymbol } from '../../types/crypto';
import { useCryptoConversion } from '../../hooks/useCryptoConversion';

export const WithdrawalForm: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoSymbol>('WLDUSDT');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { prices, convertToCOP } = useCryptoConversion();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCryptoAmount(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setCryptoAmount('');
      setAccountNumber('');
    }, 1500);
  };

  const calculateCOP = (): string => {
    const amount = parseFloat(cryptoAmount) || 0;
    const copValue = convertToCOP(amount, selectedCrypto);
    return copValue.toLocaleString('es-CO');
  };

  return (
    <div className="bg-gray-100 dark:bg-dark-light p-6 rounded-lg mt-6 transition-colors duration-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <CryptoSelector
          selectedSymbol={selectedCrypto}
          onSelect={setSelectedCrypto}
          price={prices[selectedCrypto]}
        />
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Cantidad a retirar
          </label>
          <input
            type="text"
            value={cryptoAmount}
            onChange={handleAmountChange}
            className="w-full bg-white dark:bg-dark text-gray-900 dark:text-white rounded-md p-3 border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200"
            placeholder="0.00"
            required
          />
          {cryptoAmount && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Valor aproximado: ${calculateCOP()} COP
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Número de cuenta bancaria
          </label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full bg-white dark:bg-dark text-gray-900 dark:text-white rounded-md p-3 border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200"
            placeholder="Ingrese su número de cuenta"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              Retirar
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};