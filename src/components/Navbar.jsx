// import React, { useState } from "react";
// import { ShoppingCart, Menu, X } from "lucide-react";
// import { useCart } from "../context/CartContext";

// export default function Navbar({ onCartClick }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const { getCartCount } = useCart();
//   const cartCount = getCartCount();

//   return (
//     <nav className="bg-orange-600 shadow-md fixed w-full top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <h1 className="text-2xl font-bold text-white">FoodHub</h1>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-8">
//             <a href="#home" className="text-white hover:text-gray-200 transition">Home</a>
//             <a href="#menu" className="text-white hover:text-gray-200 transition">Menu</a>
//             <a href="#about" className="text-white hover:text-gray-200 transition">About</a>
//             <a href="#contact" className="text-white hover:text-gray-200 transition">Contact</a>
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center space-x-4">
//             {/* Login / Signup */}
//             <div className="hidden md:flex items-center space-x-3">
//               <button className="px-4 py-2 text-white border border-white rounded-full hover:bg-white hover:text-orange-600 transition">
//                 Login
//               </button>
//               <button className="px-5 py-2 bg-white text-orange-600 rounded-full hover:bg-gray-100 transition">
//                 Sign Up
//               </button>
//             </div>

//             {/* Cart Button */}
//             <button
//               onClick={onCartClick}
//               className="relative p-2 text-white hover:bg-orange-700 rounded-full transition"
//             >
//               <ShoppingCart className="w-6 h-6" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </button>

//             {/* Mobile Menu Toggle */}
//             <div className="md:hidden">
//               <button onClick={() => setIsOpen(!isOpen)} className="text-white">
//                 {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-orange-600 border-t border-orange-700">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             <a href="#home" className="block px-3 py-2 text-white hover:text-gray-200">Home</a>
//             <a href="#menu" className="block px-3 py-2 text-white hover:text-gray-200">Menu</a>
//             <a href="#about" className="block px-3 py-2 text-white hover:text-gray-200">About</a>
//             <a href="#contact" className="block px-3 py-2 text-white hover:text-gray-200">Contact</a>

//             {/* Mobile Login / Signup */}
//             <div className="pt-3 space-y-2">
//               <button className="w-full px-4 py-2 text-white border border-white rounded-full hover:bg-white hover:text-orange-600 transition">
//                 Login
//               </button>
//               <button className="w-full px-4 py-2 bg-white text-orange-600 rounded-full hover:bg-gray-100 transition">
//                 Sign Up
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }




import React, { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ onCartClick, user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");
  const handleAccount = () => navigate("/account");
  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-orange-600 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">FoodHub</h1>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
            <a href="#menu" className="text-white hover:text-gray-200">Menu</a>
            <a href="#about" className="text-white hover:text-gray-200">About</a>
            <a href="#contact" className="text-white hover:text-gray-200">Contact</a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              {!user && (
                <>
                  <button onClick={handleLogin} className="px-4 py-2 text-white border border-white rounded-full hover:bg-white hover:text-orange-600 transition">Login</button>
                  <button onClick={handleSignup} className="px-5 py-2 bg-white text-orange-600 rounded-full hover:bg-gray-100 transition">Sign Up</button>
                </>
              )}
              {user && (
                <>
                  <button onClick={handleAccount} className="px-4 py-2 text-white border border-white rounded-full hover:bg-white hover:text-orange-600 transition">Account</button>
                  <button onClick={handleLogout} className="px-5 py-2 bg-white text-orange-600 rounded-full hover:bg-gray-100 transition">Logout</button>
                </>
              )}
            </div>

            <button onClick={onCartClick} className="relative p-2 text-white hover:bg-orange-700 rounded-full transition">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-orange-600 border-t border-orange-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 text-white hover:text-gray-200">Home</a>
            <a href="#menu" className="block px-3 py-2 text-white hover:text-gray-200">Menu</a>
            <a href="#about" className="block px-3 py-2 text-white hover:text-gray-200">About</a>
            <a href="#contact" className="block px-3 py-2 text-white hover:text-gray-200">Contact</a>

            <div className="pt-3 space-y-2">
              {!user && (
                <>
                  <button onClick={handleLogin} className="w-full px-4 py-2 text-white border border-white rounded-full hover:bg-white hover:text-orange-600 transition">Login</button>
                  <button onClick={handleSignup} className="w-full px-4 py-2 bg-white text-orange-600 rounded-full hover:bg-gray-100 transition">Sign Up</button>
                </>
              )}
              {user && (
                <>
                  <button onClick={handleAccount} className="w-full px-4 py-2 text-white border border-white rounded-full hover:bg-white hover:text-orange-600 transition">Account</button>
                  <button onClick={handleLogout} className="w-full px-4 py-2 bg-white text-orange-600 rounded-full hover:bg-gray-100 transition">Logout</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
