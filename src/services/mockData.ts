import { EnergyData, Appliance, Alert, Achievement, Challenge, PredictionData, CarbonFootprint, SectorMetrics, GridData, ESGMetrics, MarketData, AIInsight } from '../types';

export const generateEnergyData = (sector?: 'residential' | 'commercial' | 'industrial'): EnergyData[] => {
  const data: EnergyData[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    
    // Different consumption patterns by sector
    let baseConsumption: number;
    let renewablePercentage: number;
    
    if (sector === 'residential') {
      baseConsumption = 2.5 + Math.sin(i * Math.PI / 12) * 1.5 + Math.random() * 0.5;
      renewablePercentage = 15 + Math.random() * 10;
    } else if (sector === 'commercial') {
      baseConsumption = 45 + Math.sin(i * Math.PI / 8) * 15 + Math.random() * 8;
      renewablePercentage = 25 + Math.random() * 15;
    } else {
      baseConsumption = 850 + Math.sin(i * Math.PI / 6) * 200 + Math.random() * 100;
      renewablePercentage = 35 + Math.random() * 20;
    }
    
    const efficiency = 75 + Math.random() * 20;
    const peakDemand = baseConsumption * (1.2 + Math.random() * 0.3);
    
    data.push({
      timestamp: timestamp.toISOString(),
      consumption: Math.max(0.5, baseConsumption),
      cost: baseConsumption * (sector === 'industrial' ? 0.08 : sector === 'commercial' ? 0.10 : 0.12),
      co2Emissions: baseConsumption * (0.4 - (renewablePercentage / 100) * 0.3),
      sector: sector || 'residential',
      efficiency,
      peakDemand,
      renewablePercentage
    });
  }
  
  return data;
};

export const mockSectorMetrics: SectorMetrics[] = [
  {
    sector: 'residential',
    totalConsumption: 0,
    totalCost: 0,
    totalEmissions: 0,
    efficiency: 0,
    peakDemand: 0,
    loadFactor: 0,
    renewablePercentage: 0,
    gridStability: 0,
    demandResponse: 0,
    energyIntensity: 0,
    costPerUnit: 0,
    maintenanceAlerts: 0,
    optimizationOpportunities: 0,
    sustainabilityScore: 0,
    complianceStatus: 'compliant',
    benchmarkPerformance: 0,
    projectedSavings: 0,
    riskLevel: 'low'
  },
  {
    sector: 'commercial',
    totalConsumption: 0,
    totalCost: 0,
    totalEmissions: 0,
    efficiency: 0,
    peakDemand: 0,
    loadFactor: 0,
    renewablePercentage: 0,
    gridStability: 0,
    demandResponse: 0,
    energyIntensity: 0,
    costPerUnit: 0,
    maintenanceAlerts: 0,
    optimizationOpportunities: 0,
    sustainabilityScore: 0,
    complianceStatus: 'compliant',
    benchmarkPerformance: 0,
    projectedSavings: 0,
    riskLevel: 'medium'
  },
  {
    sector: 'industrial',
    totalConsumption: 0,
    totalCost: 0,
    totalEmissions: 0,
    efficiency: 0,
    peakDemand: 0,
    loadFactor: 0,
    renewablePercentage: 0,
    gridStability: 0,
    demandResponse: 0,
    energyIntensity: 0,
    costPerUnit: 0,
    maintenanceAlerts: 0,
    optimizationOpportunities: 0,
    sustainabilityScore: 0,
    complianceStatus: 'warning',
    benchmarkPerformance: 0,
    projectedSavings: 0,
    riskLevel: 'high'
  }
];

