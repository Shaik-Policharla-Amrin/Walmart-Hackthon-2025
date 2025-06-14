import React, { useState } from 'react';
import { Mail, User, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

export default function PilotRequestEmail() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0071ce] to-[#00a862] text-white p-6">
          <div className="flex items-center space-x-3">
            <Mail className="h-8 w-8 text-[#ffc220]" />
            <div>
              <h2 className="text-2xl font-bold">📧 Pilot Request Email</h2>
              <p className="text-blue-100">Official interest from Walmart leadership</p>
            </div>
          </div>
        </div>

        {/* Email Interface */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            {/* Email Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#0071ce] rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Kathleen McLaughlin</div>
                    <div className="text-sm text-gray-600">SVP of Sustainability, Walmart Inc.</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Dec 15, 2024</div>
                  <div className="text-xs text-gray-400">2:34 PM CST</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">To:</span> sparkathon-team@walmart.com
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Subject:</span> 
                  <span className="font-semibold text-gray-900 ml-1">
                    RE: EcoSmart Scanner - Pilot Program Approval Request
                  </span>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-6 bg-white">
              <div className="prose max-w-none">
                <p className="text-gray-800 mb-4">
                  <strong>Team,</strong>
                </p>
                
                <p className="text-gray-800 mb-4">
                  I've reviewed the EcoSmart Scanner presentation from the Sparkathon, and I'm impressed with the potential impact on our Project Gigaton goals. The AI-driven approach to reducing Scope 3 emissions through consumer behavior change aligns perfectly with our 2030 sustainability targets.
                </p>

                <div className="bg-[#0071ce] bg-opacity-10 border-l-4 border-[#0071ce] p-4 my-6">
                  <p className="text-[#0071ce] font-semibold mb-2">Key Highlights:</p>
                  <ul className="text-gray-800 space-y-1">
                    <li>• Projected 15% reduction in customer cart emissions</li>
                    <li>• $5 reward system drives 73% adoption rate</li>
                    <li>• Seamless integration with existing Walmart+ infrastructure</li>
                    <li>• Potential to influence 265M+ annual customer transactions</li>
                  </ul>
                </div>

                <p className="text-gray-800 mb-4">
                  <strong>I'm approving a pilot program for Q1 2025.</strong> Let's test this in 10 stores across different markets to validate the impact metrics and customer engagement levels.
                </p>

                {!isExpanded && (
                  <button 
                    onClick={() => setIsExpanded(true)}
                    className="text-[#0071ce] hover:text-blue-700 font-medium flex items-center space-x-1"
                  >
                    <span>Read full email</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}

                {isExpanded && (
                  <div className="space-y-4">
                    <p className="text-gray-800">
                      The timing is perfect as we're ramping up our sustainability messaging for Earth Day 2025. This could be a flagship initiative that demonstrates Walmart's innovation in environmental responsibility.
                    </p>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Pilot Program Details:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-green-700">Timeline:</div>
                          <div className="text-green-600">January - March 2025</div>
                        </div>
                        <div>
                          <div className="font-medium text-green-700">Stores:</div>
                          <div className="text-green-600">10 locations (5 urban, 5 suburban)</div>
                        </div>
                        <div>
                          <div className="font-medium text-green-700">Budget:</div>
                          <div className="text-green-600">$2.5M allocated</div>
                        </div>
                        <div>
                          <div className="font-medium text-green-700">Success Metrics:</div>
                          <div className="text-green-600">10% emission reduction, 60% adoption</div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-800">
                      Please coordinate with the Innovation Lab team to finalize the technical requirements and integration timeline. I'd like to see a detailed implementation plan by January 3rd.
                    </p>

                    <p className="text-gray-800">
                      This has the potential to be a game-changer for our sustainability efforts. Let's make it happen.
                    </p>

                    <p className="text-gray-800 mt-6">
                      <strong>Best regards,</strong><br/>
                      Kathleen McLaughlin<br/>
                      <span className="text-sm text-gray-600">
                        Senior Vice President, Sustainability<br/>
                        Walmart Inc.<br/>
                        kathleen.mclaughlin@walmart.com
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Email Actions */}
            <div className="bg-gray-50 border-t border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">Verified sender</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Meeting scheduled for Jan 3</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-[#0071ce] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Reply
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Forward
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="mt-6 bg-gradient-to-r from-[#00a862] to-green-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-bold mb-4 text-[#ffc220]">🚀 Pilot Program Impact Projection</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">10</div>
                <div className="text-sm text-green-100">Pilot Stores</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$2.5M</div>
                <div className="text-sm text-green-100">Investment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50K</div>
                <div className="text-sm text-green-100">Customers Reached</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">750</div>
                <div className="text-sm text-green-100">Tons CO₂ Saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}