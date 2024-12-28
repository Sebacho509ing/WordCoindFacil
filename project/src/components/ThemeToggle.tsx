import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 p-4 rounded-full bg-white dark:bg-dark-light text-black dark:text-white hover:bg-gray-100 dark:hover:bg-dark transition-all duration-200 shadow-lg"
      aria-label="Cambiar tema"
    >
      {theme === 'dark' ? (
        <Sun className="w-7 h-7 text-primary" />
      ) : (
        <Moon className="w-7 h-7 text-primary" />
      )}
    </button>
  );
};