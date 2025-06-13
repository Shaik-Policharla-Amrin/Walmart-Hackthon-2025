import React, { useState, useEffect } from 'react';
import { Camera, Scan, AlertTriangle, CheckCircle, RefreshCw, Mic, Zap, Video, Target, TrendingDown, ShoppingCart, Award } from 'lucide-react';
import { Product, CartItem } from '../types/product';
import { sampleProducts } from '../utils/walmart-data';
import SwapModal from './SwapModal';
import EcoAlert from './EcoAlert';
import RealTimeCameraScanner from './RealTimeCameraScanner';

interface ScanningViewProps {
  onProductScanned: (item: CartItem) => void;
}

export default function ScanningView({ onProductScanned }: ScanningViewProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScannedProduct, setLastScannedProduct] = useState<Product | null>(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showEcoAlert, setShowEcoAlert] = useState(false);
  const [scanAnimation, setScanAnimation] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showRealTimeScanner, setShowRealTimeScanner] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  const simulateScan = () => {
    setIsScanning(true);
    setScanAnimation(true);
    
    setTimeout(() => {
      const randomProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
      setLastScannedProduct(randomProduct);
      setIsScanning(false);
      setScanAnimation(false);
      
      // Check if product needs eco alert (high impact items)
      if (randomProduct.co2e > 5) {
        setShowEcoAlert(true);
        setTimeout(() => setShowEcoAlert(false), 2500);
      }
      
      // Add to cart with haptic feedback simulation
      const cartItem: CartItem = {
        ...randomProduct,
        quantity: 1,
        scannedAt: new Date()
      };
      onProductScanned(cartItem);
      
      // Show swap modal if alternatives exist and product has high impact
      if (randomProduct.alternatives && randomProduct.alternatives.length > 0 && randomProduct.co2e > 3) {
        setTimeout(() => setShowSwapModal(true), 600);
      }
    }, 800);
  };

  const handleVoiceCommand = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      simulateScan();
    }, 1000);
  };

  const handleRealTimeScan = (item: CartItem) => {
    setLastScannedProduct(item);
    onProductScanned(item);
    setShowRealTimeScanner(false);
    
    if (item.co2e > 5) {
      setShowEcoAlert(true);
      setTimeout(() => setShowEcoAlert(false), 2500);
    }
    
    if (item.alternatives && item.alternatives.length > 0 && item.co2e > 3) {
      setTimeout(() => setShowSwapModal(true), 600);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white pb-6">
      {/* Simple Scanning Interface */}
      <div className="relative bg-gradient-to-b from-green-50 to-white p-6 rounded-xl border-2 border-[#00a862] shadow-lg m-4">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="w-8 h-8 bg-[#00a862] rounded-full flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Quick Scanner</h2>
          </div>
          <p className="text-gray-600 mb-3">Simple product scanning for quick demos</p>
        </div>

        {/* Simple Camera Viewfinder */}
        <div className="relative aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-xl mb-6 overflow-hidden border-4 border-[#00a862]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00a862]/20 via-transparent to-[#0071ce]/20">
            <div className="flex items-center justify-center h-full">
              <Camera className="h-20 w-20 text-gray-600" />
            </div>
          </div>
          
          {/* Scanning Animation */}
          {scanAnimation && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-ping absolute h-32 w-32 bg-[#00a862] rounded-full opacity-20"></div>
              <div className="animate-pulse absolute h-24 w-24 bg-[#00a862] rounded-full opacity-40"></div>
              <div className="animate-bounce absolute h-16 w-16 bg-[#00a862] rounded-full opacity-60"></div>
              <Scan className="h-8 w-8 text-white animate-spin" />
            </div>
          )}
          
          {/* Scanning Overlay */}
          <div className="absolute inset-6 border-2 border-white/60 rounded-xl">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#00a862]"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#00a862]"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#00a862]"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#00a862]"></div>
            
            {!scanAnimation && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-0.5 bg-[#00a862] animate-scan-line"></div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Live Scanner */}
          <button
            onClick={() => setShowRealTimeScanner(true)}
            className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[#00a862] to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
          >
            <div className="flex items-center justify-center space-x-2">
              <Video className="h-5 w-5" />
              <span>Open EcoSmart Scanner</span>
            </div>
          </button>

          {/* Quick Scan */}
          <button
            onClick={simulateScan}
            disabled={isScanning}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg ${
              isScanning 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#0071ce] to-blue-600 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 active:scale-95'
            }`}
          >
            {isScanning ? (
              <div className="flex items-center justify-center space-x-2">
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span>Scanning Product...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Scan className="h-5 w-5" />
                <span>Quick Scan Demo</span>
              </div>
            )}
          </button>

          {/* Voice Command */}
          <button
            onClick={handleVoiceCommand}
            disabled={isListening || isScanning}
            className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 border-2 ${
              isListening 
                ? 'bg-[#00a862] border-[#00a862] text-white' 
                : 'bg-white border-[#00a862] text-[#00a862] hover:bg-[#00a862] hover:text-white'
            }`}
          >
            {isListening ? (
              <div className="flex items-center justify-center space-x-2">
                <Mic className="h-4 w-4 animate-pulse" />
                <span>Listening...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Mic className="h-4 w-4" />
                <span>Voice Scan</span>
              </div>
            )}
          </button>
        </div>

        {/* Voice Commands */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 mb-1">
            💬 Say <strong>"Scan this product"</strong> or <strong>"Find eco alternatives"</strong>
          </p>
          <p className="text-xs text-gray-400">
            Voice commands help you shop hands-free
          </p>
        </div>
      </div>

      {/* Product Display */}
      {lastScannedProduct && (
        <div className="mx-4 mb-6">
          <div className="bg-white rounded-xl border-2 border-[#00a862] p-4 shadow-md animate-slide-up">
            <div className="flex items-center space-x-4">
              <img 
                src={lastScannedProduct.image} 
                alt={lastScannedProduct.name}
                className="w-20 h-20 object-cover rounded-lg shadow-sm"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{lastScannedProduct.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{lastScannedProduct.brand}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#0071ce]">${lastScannedProduct.price}</span>
                  <div className="flex items-center space-x-2">
                    {lastScannedProduct.isEcoFriendly ? (
                      <div className="flex items-center space-x-1 text-[#00a862]">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Eco-Friendly</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-orange-500">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium">High Impact</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className={`font-semibold ${
                    lastScannedProduct.co2e > 5 ? 'text-red-600' : 
                    lastScannedProduct.co2e > 2 ? 'text-yellow-600' : 'text-[#00a862]'
                  }`}>
                    {lastScannedProduct.co2e}kg CO₂
                  </span>
                  <span className="text-gray-500">
                    {lastScannedProduct.waterUsage}L water • {lastScannedProduct.recyclabilityPercent}% recyclable
                  </span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-4 flex space-x-2">
              {lastScannedProduct.alternatives && lastScannedProduct.alternatives.length > 0 && (
                <button
                  onClick={() => setShowSwapModal(true)}
                  className="flex-1 bg-[#00a862] text-white py-2 px-4 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <TrendingDown className="h-4 w-4" />
                  <span>Better Choice Available</span>
                </button>
              )}
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Add to Cart
              </button>
            </div>

            {/* EcoPoints Reward */}
            <div className="mt-3 text-center">
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <Award className="h-4 w-4 mr-1" />
                +{lastScannedProduct.isEcoFriendly ? 20 : 10} EcoPoints earned!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showRealTimeScanner && (
        <RealTimeCameraScanner
          onProductScanned={handleRealTimeScan}
          onClose={() => setShowRealTimeScanner(false)}
        />
      )}

      {showEcoAlert && lastScannedProduct && (
        <EcoAlert
          product={lastScannedProduct}
          onClose={() => setShowEcoAlert(false)}
        />
      )}

      {showSwapModal && lastScannedProduct && lastScannedProduct.alternatives && (
        <SwapModal
          originalProduct={lastScannedProduct}
          alternatives={lastScannedProduct.alternatives}
          onSwap={(alternative) => {
            const cartItem: CartItem = {
              ...alternative,
              quantity: 1,
              scannedAt: new Date()
            };
            onProductScanned(cartItem);
            setShowSwapModal(false);
            setLastScannedProduct(alternative);
          }}
          onClose={() => setShowSwapModal(false)}
        />
      )}
    </div>
  );
}