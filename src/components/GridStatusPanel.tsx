import React from 'react';
import { Zap, Activity, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { GridData } from '../types';

interface GridStatusPanelProps {
  gridData: GridData;
}

export const GridStatusPanel: React.FC<GridStatusPanelProps> = ({ gridData }) => {
  const getStabilityStatus = (stability: number) => {
    if (stability >= 95) return { icon: CheckCircle, color: 'text-emerald-500', label: 'Excellent' };
    if (stability >= 90) return { icon: CheckCircle, color: 'text-green-500', label: 'Good' };
    if (stability >= 85) return { icon: AlertTriangle, color: 'text-amber-500', label: 'Warning' };
    return { icon: AlertTriangle, color: 'text-red-500', label: 'Critical' };
  };

  const stabilityStatus = getStabilityStatus(gridData.stability);
  const StabilityIcon = stabilityStatus.icon;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white shadow-xl border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Activity className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Grid Status</h3>
            <p className="text-sm text-gray-400">Real-time grid monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-gray-300">Live</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-400">Frequency</span>
          </div>
          <div className="text-2xl font-bold">{gridData.frequency.toFixed(2)}</div>
          <div className="text-xs text-gray-400">Hz</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Voltage</span>
          </div>
          <div className="text-2xl font-bold">{gridData.voltage.toFixed(1)}</div>
          <div className="text-xs text-gray-400">V</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">Load</span>
          </div>
          <div className="text-2xl font-bold">{gridData.load.toFixed(1)}</div>
          <div className="text-xs text-gray-400">MW</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <StabilityIcon className={`w-4 h-4 ${stabilityStatus.color}`} />
            <span className="text-sm text-gray-400">Stability</span>
          </div>
          <div className="text-2xl font-bold">{gridData.stability.toFixed(1)}%</div>
          <div className={`text-xs ${stabilityStatus.color}`}>{stabilityStatus.label}</div>
        </div>
      </div>

      {/* Renewable Generation */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-emerald-400">Renewable Generation</span>
          <span className="text-lg font-bold text-emerald-400">
            {gridData.renewableGeneration.toFixed(1)} MW
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-emerald-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${(gridData.renewableGeneration / gridData.load) * 100}%` }}
          />
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {((gridData.renewableGeneration / gridData.load) * 100).toFixed(1)}% of total load
        </div>
      </div>

      {/* Market Data */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="text-sm text-gray-400 mb-1">Energy Price</div>
          <div className="text-lg font-bold">${gridData.price.toFixed(3)}</div>
          <div className="text-xs text-gray-400">per kWh</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="text-sm text-gray-400 mb-1">Carbon Intensity</div>
          <div className="text-lg font-bold">{gridData.carbonIntensity.toFixed(3)}</div>
          <div className="text-xs text-gray-400">kg CO₂/kWh</div>
        </div>
      </div>

      {/* Demand Response Status */}
      {gridData.demandResponseActive && (
        <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-amber-400">
              Demand Response Event Active
            </span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Participating in grid stabilization program
          </div>
        </div>
      )}
    </div>
  );
};