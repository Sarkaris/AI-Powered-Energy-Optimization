import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center p-2 rounded-lg
                       text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
                       transition-colors duration-200"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Sun className="w-5 h-5" />
            ) : (
                <Moon className="w-5 h-5" />
            )}
        </button>
    );
};