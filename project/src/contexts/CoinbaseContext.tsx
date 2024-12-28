import React, { createContext, useContext, useState, useEffect } from 'react';
import { setCoinbaseAuth } from '../services/coinbase/client';
import { CoinbaseAccount } from '../services/coinbase/types';

interface CoinbaseContextType {
  isAuthenticated: boolean;
  selectedAccount: CoinbaseAccount | null;
  setSelectedAccount: (account: CoinbaseAccount | null) => void;
  authenticate: (accessToken: string) => void;
  logout: () => void;
}

const CoinbaseContext = createContext<CoinbaseContextType>({
  isAuthenticated: false,
  selectedAccount: null,
  setSelectedAccount: () => {},
  authenticate: () => {},
  logout: () => {}
});

export const useCoinbase = () => useContext(CoinbaseContext);

export const CoinbaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<CoinbaseAccount | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('coinbase_token');
    if (token) {
      authenticate(token);
    }
  }, []);

  const authenticate = (accessToken: string) => {
    localStorage.setItem('coinbase_token', accessToken);
    setCoinbaseAuth(accessToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('coinbase_token');
    setIsAuthenticated(false);
    setSelectedAccount(null);
  };

  return (
    <CoinbaseContext.Provider
      value={{
        isAuthenticated,
        selectedAccount,
        setSelectedAccount,
        authenticate,
        logout
      }}
    >
      {children}
    </CoinbaseContext.Provider>
  );
};