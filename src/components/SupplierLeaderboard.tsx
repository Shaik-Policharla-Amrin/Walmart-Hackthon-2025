import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Medal, Crown, Zap, ArrowRight } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  rank: number;
  co2Reduction: number;
  savings: number;
  badge: string;
  avatar: string;
  isCurrentUser?: boolean;
  trend: 'up' | 'down' | 'stable';
}

export default function SupplierLeaderboard() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      name: 'GreenTech Manufacturing',
      rank: 1,
      co2Reduction: 28.5,
      savings: 2100000,
      badge: 'Gigaton Champion',
      avatar: '🏭',
      trend: 'up'
    },
    {
      id: '2',
      name: 'EcoLogistics Corp',
      rank: 2,
      co2Reduction: 24.8,
      savings: 1850000,
      badge: 'Carbon Crusher',
      avatar: '🚛',
      trend: 'up'
    },
    {
      id: '3',
      name: 'Sustainable Foods Inc',
      rank: 3,
      co2Reduction: 22.1,
      savings: 1650000,
      badge: 'Eco Pioneer',
      avatar: '🌾',
      trend: 'stable'
    },
    {
      id: '4',
      name: 'Your Company',
      rank: 24,
      co2Reduction: 12.3,
      savings: 920000,
      badge: 'Rising Star',
      avatar: '🏢',
      isCurrentUser: true,
      trend: 'up'
    }
  ]);

  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedRanks, setAnimatedRanks] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Animate rank numbers
    suppliers.forEach(supplier => {
      let current = supplier.rank + 10;
      const target = supplier.rank;
      const decrement = (current - target) / 20;
      
      const interval = setInterval(() => {
        current -= decrement;
        if (current <= target) {
          current = target;
          clearInterval(interval);
        }
        setAnimatedRanks(prev => ({ ...prev, [supplier.id]: Math.round(current) }));
      }, 50);
    });

    // Show confetti for top performers
    setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 1000);
  }, [suppliers]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-orange-500" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-[#0071ce] text-white text-sm font-bold flex items-center justify-center">#{rank}</div>;
    }
  };

  const getRankBackground = (rank: number, isCurrentUser?: boolean) => {
    if (isCurrentUser) {
      return 'bg-gradient-to-r from-[#0071ce] to-blue-600 text-white';
    }
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-500 text-orange-900';
      default:
        return 'bg-white border border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <div className={`w-3 h-3 rounded-full ${
                ['bg-[#ffc220]', 'bg-[#367c2b]', 'bg-[#0071ce]', 'bg-red-500', 'bg-purple-500'][Math.floor(Math.random() * 5)]
              }`} />
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0071ce] to-[#367c2b] text-white p-6">
          <div className="flex items-center space-x-3">
            <Trophy className="h-8 w-8 text-[#ffc220]" />
            <div>
              <h2 className="text-2xl font-bold">Walmart Supplier Leaderboard</h2>
              <p className="text-blue-100">Top performers in Walmart's Gigaton initiative</p>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="p-6">
          <div className="space-y-4">
            {suppliers.slice(0, 3).map((supplier, index) => (
              <div 
                key={supplier.id}
                className={`rounded-xl p-6 transition-all duration-500 hover-lift ${getRankBackground(supplier.rank, supplier.isCurrentUser)}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  {/* Rank & Avatar */}
                  <div className="flex items-center space-x-3">
                    {getRankIcon(supplier.rank)}
                    <div className="text-4xl">{supplier.avatar}</div>
                  </div>

                  {/* Company Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold">{supplier.name}</h3>
                      {supplier.isCurrentUser && (
                        <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs font-semibold">
                          You
                        </span>
                      )}
                      {supplier.trend === 'up' && (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      )}
                    </div>
                    <div className="text-sm opacity-90 mb-2">{supplier.badge}</div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold">{supplier.co2Reduction}%</div>
                        <div className="text-sm opacity-75">CO₂ Reduction</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">${(supplier.savings / 1000000).toFixed(1)}M</div>
                        <div className="text-sm opacity-75">Annual Savings</div>
                      </div>
                    </div>
                  </div>

                  {/* Rank Number */}
                  <div className="text-right">
                    <div className="text-4xl font-bold animate-counter">
                      #{animatedRanks[supplier.id] || supplier.rank}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Current User Highlight (if not in top 3) */}
          {suppliers.find(s => s.isCurrentUser && s.rank > 3) && (
            <div className="mt-6">
              <div className="text-center text-gray-500 text-sm mb-4">...</div>
              {suppliers.filter(s => s.isCurrentUser).map(supplier => (
                <div 
                  key={supplier.id}
                  className="rounded-xl p-6 bg-gradient-to-r from-[#0071ce] to-blue-600 text-white hover-lift border-2 border-[#ffc220]"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#ffc220] text-[#0071ce] text-lg font-bold flex items-center justify-center">
                        #{supplier.rank}
                      </div>
                      <div className="text-4xl">{supplier.avatar}</div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-bold">{supplier.name}</h3>
                        <span className="bg-[#ffc220] text-[#0071ce] px-2 py-1 rounded-full text-xs font-bold">
                          YOUR COMPANY
                        </span>
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="text-blue-100 text-sm mb-2">{supplier.badge}</div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-2xl font-bold">{supplier.co2Reduction}%</div>
                          <div className="text-blue-200 text-sm">CO₂ Reduction</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">${(supplier.savings / 1000000).toFixed(1)}M</div>
                          <div className="text-blue-200 text-sm">Annual Savings</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Improvement Suggestion */}
                  <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-[#ffc220]">Jump to Top 10</div>
                        <div className="text-sm text-blue-100">Optimize packaging to reach rank #8</div>
                      </div>
                      <button className="bg-[#ffc220] text-[#0071ce] px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors button-press flex items-center space-x-2">
                        <span>View Action Plan</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Achievement Badges */}
          <div className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Zap className="h-5 w-5 text-[#ffc220]" />
              <span>Available Achievements</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center hover-lift cursor-pointer">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-semibold text-gray-900">Top 10 Club</div>
                <div className="text-sm text-gray-600">Reach top 10 ranking</div>
                <div className="text-xs text-[#0071ce] mt-2">14 ranks to go</div>
              </div>
              
              <div className="bg-white rounded-lg p-4 text-center hover-lift cursor-pointer">
                <div className="text-3xl mb-2">⚡</div>
                <div className="font-semibold text-gray-900">Efficiency Master</div>
                <div className="text-sm text-gray-600">20% CO₂ reduction</div>
                <div className="text-xs text-[#0071ce] mt-2">7.7% to go</div>
              </div>
              
              <div className="bg-white rounded-lg p-4 text-center hover-lift cursor-pointer">
                <div className="text-3xl mb-2">💰</div>
                <div className="font-semibold text-gray-900">Million Saver</div>
                <div className="text-sm text-gray-600">$1M+ annual savings</div>
                <div className="text-xs text-green-600 mt-2">Achieved!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}