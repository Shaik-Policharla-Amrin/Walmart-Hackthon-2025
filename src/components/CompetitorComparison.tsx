import React from 'react';
import { TrendingUp, TrendingDown, Minus, Zap, Target, Award } from 'lucide-react';

export default function CompetitorComparison() {
  const competitorData = [
    {
      name: 'EcoSmart Scanner',
      company: 'Our Solution',
      wasteReduction: 25,
      customerAdoption: 73,
      costSavings: 8200,
      integrationTime: 2,
      isOurs: true,
      features: ['AI-Powered', 'Real-time', 'Walmart Integration', 'Gamification']
    },
    {
      name: 'GreenChoice AI',
      company: 'Competitor A',
      wasteReduction: 12,
      customerAdoption: 34,
      costSavings: 3100,
      integrationTime: 8,
      isOurs: false,
      features: ['Basic AI', 'Batch Processing', 'Generic API', 'No Rewards']
    },
    {
      name: 'SustainScan',
      company: 'Competitor B',
      wasteReduction: 8,
      customerAdoption: 28,
      costSavings: 2400,
      integrationTime: 12,
      isOurs: false,
      features: ['Rule-Based', 'Manual Updates', 'Limited Integration', 'Basic UI']
    },
    {
      name: 'EcoTracker Pro',
      company: 'Competitor C',
      wasteReduction: 5,
      customerAdoption: 19,
      costSavings: 1800,
      integrationTime: 16,
      isOurs: false,
      features: ['Static Data', 'Weekly Reports', 'No Integration', 'Complex Setup']
    }
  ];

  const getComparisonIcon = (ourValue: number, theirValue: number) => {
    if (ourValue > theirValue * 1.5) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (ourValue > theirValue) return <TrendingUp className="h-4 w-4 text-green-400" />;
    if (ourValue === theirValue) return <Minus className="h-4 w-4 text-gray-400" />;
    return <TrendingDown className="h-4 w-4 text-red-400" />;
  };

  const ourSolution = competitorData.find(c => c.isOurs)!;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0071ce] to-[#00a862] text-green p-6">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8 text-[#ffc220]" />
            <div>
              <h2 className="text-2xl font-bold">🥊 Competitive Analysis</h2>
              <p className="text-blue-100">How we outperform the competition</p>
            </div>
          </div>
        </div>

        <div className="p-6">
         {/* Key Differentiators */}
          {/* Key Differentiators */}
<div className="mb-8 bg-gradient-to-r from-[#00a862] to-green-600 rounded-xl p-6 text-white">
  <h3 className="text-xl font-bold mb-4 text-[#ffc220]">🚀 Why We Win</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="text-center">
      <div className="text-4xl font-bold mb-2 text-white">5x</div>
      <div className="text-sm text-white">Better waste reduction than competitors</div>
    </div>
    <div className="text-center">
      <div className="text-4xl font-bold mb-2 text-white">73%</div>
      <div className="text-sm text-white">Customer adoption rate (industry avg: 25%)</div>
    </div>
    <div className="text-center">
      <div className="text-4xl font-bold mb-2 text-white">8x</div>
      <div className="text-sm text-white">Faster integration than alternatives</div>
    </div>
  </div>
</div>

 


          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-900 border-b">Solution</th>
                  <th className="text-center p-4 font-semibold text-gray-900 border-b">Waste Reduction</th>
                  <th className="text-center p-4 font-semibold text-gray-900 border-b">Customer Adoption</th>
                  <th className="text-center p-4 font-semibold text-gray-900 border-b">Monthly Savings</th>
                  <th className="text-center p-4 font-semibold text-gray-900 border-b">Integration Time</th>
                  <th className="text-left p-4 font-semibold text-gray-900 border-b">Key Features</th>
                </tr>
              </thead>
              <tbody>
                {competitorData.map((competitor, index) => (
                  <tr 
                    key={index} 
                    className={`${
                      competitor.isOurs 
                        ? 'bg-gradient-to-r from-[#0071ce]/10 to-[#00a862]/10 border-2 border-[#0071ce]' 
                        : 'hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <td className="p-4 border-b">
                      <div>
                        <div className={`font-semibold ${competitor.isOurs ? 'text-[#0071ce]' : 'text-gray-900'}`}>
                          {competitor.name}
                          {competitor.isOurs && (
                            <span className="ml-2 bg-[#ffc220] text-[#0071ce] px-2 py-1 rounded-full text-xs font-bold">
                              OUR SOLUTION
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">{competitor.company}</div>
                      </div>
                    </td>
                    
                    <td className="p-4 border-b text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className={`text-2xl font-bold ${
                          competitor.isOurs ? 'text-[#00a862]' : 'text-gray-600'
                        }`}>
                          {competitor.wasteReduction}%
                        </span>
                        {!competitor.isOurs && getComparisonIcon(ourSolution.wasteReduction, competitor.wasteReduction)}
                      </div>
                    </td>
                    
                    <td className="p-4 border-b text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className={`text-2xl font-bold ${
                          competitor.isOurs ? 'text-[#00a862]' : 'text-gray-600'
                        }`}>
                          {competitor.customerAdoption}%
                        </span>
                        {!competitor.isOurs && getComparisonIcon(ourSolution.customerAdoption, competitor.customerAdoption)}
                      </div>
                    </td>
                    
                    <td className="p-4 border-b text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className={`text-2xl font-bold ${
                          competitor.isOurs ? 'text-[#00a862]' : 'text-gray-600'
                        }`}>
                          ${competitor.costSavings.toLocaleString()}
                        </span>
                        {!competitor.isOurs && getComparisonIcon(ourSolution.costSavings, competitor.costSavings)}
                      </div>
                    </td>
                    
                    <td className="p-4 border-b text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className={`text-2xl font-bold ${
                          competitor.isOurs ? 'text-[#00a862]' : 'text-gray-600'
                        }`}>
                          {competitor.integrationTime} weeks
                        </span>
                        {!competitor.isOurs && getComparisonIcon(1/competitor.integrationTime, 1/ourSolution.integrationTime)}
                      </div>
                    </td>
                    
                    <td className="p-4 border-b">
                      <div className="space-y-1">
                        {competitor.features.map((feature, idx) => (
                          <div key={idx} className={`text-sm px-2 py-1 rounded-full inline-block mr-1 mb-1 ${
                            competitor.isOurs 
                              ? 'bg-[#00a862] text-white' 
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detailed Comparison */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Our Advantages */}
            <div className="bg-gradient-to-br from-[#0071ce]/10 to-[#00a862]/10 rounded-xl p-6 border-2 border-[#0071ce]/20">
              <h3 className="text-xl font-bold text-[#0071ce] mb-4 flex items-center space-x-2">
                <Award className="h-6 w-6" />
                <span>Our Competitive Advantages</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00a862] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Real-Time AI Processing</div>
                    <div className="text-sm text-gray-600">Instant recommendations vs. competitors' batch processing</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00a862] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Native Walmart Integration</div>
                    <div className="text-sm text-gray-600">Built specifically for Walmart's ecosystem and APIs</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00a862] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Gamification & Rewards</div>
                    <div className="text-sm text-gray-600">EcoPoints system drives 3x higher engagement</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00a862] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Proven ROI Model</div>
                    <div className="text-sm text-gray-600">$5 reward per 200 points = measurable customer value</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Position */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Market Position Analysis</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Performance Score</span>
                    <span className="text-sm font-bold text-[#00a862]">94/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-[#00a862] h-3 rounded-full w-[94%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Market Fit</span>
                    <span className="text-sm font-bold text-[#0071ce]">91/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-[#0071ce] h-3 rounded-full w-[91%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Innovation Score</span>
                    <span className="text-sm font-bold text-[#ffc220]">98/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-[#ffc220] h-3 rounded-full w-[98%]"></div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-900 mb-2">Analyst Quote:</div>
                  <div className="text-sm text-gray-600 italic">
                    "EcoSmart Scanner represents a paradigm shift in retail sustainability. The combination of AI, gamification, and seamless integration creates an unmatched value proposition."
                  </div>
                  <div className="text-xs text-gray-500 mt-2">- RetailTech Analytics, Dec 2024</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 text-center bg-gradient-to-r from-[#0071ce] to-[#00a862] rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2 text-[#ffc220]">Ready to Lead the Market?</h3>
            <p className="text-blue-100 mb-4">Join Walmart in revolutionizing retail sustainability</p>
            <button className="bg-[#ffc220] text-[#0071ce] px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
              Schedule Demo with Leadership
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}