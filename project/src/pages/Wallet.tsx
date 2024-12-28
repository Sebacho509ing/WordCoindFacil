import React, { useState } from 'react';
import { Header } from '../components/Header';
import { WalletActions } from '../components/wallet/WalletActions';
import { WithdrawSection } from '../components/wallet/WithdrawSection';
import { DepositSection } from '../components/wallet/DepositSection';
import { TransferSection } from '../components/wallet/TransferSection';
import { AddCryptoSection } from '../components/wallet/AddCryptoSection';
import { WalletOverview } from '../components/wallet/WalletOverview';
import { CryptoPortfolio } from '../components/wallet/CryptoPortfolio';
import { ThemeToggle } from '../components/ThemeToggle';

type WalletSection = 'overview' | 'withdraw' | 'deposit' | 'transfer' | 'add-crypto';

export const Wallet: React.FC = () => {
  const [activeSection, setActiveSection] = useState<WalletSection>('overview');

  const handleSectionChange = (section: string) => {
    setActiveSection(section as WalletSection);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'withdraw':
        return <WithdrawSection />;
      case 'deposit':
        return <DepositSection />;
      case 'transfer':
        return <TransferSection />;
      case 'add-crypto':
        return <AddCryptoSection />;
      default:
        return (
          <>
            <WalletOverview />
            <div className="mt-6">
              <CryptoPortfolio />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Mi Cartera</h1>
        <WalletActions 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
        />
        {renderSection()}
      </main>

      <ThemeToggle />
    </div>
  );
};