import React from 'react';
import { Leaf, Shield, Users, ExternalLink, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Walmart Impact Section */}
        <div className="bg-gradient-to-r from-[#0071ce] to-[#367c2b] rounded-2xl p-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Zap className="h-8 w-8 text-[#ffc220]" />
              <h3 className="text-3xl font-bold text-white">Walmart Impact Projection</h3>
              <Zap className="h-8 w-8 text-[#ffc220]" />
            </div>
            <p className="text-blue-100 mb-6 text-lg">If 500 suppliers use this tool:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-20 rounded-xl p-6">
                <div className="text-4xl font-bold text-[#ffc220]">2.1M</div>
                <div className="text-blue-100">tons CO₂ reduced</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-6">
                <div className="text-4xl font-bold text-[#ffc220]">$22M</div>
                <div className="text-blue-100">collective savings</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-6">
                <div className="text-4xl font-bold text-[#ffc220]">100%</div>
                <div className="text-blue-100">Gigaton alignment</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-[#00a862]" />
              <div>
                <h3 className="text-xl font-bold">Gigaton Guide</h3>
                <p className="text-sm text-gray-400">Powered by Project Gigaton</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              AI-powered emissions tracking helping Walmart suppliers achieve sustainability goals and reduce costs.
            </p>
          </div>

          {/* Walmart Partnership */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#ffc220]">Walmart Partnership</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#00a862] rounded-full"></div>
                <span>Aligned with Walmart's Gigaton PPA (est. 2017)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#00a862] rounded-full"></div>
                <span>1 Billion metric tons CO₂ target by 2030</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#00a862] rounded-full"></div>
                <span>Supporting 2040 Net-Zero Goal</span>
              </li>
            </ul>
          </div>

          {/* Pilot Partners */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#ffc220]">Pilot Partners</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  GT
                </div>
                <span>GreenTech Manufacturing</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                  EL
                </div>
                <span>EcoLogistics Corp</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
                  SF
                </div>
                <span>Sustainable Foods Inc</span>
              </div>
            </div>
          </div>

          {/* Security & Trust */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#ffc220]">Security & Trust</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-[#00a862]" />
                <span>Data secured via Walmart Supplier API</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-[#00a862]" />
                <span>GDPR & SOC 2 Compliant</span>
              </li>
              <li className="flex items-center space-x-2">
                <ExternalLink className="h-4 w-4 text-[#00a862]" />
                <a href="#" className="hover:text-[#ffc220] transition-colors">
                  View Security Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Hackathon Banner */}
        <div className="border-t border-gray-800 pt-8">
          <div className="bg-gradient-to-r from-[#0071ce] to-[#367c2b] rounded-xl p-6 text-center">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <div className="text-2xl">🚀</div>
              <h3 className="text-xl font-bold text-[#ffc220]">Walmart Hackathon 2025</h3>
              <div className="text-2xl">⚡</div>
            </div>
            <p className="text-blue-100 mb-3">
              Built for Gigaton PPA Impact | Empowering suppliers to achieve sustainability goals faster
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-blue-200">
              <span>🌱 AI-Powered Insights</span>
              <span>📊 Real-time Tracking</span>
              <span>💰 Cost Optimization</span>
              <span>🏆 Gamified Experience</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 Gigaton Guide. Built with ❤️ for Walmart's sustainability mission.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#ffc220] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#ffc220] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#ffc220] transition-colors">Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}