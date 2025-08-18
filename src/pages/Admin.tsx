import React, { useState } from 'react';
import { Shield, Users, Building, FileText, BarChart, Download } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';

type AdminTab = 'overview' | 'users' | 'sites' | 'reports';

export const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AdminTab>('overview');

    const tabs = [
        { id: 'overview' as AdminTab, label: 'Overview', icon: BarChart },
        { id: 'users' as AdminTab, label: 'User Management', icon: Users },
        { id: 'sites' as AdminTab, label: 'Site Management', icon: Building },
        { id: 'reports' as AdminTab, label: 'ESG Reports', icon: FileText }
    ];

    const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', lastActive: '2 hours ago', energyUsage: 245.3 },
        { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Manager', lastActive: '1 day ago', energyUsage: 189.7 },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', lastActive: '3 hours ago', energyUsage: 312.1 }
    ];

    const mockSites = [
        { id: 1, name: 'Corporate HQ', location: 'New York', users: 150, consumption: 12400, efficiency: 87 },
        { id: 2, name: 'West Coast Office', location: 'San Francisco', users: 85, consumption: 8200, efficiency: 92 },
        { id: 3, name: 'Manufacturing Plant', location: 'Detroit', users: 220, consumption: 45600, efficiency: 74 }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        {/* Metrics Grid - Already Responsive */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <MetricCard title="Total Users" value="1,247" icon={Users} trend={{ value: 12, label: 'this month' }} color="blue" />
                            <MetricCard title="Active Sites" value="23" icon={Building} trend={{ value: 8, label: 'new this quarter' }} color="emerald" />
                            <MetricCard title="Total Consumption" value="2.4M" unit="kWh" icon={BarChart} trend={{ value: 5, label: 'reduced this month', isPositive: true }} color="purple" />
                            <MetricCard title="Carbon Reduced" value="486" unit="tons" icon={Shield} trend={{ value: 18, label: 'this year' }} color="emerald" />
                        </div>

                        {/* System Health - Already Responsive */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Health</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">API Performance</span>
                                        <span className="text-emerald-600 dark:text-emerald-400">●</span>
                                    </div>
                                    <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">99.8%</div>
                                    <div className="text-xs text-emerald-600 dark:text-emerald-500">Uptime</div>
                                </div>
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Data Processing</span>
                                        <span className="text-blue-600 dark:text-blue-400">●</span>
                                    </div>
                                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">1.2M</div>
                                    <div className="text-xs text-blue-600 dark:text-blue-500">Records/hour</div>
                                </div>
                                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Storage Usage</span>
                                        <span className="text-amber-600 dark:text-amber-400">●</span>
                                    </div>
                                    <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">73%</div>
                                    <div className="text-xs text-amber-600 dark:text-amber-500">Capacity</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'users':
                return (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h3>
                                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium self-start sm:self-center">
                                        Add User
                                    </button>
                                </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[640px]">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Active</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Energy Usage</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {mockUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'Manager' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}`}>{user.role}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.lastActive}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.energyUsage} kWh</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 mr-3">Edit</button>
                                                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Remove</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'sites':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mockSites.map((site) => (
                                <div key={site.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{site.name}</h3>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${site.efficiency >= 85 ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-400' : site.efficiency >= 75 ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400' : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'}`}>
                                            {site.efficiency}% Efficient
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Location</span><span className="text-gray-900 dark:text-white">{site.location}</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Users</span><span className="text-gray-900 dark:text-white">{site.users}</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Consumption</span><span className="text-gray-900 dark:text-white">{site.consumption.toLocaleString()} kWh</span></div>
                                    </div>
                                    <div className="mt-4 flex space-x-2">
                                        <button className="flex-1 px-3 py-2 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/30 transition-colors text-sm">View Details</button>
                                        <button className="flex-1 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors text-sm">Manage</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'reports':
                return (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">ESG Reports</h3>
                                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium self-start sm:self-center">
                                    <FileText className="w-4 h-4" />
                                    <span>Generate Report</span>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { title: 'Carbon Footprint Summary', period: 'Q4 2024', status: 'Ready' },
                                    { title: 'Energy Efficiency Report', period: 'Q4 2024', status: 'Ready' },
                                    { title: 'Sustainability Metrics', period: 'Q4 2024', status: 'Generating' },
                                    { title: 'Compliance Report', period: 'Q3 2024', status: 'Ready' },
                                    { title: 'Cost Savings Analysis', period: 'Q3 2024', status: 'Ready' },
                                    { title: 'Environmental Impact', period: 'Q3 2024', status: 'Ready' }
                                ].map((report, index) => (
                                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">{report.title}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{report.period}</p>
                                        <div className="flex items-center justify-between">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${report.status === 'Ready' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400'}`}>
                                                {report.status}
                                            </span>
                                            {report.status === 'Ready' && (
                                                <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <Shield className="w-8 h-8 mr-3 text-emerald-500 flex-shrink-0" />
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-2 sm:mt-0">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        System management and enterprise controls
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                    <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 -mb-px">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors flex-shrink-0
                                        ${activeTab === tab.id
                                            ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
                
                <div className="p-4 md:p-6">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};