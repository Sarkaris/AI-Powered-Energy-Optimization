import React, { useState } from 'react';
import { Power, Wifi, WifiOff, Settings, Zap, Clock, DollarSign } from 'lucide-react';
import { mockAppliances } from '../services/mockData';
import { Appliance } from '../types';

export const Appliances: React.FC = () => {
  const [appliances, setAppliances] = useState<Appliance[]>(mockAppliances);
  const [selectedRoom, setSelectedRoom] = useState<string>('all');

  const rooms = ['all', ...Array.from(new Set(appliances.map(a => a.room)))];

  const filteredAppliances = selectedRoom === 'all' 
    ? appliances 
    : appliances.filter(a => a.room === selectedRoom);

  const toggleAppliance = (id: string) => {
    setAppliances(prev => prev.map(appliance => {
      if (appliance.id === id) {
        const newStatus = appliance.status === 'on' ? 'off' : 'on';
        return { ...appliance, status: newStatus };
      }
      return appliance;
    }));
  };

  const getStatusColor = (status: Appliance['status']) => {
    switch (status) {
      case 'on': return 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/20';
      case 'off': return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
      case 'standby': return 'text-amber-500 bg-amber-100 dark:bg-amber-900/20';
    }
  };

  const getEfficiencyColor = (efficiency: Appliance['efficiency']) => {
    switch (efficiency) {
      case 'high': return 'text-emerald-600 dark:text-emerald-400';
      case 'medium': return 'text-amber-600 dark:text-amber-400';
      case 'low': return 'text-red-600 dark:text-red-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Smart Appliances
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor and control your connected devices
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span>{appliances.filter(a => a.isConnected).length} Connected</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>{appliances.filter(a => !a.isConnected).length} Offline</span>
          </div>
        </div>
      </div>

      {/* Room Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {rooms.map((room) => (
            <button
              key={room}
              onClick={() => setSelectedRoom(room)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                         ${selectedRoom === room
                           ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                           : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                         }`}
            >
              {room === 'all' ? 'All Rooms' : room}
            </button>
          ))}
        </div>
      </div>

      {/* Appliances Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppliances.map((appliance) => (
          <div
            key={appliance.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 
                       dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getStatusColor(appliance.status)}`}>
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {appliance.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {appliance.room}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {appliance.isConnected ? (
                  <Wifi className="w-4 h-4 text-emerald-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Status and Power */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                <span className={`text-sm font-medium capitalize ${getStatusColor(appliance.status)} px-2 py-1 rounded-full`}>
                  {appliance.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Power Draw</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {appliance.powerDraw.toFixed(1)} kW
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Efficiency</span>
                <span className={`text-sm font-medium capitalize ${getEfficiencyColor(appliance.efficiency)}`}>
                  {appliance.efficiency}
                </span>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Daily Usage</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {appliance.dailyUsage.toFixed(1)} kWh
                </span>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Monthly Cost</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  ${appliance.monthlyCost.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Control Button */}
            <button
              onClick={() => toggleAppliance(appliance.id)}
              disabled={!appliance.isConnected}
              className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors
                         ${appliance.isConnected
                           ? appliance.status === 'on'
                             ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30'
                             : 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/30'
                           : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                         }`}
            >
              <Power className="w-4 h-4" />
              <span>
                {!appliance.isConnected 
                  ? 'Offline'
                  : appliance.status === 'on' 
                    ? 'Turn Off' 
                    : 'Turn On'
                }
              </span>
            </button>

            {/* AI Suggestion */}
            {appliance.isConnected && (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  💡 AI Tip: Schedule this device during off-peak hours to save 15% on costs
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 bg-emerald-100 
                           dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 
                           rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/30 transition-colors">
            <Power className="w-5 h-5" />
            <span>Turn Off All Non-Essential</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 bg-blue-100 
                           dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 
                           rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors">
            <Clock className="w-5 h-5" />
            <span>Enable Smart Scheduling</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 bg-purple-100 
                           dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 
                           rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors">
            <Zap className="w-5 h-5" />
            <span>Optimize All Devices</span>
          </button>
        </div>
      </div>
    </div>
  );
};