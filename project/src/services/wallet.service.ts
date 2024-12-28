import { db } from '../config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export interface Wallet {
  balance: number;
  address: string;
  createdAt: number;
}

export const createWallet = async (userId: string): Promise<Wallet> => {
  const wallet: Wallet = {
    balance: 0,
    address: generateWalletAddress(),
    createdAt: Date.now(),
  };

  await setDoc(doc(db, 'wallets', userId), wallet);
  return wallet;
};

export const getWallet = async (userId: string): Promise<Wallet | null> => {
  const walletDoc = await getDoc(doc(db, 'wallets', userId));
  return walletDoc.exists() ? walletDoc.data() as Wallet : null;
};

export const updateBalance = async (userId: string, newBalance: number): Promise<void> => {
  await updateDoc(doc(db, 'wallets', userId), {
    balance: newBalance,
  });
};

const generateWalletAddress = (): string => {
  return 'WLD' + Math.random().toString(36).substring(2, 15).toUpperCase();
};