/*
  # Sample Data Migration

  1. Sample Products
    - High-impact products (beef, chicken, dairy, etc.)
    - Eco-friendly alternatives (plant-based options)
    - Fresh produce items
  
  2. Product Alternatives
    - Mapping between high-impact products and eco-friendly alternatives
    - CO₂ savings calculations
  
  3. Demo User Data
    - Sample user for demonstration
    - Scan history with realistic data
    - Achievement badges
  
  4. Security
    - Uses proper UUID generation
    - Maintains existing RLS policies
*/

-- Insert sample products
INSERT INTO products (name, brand, price, co2e, water_usage, recyclability_percent, category, image_url, barcode, is_eco_friendly) VALUES
-- High-impact products
('Great Value Ground Beef', 'Great Value', 4.98, 15.2, 1847, 20, 'Meat & Seafood', 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', '123456789012', false),
('Chicken Breast', 'Great Value', 8.98, 6.9, 542, 25, 'Meat & Seafood', 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', '681131771234', false),
('Great Value Milk 1 Gallon', 'Great Value', 3.48, 3.2, 628, 85, 'Dairy', 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', '681131001234', false),
('Coca-Cola Classic 12-Pack', 'Coca-Cola', 6.48, 4.2, 185, 75, 'Beverages', 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', '123456789015', false),
('Tide Laundry Detergent', 'Tide', 12.97, 2.8, 95, 60, 'Household', 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', '037000127512', false),

-- Eco-friendly alternatives
('Beyond Beef Plant-Based Ground', 'Beyond Meat', 5.98, 1.5, 164, 85, 'Plant-Based', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', '123456789013', true),
('Gardein Plant-Based Chicken', 'Gardein', 4.98, 1.8, 89, 80, 'Plant-Based', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', '842234400123', true),
('Oat Dream Oat Milk', 'Oat Dream', 4.48, 0.9, 48, 90, 'Plant-Based', 'https://images.pexels.com/photos/6544373/pexels-photo-6544373.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', '681131001235', true),
('BUBLY Sparkling Water 12-Pack', 'bubly', 4.98, 0.8, 45, 95, 'Beverages', 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', '123456789016', true),
('Seventh Generation Free & Clear', 'Seventh Generation', 11.97, 1.2, 35, 95, 'Household', 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', '732913441235', true),

-- Fresh produce (naturally eco-friendly)
('Great Value Organic Spinach', 'Great Value', 2.48, 0.3, 12, 90, 'Fresh Produce', 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', '123456789014', true),
('Bananas Organic', 'Fresh', 1.98, 0.1, 8, 100, 'Fresh Produce', 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', '4011', true),
('Wonder Bread White', 'Wonder', 2.98, 1.1, 45, 70, 'Bakery', 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', '884912345678', false);

-- Set up product alternatives relationships
INSERT INTO product_alternatives (original_product_id, alternative_product_id, co2_savings) VALUES
-- Ground beef -> Beyond Meat
((SELECT id FROM products WHERE barcode = '123456789012'), (SELECT id FROM products WHERE barcode = '123456789013'), 13.7),
-- Chicken -> Gardein
((SELECT id FROM products WHERE barcode = '681131771234'), (SELECT id FROM products WHERE barcode = '842234400123'), 5.1),
-- Dairy milk -> Oat milk
((SELECT id FROM products WHERE barcode = '681131001234'), (SELECT id FROM products WHERE barcode = '681131001235'), 2.3),
-- Coca-Cola -> Bubly
((SELECT id FROM products WHERE barcode = '123456789015'), (SELECT id FROM products WHERE barcode = '123456789016'), 3.4),
-- Tide -> Seventh Generation
((SELECT id FROM products WHERE barcode = '037000127512'), (SELECT id FROM products WHERE barcode = '732913441235'), 1.6);

-- Create demo user (this would normally be handled by auth, but for demo purposes)
DO $$
DECLARE
  demo_user_id uuid := '550e8400-e29b-41d4-a716-446655440000'::uuid;
BEGIN
  -- Insert demo user with proper UUID
  INSERT INTO users (id, email, name, eco_points, walmart_cash, weekly_rank, total_co2_saved, preferences)
  VALUES (
    demo_user_id,
    'demo@walmart.com',
    'Sarah Johnson',
    2340,
    11.50,
    3,
    47.8,
    '{"voiceEnabled": true, "notifications": true, "dyslexiaMode": false}'::jsonb
  )
  ON CONFLICT (email) DO UPDATE SET
    eco_points = EXCLUDED.eco_points,
    walmart_cash = EXCLUDED.walmart_cash,
    weekly_rank = EXCLUDED.weekly_rank,
    total_co2_saved = EXCLUDED.total_co2_saved;

  -- Add sample scan history
  INSERT INTO scan_history (user_id, product_id, action_taken, eco_points_earned, co2_saved, scanned_at) VALUES
  (demo_user_id, (SELECT id FROM products WHERE barcode = '123456789013'), 'Chose eco-friendly alternative', 50, 13.7, now() - interval '1 day'),
  (demo_user_id, (SELECT id FROM products WHERE barcode = '681131001235'), 'Chose eco-friendly alternative', 50, 2.3, now() - interval '2 days'),
  (demo_user_id, (SELECT id FROM products WHERE barcode = '123456789014'), 'Eco-friendly choice', 20, 0.5, now() - interval '3 days'),
  (demo_user_id, (SELECT id FROM products WHERE barcode = '4011'), 'Eco-friendly choice', 20, 0.3, now() - interval '4 days'),
  (demo_user_id, (SELECT id FROM products WHERE barcode = '842234400123'), 'Chose eco-friendly alternative', 50, 5.1, now() - interval '5 days');

  -- Add sample badges
  INSERT INTO user_badges (user_id, badge_name, badge_description, badge_icon, rarity) VALUES
  (demo_user_id, 'Eco Hero', 'Saved 10kg CO₂ this month', '🌱', 'rare'),
  (demo_user_id, 'Water Warrior', 'Saved 1000L of water', '💧', 'common'),
  (demo_user_id, 'Plant Pioneer', 'Chose plant-based 20 times', '🌿', 'epic');

END $$;