import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Clock, DollarSign, Zap } from 'lucide-react';
import { AIInsight } from '../types';

interface AIInsightCardProps {
  insight: AIInsight;
  onImplement?: (id: string) => void;
}

const typeIcons = {
  optimization: TrendingUp,
  prediction: Brain,
  anomaly: AlertTriangle,
  recommendation: Lightbulb
};

const impactColors = {
  low: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20',
  medium: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/20',
  high: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/20',
  critical: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
};

export const AIInsightCard: React.FC<AIInsightCardProps> = ({ insight, onImplement }) => {
  const Icon = typeIcons[insight.type];
  const impactColor = impactColors[insight.impact];
  
  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
  };

  const getTimeToDeadline = () => {
    if (!insight.deadline) return null;
    const deadline = new Date(insight.deadline);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${impactColor}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {insight.title}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${impactColor}`}>
                {insight.impact} Impact
              </span>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 capitalize">
                {insight.type}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-600 dark:text-gray-400">Confidence</div>
          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            {insight.confidence}%
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
        {insight.description}
      </p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
          <div className="text-sm text-gray-600 dark:text-gray-400">Savings</div>
          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(insight.estimatedSavings)}
          </div>
        </div>
        
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
          <div className="text-sm text-gray-600 dark:text-gray-400">Investment</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(insight.implementationCost)}
          </div>
        </div>
        
        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
          <div className="text-sm text-gray-600 dark:text-gray-400">Payback</div>
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {insight.paybackPeriod.toFixed(1)}y
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Action Items:</h4>
        <ul className="space-y-1">
          {insight.actionItems.map((item, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <span className="capitalize">{insight.sector} Sector</span>
          {insight.deadline && (
            <span className={`font-medium ${
              getTimeToDeadline()?.includes('Overdue') || getTimeToDeadline()?.includes('today') 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {getTimeToDeadline()}
            </span>
          )}
        </div>
        
        {onImplement && (
          <button
            onClick={() => onImplement(insight.id)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Implement
          </button>
        )}
      </div>
    </div>
  );
};