import React, { useState, useEffect } from 'react';
import { Zap, TrendingDown, ArrowRight, Play, Sparkles, Target, ShoppingCart, Factory, Award, DollarSign } from 'lucide-react';

interface HeroSectionProps {
  isSupplierView?: boolean;
}

export default function HeroSection({ isSupplierView = false }: HeroSectionProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Animate the CO2 reduction percentage
    const timer = setTimeout(() => {
      let current = 0;
      const target = 15;
      const increment = target / 30;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
        }
        setAnimatedValue(Math.round(current * 10) / 10);
      }, 50);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isSupplierView) {
    return (
      <div className="relative bg-gradient-to-br from-[#0071ce] via-blue-700 to-[#367c2b] text-white overflow-hidden">
        {/* Walmart Official Banner */}
        <div className="absolute top-0 left-0 right-0 bg-[#ffc220] text-[#0071ce] py-2 z-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-3 text-sm font-bold">
              <Factory className="h-4 w-4" />
              <span>🏭 WALMART SUPPLIER PORTAL</span>
              <span>•</span>
              <span>OFFICIALLY ENDORSED BY WALMART'S SUSTAINABILITY INNOVATION LAB</span>
              <Factory className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 mt-10">
          {/* Supplier Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl px-8 py-4 animate-bounce-in">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-[#ffc220] rounded-full flex items-center justify-center">
                  <Factory className="h-8 w-8 text-[#0071ce]" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold">Walmart Supplier Dashboard</div>
                  <div className="text-sm text-blue-200">Scope 3 Emissions Tracker</div>
                </div>
              </div>
              <div className="h-8 w-px bg-white bg-opacity-30"></div>
              <div className="text-sm font-semibold">
                <div>Project Gigaton PPA</div>
                <div className="text-[#ffc220]">Compliance & Optimization</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Supplier Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
                  Meet Walmart's
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ffc220] to-white">
                    Gigaton Goals
                  </span>
                  <span className="block text-3xl lg:text-4xl text-blue-100">Faster & Cheaper</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-blue-100 max-w-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  AI-powered supplier compliance • Automated Scope 3 tracking • Guaranteed cost savings
                </p>
              </div>

              {/* Supplier Value Props */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-lg font-bold text-[#ffc220] mb-3">Built for Walmart Suppliers</h3>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-[#ffc220]" />
                    <span>Automate Scope 3 emissions reporting (Walmart's #1 requirement)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-[#ffc220]" />
                    <span>Meet 2025 Gigaton targets with AI recommendations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-[#ffc220]" />
                    <span>Access Walmart-approved vendors and financing</span>
                  </li>
                </ul>
              </div>

              {/* Supplier Stats */}
              <div className="grid grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#ffc220]">$1.2M</div>
                  <div className="text-sm text-blue-200">Avg. Annual Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#ffc220]">15%</div>
                  <div className="text-sm text-blue-200">CO₂ Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#ffc220]">6 mo</div>
                  <div className="text-sm text-blue-200">ROI Payback</div>
                </div>
              </div>

              {/* Supplier CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <button 
                  onClick={() => {
                    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                  }}
                  className="group bg-[#ffc220] text-[#0071ce] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 button-press hover-lift flex items-center justify-center space-x-2"
                >
                  <Factory className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>View Supplier Demo</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#0071ce] transition-all duration-300 button-press hover-lift flex items-center justify-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Calculate Savings</span>
                </button>
              </div>
            </div>

            {/* Supplier Dashboard Preview */}
            <div className="relative">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover-lift">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Supplier Compliance Tracker</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm text-green-300">Walmart Connected</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-200">Gigaton Compliance Score</span>
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-4 w-4 text-green-400" />
                      <span className="text-2xl font-bold text-green-400 animate-counter">
                        {Math.round(animatedValue * 5 + 25)}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-[#367c2b] h-3 rounded-full transition-all duration-1000 ease-out animate-chart-grow"
                      style={{ width: `${(animatedValue * 5 + 25)}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-red-400">50K</div>
                      <div className="text-xs text-blue-200">Current CO₂ tons</div>
                    </div>
                    <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-400">30K</div>
                      <div className="text-xs text-blue-200">Walmart Target</div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <div className="text-sm font-semibold text-[#ffc220] mb-2">Walmart AI Recommends:</div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-[#ffc220] rounded-full" />
                      <span className="text-blue-100">Switch to Nebraska Wind Power</span>
                      <span className="text-green-400 font-semibold ml-auto">-12%</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-[#ffc220] rounded-full" />
                      <span className="text-blue-100">Optimize cold chain logistics</span>
                      <span className="text-green-400 font-semibold ml-auto">$480k/yr</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Supplier Impact Footer */}
          <div className="mt-16 text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-lg text-blue-200 mb-2">If 500 suppliers use this platform:</div>
            <h3 className="text-4xl font-bold text-[#ffc220] mb-2">2.1M tons CO₂ reduced = $600M saved</h3>
            <div className="text-sm text-blue-300">Projected impact across Walmart's supplier network</div>
          </div>
        </div>
      </div>
    );
  }

  // Consumer Hero Section with Walmart Sparkathon focus
  return (
    <div className="relative bg-gradient-to-br from-[#0071ce] via-blue-600 to-[#00a862] text-white overflow-hidden">
      {/* Walmart Official Banner */}
      <div className="absolute top-0 left-0 right-0 bg-[#ffc220] text-[#0071ce] py-2 z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 text-sm font-bold">
            <ShoppingCart className="h-4 w-4" />
            <span>🛒 OFFICIALLY ENDORSED BY WALMART'S SUSTAINABILITY INNOVATION LAB</span>
            <span>•</span>
            <span>SPARKATHON 2025 </span>
            <ShoppingCart className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 mt-10">
        {/* Walmart Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl px-8 py-4 animate-bounce-in">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-[#ffc220] rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-[#0071ce]" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold">Walmart EcoSmart</div>
                <div className="text-sm text-blue-200">Powered by Sustainability Innovation Lab</div>
              </div>
            </div>
            <div className="h-8 w-px bg-white bg-opacity-30"></div>
            <div className="text-sm font-semibold">
              <div>Sparkathon 2025</div>
              <div className="text-[#ffc220]">Grand Prize Winner</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
                Help Walmart cut
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ffc220] to-white">
                  1B tons of emissions
                </span>
                <span className="block text-3xl lg:text-4xl text-blue-100">by 2030</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 max-w-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <span className="text-[#ffc220] font-bold">Earn $5 for every 200 EcoPoints</span> • Scan products • Get eco-friendly alternatives • Save the planet
              </p>
            </div>

            {/* Value Props */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-bold text-[#ffc220] mb-3">Why Shop EcoSmart?</h3>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-[#ffc220]" />
                  <span>Earn $5 for every 200 EcoPoints (automatic Walmart Cash)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-[#ffc220]" />
                  <span>AI-powered eco-friendly product recommendations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-[#ffc220]" />
                  <span>Track your contribution to Walmart's 1B ton goal</span>
                </li>
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#ffc220]">2,340</div>
                <div className="text-sm text-blue-200">EcoPoints</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#ffc220]">$58.50</div>
                <div className="text-sm text-blue-200">Cash Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#ffc220]">47kg</div>
                <div className="text-sm text-blue-200">CO₂ Saved</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <button 
                onClick={() => {
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }}
                className="group bg-[#ffc220] text-[#0071ce] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 button-press hover-lift flex items-center justify-center space-x-2"
              >
                <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Start 3-Step Demo</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
             <a
               href="https://github.com/Shaik-Policharla-Amrin/Walmart-Hackthon-2025"
               target="_blank"
               rel="noopener noreferrer"
               className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold
               text-lg hover:bg-white hover:text-[#0071ce] transition-all duration-300 button-press 
               hover-lift flex items-center justify-center space-x-2"
               >
               <Sparkles className="h-5 w-5" />
               <span>View GitHub</span>
             </a>
            </div>
          </div>

          {/* Demo Video */}
          <div className="relative">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border- 
              white border-opacity-20 hover-lift">
              <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative">
                <iframe
                  src="https://drive.google.com/file/d/11hf80krCuOl0iOIRSWPsJ1alPVkGcage/preview"
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                  title="Walmart EcoSmart Demo"
                  />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0071ce]/20 to-[#00a862]/20 
                  flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-xl font-bold mb-2">15-Second Demo</h3>   
                    <p className="text-sm opacity-90">See how customers save money & planet</p>
                  </div>
                </div>
              </div>
              {/* Demo Stats */}
              <div className="mt-4 text-center">        
                <div className="text-sm text-blue-200 mb-2">Live Demo Stats</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white bg-opacity-10 rounded-lg p-3">
                    <div className="text-2xl font-bold text-[#ffc220]">12,000</div>
                    <div className="text-xs text-blue-200">Beyond Meat Swaps</div>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-400">90%</div>
                    <div className="text-xs text-blue-200">CO₂ Reduction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          );
          }
        {/* Walmart Impact Banner */}
        <div className="mt-16 text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
          <div className="text-lg text-blue-200 mb-2">Your contribution to Walmart's mission:</div>
          <h3 className="text-4xl font-bold text-[#ffc220] mb-2">1 Billion Tons CO₂ by 2030</h3>
          <div className="text-sm text-blue-300">Every swap brings us closer to the goal</div>
        </div>
      </div>