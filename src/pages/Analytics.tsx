import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Download, TrendingUp, BarChart3, PieChart, ChevronDown, Save } from 'lucide-react';
import { Chart } from '../components/Chart';
import { MetricCard } from '../components/MetricCard';
import { generateEnergyData, mockPredictions } from '../services/mockData';
import { reportingService, ReportData } from '../services/reportingService';

// ✅ 1. Import the new report template and PDF libraries
import { AnalyticsReportTemplate } from '../components/reports/AnalyticsReportTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type TimeFrame = 'day' | 'week' | 'month' | 'year';
type ChartType = 'line' | 'bar';

export const Analytics: React.FC = () => {
    const [timeFrame, setTimeFrame] = useState<TimeFrame>('day');
    const [chartType, setChartType] = useState<ChartType>('line');
    const [selectedMetric, setSelectedMetric] = useState<'consumption' | 'cost' | 'co2Emissions'>('consumption');
    const [isExporting, setIsExporting] = useState<string | null>(null);
    const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
    
    const exportMenuRef = useRef<HTMLDivElement>(null);
    const energyData = generateEnergyData();
    
    // ✅ 2. Create a ref to attach to the report template component
    const reportTemplateRef = useRef<HTMLDivElement>(null);

    // Close export dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
                setIsExportMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleExport = async (format: 'pdf' | 'excel' | 'csv' | 'save') => {
        setIsExporting(format);
        setIsExportMenuOpen(false);
        
        // Let the UI update to show the loading spinner before the heavy work
        await new Promise(resolve => setTimeout(resolve, 100));

        try {
            const reportData: ReportData = {
                title: 'Advanced Analytics Report',
                generatedAt: new Date().toISOString(),
                metrics: [
                    { label: 'Total Consumption', value: energyData.reduce((sum, d) => sum + d.consumption, 0).toFixed(1), unit: 'kWh', trend: 5.2 },
                    { label: 'Total Cost', value: `$${energyData.reduce((sum, d) => sum + d.cost, 0).toFixed(2)}`, unit: '', trend: -3.1 },
                    { label: 'CO₂ Emissions', value: energyData.reduce((sum, d) => sum + d.co2Emissions, 0).toFixed(1), unit: 'kg', trend: -8.7 }
                ],
                recommendations: [
                    'Optimize energy usage during peak hours (2-6 PM) to reduce costs by 15%.',
                    'Consider installing smart thermostats to improve efficiency by 12%.',
                    'Implement demand response programs to earn $200+ monthly credits.',
                ]
            };
            
            // ✅ 3. Handle the new PDF export logic
            if (format === 'pdf') {
                const reportElement = reportTemplateRef.current;
                if (reportElement) {
                    const canvas = await html2canvas(reportElement, { scale: 2 }); // scale: 2 for higher resolution
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4', true); // 'true' for compression
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save(`EcoFlow_Analytics_Report_${new Date().toISOString().split('T')[0]}.pdf`);
                }
            } else {
                // Handle other formats (unchanged)
                switch (format) {
                    case 'excel': await reportingService.exportToExcel(reportData); break;
                    case 'csv': await reportingService.exportToCSV(reportData); break;
                    case 'save': await reportingService.saveReport(reportData); break;
                }
            }
        } catch (error) {
            console.error(`Action failed:`, error);
        } finally {
            setIsExporting(null);
        }
    };

    // Prepare data for the report template
    const reportDataForTemplate: ReportData = {
        title: 'Advanced Analytics Report',
        generatedAt: new Date().toISOString(),
        metrics: [
            { label: 'Total Consumption', value: energyData.reduce((sum, d) => sum + d.consumption, 0).toFixed(1), unit: 'kWh' },
            { label: 'Total Cost', value: `$${energyData.reduce((sum, d) => sum + d.cost, 0).toFixed(2)}`, unit: '' },
            { label: 'CO₂ Emissions', value: energyData.reduce((sum, d) => sum + d.co2Emissions, 0).toFixed(1), unit: 'kg' },
        ],
        recommendations: [
            'Optimize energy usage during peak hours (2-6 PM) to reduce costs by 15%.',
            'Consider installing smart thermostats to improve efficiency by 12%.',
            'Implement demand response programs to earn $200+ monthly credits.',
        ],
    };

    return (
        <>
            {/* ✅ 4. Render the report template off-screen so we can capture it */}
            <AnalyticsReportTemplate 
                reportRef={reportTemplateRef}
                reportData={reportDataForTemplate}
                energyData={energyData}
            />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Advanced Analytics</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Deep insights and predictive analysis</p>
                    </div>
                    
                    <div className="relative" ref={exportMenuRef}>
                        <button onClick={() => setIsExportMenuOpen(!isExportMenuOpen)} className="flex items-center justify-center w-full md:w-auto space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50">
                            <Download className="w-4 h-4" />
                            <span>Export / Save</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExportMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isExportMenuOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 z-10">
                                <button onClick={() => handleExport('save')} disabled={!!isExporting} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg">
                                    {isExporting === 'save' ? <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"/> : <Save className="w-4 h-4" />}
                                    <span>{isExporting === 'save' ? 'Saving...' : 'Save Report'}</span>
                                </button>
                                <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"/>
                                <button onClick={() => handleExport('pdf')} disabled={!!isExporting} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    {isExporting === 'pdf' ? <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"/> : <Download className="w-4 h-4" />}
                                    <span>{isExporting === 'pdf' ? 'Exporting...' : 'Export as PDF'}</span>
                                </button>
                                <button onClick={() => handleExport('excel')} disabled={!!isExporting} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    {isExporting === 'excel' ? <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"/> : <Download className="w-4 h-4" />}
                                    <span>{isExporting === 'excel' ? 'Exporting...' : 'Export as Excel'}</span>
                                </button>
                                <button onClick={() => handleExport('csv')} disabled={!!isExporting} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg">
                                    {isExporting === 'csv' ? <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"/> : <Download className="w-4 h-4" />}
                                    <span>{isExporting === 'csv' ? 'Exporting...' : 'Export as CSV'}</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Frame</label>
                            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                {(['day', 'week', 'month', 'year'] as TimeFrame[]).map((frame) => (
                                    <button key={frame} onClick={() => setTimeFrame(frame)} className={`flex-1 px-3 py-1 text-sm font-medium rounded-md transition-colors ${timeFrame === frame ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                                        {frame.charAt(0).toUpperCase() + frame.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chart Type</label>
                            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                <button onClick={() => setChartType('line')} className={`flex-1 flex items-center justify-center px-3 py-1 text-sm font-medium rounded-md transition-colors ${chartType === 'line' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                                    <TrendingUp className="w-4 h-4 mr-1" />Line
                                </button>
                                <button onClick={() => setChartType('bar')} className={`flex-1 flex items-center justify-center px-3 py-1 text-sm font-medium rounded-md transition-colors ${chartType === 'bar' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                                    <BarChart3 className="w-4 h-4 mr-1" />Bar
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Metric</label>
                            <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value as typeof selectedMetric)} className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                                <option value="consumption">Energy Consumption</option>
                                <option value="cost">Cost</option>
                                <option value="co2Emissions">CO₂ Emissions</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Main Chart & Predictions Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Chart data={energyData} type={chartType} metric={selectedMetric} title={`${selectedMetric === 'consumption' ? 'Energy Consumption' : selectedMetric === 'cost' ? 'Cost Analysis' : 'CO₂ Emissions'} - ${timeFrame}`} color={selectedMetric === 'consumption' ? '#10b981' : selectedMetric === 'cost' ? '#3b82f6' : '#f59e0b'} height={320} />
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                <TrendingUp className="w-5 h-5 mr-2 text-emerald-500" />AI Predictions
                            </h3>
                            <div className="space-y-3">
                                {mockPredictions.map((prediction, index) => (
                                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">{prediction.period}</span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${prediction.trend === 'increasing' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' : prediction.trend === 'decreasing' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`}>
                                                {prediction.trend}
                                            </span>
                                        </div>
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">{prediction.predicted.toFixed(1)} kWh</div>
                                        {prediction.actual && (<div className="text-xs text-gray-500 dark:text-gray-400">Actual: {prediction.actual.toFixed(1)} kWh</div>)}
                                        <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{prediction.confidence}% confidence</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Period Summary</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Total Consumption</span><span className="text-sm font-medium text-gray-900 dark:text-white">{energyData.reduce((sum, d) => sum + d.consumption, 0).toFixed(1)} kWh</span></div>
                                <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Average per Hour</span><span className="text-sm font-medium text-gray-900 dark:text-white">{(energyData.reduce((sum, d) => sum + d.consumption, 0) / energyData.length).toFixed(2)} kWh</span></div>
                                <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Peak Usage</span><span className="text-sm font-medium text-gray-900 dark:text-white">{Math.max(...energyData.map(d => d.consumption)).toFixed(1)} kWh</span></div>
                                <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Total Cost</span><span className="text-sm font-medium text-gray-900 dark:text-white">${energyData.reduce((sum, d) => sum + d.cost, 0).toFixed(2)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};