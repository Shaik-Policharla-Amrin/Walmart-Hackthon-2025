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
import { CartItem, EcoMetrics } from './types/product';
import { User } from './types/user';
import { calculateCartMetrics } from './utils/carbonCalculations';
import { mockUser } from './utils/walmart-data';

type ViewType = 'scanning' | 'scanner' | 'cart' | 'rewards' | 'supplier';

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
      {(currentView === 'scanning' || currentView === 'scanner' || currentView === 'supplier') && (
        <div className="bg-white border-b border-gray-200 sticky top-[72px] z-40">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex space-x-8">
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