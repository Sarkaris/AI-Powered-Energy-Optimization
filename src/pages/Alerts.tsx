import React, { useState } from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, X, Eye } from 'lucide-react';
import { mockAlerts } from '../services/mockData';
import { Alert } from '../types';

export const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filter, setFilter] = useState<'all' | 'unread' | 'anomaly' | 'budget' | 'maintenance' | 'optimization'>('all');

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : filter === 'unread'
      ? alerts.filter(alert => !alert.isRead)
      : alerts.filter(alert => alert.type === filter);

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: Alert['type'], severity: Alert['severity']) => {
    if (severity === 'error') return AlertTriangle;
    if (type === 'anomaly') return AlertTriangle;
    if (type === 'optimization') return CheckCircle;
    return Info;
  };

  const getAlertColors = (severity: Alert['severity']) => {
    switch (severity) {
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
    }
  };

  const getIconColors = (severity: Alert['severity']) => {
    switch (severity) {
      case 'error': return 'text-red-500';
      case 'warning': return 'text-amber-500';
      case 'info': return 'text-blue-500';
    }
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <div className="space-y-6">
      {/* ✅ HEADER: Stacks vertically on mobile, row on desktop. Font sizes are now responsive. */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Bell className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-emerald-500" />
            Alerts & Notifications
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
            Stay informed about your energy usage and system status
        </p>
    </div>
    
    {unreadCount > 0 && (
        <div className="flex items-center space-x-2 self-start sm:self-center">
            <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                {unreadCount} unread
            </div>
        </div>
    )}
</div>

{/* ✅ FILTER BUTTONS: Scrolls horizontally on mobile instead of wrapping. */}
<div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
    <div className="overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex flex-nowrap gap-2">
            {[
                { key: 'all', label: 'All Alerts' },
                { key: 'unread', label: 'Unread' },
                { key: 'anomaly', label: 'Anomalies' },
                { key: 'budget', label: 'Budget' },
                { key: 'maintenance', label: 'Maintenance' },
                { key: 'optimization', label: 'Optimization' }
            ].map(({ key, label }) => (
                <button
                    key={key}
                    onClick={() => setFilter(key as typeof filter)}
                    // ✅ flex-shrink-0 prevents buttons from squishing
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
                        filter === key
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                    {label}
                    {key === 'unread' && unreadCount > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                            {unreadCount}
                        </span>
                    )}
                </button>
            ))}
        </div>
    </div>
</div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No alerts to show
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filter === 'unread' ? 'All alerts have been read' : 'No alerts match the current filter'}
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const Icon = getAlertIcon(alert.type, alert.severity);
            const alertColors = getAlertColors(alert.severity);
            const iconColors = getIconColors(alert.severity);
            
            return (
              <div
                key={alert.id}
                className={`rounded-xl p-6 border shadow-lg transition-all duration-300 hover:shadow-xl animate-fade-in
                           ${alertColors} ${!alert.isRead ? 'ring-2 ring-emerald-500' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-white dark:bg-gray-800 
                                   flex items-center justify-center ${iconColors}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold">
                        {alert.title}
                        {!alert.isRead && (
                          <span className="ml-2 w-2 h-2 bg-emerald-500 rounded-full inline-block"></span>
                        )}
                      </h3>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {!alert.isRead && (
                          <button
                            onClick={() => markAsRead(alert.id)}
                            className="p-1 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded transition-colors"
                            title="Mark as read"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="p-1 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded transition-colors"
                          title="Dismiss alert"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-3 leading-relaxed">
                      {alert.message}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs opacity-75">
                      <span className="capitalize font-medium">
                        {alert.type} • {alert.severity}
                      </span>
                      <span>
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Alert Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Alert Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-white">Notification Types</h4>
            
            {[
              { key: 'anomaly', label: 'Energy Anomalies', description: 'Unusual consumption patterns' },
              { key: 'budget', label: 'Budget Alerts', description: 'When approaching spending limits' },
              { key: 'maintenance', label: 'Maintenance Reminders', description: 'Device maintenance notifications' },
              { key: 'optimization', label: 'Optimization Tips', description: 'AI-powered suggestions' }
            ].map(({ key, label, description }) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm">{label}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{description}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                                peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer 
                                dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                                after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                                after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            ))}
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-white">Delivery Methods</h4>
            
            {[
              { key: 'email', label: 'Email Notifications' },
              { key: 'push', label: 'Push Notifications' },
              { key: 'sms', label: 'SMS Alerts' }
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="font-medium text-gray-900 dark:text-white text-sm">{label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={key !== 'sms'} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                                peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer 
                                dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                                after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                                after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};