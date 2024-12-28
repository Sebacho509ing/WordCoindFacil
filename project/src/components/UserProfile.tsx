import React, { useState, useEffect } from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { getWallet, Wallet } from '../services/wallet.service';
import { AccountSettings } from './settings/AccountSettings';

export const UserProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWallet = async () => {
      if (auth.currentUser) {
        const userWallet = await getWallet(auth.currentUser.uid);
        setWallet(userWallet);
      }
    };
    loadWallet();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-dark-light p-2 rounded-lg transition-colors duration-200"
      >
        <User className="text-primary" />
        <div>
          <p className="font-semibold text-left">
            {auth.currentUser?.displayName || 'Usuario'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Balance: {wallet?.balance.toLocaleString('es-CO')} COP
          </p>
        </div>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-dark-light z-50">
            <div className="py-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsSettingsOpen(true);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-dark transition-colors duration-200"
              >
                <Settings className="w-4 h-4" />
                Configuración de cuenta
              </button>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-gray-100 dark:hover:bg-dark transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </>
      )}

      {isSettingsOpen && (
        <AccountSettings onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
};