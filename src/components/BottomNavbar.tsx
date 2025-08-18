import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BarChart2, Zap, Leaf, ShoppingBag, 
  Calculator, Bell, Settings, Shield, Menu 
} from 'lucide-react';

// ✅ We now define ALL navigation items here
const allNavItems = [
  { id: 'dashboard', icon: LayoutDashboard, path: '/', label: 'Dashboard' },
  { id: 'analytics', icon: BarChart2, path: '/analytics', label: 'Analytics' },
  { id: 'appliances', icon: Zap, path: '/appliances', label: 'Appliances' },
  { id: 'marketplace', icon: ShoppingBag, path: '/marketplace', label: 'Marketplace' },
  { id: 'sustainability', icon: Leaf, path: '/sustainability', label: 'Sustainability' },
  { id: 'calculator', icon: Calculator, path: '/calculator', label: 'Carbon Calculator' },
  { id: 'alerts', icon: Bell, path: '/alerts', label: 'Alerts' },
  { id: 'settings', icon: Settings, path: '/settings', label: 'Settings' },
  { id: 'admin', icon: Shield, path: '/admin', label: 'Admin' },
];

// ✅ Split items into what's visible on the bar vs. what's in the "More" menu
const mainNavItems = allNavItems.slice(0, 4);
const moreNavItems = allNavItems.slice(4);

export const BottomNavbar: React.FC = () => {
  const location = useLocation();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Check if the active route is inside the "More" menu
  const isMoreMenuActive = moreNavItems.some(item => location.pathname === item.path);

  const handleLinkClick = () => {
    setIsMoreMenuOpen(false); // Close menu on navigation
  };

  return (
    <>
      {/* Overlay for when the "More" menu is open */}
      {isMoreMenuOpen && (
        <div 
          onClick={() => setIsMoreMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}
      
      {/* ✅ The Sliding "More" Menu Panel */}
      <div className={`fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-800 
                       p-4 rounded-t-2xl shadow-lg z-50 transition-transform duration-300 ease-out md:hidden
                       ${isMoreMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">All Tools</h3>
        <div className="grid grid-cols-1 gap-1">
          {moreNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={handleLinkClick}
                className={`flex items-center space-x-4 p-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50 md:hidden">
        <div className="flex justify-around items-center h-full">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center justify-center w-full transition-colors duration-200 h-full ${
                  isActive
                    ? 'text-emerald-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-emerald-500'
                }`}
              >
                <item.icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium capitalize">{item.id}</span>
              </Link>
            );
          })}

          {/* ✅ The "More" Button */}
          <button
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            className={`flex flex-col items-center justify-center w-full transition-colors duration-200 h-full ${
              isMoreMenuActive || isMoreMenuOpen
                ? 'text-emerald-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-emerald-500'
            }`}
          >
            <Menu className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};