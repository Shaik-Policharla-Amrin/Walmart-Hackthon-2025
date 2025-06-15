import React, { useState, useEffect } from 'react'
import { Sparkles, TrendingUp, Package, DollarSign, Leaf } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useScanHistory } from '../hooks/useScanHistory'
import { Product } from '../types/product'

interface Recommendation {
  id: string
  type: 'bundle' | 'alternative' | 'seasonal' | 'trending'
  title: string
  description: string
  products: Product[]
  savings: {
    co2: number
    money: number
    ecoPoints: number
  }
  confidence: number
}

export default function AIRecommendations() {
  const { profile } = useAuth()
  const { scanHistory } = useScanHistory()
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateRecommendations()
  }, [scanHistory, profile])

  const generateRecommendations = async () => {
    setLoading(true)
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate personalized recommendations based on scan history
    const recs: Recommendation[] = []

    // Bundle recommendation based on frequently scanned categories
    if (scanHistory.length > 5) {
      recs.push({
        id: '1',
        type: 'bundle',
        title: 'Your Eco-Friendly Grocery Bundle',
        description: 'Based on your shopping patterns, this bundle saves 40% more CO₂',
        products: [
          {
            id: 'bundle-1',
            name: 'Beyond Meat Bundle',
            brand: 'Beyond Meat',
            price: 19.99,
            co2e: 2.1,
            waterUsage: 150,
            recyclabilityPercent: 85,
            category: 'Plant-Based',
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
            barcode: 'bundle-001',
            isEcoFriendly: true
          }
        ],
        savings: {
          co2: 8.5,
          money: 5.50,
          ecoPoints: 150
        },
        confidence: 92
      })
    }

    // Seasonal recommendation
    recs.push({
      id: '2',
      type: 'seasonal',
      title: 'Winter Sustainability Pack',
      description: 'Seasonal eco-friendly products perfect for this time of year',
      products: [
        {
          id: 'seasonal-1',
          name: 'Organic Winter Vegetables',
          brand: 'Fresh & Local',
          price: 12.99,
          co2e: 0.8,
          waterUsage: 45,
          recyclabilityPercent: 100,
          category: 'Produce',
          image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
          barcode: 'seasonal-001',
          isEcoFriendly: true
        }
      ],
      savings: {
        co2: 3.2,
        money: 2.00,
        ecoPoints: 80
      },
      confidence: 85
    })

    // Trending eco-friendly alternative
    recs.push({
      id: '3',
      type: 'trending',
      title: 'Trending: Oat Milk Revolution',
      description: '73% of EcoSmart users are switching to oat milk this month',
      products: [
        {
          id: 'trending-1',
          name: 'Oat Dream Original',
          brand: 'Oat Dream',
          price: 4.49,
          co2e: 0.9,
          waterUsage: 48,
          recyclabilityPercent: 90,
          category: 'Plant-Based',
          image: 'https://images.pexels.com/photos/6544373/pexels-photo-6544373.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
          barcode: 'trending-001',
          isEcoFriendly: true
        }
      ],
      savings: {
        co2: 2.3,
        money: 1.00,
        ecoPoints: 50
      },
      confidence: 88
    })

    setRecommendations(recs)
    setLoading(false)
  }

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'bundle': return <Package className="h-5 w-5" />
      case 'seasonal': return <Leaf className="h-5 w-5" />
      case 'trending': return <TrendingUp className="h-5 w-5" />
      default: return <Sparkles className="h-5 w-5" />
    }
  }

  const getRecommendationColor = (type: string) => {
    switch (type) {
      case 'bundle': return 'from-purple-500 to-purple-600'
      case 'seasonal': return 'from-green-500 to-green-600'
      case 'trending': return 'from-orange-500 to-orange-600'
      default: return 'from-blue-500 to-blue-600'
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Sparkles className="h-6 w-6 text-[#0071ce] animate-pulse" />
            <h2 className="text-xl font-bold text-gray-900">AI Generating Recommendations...</h2>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0071ce] to-[#00a862] text-white p-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-8 w-8 text-[#ffc220]" />
            <div>
              <h2 className="text-2xl font-bold">🤖 AI Recommendations</h2>
              <p className="text-blue-100">Personalized suggestions based on your shopping patterns</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-6 space-y-6">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getRecommendationColor(rec.type)} text-white`}>
                    {getRecommendationIcon(rec.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{rec.title}</h3>
                    <p className="text-gray-600 text-sm">{rec.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-600">AI Confidence</div>
                  <div className="text-2xl font-bold text-[#0071ce]">{rec.confidence}%</div>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {rec.products.map((product) => (
                  <div key={product.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.brand}</div>
                      <div className="text-lg font-bold text-[#0071ce]">${product.price}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Savings */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">{rec.savings.co2}kg</div>
                  <div className="text-sm text-gray-600">CO₂ Saved</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">${rec.savings.money}</div>
                  <div className="text-sm text-gray-600">Money Saved</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-xl font-bold text-yellow-600">{rec.savings.ecoPoints}</div>
                  <div className="text-sm text-gray-600">EcoPoints</div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-[#0071ce] to-[#00a862] text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all">
                Add to Cart - Save {rec.savings.co2}kg CO₂
              </button>
            </div>
          ))}

          {/* AI Learning Notice */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center space-x-3 mb-3">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-bold text-purple-900">AI Learning in Progress</h3>
            </div>
            <p className="text-purple-700 text-sm mb-3">
              Our AI analyzes your shopping patterns to provide increasingly personalized recommendations. 
              The more you scan, the better our suggestions become!
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-purple-900">Scans Analyzed:</div>
                <div className="text-purple-700">{scanHistory.length} products</div>
              </div>
              <div>
                <div className="font-medium text-purple-900">Accuracy Improving:</div>
                <div className="text-purple-700">+{Math.min(scanHistory.length * 2, 15)}% this week</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}