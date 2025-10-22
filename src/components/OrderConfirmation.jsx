// import { CheckCircle, Package, MapPin, Clock } from "lucide-react";

// export default function OrderConfirmation({ isOpen, orderId, onClose }) {
//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
//       <div className="fixed inset-0 z-50 overflow-y-auto">
//         <div className="flex min-h-full items-center justify-center p-4">
//           <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
//             <div className="mb-6">
//               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <CheckCircle className="w-12 h-12 text-green-600" />
//               </div>
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
//               <p className="text-gray-600">
//                 Thank you for your order. Your delicious food is on its way!
//               </p>
//             </div>

//             <div className="bg-orange-50 rounded-2xl p-6 mb-6">
//               <p className="text-sm text-gray-600 mb-2">Order ID</p>
//               <p className="text-lg font-bold text-orange-600 break-all">
//                 {orderId ? orderId.slice(0, 8) : "N/A"}
//               </p>
//             </div>

//             <div className="space-y-4 mb-8 text-left">
//               <div className="flex items-start gap-3">
//                 <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <Package className="w-5 h-5 text-orange-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-gray-900">Order Confirmed</h3>
//                   <p className="text-sm text-gray-600">Your order has been received and is being prepared</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <Clock className="w-5 h-5 text-orange-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-gray-900">Estimated Time</h3>
//                   <p className="text-sm text-gray-600">30-45 minutes</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <MapPin className="w-5 h-5 text-orange-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-gray-900">Delivery Status</h3>
//                   <p className="text-sm text-gray-600">Track your order in real-time</p>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={onClose}
//               className="w-full py-4 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition transform hover:scale-105 shadow-lg font-bold"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



import { CheckCircle } from "lucide-react";

export default function OrderConfirmation({ isOpen, orderId, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
        <p className="mb-4">Thank you! Your food is on its way.</p>
        <p className="mb-6 font-bold">Order ID: {orderId}</p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
