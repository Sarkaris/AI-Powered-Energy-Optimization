import React from 'react';
import { Award, CheckCircle, TrendingUp, Zap, Leaf, Users, Shield } from 'lucide-react';
import { ESGReportData } from '../../services/reportingService';

interface ReportTemplateProps {
    reportData: ESGReportData;
    reportRef: React.RefObject<HTMLDivElement>;
}

const MetricItem = ({ label, value, unit = '' }: { label: string; value: number | string; unit?: string }) => (
    <div className="flex justify-between items-baseline py-2 border-b border-slate-100">
        <p className="text-slate-600">{label}</p>
        <p className="font-bold text-slate-800">{value} <span className="text-sm font-normal text-slate-500">{unit}</span></p>
    </div>
);

const ScoreCircle = ({ score, color }: { score: number; color: string }) => (
    <div className="w-28 h-28 mx-auto relative">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-200" />
            <circle
                cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="12" fill="transparent"
                strokeDasharray={2 * Math.PI * 54}
                strokeDashoffset={2 * Math.PI * 54 * (1 - score / 100)}
                strokeLinecap="round"
                className={color} // e.g., "text-emerald-500"
            />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-slate-800">{score.toFixed(1)}</span>
        </div>
    </div>
);

export const SustainabilityReportTemplate: React.FC<ReportTemplateProps> = ({ reportData, reportRef }) => {
    const { environmental, social, governance } = reportData;
    const eScore = (environmental.carbonReduction + environmental.renewableUsage + environmental.wasteReduction) / 3;
    const sScore = (social.communityImpact + social.healthBenefits + social.educationPrograms) / 3;
    const gScore = (governance.transparencyScore + governance.complianceRating + governance.ethicsScore) / 3;

    return (
        <div style={{ position: 'absolute', left: '-9999px', top: 0, fontFamily: 'sans-serif' }}>
            <div 
                ref={reportRef} 
                className="w-[210mm] min-h-[297mm] p-12 bg-slate-50 text-slate-900 flex flex-col"
            >
                <header className="flex items-center justify-between pb-6 border-b-2 border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-emerald-600 text-white flex items-center justify-center rounded-xl">
                            <Zap className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-slate-800">EcoFlow</h1>
                            <p className="text-slate-500 text-lg">ESG & Sustainability Report</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-slate-500">{reportData.companyName}</p>
                        <p className="text-base font-medium text-slate-700">{reportData.reportPeriod}</p>
                    </div>
                </header>

                <main className="flex-grow py-8">
                    <div className="grid grid-cols-2 gap-8 mb-12 text-center">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Overall ESG Score</h3>
                            <p className="text-6xl font-bold text-emerald-600 mt-2">{reportData.overallScore}<span className="text-3xl text-slate-400">/100</span></p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Industry Ranking</h3>
                            <p className="text-6xl font-bold text-emerald-600 mt-2">#{reportData.industryRanking}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 mb-12">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-4"><Leaf className="w-6 h-6 text-emerald-500" /><h3 className="text-xl font-bold text-slate-800">Environmental</h3></div>
                            <ScoreCircle score={eScore} color="text-emerald-500" />
                            <div className="mt-6 space-y-1"><MetricItem label="Carbon Reduction" value={environmental.carbonReduction} unit="%" /><MetricItem label="Renewable Usage" value={environmental.renewableUsage} unit="%" /><MetricItem label="Waste Reduction" value={environmental.wasteReduction} unit="%" /></div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-4"><Users className="w-6 h-6 text-blue-500" /><h3 className="text-xl font-bold text-slate-800">Social</h3></div>
                            <ScoreCircle score={sScore} color="text-blue-500" />
                            <div className="mt-6 space-y-1"><MetricItem label="Community Impact" value={social.communityImpact} unit="%" /><MetricItem label="Health Benefits" value={social.healthBenefits} unit="%" /><MetricItem label="Jobs Created" value={social.jobsCreated} /></div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-4"><Shield className="w-6 h-6 text-purple-500" /><h3 className="text-xl font-bold text-slate-800">Governance</h3></div>
                            <ScoreCircle score={gScore} color="text-purple-500" />
                            <div className="mt-6 space-y-1"><MetricItem label="Transparency" value={governance.transparencyScore} unit="%" /><MetricItem label="Compliance Rating" value={governance.complianceRating} unit="%" /><MetricItem label="Ethics Score" value={governance.ethicsScore} unit="%" /></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><Award className="w-6 h-6 text-amber-500" />Certifications</h3>
                            <div className="space-y-3">
                                {reportData.certifications.map((cert, index) => (
                                    <div key={index} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-base font-medium text-slate-700 shadow-sm">{cert}</div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><TrendingUp className="w-6 h-6 text-emerald-500" />Improvement Areas</h3>
                            <div className="space-y-3">
                                {reportData.improvementAreas.map((area, index) => (
                                    <div key={index} className="flex items-start p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
                                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mr-3 mt-0.5" />
                                        <p className="text-slate-700">{area}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="text-center text-xs text-slate-500 pt-6 border-t border-slate-200 mt-auto">
                    Confidential Report Generated by EcoFlow | {new Date(reportData.generatedAt).toLocaleString()}
                </footer>
            </div>
        </div>
    );
};