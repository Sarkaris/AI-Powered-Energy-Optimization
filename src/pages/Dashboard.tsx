import React, { useState, useEffect } from 'react';
import { Zap, DollarSign, Leaf, TrendingUp, Activity, Gauge, Brain, Users, Building, Factory } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { EnergyGauge } from '../components/EnergyGauge';
import { Chart } from '../components/Chart';
import { SectorCard } from '../components/SectorCard';
import { AIInsightCard } from '../components/AIInsightCard';
import { GridStatusPanel } from '../components/GridStatusPanel';
import { generateEnergyData, mockSectorMetrics, mockAIInsights, mockGridData, mockCarbonFootprint } from '../services/mockData';
import { EnergyData, SectorType } from '../types';

export const Dashboard: React.FC = () => {
    const [energyData, setEnergyData] = useState<EnergyData[]>([]);
    const [selectedSector, setSelectedSector] = useState<SectorType>('residential');
    const [currentUsage, setCurrentUsage] = useState(2.4);
    const [isLoading, setIsLoading] = useState(true);
    const [savedCalculations, setSavedCalculations] = useState<any[]>([]);

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => {
            setEnergyData(generateEnergyData(selectedSector));
            setIsLoading(false);
        }, 1000);

        // Simulate real-time updates
        const interval = setInterval(() => {
            setCurrentUsage(prev => {
                const variation = (Math.random() - 0.5) * 0.4;
                const baseValue = selectedSector === 'industrial' ? 850 : selectedSector === 'commercial' ? 45 : 2.4;
                return Math.max(baseValue * 0.2, Math.min(baseValue * 1.5, prev + variation));
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [selectedSector]);

    useEffect(() => {
        // Load saved carbon calculations
        const loadSavedCalculations = () => {
            const saved = localStorage.getItem('savedCarbonCalculations');
            if (saved) {
                try {
                    setSavedCalculations(JSON.parse(saved));
                } catch (error) {
                    console.error('Error loading saved calculations:', error);
                }
            }
        };

        loadSavedCalculations();

        // Listen for calculation updates
        const handleCalculationSaved = () => loadSavedCalculations();
        const handleCalculationDeleted = () => loadSavedCalculations();

        window.addEventListener('carbonCalculationSaved', handleCalculationSaved);
        window.addEventListener('carbonCalculationDeleted', handleCalculationDeleted);

        return () => {
            window.removeEventListener('carbonCalculationSaved', handleCalculationSaved);
            window.removeEventListener('carbonCalculationDeleted', handleCalculationDeleted);
        };
    }, []);

    useEffect(() => {
        setEnergyData(generateEnergyData(selectedSector));
    }, [selectedSector]);

    const selectedMetrics = mockSectorMetrics.find(m => m.sector === selectedSector)!;

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

    const handleImplementInsight = (id: string) => {
        console.log(`Implementing AI insight: ${id}`);
        alert('AI insight implementation initiated! This would integrate with your automation systems.');
    };

    const handleCalculateClick = () => {
        const event = new CustomEvent('navigateToCalculator');
        window.dispatchEvent(event);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header - Made Responsive */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                        Multi-Sector Energy Command Center
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-base md:text-lg">
                        AI-powered optimization across all sectors
                    </p>
                </div>
                <div className="flex items-center space-x-4 self-start md:self-center flex-shrink-0">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Live</span>
                    </div>
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-2 rounded-lg font-medium text-sm">
                        {mockSectorMetrics.reduce((sum, m) => sum + m.projectedSavings, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} Potential
                    </div>
                </div>
            </div>

            {/* Sector Selection Cards - Already Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockSectorMetrics.map((metrics) => {
                    const savedCalc = savedCalculations.find(calc => calc.sector === metrics.sector);
                    const updatedMetrics = savedCalc ? {
                        ...metrics,
                        totalConsumption: savedCalc.results.total * 12,
                        totalCost: savedCalc.results.total * 12 * 0.12,
                        totalEmissions: savedCalc.results.total * 12,
                        efficiency: Math.min(95, 60 + (savedCalc.results.total > 0 ? 20 : 0)),
                        sustainabilityScore: Math.min(100, 70 + (savedCalc.results.total > 0 ? 15 : 0))
                    } : metrics;

                    return (
                        <SectorCard
                            key={updatedMetrics.sector}
                            metrics={updatedMetrics}
                            isSelected={selectedSector === metrics.sector}
                            onClick={() => setSelectedSector(metrics.sector)}
                            onCalculateClick={handleCalculateClick}
                        />
                    );
                })}
            </div>

            {/* Selected Sector Deep Dive */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                        {selectedSector === 'residential' && <Users className="w-6 h-6 text-white" />}
                        {selectedSector === 'commercial' && <Building className="w-6 h-6 text-white" />}
                        {selectedSector === 'industrial' && <Factory className="w-6 h-6 text-white" />}
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white capitalize">
                            {selectedSector} Sector Analytics
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                            Real-time monitoring and AI insights
                        </p>
                    </div>
                </div>

                {/* Current Status Gauges - Made Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <EnergyGauge
                        current={currentUsage}
                        max={selectedSector === 'industrial' ? 1200 : selectedSector === 'commercial' ? 80 : 5}
                        title="Current Usage"
                        unit={selectedSector === 'industrial' ? 'MW' : 'kW'}
                        color="emerald"
                    />
                    <EnergyGauge
                        current={energyData.reduce((sum, d) => sum + d.co2Emissions, 0)}
                        max={selectedSector === 'industrial' ? 500000 : selectedSector === 'commercial' ? 25000 : 50}
                        title="Today's CO₂"
                        unit="kg"
                        color="amber"
                    />
                    <EnergyGauge
                        current={selectedMetrics.efficiency}
                        max={100}
                        title="Efficiency Score"
                        unit="%"
                        color="blue"
                    />
                </div>

                {/* Key Metrics - Made Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <MetricCard
                        title="Power Usage"
                        value={formatEnergy(selectedMetrics.totalConsumption)}
                        icon={Zap}
                        trend={{ value: 12, label: 'from yesterday', isPositive: false }}
                        color="emerald"
                    />
                    <MetricCard
                        title="Total Cost"
                        value={formatCurrency(selectedMetrics.totalCost)}
                        icon={DollarSign}
                        trend={{ value: 8, label: 'under budget' }}
                        color="blue"
                    />
                    <MetricCard
                        title="Carbon Intensity"
                        value={selectedMetrics.totalEmissions.toFixed(0)}
                        unit="kg CO₂"
                        icon={Leaf}
                        trend={{ value: 15, label: 'reduction this month' }}
                        color="emerald"
                    />
                    <MetricCard
                        title="Grid Stability"
                        value={selectedMetrics.gridStability.toFixed(1)}
                        unit="%"
                        icon={TrendingUp}
                        trend={{ value: 5, label: 'improved' }}
                        color="purple"
                    />
                </div>

                {/* Charts - Already Responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Chart
                        data={energyData}
                        type="line"
                        metric="consumption"
                        title="24-Hour Energy Consumption"
                        color="#10b981"
                    />
                    <Chart
                        data={energyData}
                        type="bar"
                        metric="cost"
                        title="Hourly Cost Breakdown"
                        color="#3b82f6"
                    />
                </div>
            </div>

            {/* Grid Status and AI Insights - Made Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <GridStatusPanel gridData={mockGridData[0]} />
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                            AI-Powered Insights
                        </h3>
                    </div>
                    
                    <div className="space-y-4">
                        {mockAIInsights.slice(0, 2).map((insight) => (
                            <AIInsightCard
                                key={insight.id}
                                insight={insight}
                                onImplement={handleImplementInsight}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Multi-Sector Performance Summary - Already Responsive */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 
                                rounded-xl p-6 md:p-8 border border-emerald-200 dark:border-emerald-700">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                        Cross-Sector Performance
                    </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Energy Optimization</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Peak Load Reduction</span><span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">23.7%</span></div>
                            <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Demand Response</span><span className="text-sm font-medium text-blue-600 dark:text-blue-400">89.4%</span></div>
                            <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Load Balancing</span><span className="text-sm font-medium text-purple-600 dark:text-purple-400">94.2%</span></div>
                        </div>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Sustainability Impact</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Carbon Reduction</span><span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">31.2%</span></div>
                            <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Renewable Integration</span><span className="text-sm font-medium text-green-600 dark:text-green-400">42.8%</span></div>
                            <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">ESG Score</span><span className="text-sm font-medium text-blue-600 dark:text-blue-400">89.7/100</span></div>
                        </div>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Financial Performance</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Cost Savings</span><span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">$304K</span></div>
                            <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">ROI</span><span className="text-sm font-medium text-blue-600 dark:text-blue-400">247%</span></div>
                            <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Payback Period</span><span className="text-sm font-medium text-purple-600 dark:text-purple-400">1.2 years</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};