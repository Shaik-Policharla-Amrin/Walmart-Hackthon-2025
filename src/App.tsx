import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';
import AIRecommendations from './components/AIRecommendations';
import { CartItem, EcoMetrics } from './types/product';
import { calculateCartMetrics } from './utils/carbonCalculations';
import { useAuth } from './hooks/useAuth';
import { useProducts } from './hooks/useProducts';
import { useScanHistory } from './hooks/useScanHistory';

type ViewType = 'scanning' | 'scanner' | 'cart' | 'rewards' | 'supplier' | 'judge-mode' | 'ai-recommendations';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('scanner');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [metrics, setMetrics] = useState<EcoMetrics>({
    totalCo2e: 0,
    co2eGoal: 15.0,
    waterUsage: 0,
    recyclabilityAverage: 0,
    ecoFriendlyCount: 0,
    totalItems: 0
  });
  const [dailyCO2Saved, setDailyCO2Saved] = useState(2.4);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showUserProfile, setShowUserProfile] = useState(false);

  const { user, profile, loading } = useAuth();
  const { searchProducts, getProductByBarcode, getAlternatives } = useProducts();
  const { addScanRecord } = useScanHistory();

  // Update metrics when cart changes
  useEffect(() => {
    const newMetrics = calculateCartMetrics(cartItems);
    setMetrics(newMetrics);
  }, [cartItems]);

  const handleProductScanned = async (item: CartItem) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(cartItem => cartItem.id === item.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, item];
    });
    
    // Award points and update user profile
    const pointsEarned = item.isEcoFriendly ? 20 : 10;
    const co2Saved = item.isEcoFriendly ? 0.5 : 0;
    
    if (user && profile) {
      // Record scan in history
      await addScanRecord(
        item.id,
        item.isEcoFriendly ? 'Eco-friendly choice' : 'Product scanned',
        pointsEarned,
        co2Saved
      );
    }

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
    if (user && profile) {
      // This would update the user's points in the database
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
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
            user={profile || {
              id: '1',
              name: 'Guest User',
              email: 'guest@example.com',
              ecoPoints: 0,
              walmartCash: 0,
              badges: [],
              weeklyRank: 999,
              totalCo2eSaved: 0,
              preferences: {
                voiceEnabled: true,
                notifications: true,
                dyslexiaMode: false
              }
            }}
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
      case 'ai-recommendations':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <AIRecommendations />
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071ce] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading EcoSmart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        metrics={metrics}
        user={profile || {
          id: '1',
          name: 'Guest User',
          email: 'guest@example.com',
          ecoPoints: 0,
          walmartCash: 0,
          badges: [],
          weeklyRank: 999,
          totalCo2eSaved: 0,
          preferences: {
            voiceEnabled: true,
            notifications: true,
            dyslexiaMode: false
          }
        }}
        onCartClick={() => setCurrentView('cart')}
        onRewardsClick={() => setCurrentView('rewards')}
        onAuthClick={() => setShowAuthModal(true)}
        onProfileClick={() => setShowUserProfile(true)}
        isAuthenticated={!!user}
      />
      
      {/* Navigation Tabs */}
      {(currentView === 'scanning' || currentView === 'scanner' || currentView === 'supplier' || currentView === 'judge-mode' || currentView === 'ai-recommendations') && (
        <div className="bg-white border-b border-gray-200 sticky top-[72px] z-40">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setCurrentView('scanner')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 whitespace-nowrap ${
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
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 whitespace-nowrap ${
                  currentView === 'scanning'
                    ? 'border-[#00a862] text-[#00a862]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>🛒</span>
                <span>EcoSmart Scanner</span>
              </button>
              <button
                onClick={() => setCurrentView('ai-recommendations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 whitespace-nowrap ${
                  currentView === 'ai-recommendations'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>🤖</span>
                <span>AI Recommendations</span>
              </button>
              <button
                onClick={() => setCurrentView('supplier')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 whitespace-nowrap ${
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
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 whitespace-nowrap ${
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

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      {showUserProfile && (
        <UserProfile onClose={() => setShowUserProfile(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;