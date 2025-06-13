import React, { useState, useEffect } from 'react';
import { Target, TrendingDown, Zap, CheckCircle, ArrowRight, Lightbulb, Factory, BarChart3, DollarSign } from 'lucide-react';

interface ReductionLever {
  id: string;
  title: string;
  description: string;
  impact: number;
  cost: 'Low' | 'Medium' | 'High';
  timeframe: string;
  savings: number;
  checked: boolean;
  walmartApproved: boolean;
}

export default function SupplierSnapshot() {
  const [currentEmissions, setCurrentEmissions] = useState(0);
  const [targetEmissions] = useState(30000);
  const [reductionLevers, setReductionLevers] = useState<ReductionLever[]>([
    {
      id: '1',
      title: 'Switch to Nebraska Wind Power',
      description: 'Transition 60% of energy consumption to Walmart-approved renewable wind sources',
      impact: 12,
      cost: 'Medium',
      timeframe: '6 months',
      savings: 480000,
      checked: false,
      walmartApproved: true
    },
    {
      id: '2',
      title: 'Optimize Cold Chain Logistics',
      description: 'Implement Walmart-certified AI route optimization and temperature management',
      impact: 8,
      cost: 'High',
      timeframe: '12 months',
      savings: 320000,
      checked: false,
      walmartApproved: true
    },
    {
      id: '3',
      title: 'Sustainable Packaging Materials',
      description: 'Replace plastic with Walmart-approved biodegradable alternatives',
      impact: 5,
      cost: 'Low',
      timeframe: '3 months',
      savings: 200000,
      checked: false,
      walmartApproved: true
    },
    {
      id: '4',
      title: 'Supplier Network Optimization',
      description: 'Source from Walmart-preferred local suppliers to reduce transportation',
      impact: 7,
      cost: 'Medium',
      timeframe: '9 months',
      savings: 280000,
      checked: false,
      walmartApproved: true
    }
  ]);

  const [totalSavings, setTotalSavings] = useState(0);
  const [totalReduction, setTotalReduction] = useState(0);
  const [complianceScore, setComplianceScore] = useState(0);

  useEffect(() => {
    // Animate current emissions counter
    let current = 0;
    const target = 50000;
    const increment = target / 50;
    
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setCurrentEmissions(Math.round(current));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkedLevers = reductionLevers.filter(lever => lever.checked);
    const newTotalSavings = checkedLevers.reduce((sum, lever) => sum + lever.savings, 0);
    const newTotalReduction = checkedLevers.reduce((sum, lever) => sum + lever.impact, 0);
    
    setTotalSavings(newTotalSavings);
    setTotalReduction(newTotalReduction);
    
    // Calculate Walmart compliance score
    const projectedEmissions = currentEmissions - (currentEmissions * newTotalReduction / 100);
    const score = Math.max(0, Math.min(100, Math.round(((targetEmissions - (projectedEmissions - targetEmissions)) / targetEmissions) * 100)));
    setComplianceScore(score);
  }, [reductionLevers, currentEmissions, targetEmissions]);

  const toggleLever = (id: string) => {
    setReductionLevers(prev => 
      prev.map(lever => 
        lever.id === id ? { ...lever, checked: !lever.checked } : lever
      )
    );
  };

  const progressPercentage = ((currentEmissions - (currentEmissions * totalReduction / 100)) / targetEmissions) * 100;
  const isOnTarget = progressPercentage <= 100;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Walmart Supplier Header */}
      <div className="bg-gradient-to-r from-[#0071ce] to-[#367c2b] rounded-2xl p-8 mb-8 text-white">
        <div className="flex items-center space-x-4 mb-6">
          <Factory className="h-12 w-12 text-[#ffc220]" />
          <div>
            <h1 className="text-3xl font-bold">Walmart Supplier Dashboard</h1>
            <p className="text-blue-100">Project Gigaton PPA • Scope 3 Emissions Tracker</p>
          </div>
          <div className="ml-auto text-right">
            <div className="text-sm text-blue-200">Compliance Score</div>
            <div className={`text-4xl font-bold ${complianceScore >= 80 ? 'text-[#ffc220]' : complianceScore >= 60 ? 'text-yellow-300' : 'text-red-300'}`}>
              {complianceScore}
            </div>
          </div>
        </div>
        
        {/* Walmart Requirements Banner */}
        <div className="bg-white bg-opacity-20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#ffc220]">Walmart 2025 Requirements</h3>
              <p className="text-blue-100 text-sm">All suppliers must meet Gigaton PPA targets</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{targetEmissions.toLocaleString()}</div>
              <div className="text-sm text-blue-200">Max CO₂ tons/year</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Emissions Overview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="h-8 w-8 text-[#0071ce]" />
              <h2 className="text-2xl font-bold text-gray-900">Emissions Status</h2>
            </div>

            {/* Current vs Target */}
            <div className="space-y-4">
              <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border-2 border-red-200">
                <div className="text-3xl font-bold text-red-600 animate-counter">
                  {currentEmissions.toLocaleString()}
                </div>
                <div className="text-sm text-red-700 font-medium">Current Annual CO₂ (tons)</div>
                <div className="text-xs text-red-600 mt-1">
                  {((currentEmissions / targetEmissions - 1) * 100).toFixed(0)}% over Walmart limit
                </div>
              </div>

              {/* Walmart Compliance Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-600">Walmart Compliance</span>
                  <span className={`${isOnTarget ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all duration-1000 ease-out animate-chart-grow ${
                      isOnTarget ? 'bg-gradient-to-r from-green-500 to-[#367c2b]' : 'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500">
                  {isOnTarget ? '✅ Meeting Walmart standards' : '⚠️ Action required for compliance'}
                </div>
              </div>

              {/* Walmart Target */}
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-[#0071ce] border-opacity-30">
                <div className="text-3xl font-bold text-[#0071ce]">
                  {targetEmissions.toLocaleString()}
                </div>
                <div className="text-sm text-blue-700 font-medium">Walmart Maximum (tons)</div>
                <div className="text-xs text-blue-600 mt-1">Gigaton PPA Requirement</div>
              </div>

              {/* Projected with Actions */}
              {totalReduction > 0 && (
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-[#367c2b] border-opacity-30">
                  <div className="text-2xl font-bold text-[#367c2b]">
                    {(currentEmissions - (currentEmissions * totalReduction / 100)).toLocaleString()}
                  </div>
                  <div className="text-sm text-green-700 font-medium">Projected with Actions</div>
                  <div className="text-xs text-green-600 mt-1">
                    -{totalReduction}% reduction • Score: {complianceScore}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Financial Impact */}
          <div className="bg-gradient-to-br from-[#367c2b] to-green-600 rounded-2xl p-6 text-white shadow-lg hover-lift">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-[#ffc220]" />
              <span>Financial Impact</span>
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-3xl font-bold text-[#ffc220] animate-counter">
                  ${totalSavings.toLocaleString()}
                </div>
                <div className="text-green-100 text-sm">Annual Cost Savings</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white">
                  ${Math.round(totalSavings * 0.15).toLocaleString()}
                </div>
                <div className="text-green-200 text-xs">Walmart Supplier Bonus Eligible</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Walmart-Approved Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <Lightbulb className="h-8 w-8 text-[#ffc220]" />
              <h2 className="text-2xl font-bold text-gray-900">Walmart-Approved Reduction Levers</h2>
              <div className="ml-auto bg-[#0071ce] bg-opacity-10 text-[#0071ce] px-3 py-1 rounded-full text-sm font-semibold">
                Gigaton Certified
              </div>
            </div>

            <div className="space-y-4">
              {reductionLevers.map((lever) => (
                <div 
                  key={lever.id}
                  className={`border-2 rounded-xl p-4 transition-all duration-300 cursor-pointer hover-lift ${
                    lever.checked 
                      ? 'border-[#367c2b] bg-green-50' 
                      : 'border-gray-200 hover:border-[#0071ce] hover:bg-blue-50'
                  }`}
                  onClick={() => toggleLever(lever.id)}
                >
                  <div className="flex items-start space-x-4">
                    {/* Walmart Checkbox */}
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 button-press ${
                      lever.checked 
                        ? 'bg-[#367c2b] border-[#367c2b]' 
                        : 'border-gray-300 hover:border-[#0071ce]'
                    }`}>
                      {lever.checked && (
                        <CheckCircle className="h-4 w-4 text-white animate-bounce-in" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{lever.title}</h3>
                            {lever.walmartApproved && (
                              <span className="bg-[#0071ce] text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                WALMART APPROVED
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{lever.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <TrendingDown className="h-4 w-4 text-[#367c2b]" />
                              <span className="font-semibold text-[#367c2b]">-{lever.impact}% CO₂</span>
                            </div>
                            
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              lever.cost === 'Low' ? 'bg-green-100 text-green-800' :
                              lever.cost === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {lever.cost} Investment
                            </div>
                            
                            <span className="text-gray-500">{lever.timeframe}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-bold text-[#367c2b]">
                            ${lever.savings.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">Annual Savings</div>
                          <div className="text-xs text-[#0071ce] font-medium">
                            +{Math.round(lever.impact * 2)} Compliance Points
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Walmart Action Center */}
            <div className="mt-6 bg-gradient-to-r from-[#0071ce] to-[#367c2b] rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#ffc220] mb-2">Walmart Supplier Action Center</h3>
                  <p className="text-blue-100 text-sm">Connect with Walmart-approved vendors and financing</p>
                </div>
                <button className="group bg-[#ffc220] text-[#0071ce] px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-all duration-300 button-press hover-lift flex items-center space-x-2">
                  <span>Generate Implementation Plan</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-[#ffc220]">{reductionLevers.filter(l => l.checked).length}</div>
                  <div className="text-xs text-blue-200">Actions Selected</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-[#ffc220]">{totalReduction}%</div>
                  <div className="text-xs text-blue-200">CO₂ Reduction</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-[#ffc220]">{complianceScore}</div>
                  <div className="text-xs text-blue-200">Compliance Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}