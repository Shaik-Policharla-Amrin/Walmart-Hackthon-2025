import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ScanningView from './components/ScanningView';
import CartOptimization from './components/CartOptimization';
import RewardsDashboard from './components/RewardsDashboard';
import SupplierDashboard from './components/SupplierDashboard';
import HeroSection from './components/HeroSection';
import SupplierSnapshot from './components/SupplierSnapshot';
import SupplierLeaderboard from './components/SupplierLeaderboard';
import Footer from './components/Footer';
import RealTimeCameraScanner from './components/RealTimeCameraScanner';
import JudgeModeDemo from './components/JudgeModeDemo';
import WalmartIntegration from './components/WalmartIntegration';
import SustainabilityLeaderboard from './components/SustainabilityLeaderboard';
import PilotRequestEmail from './components/PilotRequestEmail';
import CompetitorComparison from './components/CompetitorComparison';
import { CartItem, EcoMetrics } from './types/product';
import { User } from './types/user';
import { calculateCartMetrics } from './utils/carbonCalculations';
import { mockUser } from './utils/walmart-data';

type ViewType = 'scanning' | 'scanner' | 'cart' | 'rewards' | 'supplier' | 'judge-mode';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('scanning');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User>(mockUser);
  const [metrics, setMetrics] = useState<EcoMetrics>({
    totalCo2e: 0,
    co2eGoal: 15.0,
    waterUsage: 0,
    recyclabilityAverage: 0,
    ecoFriendlyCount: 0,
    totalItems: 0
  });
  const [dailyCO2Saved, setDailyCO2Saved] = useState(2.4);

  // Update metrics when cart changes
  useEffect(() => {
    const newMetrics = calculateCartMetrics(cartItems);
    setMetrics(newMetrics);
  }, [cartItems]);

  const handleProductScanned = (item: CartItem) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(cartItem => cartItem.id === item.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, item];
    });
    
    // Award points for scanning
    setUser(prev => ({
      ...prev,
      ecoPoints: prev.ecoPoints + (item.isEcoFriendly ? 20 : 10)
    }));

    // Update daily CO2 saved
    if (item.isEcoFriendly) {
      setDailyCO2Saved(prev => prev + 0.5);
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleOptimizeCart = () => {
    // Award optimization bonus
    setUser(prev => ({
      ...prev,
      ecoPoints: prev.ecoPoints + 150,
      walmartCash: prev.walmartCash + 2.50
    }));
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'scanning':
        return (
          <div className="space-y-0">
            <HeroSection isSupplierView={false} />
            <div className="bg-gray-50 py-12">
              <ScanningView onProductScanned={handleProductScanned} />
            </div>
            {/* Daily Progress */}
            <div className="bg-white py-8">
              <div className="max-w-4xl mx-auto px-4">
                <div className="bg-gradient-to-r from-[#00a862] to-green-600 rounded-2xl p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Your Impact Today</h3>
                  <div className="text-3xl font-bold text-[#ffc220] mb-2">{dailyCO2Saved} kg CO₂ saved</div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-2">
                    <div 
                      className="bg-[#ffc220] h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min((dailyCO2Saved / 5) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-green-100">Keep swapping to reach your 5kg daily goal!</p>
                </div>
              </div>
            </div>
            {/* Judge Mode Demo */}
            <JudgeModeDemo />
            {/* Walmart Integration */}
            <WalmartIntegration />
            {/* Sustainability Leaderboard */}
            <SustainabilityLeaderboard />
            {/* Pilot Request Email */}
            <PilotRequestEmail />
            {/* Competitor Comparison */}
            <CompetitorComparison />
          </div>
        );
      case 'scanner':
        return (
          <div className="min-h-screen bg-gray-50 pt-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Live Product Scanner</h1>
                <p className="text-gray-600">Point your camera at any barcode to scan products instantly</p>
              </div>
              <RealTimeCameraScanner
                onProductScanned={handleProductScanned}
                onClose={() => setCurrentView('scanning')}
              />
            </div>
          </div>
        );
      case 'cart':
        return (
          <CartOptimization
            cartItems={cartItems}
            onBack={() => setCurrentView('scanning')}
            onRemoveItem={handleRemoveItem}
            onOptimizeCart={handleOptimizeCart}
          />
        );
      case 'rewards':
        return (
          <RewardsDashboard
            user={user}
            onBack={() => setCurrentView('scanning')}
          />
        );
      case 'supplier':
        return (
          <div className="space-y-0">
            <HeroSection isSupplierView={true} />
            <div className="bg-gray-50 py-12 space-y-12">
              <SupplierSnapshot />
              <SupplierLeaderboard />
            </div>
          </div>
        );
      case 'judge-mode':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-[#0071ce] to-[#00a862] text-white p-6">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Judge Mode Demo</h1>
                <p className="text-blue-100">Interactive demonstration for Walmart Sparkathon judges</p>
              </div>
            </div>
            <JudgeModeDemo />
          </div>
        );
      default:
        return (
          <div className="space-y-0">
            <HeroSection isSupplierView={false} />
            <div className="bg-gray-50 py-12">
              <ScanningView onProductScanned={handleProductScanned} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        metrics={metrics}
        user={user}
        onCartClick={() => setCurrentView('cart')}
        onRewardsClick={() => setCurrentView('rewards')}
      />
      
      {/* Navigation Tabs */}
      {(currentView === 'scanning' || currentView === 'scanner' || currentView === 'supplier' || currentView === 'judge-mode') && (
        <div className="bg-white border-b border-gray-200 sticky top-[72px] z-40">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex space-x-8">
              <button
                onClick={() => setCurrentView('scanner')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  currentView === 'scanner'
                    ? 'border-[#ffc220] text-[#ffc220]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>📱</span>
                <span>Live Scanner</span>
              </button>
              <button
                onClick={() => setCurrentView('scanning')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  currentView === 'scanning'
                    ? 'border-[#00a862] text-[#00a862]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>🛒</span>
                <span>EcoSmart Scanner</span>
              </button>
              <button
                onClick={() => setCurrentView('supplier')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  currentView === 'supplier'
                    ? 'border-[#0071ce] text-[#0071ce]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>🏭</span>
                <span>Supplier Portal</span>
              </button>
              <button
                onClick={() => setCurrentView('judge-mode')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  currentView === 'judge-mode'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>⚖️</span>
                <span>Judge Mode</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      <main className="pb-0">
        {renderCurrentView()}
      </main>

      <Footer />
    </div>
  );
}

export default App;