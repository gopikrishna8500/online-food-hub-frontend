// import { useState } from "react";
// import { X, CreditCard, MapPin, User, Phone, Mail } from "lucide-react";
// import { useCart } from "../context/CartContext";
// import { supabase } from "../lib/supabase";

// export default function Checkout({ isOpen, onClose, onSuccess }) {
//   const { cart, getCartTotal, clearCart } = useCart();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     zipCode: "",
//     cardNumber: "",
//     expiryDate: "",
//     cvv: "",
//   });

//   if (!isOpen) return null;

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const deliveryAddress = `${formData.address}, ${formData.city}, ${formData.zipCode}`;

//       // Insert order into Supabase
//       const { data: order, error: orderError } = await supabase
//         .from("orders")
//         .insert({
//           user_email: formData.email,
//           user_name: formData.name,
//           user_phone: formData.phone,
//           delivery_address: deliveryAddress,
//           total_amount: getCartTotal(),
//           status: "confirmed",
//           payment_status: "completed",
//         })
//         .select()
//         .single();

//       if (orderError) throw orderError;

//       // Insert order items
//       const orderItems = cart.map((item) => ({
//         order_id: order.id,
//         menu_item_id: item.id,
//         quantity: item.quantity,
//         price: item.price,
//       }));

//       const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
//       if (itemsError) throw itemsError;

//       // Clear cart and call onSuccess with string orderId
//       clearCart();
//       onSuccess(String(order.id));
//     } catch (error) {
//       console.error("Error creating order:", error);
//       alert("Failed to place order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
//       <div className="fixed inset-0 z-50 overflow-y-auto">
//         <div className="flex min-h-full items-center justify-center p-4">
//           <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-100 rounded-full transition"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Contact Info */}
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <User className="w-5 h-5" /> Contact Information
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       required
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                       placeholder="John Doe"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <Mail className="w-4 h-4 inline mr-1" /> Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       required
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                       placeholder="john@example.com"
//                     />
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <Phone className="w-4 h-4 inline mr-1" /> Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     placeholder="+1 (555) 123-4567"
//                   />
//                 </div>
//               </div>

//               {/* Delivery Address */}
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <MapPin className="w-5 h-5" /> Delivery Address
//                 </h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
//                     <input
//                       type="text"
//                       name="address"
//                       required
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                       placeholder="123 Main St"
//                     />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
//                       <input
//                         type="text"
//                         name="city"
//                         required
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                         placeholder="New York"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
//                       <input
//                         type="text"
//                         name="zipCode"
//                         required
//                         value={formData.zipCode}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                         placeholder="10001"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Payment Info */}
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <CreditCard className="w-5 h-5" /> Payment Information
//                 </h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
//                     <input
//                       type="text"
//                       name="cardNumber"
//                       required
//                       value={formData.cardNumber}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                       placeholder="1234 5678 9012 3456"
//                       maxLength={19}
//                     />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
//                       <input
//                         type="text"
//                         name="expiryDate"
//                         required
//                         value={formData.expiryDate}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                         placeholder="MM/YY"
//                         maxLength={5}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
//                       <input
//                         type="text"
//                         name="cvv"
//                         required
//                         value={formData.cvv}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                         placeholder="123"
//                         maxLength={4}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="border-t pt-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <span className="text-2xl font-bold text-gray-900">Total:</span>
//                   <span className="text-3xl font-bold text-orange-600">${getCartTotal().toFixed(2)}</span>
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-4 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition transform hover:scale-105 shadow-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loading ? "Processing..." : "Place Order"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }






// import React, { useState } from "react";
// import { X, User, Mail, Phone, MapPin, CreditCard } from "lucide-react";
// import { useCart } from "../context/CartContext";
// import { supabase } from "../lib/supabase";

// export default function Checkout({ isOpen, onClose, onSuccess }) {
//   const { cart, getCartTotal, clearCart } = useCart();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     zipCode: "",
//     cardNumber: "",
//     expiryDate: "",
//     cvv: "",
//   });

//   if (!isOpen) return null;

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const deliveryAddress = `${formData.address}, ${formData.city}, ${formData.zipCode}`;

//       // 1️⃣ Insert order into Supabase
//       const { data: order, error: orderError } = await supabase
//         .from("orders")
//         .insert({
//           user_email: formData.email,
//           user_name: formData.name,
//           user_phone: formData.phone,
//           delivery_address: deliveryAddress,
//           total_amount: getCartTotal(),
//           status: "confirmed",
//           payment_status: "completed",
//         })
//         .select()
//         .single();

//       if (orderError) throw orderError;

//       // 2️⃣ Insert order items
//       const orderItems = cart.map((item) => ({
//         order_id: order.id,
//         menu_item_id: item.id,
//         quantity: item.quantity,
//         price: item.price,
//       }));

//       const { error: itemsError } = await supabase
//         .from("order_items")
//         .insert(orderItems);

//       if (itemsError) throw itemsError;

