import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LineChart, Search } from 'lucide-react';
import { UserProfile } from './UserProfile';
import { SearchModal } from './search/SearchModal';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="bg-gray-100 dark:bg-dark-light p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <LineChart className="text-primary" />
              Wordconit Fácil
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                to="/wallet"
                className={`text-lg font-semibold transition-colors ${
                  location.pathname === '/wallet'
                    ? 'text-primary'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                }`}
              >
                Cartera
              </Link>
              <Link
                to="/converter"
                className={`text-lg font-semibold transition-colors ${
                  location.pathname === '/converter'
                    ? 'text-primary'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                }`}
              >
                Conversor
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-light transition-colors"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">Buscar</span>
            </button>
            <UserProfile />
          </div>
        </div>
      </header>

      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};