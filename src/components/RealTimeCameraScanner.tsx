import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Camera, X, CheckCircle, AlertTriangle, Zap, Target, Scan, RefreshCw, Mic, Video, Award, ShoppingCart, TrendingDown, QrCode } from 'lucide-react';
import Webcam from 'react-webcam';
import Quagga from 'quagga';
import { Product, CartItem } from '../types/product';
import { sampleProducts } from '../utils/walmart-data';
import SwapModal from './SwapModal';
import EcoAlert from './EcoAlert';

interface RealTimeCameraScannerProps {
  onProductScanned: (item: CartItem) => void;
  onClose: () => void;
}

export default function RealTimeCameraScanner({ onProductScanned, onClose }: RealTimeCameraScannerProps) {
  const webcamRef = useRef<Webcam>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [detectedProduct, setDetectedProduct] = useState<Product | null>(null);
  const [scanAnimation, setScanAnimation] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showEcoAlert, setShowEcoAlert] = useState(false);

  // Consumer-focused demo - emphasizes savings and rewards
  const preloadConsumerDemo = () => {
    const demoProduct = sampleProducts.find(p => p.name === 'Coca-Cola Classic 12-Pack') || sampleProducts[0];
    setDetectedProduct(demoProduct);
    setScanResult('123456789015');
    setScanAnimation(false);
    
    // Stop scanning
    if (isScanning) {
      Quagga.stop();
      setIsScanning(false);
    }

    // Show eco alert for high impact product
    if (demoProduct.co2e > 3) {
      setTimeout(() => setShowEcoAlert(true), 800);
      setTimeout(() => setShowEcoAlert(false), 3500);
    }

    // Show swap modal if alternatives exist
    if (demoProduct.alternatives && demoProduct.alternatives.length > 0) {
      setTimeout(() => setShowSwapModal(true), 1200);
    }
  };

  const simulateScan = () => {
    setIsScanning(true);
    setScanAnimation(true);
    
    setTimeout(() => {
      const randomProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
      setDetectedProduct(randomProduct);
      setIsScanning(false);
      setScanAnimation(false);
      
      // Check if product needs eco alert (high impact items)
      if (randomProduct.co2e > 5) {
        setShowEcoAlert(true);
        setTimeout(() => setShowEcoAlert(false), 2500);
      }
      
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

  // Initialize Quagga barcode scanner
  const initializeScanner = useCallback(() => {
    if (!scannerRef.current || !cameraReady) return;

    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: scannerRef.current,
        constraints: {
          width: 640,
          height: 480,
          facingMode: "environment" // Use back camera on mobile
        }
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      numOfWorkers: 2,
      decoder: {
        readers: [
          "code_128_reader",
          "ean_reader",
          "ean_8_reader",
          "code_39_reader",
          "code_39_vin_reader",
          "codabar_reader",
          "upc_reader",
          "upc_e_reader",
          "i2of5_reader"
        ]
      },
      locate: true
    }, (err) => {
      if (err) {
        console.error('Quagga initialization failed:', err);
        return;
      }
      console.log("Quagga initialization finished. Ready to start");
      Quagga.start();
      setIsScanning(true);
    });

    // Listen for successful barcode detection
    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      console.log('Barcode detected:', code);
      
      setScanResult(code);
      setScanAnimation(true);
      
      // Stop scanning temporarily
      Quagga.stop();
      setIsScanning(false);
      
      // Simulate product lookup (in real app, this would be an API call)
      setTimeout(() => {
        const foundProduct = findProductByBarcode(code);
        setDetectedProduct(foundProduct);
        setScanAnimation(false);
      }, 1500);
    });
  }, [cameraReady]);

  // Find product by barcode (mock implementation)
  const findProductByBarcode = (barcode: string): Product => {
    // In a real implementation, this would query Walmart's product database
    const product = sampleProducts.find(p => p.barcode === barcode) || 
                   sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
    
    // Add the scanned barcode to the product
    return { ...product, barcode };
  };

  // Handle adding product to cart
  const handleAddToCart = () => {
    if (detectedProduct) {
      const cartItem: CartItem = {
        ...detectedProduct,
        quantity: 1,
        scannedAt: new Date()
      };
      onProductScanned(cartItem);
      
      // Reset for next scan
      setDetectedProduct(null);
      setScanResult(null);
      
      // Restart scanning
      setTimeout(() => {
        initializeScanner();
      }, 1000);
    }
  };

  // Handle rescanning
  const handleRescan = () => {
    setDetectedProduct(null);
    setScanResult(null);
    initializeScanner();
  };

  const handleSwap = (alternative: Product) => {
    const cartItem: CartItem = {
      ...alternative,
      quantity: 1,
      scannedAt: new Date()
    };
    onProductScanned(cartItem);
    setShowSwapModal(false);
    setDetectedProduct(alternative);
  };

  useEffect(() => {
    return () => {
      // Cleanup Quagga when component unmounts
      if (isScanning) {
        Quagga.stop();
      }
    };
  }, [isScanning]);

  useEffect(() => {
    if (cameraReady) {
      initializeScanner();
    }
  }, [cameraReady, initializeScanner]);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "environment"
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0071ce] to-[#00a862] text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera className="h-6 w-6" />
              <div>
                <h2 className="text-lg font-bold">Live Scanner</h2>
                <p className="text-sm text-blue-100">Real-time barcode scanning</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Try Smart Shopping Demo Button */}
        <div className="p-4 bg-gradient-to-r from-[#00a862] to-green-600">
          <button
            onClick={preloadConsumerDemo}
            className="w-full bg-[#ffc220] text-[#0071ce] py-3 px-4 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-all duration-300 button-press hover-lift shadow-lg"
          >
            <div className="flex items-center justify-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Try Smart Shopping Demo</span>
              <Award className="h-4 w-4 animate-pulse" />
            </div>
          </button>
        </div>

        {/* Camera View */}
        <div className="relative">
          {!detectedProduct ? (
            <div className="relative aspect-video bg-black">
              {/* Webcam for display */}
              <Webcam
                ref={webcamRef}
                audio={false}
                videoConstraints={videoConstraints}
                onUserMedia={() => setCameraReady(true)}
                className="w-full h-full object-cover"
              />
              
              {/* Quagga scanner overlay */}
              <div 
                ref={scannerRef}
                className="absolute inset-0 opacity-0"
              />
              
              {/* Scanning overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-2 border-white rounded-lg w-64 h-40 relative">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#00a862]"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#00a862]"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#00a862]"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#00a862]"></div>
                  
                  {/* Scanning line animation */}
                  {isScanning && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute w-full h-0.5 bg-[#00a862] animate-scan-line"></div>
                    </div>
                  )}
                  
                  {/* Scan animation */}
                  {scanAnimation && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-ping absolute h-20 w-20 bg-[#00a862] rounded-full opacity-20"></div>
                      <div className="animate-pulse absolute h-12 w-12 bg-[#00a862] rounded-full opacity-40"></div>
                      <CheckCircle className="h-8 w-8 text-[#00a862] animate-bounce" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Status indicator */}
              <div className="absolute top-4 left-4">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                  isScanning ? 'bg-[#00a862] text-white' : 'bg-gray-800 text-gray-300'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    isScanning ? 'bg-white animate-pulse' : 'bg-gray-500'
                  }`}></div>
                  <span>{isScanning ? 'Scanning...' : 'Initializing...'}</span>
                </div>
              </div>

              {/* QR Code Instructions */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black bg-opacity-70 rounded-lg p-3 text-white text-center">
                  <QrCode className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm">Point camera at any barcode</p>
                </div>
              </div>
            </div>
          ) : (
            /* Product Detection Result */
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#00a862] bg-opacity-10 text-[#00a862] rounded-full font-semibold">
                  <CheckCircle className="h-5 w-5" />
                  <span>Product Detected!</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={detectedProduct.image} 
                    alt={detectedProduct.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{detectedProduct.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{detectedProduct.brand}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#0071ce]">${detectedProduct.price}</span>
                      {detectedProduct.isEcoFriendly ? (
                        <span className="inline-flex items-center px-2 py-1 bg-[#00a862] bg-opacity-10 text-[#00a862] rounded-full text-xs font-medium">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Eco-Friendly
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          High Impact
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Environmental Impact */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className={`text-lg font-bold ${
                        detectedProduct.co2e > 5 ? 'text-red-600' : 
                        detectedProduct.co2e > 2 ? 'text-yellow-600' : 'text-[#00a862]'
                      }`}>
                        {detectedProduct.co2e}kg
                      </div>
                      <div className="text-xs text-gray-600">CO₂ Impact</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">{detectedProduct.waterUsage}L</div>
                      <div className="text-xs text-gray-600">Water Usage</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">{detectedProduct.recyclabilityPercent}%</div>
                      <div className="text-xs text-gray-600">Recyclable</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                {detectedProduct.alternatives && detectedProduct.alternatives.length > 0 && (
                  <button
                    onClick={() => setShowSwapModal(true)}
                    className="w-full bg-[#00a862] text-white py-3 px-4 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <TrendingDown className="h-4 w-4" />
                    <span>Better Choice Available</span>
                  </button>
                )}
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleRescan}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Scan Another
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-4 bg-[#0071ce] text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Target className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
              
              {/* EcoPoints Reward */}
              <div className="mt-4 text-center">
                <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  <Zap className="h-4 w-4 mr-1" />
                  +{detectedProduct.isEcoFriendly ? 20 : 10} EcoPoints earned!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Scanner Controls */}
        {!detectedProduct && (
          <div className="p-4 bg-gray-50">
            <div className="space-y-3">
              {/* Quick Scan */}
              <button
                onClick={simulateScan}
                disabled={isScanning}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isScanning 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#0071ce] to-blue-600 hover:from-blue-600 hover:to-blue-700'
                }`}
              >
                {isScanning ? (
                  <div className="flex items-center justify-center space-x-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Scanning...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Scan className="h-4 w-4" />
                    <span>Quick Scan Demo</span>
                  </div>
                )}
              </button>

              {/* Voice Command */}
              <button
                onClick={handleVoiceCommand}
                disabled={isListening || isScanning}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 border-2 ${
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

            {/* Instructions */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">
                Position the barcode within the scanning area
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <span>📱 Hold steady</span>
                <span>💡 Good lighting</span>
                <span>📏 Clear view</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                💬 Say <strong>"Scan this product"</strong> for voice commands
              </p>
            </div>
          </div>
        )}

        {/* Modals */}
        {showEcoAlert && detectedProduct && (
          <EcoAlert
            product={detectedProduct}
            onClose={() => setShowEcoAlert(false)}
          />
        )}

        {showSwapModal && detectedProduct && detectedProduct.alternatives && (
          <SwapModal
            originalProduct={detectedProduct}
            alternatives={detectedProduct.alternatives}
            onSwap={handleSwap}
            onClose={() => setShowSwapModal(false)}
          />
        )}
      </div>
    </div>
  );
}