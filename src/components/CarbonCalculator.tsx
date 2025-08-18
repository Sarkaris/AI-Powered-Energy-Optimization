import React, { useState, useEffect } from 'react';
import { Calculator, Save, Trash2, Calendar, Home, Building, Factory } from 'lucide-react';

interface CalculationData {
  id: string;
  sector: 'residential' | 'commercial' | 'industrial';
  name?: string;
  results: {
    total: number;
    breakdown: Record<string, number>;
  };
  inputs: Record<string, number>;
  savedAt: string;
}

interface CarbonCalculatorProps {
  initialSector?: 'residential' | 'commercial' | 'industrial';
}

export const CarbonCalculator: React.FC<CarbonCalculatorProps> = ({ 
  initialSector = 'residential' 
}) => {
  const [currentSector, setCurrentSector] = useState<'residential' | 'commercial' | 'industrial'>(initialSector);
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ total: number; breakdown: Record<string, number> } | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [calculationName, setCalculationName] = useState('');
  const [savedCalculations, setSavedCalculations] = useState<CalculationData[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const sectorConfigs = {
    residential: {
      title: 'Residential Carbon Calculator',
      icon: Home,
      color: 'blue',
      fields: [
        { key: 'electricityUsage', label: 'Electricity Usage', unit: 'kWh/month', factor: 0.233, category: 'Energy' },
        { key: 'naturalGas', label: 'Natural Gas Usage', unit: 'therms/month', factor: 5.3, category: 'Energy' },
        { key: 'transportationMiles', label: 'Transportation Miles', unit: 'miles/month', factor: 0.404, category: 'Transportation' },
        { key: 'wasteGeneration', label: 'Waste Generation', unit: 'lbs/month', factor: 0.57, category: 'Waste' },
        { key: 'waterUsage', label: 'Water Usage', unit: 'gallons/month', factor: 0.002, category: 'Water' },
      ]
    },
    commercial: {
      title: 'Commercial Carbon Calculator',
      icon: Building,
      color: 'emerald',
      fields: [
        { key: 'officeSpace', label: 'Office Space', unit: 'sq ft', factor: 0.05, category: 'Building' },
        { key: 'employeeCount', label: 'Employee Count', unit: 'employees', factor: 2.3, category: 'Operations' },
        { key: 'energyConsumption', label: 'Energy Consumption', unit: 'kWh/month', factor: 0.233, category: 'Energy' },
        { key: 'businessTravel', label: 'Business Travel', unit: 'miles/month', factor: 0.404, category: 'Transportation' },
        { key: 'paperUsage', label: 'Paper Usage', unit: 'reams/month', factor: 4.6, category: 'Materials' },
        { key: 'wasteGeneration', label: 'Waste Generation', unit: 'lbs/month', factor: 0.57, category: 'Waste' },
        { key: 'serverRooms', label: 'Server Rooms', unit: 'count', factor: 150, category: 'IT' },
      ]
    },
    industrial: {
      title: 'Industrial Carbon Calculator',
      icon: Factory,
      color: 'purple',
      fields: [
        { key: 'facilitySize', label: 'Facility Size', unit: 'sq ft', factor: 0.08, category: 'Infrastructure' },
        { key: 'productionVolume', label: 'Production Volume', unit: 'units/month', factor: 0.5, category: 'Production' },
        { key: 'energyConsumption', label: 'Energy Consumption', unit: 'MWh/month', factor: 233, category: 'Energy' },
        { key: 'naturalGasUsage', label: 'Natural Gas Usage', unit: 'therms/month', factor: 5.3, category: 'Energy' },
        { key: 'processHeat', label: 'Process Heat', unit: 'BTU/month', factor: 0.00005, category: 'Process' },
        { key: 'wasteGeneration', label: 'Waste Generation', unit: 'tons/month', factor: 570, category: 'Waste' },
        { key: 'transportationFleet', label: 'Transportation Fleet', unit: 'vehicles', factor: 120, category: 'Transportation' },
      ]
    }
  };

  const currentConfig = sectorConfigs[currentSector];

  useEffect(() => {
    loadSavedCalculations();
    loadSavedInputs();
  }, [currentSector]);

  const loadSavedCalculations = () => {
    const saved = localStorage.getItem('savedCarbonCalculations');
    if (saved) {
      try {
        setSavedCalculations(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved calculations:', error);
        setSavedCalculations([]);
      }
    }
  };

  const loadSavedInputs = () => {
    const saved = localStorage.getItem('savedCarbonCalculations');
    if (saved) {
      try {
        const calculations: CalculationData[] = JSON.parse(saved);
        const sectorCalculation = calculations.find(calc => calc.sector === currentSector);
        if (sectorCalculation) {
          setInputs(sectorCalculation.inputs);
          setResult(sectorCalculation.results);
        } else {
          setInputs({});
          setResult(null);
        }
      } catch (error) {
        console.error('Error loading saved inputs:', error);
        setInputs({});
        setResult(null);
      }
    }
  };

  const handleInputChange = (key: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [key]: numValue }));
  };

  const calculateCarbonFootprint = () => {
    let total = 0;
    const breakdown: Record<string, number> = {};
    
    currentConfig.fields.forEach(field => {
      const value = inputs[field.key] || 0;
      const emissions = value * field.factor;
      total += emissions;
      breakdown[field.key] = Math.round(emissions * 100) / 100;
    });
    
    setResult({
      total: Math.round(total * 100) / 100,
      breakdown
    });
  };

  const saveCalculation = async () => {
    if (result === null) return;
    
    setIsSaving(true);
    
    try {
      const calculation: CalculationData = {
        id: `${currentSector}-${Date.now()}`,
        sector: currentSector,
        name: calculationName.trim() || undefined,
        results: result,
        inputs: { ...inputs },
        savedAt: new Date().toISOString()
      };

      const saved = localStorage.getItem('savedCarbonCalculations');
      let calculations: CalculationData[] = saved ? JSON.parse(saved) : [];
      
      // Remove existing calculation for this sector
      calculations = calculations.filter(calc => calc.sector !== currentSector);
      
      // Add new calculation
      calculations.push(calculation);
      
      localStorage.setItem('savedCarbonCalculations', JSON.stringify(calculations));
      setSavedCalculations(calculations);
      setShowSaveDialog(false);
      setCalculationName('');
      
      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent('carbonCalculationSaved', { 
        detail: { sector: currentSector, calculation } 
      }));
      
      setTimeout(() => setIsSaving(false), 500);
    } catch (error) {
      console.error('Error saving calculation:', error);
      setIsSaving(false);
    }
  };

  const deleteCalculation = (id: string) => {
    const updated = savedCalculations.filter(calc => calc.id !== id);
    localStorage.setItem('savedCarbonCalculations', JSON.stringify(updated));
    setSavedCalculations(updated);
    
    // If we deleted the current sector's calculation, clear the inputs
    const deletedCalc = savedCalculations.find(calc => calc.id === id);
    if (deletedCalc?.sector === currentSector) {
      setInputs({});
      setResult(null);
    }

    // Trigger event to update dashboard
    window.dispatchEvent(new CustomEvent('carbonCalculationDeleted', { 
      detail: { sector: deletedCalc?.sector } 
    }));
  };

  const getSavedCalculation = (sector: 'residential' | 'commercial' | 'industrial') => {
    return savedCalculations.find(calc => calc.sector === sector);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(1);
  };

  const getSectorColor = (sector: string) => {
    switch (sector) {
      case 'residential': return 'blue';
      case 'commercial': return 'emerald';
      case 'industrial': return 'purple';
      default: return 'gray';
    }
  };

  const getSectorColorClasses = (color: string, selected: boolean = false) => {
    const colors = {
      blue: selected 
        ? 'bg-blue-600 text-white' 
        : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30',
      emerald: selected 
        ? 'bg-emerald-600 text-white' 
        : 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/30',
      purple: selected 
        ? 'bg-purple-600 text-white' 
        : 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/30',
      gray: selected 
        ? 'bg-gray-600 text-white' 
        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6">
    {/* ✅ HEADER: Stacks vertically on mobile, row on desktop. Font sizes are now responsive. */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-4 sm:mb-6">
        <Calculator className="w-8 h-8 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
        <div className="mt-2 sm:mt-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Carbon Footprint Calculator</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
                Calculate your carbon emissions across different sectors
            </p>
        </div>
    </div>
    
    {/* ✅ SECTOR SELECTION: Scrolls horizontally on mobile instead of wrapping. */}
    <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6">
        <div className="flex flex-nowrap gap-3">
            {Object.entries(sectorConfigs).map(([key, config]) => {
                const IconComponent = config.icon;
                const color = getSectorColor(key); // Assuming getSectorColor is defined elsewhere
                const isSelected = currentSector === key; // Assuming currentSector is defined elsewhere
                
                return (
                    <button
                        key={key}
                        onClick={() => setCurrentSector(key as typeof currentSector)}
                        // ✅ Added flex-shrink-0 to prevent buttons from squishing
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 flex-shrink-0 ${getSectorColorClasses(color, isSelected)}`}
                    >
                        <IconComponent className="w-5 h-5" />
                        <span className="capitalize">{key}</span>
                    </button>
                );
            })}
        </div>
    </div>
</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator Form */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <currentConfig.icon className={`w-6 h-6 text-${currentConfig.color}-600 dark:text-${currentConfig.color}-400`} />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentConfig.title}
            </h2>
          </div>
          
          <div className="space-y-6">
            {/* Group fields by category */}
            {Object.entries(
              currentConfig.fields.reduce((acc, field) => {
                if (!acc[field.category]) acc[field.category] = [];
                acc[field.category].push(field);
                return acc;
              }, {} as Record<string, typeof currentConfig.fields>)
            ).map(([category, fields]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fields.map(field => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={inputs[field.key] || ''}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                   focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                                   transition-colors"
                          placeholder="0"
                          min="0"
                          step="0.1"
                        />
                        <span className="absolute right-3 top-2 text-sm text-gray-500 dark:text-gray-400">
                          {field.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <button
              onClick={calculateCarbonFootprint}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg 
                       transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
            >
              Calculate Carbon Footprint
            </button>
          </div>

          {/* Results */}
          {result !== null && (
            <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-400 mb-4">
                Your Carbon Footprint
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {formatNumber(result.total)} kg CO₂
                  </p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                    per month
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {formatNumber(result.total * 12)} kg CO₂
                  </p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                    per year
                  </p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-emerald-800 dark:text-emerald-400 mb-3">
                  Emissions Breakdown
                </h4>
                <div className="space-y-2">
                  {Object.entries(result.breakdown)
                    .filter(([_, value]) => value > 0)
                    .sort(([_, a], [__, b]) => b - a)
                    .map(([key, value]) => {
                      const field = currentConfig.fields.find(f => f.key === key);
                      const percentage = (value / result.total) * 100;
                      return (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm text-emerald-700 dark:text-emerald-300">
                            {field?.label}
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-emerald-200 dark:bg-emerald-800 rounded-full h-2">
                              <div 
                                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 w-16 text-right">
                              {formatNumber(value)} kg
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              
              <button
                onClick={() => setShowSaveDialog(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg 
                         transition-colors font-medium flex items-center justify-center gap-2 shadow-lg"
              >
                <Save className="w-5 h-5" />
                Save Calculation
              </button>
            </div>
          )}
        </div>

        {/* Saved Calculations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Saved Calculations</h3>
          
          {savedCalculations.length === 0 ? (
            <div className="text-center py-8">
              <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">No saved calculations yet.</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                Complete a calculation and save it to see it here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.keys(sectorConfigs).map(sector => {
                const calculation = getSavedCalculation(sector as typeof currentSector);
                const config = sectorConfigs[sector as keyof typeof sectorConfigs];
                const IconComponent = config.icon;
                const color = getSectorColor(sector);
                
                return (
                  <div
                    key={sector}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      calculation 
                        ? `border-${color}-200 dark:border-${color}-800 bg-${color}-50 dark:bg-${color}-900/20` 
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className={`w-5 h-5 ${
                            calculation 
                              ? `text-${color}-600 dark:text-${color}-400` 
                              : 'text-gray-500 dark:text-gray-400'
                          }`} />
                          <p className="font-medium text-gray-900 dark:text-white capitalize">
                            {sector}
                          </p>
                        </div>
                        
                        {calculation ? (
                          <>
                            <p className={`text-lg font-bold text-${color}-600 dark:text-${color}-400`}>
                              {formatNumber(calculation.results.total)} kg CO₂/month
                            </p>
                            {calculation.name && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {calculation.name}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1 mt-2">
                              <Calendar className="w-3 h-3" />
                              {new Date(calculation.savedAt).toLocaleDateString()}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            No calculation saved
                          </p>
                        )}
                      </div>
                      
                      {calculation && (
                        <button
                          onClick={() => deleteCalculation(calculation.id)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete calculation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Save Calculation
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Calculation Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={calculationName}
                    onChange={(e) => setCalculationName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder={`e.g., ${currentSector} facility Q4 2024`}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSaveDialog(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveCalculation}
                    disabled={isSaving}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};