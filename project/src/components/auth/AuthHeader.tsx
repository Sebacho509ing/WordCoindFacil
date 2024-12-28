import React from 'react';

interface AuthHeaderProps {
  isLogin: boolean;
  onToggleMode: () => void;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ isLogin, onToggleMode }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
        {isLogin ? 'Welcome back' : 'Create your account'}
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          onClick={onToggleMode}
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          {isLogin ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </div>
  );
};