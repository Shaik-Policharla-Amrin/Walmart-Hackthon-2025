import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export interface ScanRecord {
  id: string
  product_id: string
  scanned_at: string
  action_taken: string
  eco_points_earned: number
  co2_saved: number
  product?: {
    name: string
    brand: string
    image_url: string
    co2e: number
  }
}

export const useScanHistory = () => {
  const { user } = useAuth()
  const [scanHistory, setScanHistory] = useState<ScanRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchScanHistory()
    }
  }, [user])

  const fetchScanHistory = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('scan_history')
        .select(`
          *,
          products (
            name,
            brand,
            image_url,
            co2e
          )
        `)
        .eq('user_id', user.id)
        .order('scanned_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setScanHistory(data || [])
    } catch (err) {
      console.error('Error fetching scan history:', err)
    } finally {
      setLoading(false)
    }
  }

  const addScanRecord = async (
    productId: string,
    actionTaken: string,
    ecoPointsEarned: number,
    co2Saved: number
  ) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('scan_history')
        .insert({
          user_id: user.id,
          product_id: productId,
          action_taken: actionTaken,
          eco_points_earned: ecoPointsEarned,
          co2_saved: co2Saved
        })
        .select()
        .single()

      if (error) throw error

      // Refresh history
      await fetchScanHistory()
      
      return data
    } catch (err) {
      console.error('Error adding scan record:', err)
      return null
    }
  }

  const getTotalStats = () => {
    return scanHistory.reduce(
      (acc, scan) => ({
        totalScans: acc.totalScans + 1,
        totalEcoPoints: acc.totalEcoPoints + scan.eco_points_earned,
        totalCO2Saved: acc.totalCO2Saved + scan.co2_saved
      }),
      { totalScans: 0, totalEcoPoints: 0, totalCO2Saved: 0 }
    )
  }

  return {
    scanHistory,
    loading,
    addScanRecord,
    getTotalStats,
    refetch: fetchScanHistory
  }
}