export const mockAppliances: Appliance[] = [
  // Residential
  {
    id: '1',
    name: 'Smart Thermostat',
    room: 'Living Room',
    powerDraw: 2.1,
    status: 'on',
    isConnected: true,
    dailyUsage: 18.5,
    monthlyCost: 45.20,
    efficiency: 'high',
    sector: 'residential',
    carbonIntensity: 0.4
  },
  {
    id: '2',
    name: 'Heat Pump',
    room: 'Basement',
    powerDraw: 3.8,
    status: 'on',
    isConnected: true,
    dailyUsage: 28.7,
    monthlyCost: 89.50,
    efficiency: 'high',
    sector: 'residential',
    carbonIntensity: 0.3
  },
  // Commercial
  {
    id: '3',
    name: 'HVAC System - Zone A',
    room: 'Office Floor 1',
    powerDraw: 45.2,
    status: 'on',
    isConnected: true,
    dailyUsage: 324.8,
    monthlyCost: 1247.30,
    efficiency: 'medium',
    sector: 'commercial',
    criticalityLevel: 'critical',
    maintenanceSchedule: 'Monthly',
    carbonIntensity: 0.35
  },
  {
    id: '4',
    name: 'LED Lighting System',
    room: 'All Floors',
    powerDraw: 12.7,
    status: 'on',
    isConnected: true,
    dailyUsage: 89.4,
    monthlyCost: 342.80,
    efficiency: 'high',
    sector: 'commercial',
    criticalityLevel: 'important',
    carbonIntensity: 0.2
  },
  // Industrial
  {
    id: '5',
    name: 'Manufacturing Line 1',
    room: 'Production Floor A',
    powerDraw: 847.5,
    status: 'on',
    isConnected: true,
    dailyUsage: 6084.2,
    monthlyCost: 18947.60,
    efficiency: 'medium',
    sector: 'industrial',
    criticalityLevel: 'critical',
    maintenanceSchedule: 'Weekly',
    carbonIntensity: 0.45
  },
  {
    id: '6',
    name: 'Compressed Air System',
    room: 'Utility Building',
    powerDraw: 234.8,
    status: 'on',
    isConnected: true,
    dailyUsage: 1687.7,
    monthlyCost: 5247.80,
    efficiency: 'low',
    sector: 'industrial',
    criticalityLevel: 'important',
    maintenanceSchedule: 'Bi-weekly',
    carbonIntensity: 0.5
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'grid',
    severity: 'critical',
    title: 'Grid Instability Detected',
    message: 'Industrial sector causing 15% voltage fluctuation. Immediate load shedding recommended.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isRead: false,
    sector: 'industrial',
    estimatedSavings: 15000,
    actionRequired: true
  },
  {
    id: '2',
    type: 'optimization',
    severity: 'warning',
    title: 'Peak Demand Optimization',
    message: 'Commercial HVAC systems can be optimized during peak hours to save $2,847 this month.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    sector: 'commercial',
    estimatedSavings: 2847,
    actionRequired: false
  },
  {
    id: '3',
    type: 'sustainability',
    severity: 'info',
    title: 'Carbon Credit Opportunity',
    message: 'Residential solar generation surplus can earn 247 carbon credits this quarter.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    sector: 'residential',
    estimatedSavings: 1235,
    actionRequired: false
  },
  {
    id: '4',
    type: 'maintenance',
    severity: 'error',
    title: 'Predictive Maintenance Alert',
    message: 'Manufacturing Line 1 showing 89% probability of failure within 72 hours.',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    sector: 'industrial',
    actionRequired: true
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Grid Stabilizer',
    description: 'Maintain 99%+ grid stability for 30 days',
    icon: 'Zap',
    progress: 87,
    target: 100,
    unlocked: false,
    points: 500,
    category: 'efficiency',
    tier: 'gold'
  },
  {
    id: '2',
    title: 'Carbon Neutral Champion',
    description: 'Achieve net-zero emissions across all sectors',
    icon: 'Leaf',
    progress: 100,
    target: 100,
    unlocked: true,
    points: 1000,
    category: 'carbon',
    tier: 'platinum'
  },
  {
    id: '3',
    title: 'Peak Demand Master',
    description: 'Reduce peak demand by 25% through optimization',
    icon: 'TrendingDown',
    progress: 68,
    target: 100,
    unlocked: false,
    points: 750,
    category: 'efficiency',
    tier: 'gold'
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Multi-Sector Efficiency Challenge',
    description: 'Optimize energy usage across all three sectors simultaneously',
    type: 'energy',
    target: 30,
    current: 18,
    reward: 2500,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    difficulty: 'expert',
    sector: 'all',
    participants: 1247,
    leaderboard: [
      { name: 'EcoTech Industries', score: 28.7, savings: 45000 },
      { name: 'Green Valley Corp', score: 26.3, savings: 38500 },
      { name: 'Sustainable Solutions', score: 24.9, savings: 32100 }
    ]
  },
  {
    id: '2',
    title: 'Grid Stability Heroes',
    description: 'Maintain optimal grid frequency during peak hours',
    type: 'grid-stability',
    target: 100,
    current: 89,
    reward: 5000,
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    difficulty: 'hard',
    sector: 'industrial',
    participants: 89,
    leaderboard: [
      { name: 'PowerMax Manufacturing', score: 97.2, savings: 125000 },
      { name: 'Industrial Dynamics', score: 94.8, savings: 98000 },
      { name: 'Heavy Industries Co', score: 92.1, savings: 87500 }
    ]
  }
];

