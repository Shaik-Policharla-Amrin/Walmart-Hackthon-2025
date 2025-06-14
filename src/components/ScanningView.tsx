import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, CheckCircle, RefreshCw, Mic, Zap, Target, TrendingDown, ShoppingCart, Award, ArrowRight } from 'lucide-react';
import { Product, CartItem } from '../types/product';
import { sampleProducts } from '../utils/walmart-data';
import SwapModal from './SwapModal';
import EcoAlert from './EcoAlert';

interface ScanningViewProps {
  onProductScanned: (item: CartItem) => void;
}

export default function ScanningView({ onProductScanned }: ScanningViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showEcoAlert, setShowEcoAlert] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [ecoPointsAnimation, setEcoPointsAnimation] = useState(0);

  // 3-Step Demo Flow
  const handleDemoSearch = () => {
    setSearchTerm('Great Value Beef');
    setIsSearching(true);
    
    setTimeout(() => {
      const beefProduct = sampleProducts.find(p => p.name === 'Great Value Ground Beef') || sampleProducts[0];
      setSearchResults([beefProduct]);
      setSelectedProduct(beefProduct);
      setIsSearching(false);
      
      // Show eco alert for high impact
      if (beefProduct.co2e > 5) {
        setTimeout(() => setShowEcoAlert(true), 500);
        setTimeout(() => setShowEcoAlert(false), 2500);
      }
    }, 1000);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    setTimeout(() => {
      const results = sampleProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
      
      if (results.length > 0) {
        setSelectedProduct(results[0]);
      }
    }, 800);
  };

  const handleVoiceCommand = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleDemoSearch();
    }, 1000);
  };

  const handleSwap = (alternative: Product) => {
    setSelectedProduct(alternative);
    setShowSwapModal(false);
    
    // Trigger +50 EcoPoints animation
    setEcoPointsAnimation(50);
    setTimeout(() => setEcoPointsAnimation(0), 2000);
    
    // Add to cart
    const cartItem: CartItem = {
      ...alternative,
      quantity: 1,
      scannedAt: new Date()
    };
    onProductScanned(cartItem);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      const cartItem: CartItem = {
        ...selectedProduct,
        quantity: 1,
        scannedAt: new Date()
      };
      onProductScanned(cartItem);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white pb-6">
      {/* 3-Step Demo Header */}
      <div className="bg-gradient-to-r from-[#0071ce] to-[#00a862] text-white p-6 rounded-xl m-4 mb-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">🎯 3-Step Demo Flow</h2>
          <p className="text-blue-100 mb-4">Experience the complete EcoSmart journey</p>
          
          <button
            onClick={handleDemoSearch}
            className="bg-[#ffc220] text-[#0071ce] px-8 py-3 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 button-press hover-lift flex items-center space-x-2 mx-auto"
          >
            <Target className="h-5 w-5" />
            <span>Start Demo: Search "Great Value Beef"</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Search Interface */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white p-6 rounded-xl border-2 border-[#0071ce] shadow-lg m-4">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="w-8 h-8 bg-[#0071ce] rounded-full flex items-center justify-center">
              <Search className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Product Search</h2>
          </div>
          <p className="text-gray-600 mb-3">Search for products to see their environmental impact</p>
        </div>

        {/* Search Bar */}
        <div className="flex space-x-3 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search products (try 'Great Value Beef')"
              className="w-full px-4 py-3 border-2 border-[#0071ce] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchTerm.trim()}
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
              isSearching || !searchTerm.trim()
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#0071ce] hover:bg-blue-700 transform hover:scale-105'
            }`}
          >
            {isSearching ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              'Search'
            )}
          </button>
          
          <button
            onClick={handleVoiceCommand}
            disabled={isListening}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 border-2 ${
              isListening 
                ? 'bg-[#00a862] border-[#00a862] text-white' 
                : 'bg-white border-[#00a862] text-[#00a862] hover:bg-[#00a862] hover:text-white'
            }`}
          >
            <Mic className={`h-5 w-5 ${isListening ? 'animate-pulse' : ''}`} />
          </button>
        </div>

        {/* Demo Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border-2 border-[#0071ce] border-opacity-20">
            <div className="text-center">
              <div className="w-8 h-8 bg-[#0071ce] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">1</div>
              <h3 className="font-semibold text-gray-900">Search</h3>
              <p className="text-sm text-gray-600">Find "Great Value Beef"</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border-2 border-[#00a862] border-opacity-20">
            <div className="text-center">
              <div className="w-8 h-8 bg-[#00a862] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">2</div>
              <h3 className="font-semibold text-gray-900">Analyze</h3>
              <p className="text-sm text-gray-600">See CO₂: 15.2kg | Water: 1,200 gal</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border-2 border-[#ffc220] border-opacity-50">
            <div className="text-center">
              <div className="w-8 h-8 bg-[#ffc220] rounded-full flex items-center justify-center text-[#0071ce] font-bold mx-auto mb-2">3</div>
              <h3 className="font-semibold text-gray-900">Swap</h3>
              <p className="text-sm text-gray-600">Try Beyond Meat (90% less CO₂)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Display */}
      {selectedProduct && (
        <div className="mx-4 mb-6">
          <div className="bg-white rounded-xl border-2 border-[#00a862] p-6 shadow-lg animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-24 h-24 object-cover rounded-lg shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedProduct.name}</h3>
                  <p className="text-gray-600 mb-2">{selectedProduct.brand}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-[#0071ce]">${selectedProduct.price}</span>
                    <div className="flex items-center space-x-2">
                      {selectedProduct.isEcoFriendly ? (
                        <div className="flex items-center space-x-1 text-[#00a862]">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Eco-Friendly</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-red-500">
                          <AlertTriangle className="h-5 w-5" />
                          <span className="font-medium">High Impact</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Environmental Impact</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className={`text-2xl font-bold ${
                      selectedProduct.co2e > 10 ? 'text-red-600' : 
                      selectedProduct.co2e > 5 ? 'text-orange-500' : 'text-[#00a862]'
                    }`}>
                      {selectedProduct.co2e}kg
                    </div>
                    <div className="text-sm text-gray-600">CO₂ Impact</div>
                    {selectedProduct.co2e > 10 && (
                      <div className="text-xs text-red-500 mt-1">Very High</div>
                    )}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(selectedProduct.waterUsage * 0.264)} gal
                    </div>
                    <div className="text-sm text-gray-600">Water Usage</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{selectedProduct.recyclabilityPercent}%</div>
                    <div className="text-sm text-gray-600">Recyclable</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 flex space-x-3">
              {selectedProduct.alternatives && selectedProduct.alternatives.length > 0 && (
                <button
                  onClick={() => setShowSwapModal(true)}
                  className="flex-1 bg-[#00a862] text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <TrendingDown className="h-5 w-5" />
                  <span>Try Beyond Meat (90% less CO₂)</span>
                </button>
              )}
              <button 
                onClick={handleAddToCart}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Add to Cart
              </button>
            </div>

            {/* EcoPoints Animation */}
            {ecoPointsAnimation > 0 && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center px-6 py-3 bg-[#ffc220] text-[#0071ce] rounded-full text-lg font-bold animate-bounce">
                  <Zap className="h-6 w-6 mr-2" />
                  <span>+{ecoPointsAnimation} EcoPoints!</span>
                  <Award className="h-6 w-6 ml-2" />
                </div>
              </div>
            )}

            {/* Regular EcoPoints Reward */}
            {ecoPointsAnimation === 0 && (
              <div className="mt-4 text-center">
                <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                  <Award className="h-4 w-4 mr-1" />
                  +{selectedProduct.isEcoFriendly ? 20 : 10} EcoPoints earned!
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Top Swapped Products */}
      <div className="mx-4 mb-6">
        <div className="bg-gradient-to-r from-[#0071ce] to-[#00a862] rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4 text-[#ffc220]">🔥 Top Swapped Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold text-[#ffc220]">12,000</div>
              <div className="text-sm text-blue-100">Beyond Meat swaps</div>
              <div className="text-xs text-green-300 mt-1">↑ 340% this month</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold text-[#ffc220]">8,500</div>
              <div className="text-sm text-blue-100">Oat milk swaps</div>
              <div className="text-xs text-green-300 mt-1">↑ 220% this month</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold text-[#ffc220]">6,200</div>
              <div className="text-sm text-blue-100">Eco detergent swaps</div>
              <div className="text-xs text-green-300 mt-1">↑ 180% this month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEcoAlert && selectedProduct && (
        <EcoAlert
          product={selectedProduct}
          onClose={() => setShowEcoAlert(false)}
        />
      )}

      {showSwapModal && selectedProduct && selectedProduct.alternatives && (
        <SwapModal
          originalProduct={selectedProduct}
          alternatives={selectedProduct.alternatives}
          onSwap={handleSwap}
          onClose={() => setShowSwapModal(false)}
        />
      )}
    </div>
  );
}