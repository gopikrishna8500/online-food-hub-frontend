import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart } = useCart();

  const categories = ['all', 'pizza', 'burger', 'pasta', 'salad', 'dessert'];

  const menuItems = [
    { id: 1, name: 'Margherita Pizza', category: 'pizza', price: 12.99, image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Classic tomato, mozzarella, and basil' },
    { id: 2, name: 'Cheese Burger', category: 'burger', price: 9.99, image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Juicy beef patty with cheese and toppings' },
    { id: 3, name: 'Carbonara Pasta', category: 'pasta', price: 14.99, image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Creamy pasta with bacon and parmesan' },
    { id: 4, name: 'Caesar Salad', category: 'salad', price: 8.99, image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Fresh romaine with caesar dressing' },
    { id: 5, name: 'Pepperoni Pizza', category: 'pizza', price: 13.99, image: 'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Loaded with pepperoni and cheese' },
    { id: 6, name: 'Chocolate Cake', category: 'dessert', price: 6.99, image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Rich chocolate layer cake' },
    { id: 7, name: 'Veggie Burger', category: 'burger', price: 10.99, image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Plant-based patty with fresh veggies' },
    { id: 8, name: 'Alfredo Pasta', category: 'pasta', price: 13.99, image: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Creamy white sauce with fettuccine' }
  ];

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h2>
          <p className="text-xl text-gray-600">Explore our delicious selection of dishes</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full capitalize transition ${
                activeCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-600">₹{item.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