//       // 3️⃣ Clear cart
//       clearCart();
//       onSuccess(order.id);

//       // 4️⃣ Send professional email with all details
//       await fetch("http://localhost:5000/send-order-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           address: deliveryAddress,
//           orderId: order.id,
//           totalAmount: getCartTotal(),
//           orderItems: cart.map(item => ({
//             name: item.name,
//             quantity: item.quantity,
//             price: item.price
//           })),
//         }),
//       });

//       alert("Payment successful! A detailed receipt has been sent to your email.");
//     } catch (error) {
//       console.error("Error processing order:", error);
//       alert("Payment failed or email could not be sent. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 z-40"
//         onClick={onClose}
//       />
//       <div className="fixed inset-0 z-50 overflow-y-auto">
//         <div className="flex min-h-full items-center justify-center p-4">
//           <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-100 rounded-full transition"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Contact Info */}
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <User className="w-5 h-5" />
//                   Contact Information
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       required
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       placeholder="John Doe"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <Mail className="w-4 h-4 inline mr-1" />
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       required
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       placeholder="john@example.com"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <Phone className="w-4 h-4 inline mr-1" />
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="+1 (555) 123-4567"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               {/* Delivery Address */}
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <MapPin className="w-5 h-5" />
//                   Delivery Address
//                 </h3>
//                 <div className="space-y-4">
//                   <input
//                     type="text"
//                     name="address"
//                     required
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     placeholder="Street Address"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                   <div className="grid grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       name="city"
//                       required
//                       value={formData.city}
//                       onChange={handleInputChange}
//                       placeholder="City"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                     <input
//                       type="text"
//                       name="zipCode"
//                       required
//                       value={formData.zipCode}
//                       onChange={handleInputChange}
//                       placeholder="ZIP Code"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Payment */}
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <CreditCard className="w-5 h-5" />
//                   Payment Information
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <input
//                     type="text"
//                     name="cardNumber"
//                     required
//                     value={formData.cardNumber}
//                     onChange={handleInputChange}
//                     placeholder="Card Number"
//                     maxLength={19}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                   <input
//                     type="text"
//                     name="expiryDate"
//                     required
//                     value={formData.expiryDate}
//                     onChange={handleInputChange}
//                     placeholder="MM/YY"
//                     maxLength={5}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                   <input
//                     type="text"
//                     name="cvv"
//                     required
//                     value={formData.cvv}
//                     onChange={handleInputChange}
//                     placeholder="CVV"
//                     maxLength={4}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               {/* Total and Submit */}
//               <div className="border-t pt-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <span className="text-2xl font-bold text-gray-900">Total:</span>
//                   <span className="text-3xl font-bold text-orange-600">
//                     ${getCartTotal().toFixed(2)}
//                   </span>
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-4 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition transform hover:scale-105 shadow-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loading ? "Processing..." : "Place Order"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }









import React, { useState } from "react";
import { X, User, Mail, Phone, MapPin, CreditCard } from "lucide-react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { supabase } from "../lib/supabase";

export default function Checkout({ isOpen, onClose, onSuccess }) {
  const { cart, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const deliveryAddress = `${formData.address}, ${formData.city}, ${formData.zipCode}`;

      // 1️⃣ Insert order in Supabase with payment_status pending
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_email: formData.email,
          user_name: formData.name,
          user_phone: formData.phone,
          delivery_address: deliveryAddress,
          total_amount: getCartTotal(),
          status: "confirmed",
          payment_status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2️⃣ Insert order_items
      const orderItems = cart.map((item) => ({
        order_id: order.id,
        menu_item_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      // 3️⃣ Create Razorpay order via backend
      const { data: razorpayOrder } = await axios.post("http://localhost:5000/create-order", {
        amount: getCartTotal(),
      });

      // 4️⃣ Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "FoodHub",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          // 5️⃣ Update payment_status in Supabase
          await supabase
            .from("orders")
            .update({ payment_status: "completed", payment_intent_id: response.razorpay_payment_id })
            .eq("id", order.id);

          // 6️⃣ Send email
          await axios.post("http://localhost:5000/send-order-email", {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: deliveryAddress,
            orderId: order.id,
            totalAmount: getCartTotal(),
            orderItems: cart.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
          });

          clearCart();
          onSuccess(order.id);
        },
        theme: { color: "#FF6600" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed to initiate:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" /> Contact Information
                </h3>
                <input
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg mt-2"
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg mt-2"
                />
              </div>

              {/* Delivery Address */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> Delivery Address
                </h3>
                <input
                  name="address"
                  placeholder="Street Address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  name="city"
                  placeholder="City"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg mt-2"
                />
                <input
                  name="zipCode"
                  placeholder="Zip / Postal Code"
                  required
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg mt-2"
                />
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-600 text-white py-3 px-6 rounded-full hover:bg-orange-700 font-bold transition"
                >
                  {loading ? "Processing..." : `Pay $${getCartTotal().toFixed(2)}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
