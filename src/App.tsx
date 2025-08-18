import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { MainLayout } from './layouts/MainLayout';

// Import all your pages
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { Appliances } from './pages/Appliances';
import { CarbonCalculatorPage } from './pages/CarbonCalculatorPage';
import { Alerts } from './pages/Alerts';
import { Settings } from './pages/Settings';
import { Admin } from './pages/Admin';
import { Marketplace } from './pages/Marketplace';
import { Sustainability } from './pages/Sustainability';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* All main pages are now children of MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/appliances" element={<Appliances />} />
            <Route path="/calculator" element={<CarbonCalculatorPage />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          
          {/* Redirect any unknown paths to the dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;