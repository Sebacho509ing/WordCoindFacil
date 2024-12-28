import { 
  signInWithPopup, 
  signInWithRedirect, 
  GoogleAuthProvider,
  AuthError
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { createWallet, getWallet } from './wallet.service';

export const handleGoogleAuth = async (): Promise<void> => {
  try {
    // Intentar primero con popup
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await handleAuthSuccess(result.user.uid);
    } catch (popupError: any) {
      if (popupError.code === 'auth/popup-blocked') {
        // Si el popup está bloqueado, usar redirect
        await signInWithRedirect(auth, googleProvider);
      } else if (popupError.code === 'auth/unauthorized-domain') {
        throw new Error('Este dominio no está autorizado para autenticación. Por favor, contacta al administrador.');
      } else {
        throw popupError;
      }
    }
  } catch (error) {
    console.error('Error en autenticación con Google:', error);
    throw error;
  }
};

export const handleAuthSuccess = async (userId: string): Promise<void> => {
  try {
    const wallet = await getWallet(userId);
    if (!wallet) {
      await createWallet(userId);
    }
  } catch (error) {
    console.error('Error al manejar el éxito de autenticación:', error);
    throw error;
  }
};

export const getAuthErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/unauthorized-domain':
      return 'Este dominio no está autorizado. Por favor, intenta desde un dominio válido.';
    case 'auth/popup-blocked':
      return 'El popup fue bloqueado. Por favor, permite las ventanas emergentes.';
    case 'auth/cancelled-popup-request':
      return 'La autenticación fue cancelada. Por favor, intenta de nuevo.';
    default:
      return 'Error al iniciar sesión. Por favor, intenta de nuevo.';
  }
};