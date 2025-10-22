import React from "react";

export default function Hero() {
  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="pt-16 bg-gradient-to-br from-orange-50 to-white min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Delicious Food
              <span className="text-orange-600"> Delivered</span> to Your Door
            </h1>
            <p className="text-xl text-gray-600">
              Experience the finest cuisine from top restaurants. Fresh, fast, and delicious meals at your fingertips.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToMenu}
                className="px-8 py-4 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition transform hover:scale-105 shadow-lg"
              >
                Order Now
              </button>
              <button
                onClick={scrollToMenu}
                className="px-8 py-4 border-2 border-orange-600 text-orange-600 rounded-full hover:bg-orange-50 transition"
              >
                View Menu
              </button>
            </div>

            <div className="flex gap-8 pt-6">
              <div>
                <h3 className="text-3xl font-bold text-orange-600">500+</h3>
                <p className="text-gray-600">Dishes</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-orange-600">10k+</h3>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-orange-600">50+</h3>
                <p className="text-gray-600">Restaurants</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Delicious food"
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div className="absolute top-10 -right-10 w-72 h-72 bg-orange-200 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-orange-300 rounded-full opacity-50 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
