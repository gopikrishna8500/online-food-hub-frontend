import React from "react";
import { Clock, Truck, Star, CreditCard } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Get your food delivered hot and fresh within 30-45 minutes",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Real-time Tracking",
      description: "Track your order in real-time from kitchen to your doorstep",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Quality Food",
      description: "Premium ingredients and expert preparation for every dish",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Secure Payment",
      description: "Multiple payment options with secure checkout process",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose FoodHub
          </h2>
          <p className="text-xl text-gray-600">
            Experience the best food delivery service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
