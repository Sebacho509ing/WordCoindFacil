import React from 'react';
import { LogIn, UserPlus, ArrowRight } from 'lucide-react';

interface AuthButtonProps {
  isLogin: boolean;
  loading: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ isLogin, loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
        {isLogin ? (
          <LogIn className="h-5 w-5 text-primary-light group-hover:text-white" />
        ) : (
          <UserPlus className="h-5 w-5 text-primary-light group-hover:text-white" />
        )}
      </span>
      {loading ? (
        <div className="flex items-center">
          <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
          Procesando...
        </div>
      ) : isLogin ? (
        'Iniciar sesión'
      ) : (
        'Registrarse'
      )}
      <ArrowRight className="ml-2 h-5 w-5" />
    </button>
  );
};