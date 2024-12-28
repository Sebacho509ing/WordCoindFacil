import React, { createContext, useContext, useState } from 'react';
import { es } from '../translations/es';

interface LanguageContextType {
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  t: () => '',
});

export const useTranslation = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = es;
    
    for (const k of keys) {
      if (value[k] === undefined) return key;
      value = value[k];
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  );
};