import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { CryptoSymbol } from '../../types/crypto';

interface WithdrawalConfirmationProps {
  cryptoAmount: string;
  selectedCrypto: CryptoSymbol;
  copAmount: string;
  onBack: () => void;
}

export const WithdrawalConfirmation: React.FC<WithdrawalConfirmationProps> = ({
  cryptoAmount,
  selectedCrypto,
  copAmount,
  onBack,
}) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        onBack();
      }, 3000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="bg-gray-100 dark:bg-dark-light p-6 rounded-lg mt-6 transition-colors duration-200">
        <div className="text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h3 className="text-xl font-bold">¡Retiro solicitado con éxito!</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Tu solicitud de retiro está siendo procesada. Recibirás una notificación cuando se complete.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-dark-light p-6 rounded-lg mt-6 transition-colors duration-200">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={onBack}
          className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">Confirmar Retiro</h2>
      </div>

      <div className="bg-white dark:bg-dark p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 dark:text-gray-400">Cantidad:</span>
          <span className="font-bold">
            {cryptoAmount} {selectedCrypto.replace('USDT', '')}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Valor en COP:</span>
          <span className="font-bold">${copAmount}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Número de cuenta o tarjeta
          </label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full bg-white dark:bg-dark text-black dark:text-white rounded-md p-3 border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200"
            placeholder="Ingrese el número de cuenta o tarjeta"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Nombre del titular (opcional)
          </label>
          <input
            type="text"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            className="w-full bg-white dark:bg-dark text-black dark:text-white rounded-md p-3 border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200"
            placeholder="Nombre del titular de la cuenta"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              Confirmar retiro
              <CheckCircle className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};