import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Zap, 
  Bell, 
  Settings, 
  Shield,
  ShoppingCart,
  TreePine,
  Calculator,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NavigationItem } from '../types';

import { ThemeToggle } from "./ThemeToggle";
 // Import the new component

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navigationItems = [
  { id: 'dashboard' as NavigationItem, icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { id: 'analytics' as NavigationItem, icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { id: 'appliances' as NavigationItem, icon: Zap, label: 'Appliances', path: '/appliances' },
  { id: 'calculator' as NavigationItem, icon: Calculator, label: 'Carbon Calculator', path: '/calculator' },
  { id: 'alerts' as NavigationItem, icon: Bell, label: 'Alerts', path: '/alerts' },
  { id: 'marketplace' as NavigationItem, icon: ShoppingCart, label: 'Marketplace', path: '/marketplace' },
  { id: 'sustainability' as NavigationItem, icon: TreePine, label: 'ESG Reports', path: '/sustainability' },
  { id: 'settings' as NavigationItem, icon: Settings, label: 'Settings', path: '/settings' },
  { id: 'admin' as NavigationItem, icon: Shield, label: 'Admin', path: '/admin' }
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed,
  onToggleCollapse
}) => {
  const location = useLocation();

  return (
    <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
                     transition-all duration-300 flex flex-col
                     ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center h-20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">EcoFlow</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Energy Optimizer</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg
                          transition-all duration-200 group relative
                          ${isCollapsed ? 'justify-center' : ''}
                          ${isActive 
                            ? 'bg-emerald-500 text-white shadow-lg' 
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
              
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-800 dark:bg-gray-700 
                                text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 
                                group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute top-1/2 -left-1 w-2 h-2 bg-gray-800 dark:bg-gray-700 transform -translate-y-1/2 rotate-45" />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer: Theme Toggle & Collapse Button */}
      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
        <div className={`flex items-center ${isCollapsed ? 'flex-col gap-2' : 'space-x-2'}`}>
          <ThemeToggle />
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center p-2 text-sm font-medium rounded-lg
                       text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
                       transition-colors duration-200"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};