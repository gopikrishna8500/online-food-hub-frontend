import React from "react";
import { CheckCircle } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Image Section */}
          <div className="relative group">
            <img
              src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="FoodHub Restaurant"
              className="rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-6 rounded-2xl shadow-xl text-center">
              <h3 className="text-5xl font-extrabold">10+</h3>
              <p className="text-lg font-medium">Years Experience</p>
            </div>
          </div>

          {/* Right Content Section */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              About <span className="text-orange-600">FoodHub</span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              At <span className="font-semibold text-gray-900">FoodHub</span>, we’re passionate about delivering
              <span className="text-orange-600 font-semibold"> exceptional food experiences </span>
              to our customers. With over a decade in the food industry, we’ve partnered with top restaurants to bring
              you authentic, delicious, and diverse cuisines.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is to make <span className="text-orange-600 font-semibold">great food accessible</span> to
              everyone — with fast delivery, quality ingredients, and an excellent service experience.
            </p>

            {/* Feature List */}
            <div className="space-y-5 pt-4">
              {[
                {
                  title: "Fresh Ingredients",
                  desc: "We use only the freshest and highest quality ingredients.",
                },
                {
                  title: "Expert Chefs",
                  desc: "Our partner restaurants have experienced and talented chefs.",
                },
                {
                  title: "Customer Satisfaction",
                  desc: "Your happiness is our top priority every single time.",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Button (Optional) */}
            <div className="pt-6">
              <a
                href="#menu"
                className="inline-block bg-orange-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-700 transition duration-300"
              >
                Explore Menu
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
