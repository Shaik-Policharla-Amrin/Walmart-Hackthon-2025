import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, TrendingDown, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';

export default function JudgeModeDemo() {
  const [currentDay, setCurrentDay] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasteData, setWasteData] = useState({
    bananas: { initial: 100, current: 100, wasted: 0, saved: 0 },
    apples: { initial: 80, current: 80, wasted: 0, saved: 0 },
    milk: { initial: 50, current: 50, wasted: 0, saved: 0 }
  });

  const simulateDay = (day: number) => {
    const scenarios = {
      1: { bananas: { current: 95, wasted: 5 }, apples: { current: 78, wasted: 2 }, milk: { current: 48, wasted: 2 } },
      2: { bananas: { current: 85, wasted: 10 }, apples: { current: 72, wasted: 6 }, milk: { current: 44, wasted: 4 } },
      3: { bananas: { current: 70, wasted: 15 }, apples: { current: 65, wasted: 7 }, milk: { current: 38, wasted: 6 } },
      4: { bananas: { current: 50, wasted: 20 }, apples: { current: 55, wasted: 10 }, milk: { current: 30, wasted: 8 } },
      5: { bananas: { current: 30, wasted: 20 }, apples: { current: 40, wasted: 15 }, milk: { current: 20, wasted: 10 } },
      6: { bananas: { current: 15, wasted: 15 }, apples: { current: 25, wasted: 15 }, milk: { current: 12, wasted: 8 } },
      7: { bananas: { current: 10, wasted: 5 }, apples: { current: 15, wasted: 10 }, milk: { current: 8, wasted: 4 } }
    };

    const dayData = scenarios[day as keyof typeof scenarios];
    if (dayData) {
      setWasteData(prev => ({
        bananas: { 
          ...prev.bananas, 
          current: dayData.bananas.current,
          wasted: prev.bananas.wasted + dayData.bananas.wasted,
          saved: prev.bananas.initial - dayData.bananas.current - (prev.bananas.wasted + dayData.bananas.wasted)
        },
        apples: { 
          ...prev.apples, 
          current: dayData.apples.current,
          wasted: prev.apples.wasted + dayData.apples.wasted,
          saved: prev.apples.initial - dayData.apples.current - (prev.apples.wasted + dayData.apples.wasted)
        },
        milk: { 
          ...prev.milk, 
          current: dayData.milk.current,
          wasted: prev.milk.wasted + dayData.milk.wasted,
          saved: prev.milk.initial - dayData.milk.current - (prev.milk.wasted + dayData.milk.wasted)
        }
      }));
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentDay <= 7) {
      interval = setInterval(() => {
        setCurrentDay(prev => {
          const nextDay = prev + 1;
          if (nextDay <= 7) {
            simulateDay(nextDay);
            return nextDay;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentDay]);

  const reset = () => {
    setCurrentDay(1);
    setIsPlaying(false);
    setWasteData({
      bananas: { initial: 100, current: 100, wasted: 0, saved: 0 },
      apples: { initial: 80, current: 80, wasted: 0, saved: 0 },
      milk: { initial: 50, current: 50, wasted: 0, saved: 0 }
    });
  };

  const totalWasted = wasteData.bananas.wasted + wasteData.apples.wasted + wasteData.milk.wasted;
  const totalSaved = wasteData.bananas.saved + wasteData.apples.saved + wasteData.milk.saved;
  const savingsAmount = totalSaved * 2.5; // $2.50 per lb saved

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">⚖️ Judge Mode: Food Waste Reduction Demo</h2>
              <p className="text-purple-100">Interactive 7-day simulation for Walmart Sparkathon judges</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-300">Day {currentDay}</div>
              <div className="text-sm text-purple-200">of 7</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={currentDay > 7}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                isPlaying 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-[#0071ce] hover:bg-blue-700 text-white'
              } ${currentDay > 7 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              <span>{isPlaying ? 'Pause Demo' : currentDay > 7 ? 'Demo Complete' : 'Start Demo'}</span>
            </button>
            
            <button
              onClick={reset}
              className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-all"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Simulation Display */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Tracking */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Product Inventory Tracking</h3>
              <div className="space-y-4">
                {Object.entries(wasteData).map(([product, data]) => (
                  <div key={product} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 capitalize">{product} (lbs)</h4>
                      <div className="flex items-center space-x-2">
                        {data.current < 20 && (
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        )}
                        <span className="text-sm text-gray-600">
                          {data.current} remaining
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div 
                        className="bg-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(data.current / data.initial) * 100}%` }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{data.initial}</div>
                        <div className="text-gray-500">Initial</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-red-600">{data.wasted}</div>
                        <div className="text-gray-500">Wasted</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{data.saved}</div>
                        <div className="text-gray-500">Sold</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Actions & Results */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Actions & Impact</h3>
              
              {/* Daily Actions */}
              <div className="bg-[#0071ce] bg-opacity-10 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-[#0071ce] mb-2">Day {currentDay} AI Actions:</h4>
                <div className="space-y-2 text-sm">
                  {currentDay >= 2 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Applied 20% discount to bananas (spoilage risk: 85%)</span>
                    </div>
                  )}
                  {currentDay >= 3 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Alerted local food bank about excess apples</span>
                    </div>
                  )}
                  {currentDay >= 4 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Moved milk to front displays (expires in 2 days)</span>
                    </div>
                  )}
                  {currentDay >= 5 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Created "Manager's Special" bundle deals</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Results Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
                  <TrendingDown className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{totalWasted} lbs</div>
                  <div className="text-sm text-gray-600">Total Wasted</div>
                  <div className="text-xs text-green-700 mt-1">
                    {currentDay > 1 ? `${Math.round(((100 - totalWasted) / 100) * 100)}% reduction` : 'Baseline'}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                  <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">${savingsAmount.toFixed(0)}</div>
                  <div className="text-sm text-gray-600">Revenue Saved</div>
                  <div className="text-xs text-blue-700 mt-1">
                    vs. traditional waste
                  </div>
                </div>
              </div>

              {/* Final Results */}
              {currentDay >= 7 && (
                <div className="mt-4 bg-gradient-to-r from-[#0071ce] to-[#00a862] rounded-lg p-4 text-white">
                  <h4 className="font-bold text-[#ffc220] mb-2">🏆 Week Complete!</h4>
                  <div className="text-sm space-y-1">
                    <div>• Reduced waste from 85 lbs to {totalWasted} lbs</div>
                    <div>• Saved ${savingsAmount.toFixed(0)} in revenue</div>
                    <div>• 88% improvement vs. no AI intervention</div>
                    <div>• Ready for 10-store pilot program</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">7-Day Progress Timeline</h4>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div key={day} className="flex-1">
                  <div className={`h-3 rounded-full transition-all duration-500 ${
                    day <= currentDay ? 'bg-[#0071ce]' : 'bg-gray-200'
                  }`} />
                  <div className="text-xs text-center mt-1 text-gray-600">Day {day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}