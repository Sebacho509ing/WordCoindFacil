import React, { useState } from 'react';
import { Search, Users, AlertCircle } from 'lucide-react';
import { CryptoSelector } from '../crypto/CryptoSelector';
import { CryptoSymbol } from '../../types/crypto';
import { useCryptoConversion } from '../../hooks/useCryptoConversion';
import { formatCOPPrice } from '../../utils/number';

export const TransferSection: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoSymbol>('WLDUSDT');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const { prices, convertToCOP } = useCryptoConversion();

  const recentContacts = [
    { id: 1, name: 'Carlos Pérez', address: '0x1234...5678' },
    { id: 2, name: 'Ana García', address: '0x5678...9012' },
    { id: 3, name: 'Luis Torres', address: '0x9012...3456' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAmount('');
      setRecipient('');
    }, 2000);
  };

  const calculateCOP = () => {
    const numAmount = parseFloat(amount) || 0;
    return convertToCOP(numAmount, selectedCrypto);
  };

  return (
    <div className="bg-white dark:bg-dark-light p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Transferir Criptomonedas</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Buscar Contacto o Ingresar Dirección
          </label>
          <div className="relative">
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-gray-900 dark:text-white"
              placeholder="Nombre, dirección de wallet o correo"
              required
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-dark-light text-gray-500 dark:text-gray-400">
              Contactos Recientes
            </span>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto py-2">
          {recentContacts.map((contact) => (
            <button
              key={contact.id}
              type="button"
              onClick={() => setRecipient(contact.address)}
              className="flex flex-col items-center min-w-[100px] p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark transition-colors"
            >
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </div>
              <span className="mt-2 text-sm text-gray-900 dark:text-white">{contact.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate w-full text-center">
                {contact.address}
              </span>
            </button>
          ))}
        </div>

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
            Cantidad
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
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Valor aproximado: {formatCOPPrice(calculateCOP())}
            </p>
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <p className="font-medium">Información de la transferencia</p>
            <ul className="list-disc ml-4 mt-1">
              <li>Comisión por transferencia: 0.1%</li>
              <li>Tiempo estimado: 5-10 minutos</li>
              <li>Las transferencias son irreversibles</li>
            </ul>
          </div>
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
            'Confirmar Transferencia'
          )}
        </button>
      </form>
    </div>
  );
};