export const mockPredictions: PredictionData[] = [
  {
    period: 'Next Hour',
    predicted: 1247.8,
    confidence: 96,
    trend: 'stable',
    sector: 'industrial',
    factors: ['Production Schedule', 'Weather', 'Grid Load'],
    potentialSavings: 15000
  },
  {
    period: 'Today',
    predicted: 24.5,
    actual: 23.8,
    confidence: 92,
    trend: 'decreasing',
    sector: 'residential',
    factors: ['Weather Forecast', 'Time of Use', 'Historical Pattern'],
    potentialSavings: 125
  },
  {
    period: 'This Week',
    predicted: 2847.3,
    confidence: 88,
    trend: 'increasing',
    sector: 'commercial',
    factors: ['Business Hours', 'Occupancy', 'HVAC Optimization'],
    potentialSavings: 8500
  },
  {
    period: 'Next Month',
    predicted: 125847.2,
    confidence: 78,
    trend: 'stable',
    sector: 'industrial',
    factors: ['Production Forecast', 'Maintenance Schedule', 'Market Demand'],
    potentialSavings: 125000
  }
];

export const mockCarbonFootprint: CarbonFootprint = {
  daily: 1247.8,
  weekly: 8734.6,
  monthly: 37421.5,
  yearly: 448458,
  treeEquivalent: 18685.8,
  comparedToAverage: -23.7,
  reductionGoal: 35,
  progressToGoal: 67.8,
  sector: 'industrial',
  scope1: 125847.2,
  scope2: 234758.9,
  scope3: 87851.9,
  carbonCredits: 15847,
  offsetProjects: ['Reforestation Brazil', 'Solar Farm India', 'Wind Energy Texas']
};

export const mockGridData: GridData[] = [
  {
    timestamp: new Date().toISOString(),
    frequency: 59.98,
    voltage: 240.2,
    load: 847.5,
    renewableGeneration: 342.8,
    carbonIntensity: 0.35,
    price: 0.089,
    stability: 94.7,
    demandResponseActive: true
  }
];

export const mockESGMetrics: ESGMetrics = {
  environmental: {
    carbonReduction: 23.7,
    renewableUsage: 42.3,
    wasteReduction: 18.9,
    waterSavings: 15.2,
    biodiversityImpact: 8.7
  },
  social: {
    communityImpact: 87.3,
    jobsCreated: 247,
    healthBenefits: 92.1,
    educationPrograms: 15,
    accessibilityScore: 94.8
  },
  governance: {
    transparencyScore: 91.2,
    complianceRating: 96.7,
    ethicsScore: 89.4,
    stakeholderEngagement: 85.9,
    riskManagement: 93.1
  },
  overallScore: 89.7,
  industryRanking: 12,
  improvementAreas: ['Water Conservation', 'Biodiversity Protection', 'Stakeholder Engagement'],
  certifications: ['ISO 14001', 'LEED Platinum', 'B-Corp Certified', 'Carbon Neutral']
};

export const mockMarketData: MarketData = {
  energyPrices: {
    current: 0.089,
    forecast: [0.092, 0.087, 0.094, 0.091, 0.088],
    volatility: 12.7
  },
  carbonPrices: {
    current: 45.80,
    forecast: [47.20, 49.10, 46.80, 48.50, 51.20],
    credits: 15847
  },
  renewableCertificates: {
    price: 23.40,
    availability: 89.7
  },
  demandResponse: {
    events: 247,
    savings: 125847,
    participation: 78.9
  }
};

export const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    type: 'optimization',
    title: 'Multi-Sector Load Balancing Opportunity',
    description: 'AI detected optimal load shifting between industrial and commercial sectors during peak hours.',
    confidence: 94,
    impact: 'high',
    sector: 'all',
    estimatedSavings: 125000,
    implementationCost: 15000,
    paybackPeriod: 1.4,
    riskLevel: 'low',
    actionItems: [
      'Implement automated load shifting protocols',
      'Coordinate with grid operators',
      'Install smart switching systems'
    ],
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 1
  },
  {
    id: '2',
    type: 'prediction',
    title: 'Predictive Maintenance Alert',
    description: 'Machine learning models predict 89% probability of equipment failure in Manufacturing Line 1.',
    confidence: 89,
    impact: 'critical',
    sector: 'industrial',
    estimatedSavings: 450000,
    implementationCost: 25000,
    paybackPeriod: 0.2,
    riskLevel: 'medium',
    actionItems: [
      'Schedule immediate inspection',
      'Order replacement parts',
      'Plan production rescheduling'
    ],
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 1
  },
  {
    id: '3',
    type: 'recommendation',
    title: 'Carbon Credit Monetization Strategy',
    description: 'Surplus renewable generation can be converted to tradeable carbon credits worth $78,500.',
    confidence: 87,
    impact: 'medium',
    sector: 'commercial',
    estimatedSavings: 78500,
    implementationCost: 5000,
    paybackPeriod: 0.8,
    riskLevel: 'low',
    actionItems: [
      'Register for carbon credit program',
      'Verify renewable generation data',
      'Submit credit applications'
    ],
    priority: 2
  }
];