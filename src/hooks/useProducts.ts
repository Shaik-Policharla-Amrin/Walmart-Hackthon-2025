import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Product } from '../types/product'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name')

      if (error) throw error

      // Transform database format to app format
      const transformedProducts: Product[] = data.map(product => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        co2e: product.co2e,
        waterUsage: product.water_usage,
        recyclabilityPercent: product.recyclability_percent,
        category: product.category,
        image: product.image_url,
        barcode: product.barcode,
        isEcoFriendly: product.is_eco_friendly
      }))

      setProducts(transformedProducts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const searchProducts = async (query: string): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,brand.ilike.%${query}%`)
        .limit(10)

      if (error) throw error

      return data.map(product => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        co2e: product.co2e,
        waterUsage: product.water_usage,
        recyclabilityPercent: product.recyclability_percent,
        category: product.category,
        image: product.image_url,
        barcode: product.barcode,
        isEcoFriendly: product.is_eco_friendly
      }))
    } catch (err) {
      console.error('Search error:', err)
      return []
    }
  }

  const getProductByBarcode = async (barcode: string): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('barcode', barcode)
        .single()

      if (error) throw error

      return {
        id: data.id,
        name: data.name,
        brand: data.brand,
        price: data.price,
        co2e: data.co2e,
        waterUsage: data.water_usage,
        recyclabilityPercent: data.recyclability_percent,
        category: data.category,
        image: data.image_url,
        barcode: data.barcode,
        isEcoFriendly: data.is_eco_friendly
      }
    } catch (err) {
      console.error('Barcode lookup error:', err)
      return null
    }
  }

  const getAlternatives = async (productId: string): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from('product_alternatives')
        .select(`
          alternative_product_id,
          co2_savings,
          products!alternative_product_id (*)
        `)
        .eq('original_product_id', productId)

      if (error) throw error

      return data.map(alt => ({
        id: alt.products.id,
        name: alt.products.name,
        brand: alt.products.brand,
        price: alt.products.price,
        co2e: alt.products.co2e,
        waterUsage: alt.products.water_usage,
        recyclabilityPercent: alt.products.recyclability_percent,
        category: alt.products.category,
        image: alt.products.image_url,
        barcode: alt.products.barcode,
        isEcoFriendly: alt.products.is_eco_friendly
      }))
    } catch (err) {
      console.error('Alternatives error:', err)
      return []
    }
  }

  return {
    products,
    loading,
    error,
    searchProducts,
    getProductByBarcode,
    getAlternatives,
    refetch: fetchProducts
  }
}