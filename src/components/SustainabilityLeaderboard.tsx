import React from 'react';
import { Trophy, TrendingUp, Medal, Crown, Zap } from 'lucide-react';

export default function SustainabilityLeaderboard() {
  const storeLeaderboard = [
    { 
      rank: 1, 
      store: 'Store #4567', 
      location: 'Bentonville, AR', 
      wasteReduction: 32, 
      savings: 8200, 
      badge: 'Waste Reduction Champion',
      trend: 'up'
    },
    { 
      rank: 2, 
      store: 'Store #2341', 
      location: 'Austin, TX', 
      wasteReduction: 28, 
      savings: 7100, 
      badge: 'Sustainability Leader',
      trend: 'up'
    },
    { 
      rank: 3, 
      store: 'Store #5678', 
      location: 'Atlanta, GA', 
      wasteReduction: 25, 
      savings: 6400, 
      badge: 'Green Pioneer',
      trend: 'stable'
    },
    { 
      rank: 4, 
      store: 'Store #9012', 
      location: 'Denver, CO', 
      wasteReduction: 22, 
      savings: 5800, 
      badge: 'Eco Warrior',
      trend: 'up'
    },
    { 
      rank: 5, 
      store: 'Store #3456', 
      location: 'Miami, FL', 
      wasteReduction: 19, 
      savings: 4900, 
      badge: 'Rising Star',
      trend: 'up'
    }
  ];

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

  const getRankBackground = (rank: number) => {
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
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0071ce] to-[#00a862] text-white p-6">
          <div className="flex items-center space-x-3">
            <Trophy className="h-8 w-8 text-[#ffc220]" />
            <div>
              <h2 className="text-2xl font-bold">🏆 Sustainability Score Leaderboard</h2>
              <p className="text-blue-100">Top performing Walmart stores in waste reduction</p>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="p-6">
          <div className="space-y-4">
            {storeLeaderboard.map((store, index) => (
              <div 
                key={store.rank}
                className={`rounded-xl p-6 transition-all duration-500 hover-lift ${getRankBackground(store.rank)}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  {/* Rank & Icon */}
                  <div className="flex items-center space-x-3">
                    {getRankIcon(store.rank)}
                    <div className="text-4xl">🏪</div>
                  </div>

                  {/* Store Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold">{store.store}</h3>
                      {store.trend === 'up' && (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="text-sm opacity-90 mb-2">{store.location}</div>
                    <div className="text-sm font-medium text-[#0071ce] mb-2">{store.badge}</div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold">{store.wasteReduction}%</div>
                        <div className="text-sm opacity-75">Waste Reduction</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">${store.savings.toLocaleString()}</div>
                        <div className="text-sm opacity-75">Monthly Savings</div>
                      </div>
                    </div>
                  </div>

                  {/* Rank Number */}
                  <div className="text-right">
                    <div className="text-4xl font-bold">#{store.rank}</div>
                    {store.rank <= 3 && (
                      <div className="text-2xl">🏆</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-8 bg-gradient-to-r from-[#0071ce] to-[#00a862] rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <Zap className="h-5 w-5 text-[#ffc220]" />
              <span>Network Impact Summary</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#ffc220]">4,732</div>
                <div className="text-sm text-blue-100">Stores Using System</div>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#ffc220]">$2.1M</div>
                <div className="text-sm text-blue-100">Total Monthly Savings</div>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#ffc220]">847K</div>
                <div className="text-sm text-blue-100">Tons Waste Prevented</div>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#ffc220]">94%</div>
                <div className="text-sm text-blue-100">Store Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Available Store Achievements</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center hover-lift cursor-pointer">
                <div className="text-3xl mb-2">🌟</div>
                <div className="font-semibold text-gray-900">Zero Waste Week</div>
                <div className="text-sm text-gray-600">Achieve 95%+ waste reduction</div>
                <div className="text-xs text-[#0071ce] mt-2">12 stores qualified</div>
              </div>
              
              <div className="bg-white rounded-lg p-4 text-center hover-lift cursor-pointer">
                <div className="text-3xl mb-2">💰</div>
                <div className="font-semibold text-gray-900">Savings Champion</div>
                <div className="text-sm text-gray-600">Save $10K+ monthly</div>
                <div className="text-xs text-[#0071ce] mt-2">8 stores achieved</div>
              </div>
              
              <div className="bg-white rounded-lg p-4 text-center hover-lift cursor-pointer">
                <div className="text-3xl mb-2">🚀</div>
                <div className="font-semibold text-gray-900">Innovation Leader</div>
                <div className="text-sm text-gray-600">Implement 5+ AI features</div>
                <div className="text-xs text-[#0071ce] mt-2">3 stores leading</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}