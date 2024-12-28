import React from 'react';
import { ArrowUpRight, ArrowDownLeft, RefreshCw, Plus } from 'lucide-react';

interface WalletActionsProps {
  onSectionChange: (section: string) => void;
  activeSection: string;
}

export const WalletActions: React.FC<WalletActionsProps> = ({ onSectionChange, activeSection }) => {
  const actions = [
    { id: 'withdraw', title: 'Retiros', icon: <ArrowUpRight />, color: 'bg-red-500' },
    { id: 'deposit', title: 'Depósitos', icon: <ArrowDownLeft />, color: 'bg-green-500' },
    { id: 'transfer', title: 'Transferencias', icon: <RefreshCw />, color: 'bg-blue-500' },
    { id: 'add-crypto', title: 'Agregar Cripto', icon: <Plus />, color: 'bg-purple-500' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onSectionChange(action.id)}
          className={`flex items-center gap-3 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ${
            activeSection === action.id
              ? 'bg-primary text-white'
              : 'bg-white dark:bg-dark-light text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-dark'
          }`}
        >
          <div className={`${action.color} p-3 rounded-lg text-white`}>
            {action.icon}
          </div>
          <span className="font-semibold">{action.title}</span>
        </button>
      ))}
    </div>
  );
};