import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { SearchResults } from './SearchResults';
import { TrendingCoins } from './TrendingCoins';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useOnClickOutside<HTMLDivElement>(onClose);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-dark-light rounded-xl shadow-xl max-w-3xl mx-auto mt-20"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-dark border-none rounded-lg focus:ring-2 focus:ring-primary text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Buscar moneda, par, NFT, dirección de contrato..."
              autoFocus
            />
            <button
              onClick={onClose}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {searchTerm ? (
            <SearchResults searchTerm={searchTerm} />
          ) : (
            <TrendingCoins />
          )}
        </div>
      </div>
    </div>
  );
};