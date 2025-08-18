import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Factory, Building, Home } from 'lucide-react';
import { SectorMetrics } from '../types';

interface SectorCardProps {
  metrics: SectorMetrics;
  isSelected: boolean;
  onClick: () => void;
  onCalculateClick?: () => void;
}

const sectorIcons = {
  residential: Home,
  commercial: Building,
  industrial: Factory
};

const sectorColors = {
  residential: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-400',
    icon: 'text-blue-600 dark:text-blue-400'
  },
  commercial: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-400',
    icon: 'text-emerald-600 dark:text-emerald-400'
  },
  industrial: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-700 dark:text-purple-400',
    icon: 'text-purple-600 dark:text-purple-400'
  }
};

export const SectorCard: React.FC<SectorCardProps> = ({ metrics, isSelected, onClick, onCalculateClick }) => {
  const Icon = sectorIcons[metrics.sector];
  const colors = sectorColors[metrics.sector];
  
  // Check if sector has saved carbon calculation
  const getSavedCalculation = () => {
    const saved = localStorage.getItem('savedCarbonCalculations');
    if (saved) {
      try {
        const calculations = JSON.parse(saved);
        return calculations.find((calc: any) => calc.sector === metrics.sector);
      } catch (error) {
        return null;
      }
    }
    return null;
  };

  const savedCalculation = getSavedCalculation();
  const hasData = savedCalculation || metrics.totalConsumption > 0 || metrics.totalCost > 0 || metrics.totalEmissions > 0;
  
  const getComplianceIcon = () => {
    switch (metrics.complianceStatus) {
      case 'compliant':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'non-compliant':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
  };

  const formatEnergy = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}GWh`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}MWh`;
    return `${value.toFixed(1)}kWh`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(1);
  };

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-300 rounded-xl p-6 border-2
                 ${isSelected 
                   ? `${colors.bg} ${colors.border} shadow-lg scale-105` 
                   : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-102'
                 }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${colors.bg}`}>
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>
          <div>
            <h3 className={`text-lg font-bold capitalize ${isSelected ? colors.text : 'text-gray-900 dark:text-white'}`}>
              {metrics.sector}
            </h3>
            <div className="flex items-center space-x-2">
              {getComplianceIcon()}
              <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {metrics.complianceStatus}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-2xl font-bold ${isSelected ? colors.text : 'text-gray-900 dark:text-white'}`}>
            {hasData ? metrics.sustainabilityScore.toFixed(1) : '--'}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Sustainability Score</div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Consumption</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {hasData ? formatEnergy(metrics.totalConsumption) : 'No data'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Cost</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {hasData ? formatCurrency(metrics.totalCost) : 'No data'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Efficiency</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {hasData ? `${metrics.efficiency.toFixed(1)}%` : 'No data'}
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Renewable</span>
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {hasData ? `${metrics.renewablePercentage.toFixed(1)}%` : 'No data'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Grid Stability</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {hasData ? `${metrics.gridStability.toFixed(1)}%` : 'No data'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Risk Level</span>
            <span className={`text-sm font-semibold capitalize
                           ${metrics.riskLevel === 'low' ? 'text-emerald-600 dark:text-emerald-400' :
                             metrics.riskLevel === 'medium' ? 'text-amber-600 dark:text-amber-400' :
                             'text-red-600 dark:text-red-400'}`}>
              {metrics.riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Projected Savings */}
      <div className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <TrendingUp className={`w-4 h-4 ${colors.icon}`} />
            <span className={`text-sm font-medium ${colors.text}`}>
              {savedCalculation ? 'Carbon Footprint' : 'Projected Savings'}
            </span>
          </div>
          <span className={`text-lg font-bold ${colors.text}`}>
            {savedCalculation 
              ? `${formatNumber(savedCalculation.results.total)} kg CO₂`
              : hasData 
                ? formatCurrency(metrics.projectedSavings) 
                : 'Calculate to see'
            }
          </span>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {savedCalculation 
            ? `Monthly emissions • Saved ${new Date(savedCalculation.savedAt).toLocaleDateString()}`
            : hasData 
              ? `${metrics.optimizationOpportunities} optimization opportunities available`
              : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCalculateClick?.();
                  }}
                  className={`${colors.text} hover:underline font-medium`}
                >
                  Complete carbon calculator to unlock insights
                </button>
              )
          }
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${colors.icon.replace('text-', 'bg-')}`} />
      )}
    </div>
  );
};