import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Mail, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

interface ForgotPasswordProps {
  onBack: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      setError(t(`auth.errors.${err.code}`) || t('auth.errors.defaultError'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
          <p className="text-green-700 dark:text-green-300">
            {t('auth.resetPasswordSent')}
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-primary hover:text-primary-dark transition-colors"
        >
          {t('auth.backToLogin')}
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t('auth.backToLogin')}
      </button>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {t('auth.resetPassword')}
      </h2>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {t('auth.resetPasswordInstructions')}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('auth.email')}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark text-black dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>
        </div>

        {error && (
          <div className="p-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              {t('auth.processing')}
            </>
          ) : (
            t('auth.sendResetLink')
          )}
        </button>
      </form>
    </div>
  );
};