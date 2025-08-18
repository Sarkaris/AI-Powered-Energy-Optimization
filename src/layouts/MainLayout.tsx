import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { BottomNavbar } from '../components/BottomNavbar';

export const MainLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex h-screen">
        {/* Sidebar for Desktop (md screens and up) */}
        <div className="hidden md:flex">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Add padding-bottom to prevent content from being hidden by the bottom nav on mobile */}
          <div className="p-6 pb-24 md:pb-6">
            <Outlet /> {/* Your pages will render here */}
          </div>
        </main>

        {/* Bottom Navbar for Mobile (hidden on md screens and up) */}
        <div className="md:hidden">
          <BottomNavbar />
        </div>
      </div>
    </div>
  );
};