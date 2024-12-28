import React, { useState } from 'react';
import { QrCode, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { CryptoSelector } from '../crypto/CryptoSelector';
import { CryptoSymbol } from '../../types/crypto';
import { useCryptoConversion } from '../../hooks/useCryptoConversion';

export const DepositSection: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoSymbol>('WLDUSDT');
  const [copied, setCopied] = useState(false);
  const { prices } = useCryptoConversion();
  
  const walletAddress = "0x1234...5678"; // Simulado - En producción vendría de la base de datos

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-light p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Depositar Fondos</h2>
      
      <div className="space-y-6">
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

        <div className="flex flex-col items-center space-y-6">
          <div className="bg-white dark:bg-dark p-4 rounded-lg">
            <QrCode className="w-48 h-48 text-gray-900 dark:text-white" />
          </div>
          
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Dirección de Depósito
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={walletAddress}
                readOnly
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-dark text-gray-900 dark:text-white font-mono"
              />
              <button
                onClick={handleCopy}
                className="p-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="w-full bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-medium">Instrucciones de depósito</p>
                <ul className="list-disc ml-4 mt-1">
                  <li>Envía solo {selectedCrypto.replace('USDT', '')} a esta dirección</li>
                  <li>El depósito se acreditará después de 6 confirmaciones</li>
                  <li>Tiempo estimado: 10-30 minutos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};