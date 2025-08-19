import React from 'react';
import { Zap, DollarSign, Leaf, TrendingUp, CheckCircle } from 'lucide-react';
import { ReportData } from '../../services/reportingService';
import { Chart } from '../Chart';

interface ReportTemplateProps {
    reportData: ReportData;
    energyData: any[];
    reportRef: React.RefObject<HTMLDivElement>;
}

// A small helper component for the metric cards inside the report
const ReportMetric = ({ icon: Icon, label, value, unit, color }: any) => (
    <div className={`p-4 rounded-lg border bg-white shadow-sm`}>
        <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${color}-100 text-${color}-600 flex-shrink-0`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-sm text-gray-600">{label}</p>
                <p className={`text-2xl font-bold text-gray-800`}>{value} <span className="text-base font-medium text-gray-500">{unit}</span></p>
            </div>
        </div>
    </div>
);


export const AnalyticsReportTemplate: React.FC<ReportTemplateProps> = ({ reportData, energyData, reportRef }) => {
    const totalConsumption = reportData.metrics.find(m => m.label === 'Total Consumption');
    const totalCost = reportData.metrics.find(m => m.label === 'Total Cost');
    const co2Emissions = reportData.metrics.find(m => m.label === 'CO₂ Emissions');

    return (
        // This component is rendered off-screen to be captured for the PDF
        <div style={{ position: 'absolute', left: '-9999px', top: 0, fontFamily: 'sans-serif' }}>
            <div 
                ref={reportRef} 
                className="w-[210mm] min-h-[297mm] p-10 bg-gray-50 text-gray-900 flex flex-col"
            >
                {/* Report Header */}
                <header className="flex items-center justify-between pb-6 border-b-2 border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-600 text-white flex items-center justify-center rounded-lg">
                            <Zap className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800">EcoFlow</h1>
                            <p className="text-gray-500 text-lg">{reportData.title}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Report Generated On:</p>
                        <p className="text-base font-medium text-gray-700">{new Date(reportData.generatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-grow py-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Executive Summary</h2>
                    
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-6 mb-10">
                        <ReportMetric icon={Zap} label="Total Consumption" value={totalConsumption?.value} unit={totalConsumption?.unit} color="emerald" />
                        <ReportMetric icon={DollarSign} label="Total Cost" value={totalCost?.value} unit={totalCost?.unit} color="blue" />
                        <ReportMetric icon={Leaf} label="CO₂ Emissions" value={co2Emissions?.value} unit={co2Emissions?.unit} color="amber" />
                    </div>

                    {/* Chart */}
                    <div className="mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">24-Hour Energy Consumption (kWh)</h3>
                        <div style={{height: '280px'}}>
                            <Chart data={energyData} type="line" metric="consumption" title="" color="#10b981" />
                        </div>
                    </div>
                    
                    {/* Recommendations */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-emerald-500" />
                            AI-Powered Recommendations
                        </h3>
                        <div className="space-y-4">
                            {reportData.recommendations?.map((rec, index) => (
                                <div key={index} className="flex items-start p-4 bg-white border-l-4 border-emerald-500 rounded-r-lg shadow-sm">
                                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mr-4 mt-1" />
                                    <p className="text-gray-700">{rec}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="text-center text-xs text-gray-500 pt-6 border-t border-gray-200 mt-auto">
                    EcoFlow Energy Solutions | Confidential Report | Page 1 of 1
                </footer>
            </div>
        </div>
    );
};