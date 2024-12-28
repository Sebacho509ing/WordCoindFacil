import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';

export const WalletInfo: React.FC = () => {
  const [showWallet, setShowWallet] = useState(false);
  const [copied, setCopied] = useState(false);
  const walletNumber = "1234567890";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-100 dark:bg-dark-light p-6 rounded-lg mt-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold mb-4">Información de Billetera</h3>
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-white dark:bg-dark text-black dark:text-white rounded-md px-4 py-2 font-mono transition-colors duration-200">
          {showWallet ? walletNumber : '••••••••••'}
        </div>
        <button
          onClick={() => setShowWallet(!showWallet)}
          className="p-2 hover:bg-gray-200 dark:hover:bg-dark rounded-md transition-colors"
          aria-label={showWallet ? 'Ocultar número de billetera' : 'Mostrar número de billetera'}
        >
          {showWallet ? <EyeOff className="text-primary" /> : <Eye className="text-primary" />}
        </button>
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-gray-200 dark:hover:bg-dark rounded-md transition-colors"
          aria-label="Copiar número de billetera"
        >
          {copied ? (
            <Check className="text-primary" />
          ) : (
            <Copy className="text-primary" />
          )}
        </button>
      </div>
    </div>
  );
};