import { Product } from '../types/product';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Great Value Ground Beef',
    brand: 'Great Value',
    price: 4.98,
    co2e: 15.2,
    waterUsage: 1847,
    recyclabilityPercent: 20,
    category: 'Meat & Seafood',
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    barcode: '123456789012',
    isEcoFriendly: false,
    alternatives: [
      {
        id: '1a',
        name: 'Beyond Beef Plant-Based Ground',
        brand: 'Beyond Meat',
        price: 5.98,
        co2e: 1.5,
        waterUsage: 164,
        recyclabilityPercent: 85,
        category: 'Plant-Based',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        barcode: '123456789013',
        isEcoFriendly: true
      }
    ]
  },
  {
    id: '2',
    name: 'Great Value Organic Spinach',
    brand: 'Great Value',
    price: 2.48,
    co2e: 0.3,
    waterUsage: 12,
    recyclabilityPercent: 90,
    category: 'Fresh Produce',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    barcode: '123456789014',
    isEcoFriendly: true
  },
  {
    id: '3',
    name: 'Coca-Cola Classic 12-Pack',
    brand: 'Coca-Cola',
    price: 6.48,
    co2e: 4.2,
    waterUsage: 185,
    recyclabilityPercent: 75,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    barcode: '123456789015',
    isEcoFriendly: false,
    alternatives: [
      {
        id: '3a',
        name: 'BUBLY Sparkling Water 12-Pack',
        brand: 'bubly',
        price: 4.98,
        co2e: 0.8,
        waterUsage: 45,
        recyclabilityPercent: 95,
        category: 'Beverages',
        image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        barcode: '123456789016',
        isEcoFriendly: true
      }
    ]
  },
  {
    id: '4',
    name: 'Tide Laundry Detergent',
    brand: 'Tide',
    price: 12.97,
    co2e: 2.8,
    waterUsage: 95,
    recyclabilityPercent: 60,
    category: 'Household',
    image: 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    barcode: '037000127512',
    isEcoFriendly: false,
    alternatives: [
      {
        id: '4a',
        name: 'Seventh Generation Free & Clear',
        brand: 'Seventh Generation',
        price: 11.97,
        co2e: 1.2,
        waterUsage: 35,
        recyclabilityPercent: 95,
        category: 'Household',
        image: 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        barcode: '732913441235',
        isEcoFriendly: true
      }
    ]
  },
  {
    id: '5',
    name: 'Bananas Organic',
    brand: 'Fresh',
    price: 1.98,
    co2e: 0.1,
    waterUsage: 8,
    recyclabilityPercent: 100,
    category: 'Fresh Produce',
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    barcode: '4011',
    isEcoFriendly: true
  },
  {
    id: '6',
    name: 'Chicken Breast',
    brand: 'Great Value',
    price: 8.98,
    co2e: 6.9,
    waterUsage: 542,
    recyclabilityPercent: 25,
    category: 'Meat & Seafood',
    image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    barcode: '681131771234',
    isEcoFriendly: false,
    alternatives: [
      {
        id: '6a',
        name: 'Gardein Plant-Based Chicken',
        brand: 'Gardein',
        price: 4.98,
        co2e: 1.8,
        waterUsage: 89,
        recyclabilityPercent: 80,
        category: 'Plant-Based',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        barcode: '842234400123',
        isEcoFriendly: true
      }
    ]
  },
  // Additional fast-scanning products for demo
  {
    id: '7',
    name: 'Great Value Milk 1 Gallon',
    brand: 'Great Value',
    price: 3.48,
    co2e: 3.2,
    waterUsage: 628,
    recyclabilityPercent: 85,
    category: 'Dairy',
    image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    barcode: '681131001234',
    isEcoFriendly: false,
    alternatives: [
      {
        id: '7a',
        name: 'Oat Dream Oat Milk',
        brand: 'Oat Dream',
        price: 4.48,
        co2e: 0.9,
        waterUsage: 48,
        recyclabilityPercent: 90,
        category: 'Plant-Based',
        image: 'https://images.pexels.com/photos/6544373/pexels-photo-6544373.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        barcode: '681131001235',
        isEcoFriendly: true
      }
    ]
  },
  {
    id: '8',
    name: 'Wonder Bread White',
    brand: 'Wonder',
    price: 2.98,
    co2e: 1.1,
    waterUsage: 45,
    recyclabilityPercent: 70,
    category: 'Bakery',
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    barcode: '884912345678',
    isEcoFriendly: false
  }
];

export const userBadges = [
  {
    id: '1',
    name: 'Eco Hero',
    description: 'Saved 10kg CO₂ this month',
    icon: '🌱',
    earnedAt: new Date('2024-01-15'),
    rarity: 'rare' as const
  },
  {
    id: '2',
    name: 'Water Warrior',
    description: 'Saved 1000L of water',
    icon: '💧',
    earnedAt: new Date('2024-01-10'),
    rarity: 'common' as const
  },
  {
    id: '3',
    name: 'Plant Pioneer',
    description: 'Chose plant-based 20 times',
    icon: '🌿',
    earnedAt: new Date('2024-01-20'),
    rarity: 'epic' as const
  }
];

export const mockUser = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.j@email.com',
  ecoPoints: 2340,
  walmartCash: 11.50,
  badges: userBadges,
  weeklyRank: 3,
  totalCo2eSaved: 47.8,
  preferences: {
    voiceEnabled: true,
    notifications: true,
    dyslexiaMode: false
  }
};

// Mock supplier data for enhanced realism
export const supplierData = {
  currentEmissions: 50000,
  targetEmissions: 30000,
  monthlyReduction: 2.3,
  yearlyProjection: 42000,
  topCategories: [
    { name: 'Energy', impact: 35, trend: 'improving' },
    { name: 'Transportation', impact: 28, trend: 'stable' },
    { name: 'Packaging', impact: 20, trend: 'improving' },
    { name: 'Manufacturing', impact: 17, trend: 'needs_attention' }
  ]
};