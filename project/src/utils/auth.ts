import { AuthError } from '../types/auth';
import { User } from 'firebase/auth';
import { getWallet, createWallet } from '../services/wallet.service';

export const getAuthErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'userNotFound';
    case 'auth/wrong-password':
      return 'wrongPassword';
    case 'auth/email-already-in-use':
      return 'emailInUse';
    case 'auth/weak-password':
      return 'weakPassword';
    case 'auth/invalid-email':
      return 'invalidEmail';
    case 'auth/popup-blocked':
      return 'popupBlocked';
    case 'auth/operation-not-allowed':
      return 'defaultError';
    default:
      return 'defaultError';
  }
};

export const handleAuthSuccess = async (user: User) => {
  try {
    const wallet = await getWallet(user.uid);
    if (!wallet) {
      await createWallet(user.uid);
    }
  } catch (error) {
    console.error('Error handling auth success:', error);
    throw error;
  }
};