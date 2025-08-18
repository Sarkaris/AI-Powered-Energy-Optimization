import React from 'react';

interface EnergyGaugeProps {
  current: number;
  max: number;
  title: string;
  unit: string;
  color?: 'emerald' | 'blue' | 'amber' | 'red';
}

const colorClasses = {
  emerald: 'stroke-emerald-500',
  blue: 'stroke-blue-500',
  amber: 'stroke-amber-500',
  red: 'stroke-red-500'
};

export const EnergyGauge: React.FC<EnergyGaugeProps> = ({
  current,
  max,
  title,
  unit,
  color = 'emerald'
}) => {
  const percentage = Math.min((current / max) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      
      <div className="relative flex items-center justify-center">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colorClasses[color]} transition-all duration-1000 ease-out`}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {current.toFixed(1)}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {percentage.toFixed(1)}% of daily target
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          Max: {max} {unit}
        </div>
      </div>
    </div>
  );
};