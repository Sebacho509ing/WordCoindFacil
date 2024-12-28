import React from 'react';
import { Header } from '../components/Header';
import { ThemeToggle } from '../components/ThemeToggle';
import { Converter as ConverterComponent } from '../components/Converter';
import { WithdrawalForm } from '../components/withdrawal/WithdrawalForm';

export const Converter: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark">
      <Header />
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Conversor de Criptomonedas</h2>
          <ConverterComponent />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Retiros</h2>
          <WithdrawalForm />
        </div>
      </main>
      <ThemeToggle />
    </div>
  );
};