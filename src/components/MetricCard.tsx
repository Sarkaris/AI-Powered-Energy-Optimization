import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  color?: 'emerald' | 'blue' | 'amber' | 'red' | 'purple';
  className?: string;
}

const colorClasses = {
  emerald: {
    icon: 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
    trend: 'text-emerald-600 dark:text-emerald-400'
  },
  blue: {
    icon: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    trend: 'text-blue-600 dark:text-blue-400'
  },
  amber: {
    icon: 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    trend: 'text-amber-600 dark:text-amber-400'
  },
  red: {
    icon: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    trend: 'text-red-600 dark:text-red-400'
  },
  purple: {
    icon: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    trend: 'text-purple-600 dark:text-purple-400'
  }
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  color = 'emerald',
  className = ''
}) => {
  const colors = colorClasses[color];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 
                     dark:border-gray-700 hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</p>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {unit && (
              <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>
            )}
          </div>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${colors.trend}`}>
              <span className={trend.isPositive !== false ? '↗' : '↘'}>
                {Math.abs(trend.value)}%
              </span>
              <span className="ml-1 text-gray-600 dark:text-gray-400">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors.icon}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};