import React, { useState } from 'react'
import { User, Settings, History, Award, TrendingUp, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useScanHistory } from '../hooks/useScanHistory'

interface UserProfileProps {
  onClose: () => void
}

export default function UserProfile({ onClose }: UserProfileProps) {
  const { user, profile, signOut, updateProfile } = useAuth()
  const { scanHistory, getTotalStats } = useScanHistory()
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'settings'>('overview')
  
  const stats = getTotalStats()

  const handleSignOut = async () => {
    await signOut()
    onClose()
  }

  if (!user || !profile) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0071ce] to-[#00a862] text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-blue-100">{user.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4" />
                    <span className="font-semibold">{profile.eco_points} pts</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold">${profile.walmart_cash}</span>
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'history', label: 'Scan History', icon: History },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === id
                    ? 'border-[#0071ce] text-[#0071ce]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.totalScans}</div>
                  <div className="text-sm text-gray-600">Products Scanned</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalCO2Saved.toFixed(1)}kg</div>
                  <div className="text-sm text-gray-600">CO₂ Saved</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">#{profile.weekly_rank}</div>
                  <div className="text-sm text-gray-600">Weekly Rank</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {scanHistory.slice(0, 5).map((scan) => (
                    <div key={scan.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img 
                        src={scan.product?.image_url || '/placeholder.jpg'} 
                        alt={scan.product?.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{scan.product?.name}</div>
                        <div className="text-sm text-gray-600">{scan.action_taken}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">+{scan.eco_points_earned} pts</div>
                        <div className="text-xs text-gray-500">{new Date(scan.scanned_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Complete Scan History</h3>
              <div className="space-y-3">
                {scanHistory.map((scan) => (
                  <div key={scan.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                    <img 
                      src={scan.product?.image_url || '/placeholder.jpg'} 
                      alt={scan.product?.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{scan.product?.name}</div>
                      <div className="text-sm text-gray-600">{scan.product?.brand}</div>
                      <div className="text-sm text-gray-500 mt-1">{scan.action_taken}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">+{scan.eco_points_earned}</div>
                      <div className="text-sm text-gray-600">{scan.co2_saved.toFixed(1)}kg CO₂ saved</div>
                      <div className="text-xs text-gray-500">{new Date(scan.scanned_at).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
              
              {/* Preferences */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Voice Commands</div>
                    <div className="text-sm text-gray-600">Enable voice-activated scanning</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={profile.preferences?.voiceEnabled || false}
                      onChange={(e) => updateProfile({
                        preferences: { ...profile.preferences, voiceEnabled: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0071ce]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Push Notifications</div>
                    <div className="text-sm text-gray-600">Get notified about eco-deals</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={profile.preferences?.notifications || false}
                      onChange={(e) => updateProfile({
                        preferences: { ...profile.preferences, notifications: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0071ce]"></div>
                  </label>
                </div>
              </div>

              {/* Sign Out */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}