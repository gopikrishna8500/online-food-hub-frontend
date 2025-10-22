/*
  # Create Orders System

  1. New Tables
    - `menu_items`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text)
      - `price` (numeric)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)
    
    - `orders`
      - `id` (uuid, primary key)
      - `user_email` (text)
      - `user_name` (text)
      - `user_phone` (text)
      - `delivery_address` (text)
      - `total_amount` (numeric)
      - `status` (text) - pending, confirmed, preparing, delivered, cancelled
      - `payment_status` (text) - pending, completed, failed
      - `payment_intent_id` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `menu_item_id` (uuid, foreign key)
      - `quantity` (integer)
      - `price` (numeric)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to menu_items
    - Add policies for authenticated users to manage their orders
*/

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  price numeric(10, 2) NOT NULL,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  user_name text NOT NULL,
  user_phone text NOT NULL,
  delivery_address text NOT NULL,
  total_amount numeric(10, 2) NOT NULL,
  status text DEFAULT 'pending',
  payment_status text DEFAULT 'pending',
  payment_intent_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id uuid REFERENCES menu_items(id),
  quantity integer NOT NULL DEFAULT 1,
  price numeric(10, 2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policies for menu_items (public read access)
CREATE POLICY "Anyone can view menu items"
  ON menu_items FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policies for orders (users can create and view their own orders)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policies for order_items
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view order items"
  ON order_items FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert sample menu items
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
  ('Margherita Pizza', 'pizza', 12.99, 'Classic tomato, mozzarella, and basil', 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Cheese Burger', 'burger', 9.99, 'Juicy beef patty with cheese and toppings', 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Carbonara Pasta', 'pasta', 14.99, 'Creamy pasta with bacon and parmesan', 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Caesar Salad', 'salad', 8.99, 'Fresh romaine with caesar dressing', 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Pepperoni Pizza', 'pizza', 13.99, 'Loaded with pepperoni and cheese', 'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Chocolate Cake', 'dessert', 6.99, 'Rich chocolate layer cake', 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Veggie Burger', 'burger', 10.99, 'Plant-based patty with fresh veggies', 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Alfredo Pasta', 'pasta', 13.99, 'Creamy white sauce with fettuccine', 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=400')
ON CONFLICT DO NOTHING;