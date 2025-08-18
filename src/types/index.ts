export interface EnergyData {
  timestamp: string;
  consumption: number;
  cost: number;
  co2Emissions: number;
  sector: 'residential' | 'commercial' | 'industrial';
  efficiency: number;
  peakDemand?: number;
  renewablePercentage?: number;
}

export interface Appliance {
  id: string;
  name: string;
  room: string;
  powerDraw: number;
  status: 'on' | 'off' | 'standby' | 'maintenance';
  isConnected: boolean;
  dailyUsage: number;
  monthlyCost: number;
  efficiency: 'high' | 'medium' | 'low';
  sector: 'residential' | 'commercial' | 'industrial';
  criticalityLevel?: 'critical' | 'important' | 'optional';
  maintenanceSchedule?: string;
  carbonIntensity: number;
}

export interface Alert {
  id: string;
  type: 'anomaly' | 'budget' | 'maintenance' | 'optimization' | 'grid' | 'sustainability';
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  sector: 'residential' | 'commercial' | 'industrial';
  estimatedSavings?: number;
  actionRequired?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  unlocked: boolean;
  points: number;
  category: 'energy' | 'carbon' | 'cost' | 'efficiency';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'energy' | 'carbon' | 'cost' | 'grid-stability';
  target: number;
  current: number;
  reward: number;
  deadline: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  sector: 'residential' | 'commercial' | 'industrial' | 'all';
  participants: number;
  leaderboard: Array<{name: string; score: number; savings: number}>;
}

export interface PredictionData {
  period: string;
  predicted: number;
  actual?: number;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  sector: 'residential' | 'commercial' | 'industrial';
  factors: string[];
  potentialSavings: number;
}

export interface CarbonFootprint {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  treeEquivalent: number;
  comparedToAverage: number;
  reductionGoal: number;
  progressToGoal: number;
  sector: 'residential' | 'commercial' | 'industrial';
  scope1: number; // Direct emissions
  scope2: number; // Indirect emissions from electricity
  scope3: number; // Other indirect emissions
  carbonCredits: number;
  offsetProjects: string[];
}

export interface SectorMetrics {
  sector: 'residential' | 'commercial' | 'industrial';
  totalConsumption: number;
  totalCost: number;
  totalEmissions: number;
  efficiency: number;
  peakDemand: number;
  loadFactor: number;
  renewablePercentage: number;
  gridStability: number;
  demandResponse: number;
  energyIntensity: number;
  costPerUnit: number;
  maintenanceAlerts: number;
  optimizationOpportunities: number;
  sustainabilityScore: number;
  complianceStatus: 'compliant' | 'warning' | 'non-compliant';
  benchmarkPerformance: number;
  projectedSavings: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface GridData {
  timestamp: string;
  frequency: number;
  voltage: number;
  load: number;
  renewableGeneration: number;
  carbonIntensity: number;
  price: number;
  stability: number;
  demandResponseActive: boolean;
}

export interface ESGMetrics {
  environmental: {
    carbonReduction: number;
    renewableUsage: number;
    wasteReduction: number;
    waterSavings: number;
    biodiversityImpact: number;
  };
  social: {
    communityImpact: number;
    jobsCreated: number;
    healthBenefits: number;
    educationPrograms: number;
    accessibilityScore: number;
  };
  governance: {
    transparencyScore: number;
    complianceRating: number;
    ethicsScore: number;
    stakeholderEngagement: number;
    riskManagement: number;
  };
  overallScore: number;
    electricityUsage: string | number; // kWh per month
    naturalGas: string | number; // therms per month
    transportationMiles: string | number; // miles per month
    wasteGeneration: string | number; // pounds per month
    waterUsage: string | number; // gallons per month
}
export interface MarketData {
  energyPrices: {
    current: number;
    officeSpace: string | number; // square feet
    employeeCount: string | number;
    energyConsumption: string | number; // kWh per month
    businessTravel: string | number; // miles per month
    paperUsage: string | number; // reams per month
    wasteGeneration: string | number; // pounds per month
    serverRooms: string | number;
  };
  renewableCertificates: {
    facilitySize: string | number; // square feet
    productionVolume: string | number; // units per month
    energyConsumption: string | number; // kWh per month
    naturalGasUsage: string | number; // therms per month
    processHeat: string | number; // BTU per month
    wasteGeneration: string | number; // tons per month
    transportationFleet: string | number; // vehicles
  };
}

export interface AIInsight {
  id: string;
  type: 'optimization' | 'prediction' | 'anomaly' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  sector: 'residential' | 'commercial' | 'industrial' | 'all';
  estimatedSavings: number;
  implementationCost: number;
  paybackPeriod: number;
  riskLevel: 'low' | 'medium' | 'high';
  actionItems: string[];
  deadline?: string;
  priority: number;
}

export type NavigationItem = 'dashboard' | 'analytics' | 'appliances' | 'calculator' | 'alerts' | 'settings' | 'admin' | 'marketplace' | 'sustainability';
export type SectorType = 'residential' | 'commercial' | 'industrial';
export type UserRole = 'user' | 'manager' | 'admin' | 'enterprise' | 'grid-operator';