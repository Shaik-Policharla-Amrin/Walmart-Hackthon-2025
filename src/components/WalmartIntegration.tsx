import React from 'react';
import { Code, Database, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export default function WalmartIntegration() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0071ce] to-[#00a862] text-white p-6">
          <h2 className="text-2xl font-bold mb-2">🔗 Walmart Tech Integration</h2>
          <p className="text-blue-100">Seamless integration with Walmart's existing infrastructure</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Code Example */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Code className="h-6 w-6 text-[#0071ce]" />
                <span>API Integration Example</span>
              </h3>
              
              <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
                <div className="text-gray-500"># Pseudocode for Walmart's API</div>
                <div className="mt-2">
                  <span className="text-blue-400">if</span> spoilage_risk &gt; <span className="text-yellow-400">80</span>%:
                </div>
                <div className="ml-4">
                  walmart_api.<span className="text-purple-400">apply_discount</span>(item_id, <span className="text-yellow-400">40</span>%)
                </div>
                <div className="ml-4">
                  walmart_api.<span className="text-purple-400">alert_food_bank</span>(item_id)
                </div>
                <div className="ml-4">
                  walmart_api.<span className="text-purple-400">update_inventory</span>(item_id, status=<span className="text-green-300">"discounted"</span>)
                </div>
                <div className="mt-2">
                  <span className="text-blue-400">elif</span> spoilage_risk &gt; <span className="text-yellow-400">60</span>%:
                </div>
                <div className="ml-4">
                  walmart_api.<span className="text-purple-400">move_to_front</span>(item_id)
                </div>
                <div className="ml-4">
                  walmart_api.<span className="text-purple-400">create_bundle_deal</span>(item_id)
                </div>
                <div className="mt-2">
                  <span className="text-blue-400">return</span> {`{`}
                </div>
                <div className="ml-4">
                  <span className="text-orange-400">"action_taken"</span>: <span className="text-green-300">"discount_applied"</span>,
                </div>
                <div className="ml-4">
                  <span className="text-orange-400">"savings"</span>: calculate_savings(item_id),
                </div>
                <div className="ml-4">
                  <span className="text-orange-400">"waste_prevented"</span>: <span className="text-green-300">True</span>
                </div>
                <div>{`}`}</div>
              </div>

              {/* Integration Points */}
              <div className="mt-6 space-y-3">
                <h4 className="font-semibold text-gray-900">Integration Points:</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Walmart Inventory Management System</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Point of Sale (POS) Integration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Supply Chain Analytics Platform</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Walmart+ Customer Notifications</span>
                  </div>
                </div>
              </div>
            </div>

            {/* System Architecture */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Database className="h-6 w-6 text-[#0071ce]" />
                <span>System Architecture</span>
              </h3>

              <div className="space-y-4">
                {/* Data Flow */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Real-Time Data Flow</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#0071ce] rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                      <div>
                        <div className="font-medium">Inventory Sensors</div>
                        <div className="text-sm text-gray-600">IoT sensors track product freshness</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#00a862] rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                      <div>
                        <div className="font-medium">AI Processing</div>
                        <div className="text-sm text-gray-600">Machine learning predicts spoilage risk</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#ffc220] rounded-full flex items-center justify-center text-[#0071ce] text-sm font-bold">3</div>
                      <div>
                        <div className="font-medium">Automated Actions</div>
                        <div className="text-sm text-gray-600">System triggers discounts & alerts</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                      <div>
                        <div className="font-medium">Customer Notifications</div>
                        <div className="text-sm text-gray-600">Walmart+ members get instant deals</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-gradient-to-br from-[#0071ce] to-[#00a862] rounded-lg p-4 text-white">
                  <h4 className="font-semibold text-[#ffc220] mb-3">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold">99.9%</div>
                      <div className="text-sm text-blue-100">API Uptime</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">&lt;50ms</div>
                      <div className="text-sm text-blue-100">Response Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">25%</div>
                      <div className="text-sm text-blue-100">Waste Reduction</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">$8.2K</div>
                      <div className="text-sm text-blue-100">Monthly Savings</div>
                    </div>
                  </div>
                </div>

                {/* Security & Compliance */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Security & Compliance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>SOC 2 Type II Certified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>GDPR Compliant Data Processing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>End-to-End Encryption</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Walmart Security Standards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Timeline */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Zap className="h-6 w-6 text-[#ffc220]" />
              <span>Implementation Roadmap</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#0071ce] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">Q1</div>
                <h4 className="font-semibold text-gray-900">Pilot Phase</h4>
                <p className="text-sm text-gray-600">10 stores, 3 product categories</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[#00a862] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">Q2</div>
                <h4 className="font-semibold text-gray-900">Regional Rollout</h4>
                <p className="text-sm text-gray-600">100 stores, full produce section</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[#ffc220] rounded-full flex items-center justify-center text-[#0071ce] font-bold mx-auto mb-2">Q3</div>
                <h4 className="font-semibold text-gray-900">National Expansion</h4>
                <p className="text-sm text-gray-600">1,000+ stores, all perishables</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">Q4</div>
                <h4 className="font-semibold text-gray-900">Full Integration</h4>
                <p className="text-sm text-gray-600">All US stores, complete system</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 text-center">
            <button className="group bg-gradient-to-r from-[#0071ce] to-[#00a862] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 button-press hover-lift flex items-center space-x-2 mx-auto">
              <span>View Technical Documentation</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}