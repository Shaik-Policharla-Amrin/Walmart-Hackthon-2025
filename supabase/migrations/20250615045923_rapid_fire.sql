/*
  # Initial Schema for EcoSmart Scanner

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `eco_points` (integer, default 0)
      - `walmart_cash` (decimal, default 0)
      - `weekly_rank` (integer, default 999)
      - `total_co2_saved` (decimal, default 0)
      - `preferences` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `brand` (text)
      - `price` (decimal)
      - `co2e` (decimal)
      - `water_usage` (integer)
      - `recyclability_percent` (integer)
      - `category` (text)
      - `image_url` (text)
      - `barcode` (text, unique)
      - `is_eco_friendly` (boolean)
      - `created_at` (timestamp)

    - `scan_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `product_id` (uuid, foreign key)
      - `scanned_at` (timestamp)
      - `action_taken` (text)
      - `eco_points_earned` (integer)
      - `co2_saved` (decimal)

    - `product_alternatives`
      - `id` (uuid, primary key)
      - `original_product_id` (uuid, foreign key)
      - `alternative_product_id` (uuid, foreign key)
      - `co2_savings` (decimal)
      - `created_at` (timestamp)

    - `user_badges`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `badge_name` (text)
      - `badge_description` (text)
      - `badge_icon` (text)
      - `rarity` (text)
      - `earned_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access to products
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  eco_points integer DEFAULT 0,
  walmart_cash decimal(10,2) DEFAULT 0,
  weekly_rank integer DEFAULT 999,
  total_co2_saved decimal(10,2) DEFAULT 0,
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  price decimal(10,2) NOT NULL,
  co2e decimal(10,2) NOT NULL,
  water_usage integer NOT NULL,
  recyclability_percent integer NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  barcode text UNIQUE NOT NULL,
  is_eco_friendly boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create scan_history table
CREATE TABLE IF NOT EXISTS scan_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  scanned_at timestamptz DEFAULT now(),
  action_taken text NOT NULL,
  eco_points_earned integer DEFAULT 0,
  co2_saved decimal(10,2) DEFAULT 0
);

-- Create product_alternatives table
CREATE TABLE IF NOT EXISTS product_alternatives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  alternative_product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  co2_savings decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  badge_name text NOT NULL,
  badge_description text NOT NULL,
  badge_icon text NOT NULL,
  rarity text NOT NULL,
  earned_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE scan_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_alternatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for products table (public read access)
CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for scan_history table
CREATE POLICY "Users can read own scan history"
  ON scan_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scan history"
  ON scan_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policies for product_alternatives table (public read access)
CREATE POLICY "Anyone can read product alternatives"
  ON product_alternatives
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for user_badges table
CREATE POLICY "Users can read own badges"
  ON user_badges
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own badges"
  ON user_badges
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_scan_history_user_id ON scan_history(user_id);
CREATE INDEX IF NOT EXISTS idx_scan_history_scanned_at ON scan_history(scanned_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_product_alternatives_original ON product_alternatives(original_product_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();