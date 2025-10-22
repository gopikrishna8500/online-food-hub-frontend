// import React from "react";
// import { X, Plus, Minus, ShoppingBag } from "lucide-react";
// import { useCart } from "../context/CartContext";

// export default function Cart({ isOpen, onClose, onCheckout }) {
//   const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Cart Drawer */}
//       <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Empty Cart */}
//         {cart.length === 0 ? (
//           <div className="flex-1 flex flex-col items-center justify-center p-6">
//             <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
//             <p className="text-xl text-gray-500 mb-2">Your cart is empty</p>
//             <p className="text-gray-400 text-center">
//               Add some delicious items to get started!
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* Cart Items */}
//             <div className="flex-1 overflow-y-auto p-6 space-y-4">
//               {cart.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
//                 >
//                   {/* ✅ Use item.image instead of item.image_url */}
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-20 h-20 object-cover rounded-lg"
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-bold text-gray-900">{item.name}</h3>
//                     <p className="text-orange-600 font-bold">
//                       ${item.price.toFixed(2)}
//                     </p>
//                     <div className="flex items-center gap-3 mt-2">
//                       <button
//                         onClick={() =>
//                           updateQuantity(item.id, item.quantity - 1)
//                         }
//                         className="p-1 bg-white rounded-full hover:bg-gray-200 transition"
//                       >
//                         <Minus className="w-4 h-4" />
//                       </button>
//                       <span className="font-bold">{item.quantity}</span>
//                       <button
//                         onClick={() =>
//                           updateQuantity(item.id, item.quantity + 1)
//                         }
//                         className="p-1 bg-white rounded-full hover:bg-gray-200 transition"
//                       >
//                         <Plus className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-500 hover:text-red-700 transition"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Cart Footer */}
//             <div className="border-t p-6 space-y-4 bg-white">
//               <div className="flex justify-between items-center text-xl font-bold">
//                 <span>Total:</span>
//                 <span className="text-orange-600">
//                   ${getCartTotal().toFixed(2)}
//                 </span>
//               </div>
//               <button
//                 onClick={onCheckout}
//                 className="w-full py-4 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition transform hover:scale-105 shadow-lg font-bold"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }


















// import React from "react";
// import { X, Plus, Minus, ShoppingBag } from "lucide-react";
// import { useCart } from "../context/CartContext";

// export default function Cart({ isOpen, onClose, onCheckout }) {
//   const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
//         <div className="flex items-center justify-between p-6 border-b">
//           <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {cart.length === 0 ? (
//           <div className="flex-1 flex flex-col items-center justify-center p-6">
//             <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
//             <p className="text-xl text-gray-500 mb-2">Your cart is empty</p>
//             <p className="text-gray-400 text-center">Add some delicious items to get started!</p>
//           </div>
//         ) : (
//           <>
//             <div className="flex-1 overflow-y-auto p-6 space-y-4">
//               {cart.map((item) => (
//                 <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-lg shadow-sm">
//                   <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
//                   <div className="flex-1">
//                     <h3 className="font-bold text-gray-900">{item.name}</h3>
//                     <p className="text-orange-600 font-bold">₹{item.price.toFixed(2)}</p>
//                     <div className="flex items-center gap-3 mt-2">
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         className="p-1 bg-white rounded-full hover:bg-gray-200 transition"
//                       >
//                         <Minus className="w-4 h-4" />
//                       </button>
//                       <span className="font-bold">{item.quantity}</span>
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                         className="p-1 bg-white rounded-full hover:bg-gray-200 transition"
//                       >
//                         <Plus className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                   <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition">
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t p-6 space-y-4 bg-white">
//               <div className="flex justify-between items-center text-xl font-bold">
//                 <span>Total:</span>
//                 <span className="text-orange-600">₹{getCartTotal().toFixed(2)}</span>
//               </div>
//               <button
//                 onClick={onCheckout}
//                 className="w-full py-4 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition transform hover:scale-105 shadow-lg font-bold"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }






import React from "react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart({ isOpen, onClose, onCheckout }) {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
            <p className="text-xl text-gray-500 mb-2">Your cart is empty</p>
            <p className="text-gray-400 text-center">Add some delicious items to get started!</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-orange-600 font-bold">₹{item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 bg-white rounded-full hover:bg-gray-200 transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 bg-white rounded-full hover:bg-gray-200 transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t p-6 space-y-4 bg-white">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="text-orange-600">₹{getCartTotal().toFixed(2)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-4 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition transform hover:scale-105 shadow-lg font-bold"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
